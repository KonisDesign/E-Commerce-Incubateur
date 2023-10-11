import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import CartItem from '../../components/cart-item/CartItem';
import { BsArrowLeft } from 'react-icons/bs';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;

            axios
                .get(`http://localhost:3000/profile/${userId}`)
                .then(async (response) => {
                    setUser(response.data);
                    console.log(response.data)
                    const productDetails = [];

                    for (const order of response.data.orders) {
                        try {
                            const response2 = await axios.get(`http://localhost:3000/${order.id}`);
                            productDetails.push(response2.data);
                        } catch (error) {
                            console.error('Une erreur est survenue lors de la récupération des informations du produit :', error);
                        }
                    }
                    console.log(productDetails)
                    setProducts(productDetails);
                })
                .catch((error) => {
                    console.error('User error', error);
                });
        } else {
            navigate('/');
        }
    }, [navigate]);

    return user && products ? (
        <div className='profile-page'>
            <h1>Hi {user.firstname} !</h1>
            <div className="dashboard">
                <div className="card-container">
                    <h2>Latest purchases</h2>
                    {products.length > 0 ?
                        products.map((item, index) => (
                            <CartItem key={index} id={item.id} shoeId={item._id} name={item.name} nameJoint={item.name_joint} quantity={user.orders[index].quantity} size={user.orders[index].size} price={item.price} deleteBtn={0} />
                        ))
                        :
                        <div className="no-purchases-container">
                            <p>No purchases</p>
                            <button className='secondary-button' onClick={() => navigate('/')}><BsArrowLeft />Back to shop</button>
                        </div>
                    }
                </div>
                {user.address ?
                    <div className="card-container">
                        <h2>Address</h2>
                        <p>{user.firstname} {user.lastname}</p>
                        <p>{user.address}</p>
                        <p>{user.zip} {user.city}, {user.country}</p>
                    </div>
                    : null}
            </div>
        </div>
    ) : null;
}
