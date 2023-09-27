import React, { useEffect, useState } from 'react';
import './Cart.scss';
import CartItem from '../../components/cart-item/CartItem';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [products, setProducts] = useState([]);

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

  return (
    <div className='cart-page'>
      {cart.length > 0 ? (
        products.map((product, index) => (
          <CartItem key={index} name={product.name} nameJoint={product.name_joint} quantity={cart[index].quantity} price={product.price}/>
        ))
      ) : (
        <h1>Nothing here !</h1>
      )}
    </div>
  );
}
