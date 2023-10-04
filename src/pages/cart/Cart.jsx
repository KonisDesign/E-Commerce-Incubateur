import React, { useEffect, useState } from 'react';
import './Cart.scss';
import CartItem from '../../components/cart-item/CartItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const isConnected = localStorage.getItem('token') || null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productDetails = [];

      for (const item of cart) {
        try {
          const response = await axios.get(`http://localhost:3000/${item.id}`);
          productDetails.push(response.data);
        } catch (error) {
          console.error('Une erreur est survenue lors de la récupération des informations du produit :', error);
        }
      }
      setProducts(productDetails);
    };

    fetchProducts();
  }, [cart]);

  useEffect(() => {
    let total = 0;
    products.forEach((product, index) => {
      total += product.price * cart[index].quantity;
    });
    setTotalPrice(total);
  }, [products, cart]);

  return (
    <div className='cart-page'>
      <h1>Cart</h1>
      {cart.length > 0 ? (
        products.map((product, index) => (
          <CartItem key={index} id={index} name={product.name} nameJoint={product.name_joint} size={cart[index].size} quantity={cart[index].quantity} price={product.price} deleteBtn={1} />
        ))
      ) : (
        <h1>Nothing here !</h1>
      )}
      {cart.length > 0 ?
        <div className="align-right">
          <div className="total-container">
            <h2 className='total'>Total</h2>
            <p>{totalPrice}€</p>
            <button className='primary-button' onClick={isConnected ? () => navigate('/checkout') : () => navigate('/signin')}>Checkout</button>
          </div>
        </div>
        : <button className='secondary-button' onClick={() => navigate('/')}><BsArrowLeft />Back to shop</button>}
    </div>
  );
}
