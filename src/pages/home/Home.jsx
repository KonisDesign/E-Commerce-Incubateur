import React, { useEffect, useState } from 'react';
import './Home.scss';
import ShoeCard from '../../components/shoe-card/ShoeCard';
import axios from 'axios';

export default function Home() {
  const [shoes, setShoes] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then((response) => {
        setShoes(response.data);
      })
      .catch((error) => {
        console.error('Unable to fetch products:', error);
      });
  }, []); 

  const filteredShoes = filter ? shoes.filter(item => item.cat === filter) : shoes;

  return (
    <div className='home-page'>
      <div className="filter-container">
      <select name="filter" className='input-filter' onChange={(e) => setFilter(e.target.value)}>
          <option value="" defaultValue disabled>Filters</option>
          <option value=''>All</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="jordan">Jordan</option>
          <option value="running">Running</option>
          <option value="basketball">Basketball</option>
          <option value="training">Training</option>
        </select>
      </div>
      <div className="shoes-container">
      {filteredShoes ?
      filteredShoes.map((item, index) => (
        <ShoeCard key={index} id={item._id} name={item.name} nameJoint={item.name_joint} price={item.price} />
      ))
    :
    shoes.map((item, index) => (
      <ShoeCard key={index} id={item._id} name={item.name} nameJoint={item.name_joint} price={item.price} />
    ))}
      </div>
    </div>
  );
}
