import React from 'react'
import './ShoeCard.scss'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { BsBagPlus } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export default function ShoeCard(props) {

  const { id, name, nameJoint, price } = props

  const navigate = useNavigate()

  return (
    <div className='shoe-card' onClick={() => navigate(`/${id}`)}>
      <img className='shoe-image' src={`/shoes/${nameJoint}.webp`} alt={nameJoint} />
      <div className='infos-card'>
        <div className="action-container">
          <button className='action-button' onClick={() => navigate(`/${id}`)}><HiMiniMagnifyingGlass /></button>
          <button className='action-button' onClick={() => navigate(`/${id}`)}><BsBagPlus /></button>
        </div>
        <div className="infos-container">
          <p className='name'>{name}</p>
          <p className='price'>{price}€</p>
        </div>
      </div>
    </div>
  )
}
