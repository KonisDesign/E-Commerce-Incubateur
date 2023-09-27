import React, { useEffect, useState } from 'react'
import './Home.scss'
import ShoeCard from '../../components/shoe-card/ShoeCard'
import axios from 'axios';

export default function Home() {

  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then((response) => {
        setShoes(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Une erreur est survenue lors de la récupération des chaussures :', error);
      });
  }, []); 

  return (
    <div className='home-page'>
        {shoes.map((item, index) => (
          <ShoeCard key={index} id={item._id} name={item.name} nameJoint={item.name_joint} price={item.price}/>
        ))}
    </div>
  )
}
