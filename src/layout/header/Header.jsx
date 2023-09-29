import React from 'react'
import './Header.scss'
import { useNavigate } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'

export default function Header() {

  const navigate = useNavigate()

  const isConnected = localStorage.getItem('token') || null

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <header>
      <div className='logo' onClick={()=> navigate('/')}>
        <h1 className='title'>SHOES</h1>
      </div>
      <div className='nav'>
        <button className='nav-button' onClick={() => navigate('/cart')}><BsBag /></button>
        <button className='nav-button' onClick={isConnected ? () => navigate('/profile') : () => navigate('/signin')}><AiOutlineUser /></button>
        {isConnected ? <button className='nav-button' onClick={() => handleDisconnect()}><AiOutlineLogout /></button> : null}
      </div>
    </header>
  )
}
