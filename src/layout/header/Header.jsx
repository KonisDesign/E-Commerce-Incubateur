import React, { useEffect, useRef, useState } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const navigate = useNavigate();
  const isConnected = localStorage.getItem('token') || null;
  const notif = useRef();

  const { cart } = useCart();

  useEffect(() => {
    if (cart.length > 0) {
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      notif.current.textContent = itemCount.toString();
    }
  }, [cart]);

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  

  return (
    <header>
      <div className='logo' onClick={() => navigate('/')}>
        <h1 className='title'>SHOES</h1>
      </div>
      <div className='nav'>
        <button className='nav-button' onClick={() => navigate('/cart')}>
          <BsBag />
        </button>
        {cart.length > 0 ? <span ref={notif}></span> : null}
        <button
          className='nav-button'
          onClick={isConnected ? () => navigate('/profile') : () => navigate('/signin')}
        >
          <AiOutlineUser />
        </button>
        {isConnected ? (
          <button className='nav-button' onClick={() => handleDisconnect()}>
            <AiOutlineLogout />
          </button>
        ) : null}
      </div>
    </header>
  );
}
