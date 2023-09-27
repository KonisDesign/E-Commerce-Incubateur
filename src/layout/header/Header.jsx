import React from 'react'
import './Header.scss'
import { useNavigate } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'

export default function Header() {

  const navigate = useNavigate()

  return (
    <header>
      <div className='logo' onClick={()=> navigate('/')}>
        <h1 className='title'>SHOES</h1>
      </div>
      <div className='nav'>
        <button className='nav-button' onClick={() => navigate('/cart')}><BsBag /></button>
        <button className='nav-button'><AiOutlineUser /></button>
      </div>
    </header>
  )
}
