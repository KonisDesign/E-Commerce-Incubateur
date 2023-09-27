import React from 'react'
import './CartItem.scss'

export default function CartItem(props) {

    const { name, nameJoint, quantity, price } = props

  return (
    <div className='cart-item'>
        <img className='item-image' src={`/shoes/${nameJoint}.webp`} alt={nameJoint} />
        <p className='name'>{name}</p>
        <input type="number" className='quantity-input' name='quantity' value={quantity} min='1' max='99' />
        <p className='price'>{price * quantity}€</p>
    </div>
  )
}
