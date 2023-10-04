import React, { useEffect, useState, useContext } from 'react';
import './Shoe.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';

export default function Shoe() {
  const [shoe, setShoe] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("38");

  const { id } = useParams();

  const navigate = useNavigate();

  const { updateCart } = useCart();

  useEffect(() => {
    const shoeId = id;
    axios
      .get(`http://localhost:3000/${shoeId}`)
      .then((response) => {
        setShoe(response.data);
      })
      .catch((error) => {
        console.error('Une erreur est survenue lors de la récupération de la chaussure :', error);
      });
  }, [id]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 99) {
      setQuantity(99);
    } else {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingCartItemIndex = currentCart.findIndex((item) => item.id === id && item.size === size);

    if (existingCartItemIndex !== -1) {
      currentCart[existingCartItemIndex].quantity += quantity;
    } else {
      const cartItem = {
        id: id,
        size: size,
        quantity: quantity,
      };
      currentCart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
    updateCart(currentCart);
  };

  return shoe ? (
    <div className='shoe-page'>
      <img className='shoe-image' src={`/shoes/${shoe.name_joint}.webp`} alt={shoe.name_joint} />
      <div className='infos-container'>
        <h1 className='name'>{shoe.name}</h1>
        <h3 className='cat'>{shoe.gender} - {shoe.cat}</h3>
        <p className='price'>{shoe.price}€</p>
        <select name="size" className='input-size' onChange={(e) => setSize(e.target.value)}>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
          <option value="46">46</option>
          <option value="47">47</option>
        </select>
        <div className='add-cart-container'>
          <input className='price-input' type='number' name='quantity' value={quantity} onChange={handleQuantityChange} min='1' max='99' />
          <button className='primary-button' onClick={addToCart}>Add to cart</button>
        </div>
        <button className='secondary-button' onClick={() => navigate('/cart')}>
          Go to my cart<BsBag style={{ marginLeft: '15px' }} />
        </button>
      </div>
    </div>
  ) : null;
}
