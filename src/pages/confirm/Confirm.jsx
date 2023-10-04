import React from 'react'
import './Confirm.scss'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export default function Confirm() {

    const navigate = useNavigate()


    const orderNumber = localStorage.getItem('orderNumber');

    const handleHome = () => {
        localStorage.removeItem('orderNumber');
        navigate('/')
    }

    return orderNumber ? (
        <div className='confirm-page'>
            <h1>Thanks for your order !</h1>
            <p>Order number : <b>{orderNumber}</b></p>
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            <button className='primary-button' onClick={() => handleHome()}><BsArrowLeft />Go back to shop</button>
        </div>
    )
    :
    (
        <div className='confirm-page'>
            <h1>Account created !</h1>
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            <button className='primary-button' onClick={() => navigate('/signin')}>Go to login</button>
        </div>
    )
}
