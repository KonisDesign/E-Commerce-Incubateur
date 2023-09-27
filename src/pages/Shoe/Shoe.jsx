import React, { useEffect, useState } from 'react';
import './Shoe.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';

export default function Shoe() {
  const [shoe, setShoe] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    const shoeId = id;
    console.log(shoeId);
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

    const existingCartItemIndex = currentCart.findIndex((item) => item.id === id);

    if (existingCartItemIndex !== -1) {
      currentCart[existingCartItemIndex].quantity += quantity;
    } else {
      const cartItem = {
        id: id,
        quantity: quantity,
      };
      currentCart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
  };

  return shoe ? (
    <div className='shoe-page'>
      <img className='shoe-image' src={`/shoes/${shoe.name_joint}.webp`} alt={shoe.name_joint} />
      <div className='infos-container'>
        <h1 className='name'>{shoe.name}</h1>
        <h3 className='cat'>{shoe.cat}</h3>
        <p className='price'>{shoe.price}€</p>
        <div className='add-cart-container'>
          <input className='price-input' type='number' name='quantity' value={quantity} onChange={handleQuantityChange} min='1' max='99' />
          <button className='primary-button' onClick={addToCart}>Add to cart</button>
        </div>
        <button className='secondary-button'>
          Go to my cart<BsBag style={{ marginLeft: '15px' }} />
        </button>
      </div>
    </div>
  ) : null;
}
