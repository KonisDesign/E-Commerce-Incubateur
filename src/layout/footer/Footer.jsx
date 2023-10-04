import React from 'react'
import './Footer.scss'

export default function Footer() {
  return (
    <footer>
      <h1>SHOES</h1>
      <p>&copy; All rights reserved.</p>
      <div className="pay-methods">
      <img src='/assets/apple_pay.png' alt='apple_pay' />
      <img src='/assets/paypal.png' alt='paypal' />
      </div>
    </footer>
  )
}
