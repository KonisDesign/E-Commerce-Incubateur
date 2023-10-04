import React, { useEffect, useState } from 'react'
import './CartItem.scss'
import { HiXMark } from 'react-icons/hi2'

export default function CartItem(props) {

  const { id, name, nameJoint, size, quantity, price, deleteBtn } = props

  const handleDelete = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    cart.splice(id, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    window.location.reload();
  }

  const changeQuantity = (e) => {
    const myQuantity = parseInt(e.target.value, 10);

    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[id].quantity = myQuantity;

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  };

  return (
    <div className='cart-item'>
      <img className='item-image' src={`/shoes/${nameJoint}.webp`} alt={nameJoint} />
      <p className='name'><b>{name}</b> size: {size}</p>
      {deleteBtn ?
        <input type="number" className='quantity-input' name='quantity' value={quantity} onChange={changeQuantity} min='1' max='99' />
        :
        <p className='quantity-input'>{quantity}</p>}
      <p className='price'>{price * quantity}€</p>
      {deleteBtn === 0 ? null : <button className='delete-button' onClick={() => handleDelete(id)}><HiXMark style={{ color: 'red' }} /></button>
      }
    </div>
  )
}
