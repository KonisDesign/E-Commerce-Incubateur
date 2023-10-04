import React, { useEffect, useState } from 'react';
import './Checkout.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useCart } from '../../context/CartContext';

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Required*'),
    lastname: Yup.string().required('Required*'),
    address: Yup.string().required('Required*'),
    zip: Yup.string().required('Required*'),
    city: Yup.string().required('Required*'),
    country: Yup.string().required('Required*'),
});

export default function Checkout() {
    const navigate = useNavigate();

    const [user, setUser] = useState()
    const [payment, setPayment] = useState(null)

    const { updateCart } = useCart();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;

            try {
                axios.get(`http://localhost:3000/profile/${userId}`)
                    .then((response) => {
                        setUser(response.data);
                    })
            } catch (error) {
                console.error('can\'t get user', error);
            }
        } else {
            navigate('/')
        }
    }, [])


    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const cartData = JSON.parse(localStorage.getItem('cart')) || [];

            values.orders = [...values.orders, ...cartData];

            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;

            await axios.post(`http://localhost:3000/order/${userId}`, values);


            updateCart('');
            localStorage.removeItem('cart');

            localStorage.setItem('orderNumber', (Math.floor(Math.random() * 90000) + 10000).toString())

            navigate('/confirm');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        } finally {
            setSubmitting(false);
        }
    };

    return user ? (
        <div className='checkout-page'>
            <h1>Checkout</h1>
            <Formik
                initialValues={{
                    firstname: user.firstname || '',
                    lastname: user.lastname || '',
                    address: user.address || '',
                    zip: user.zip || '',
                    city: user.city || '',
                    country: user.country || '',
                    orders: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form className='form-container'>
                        <div className="columns-2">
                            <div className='input-container'>
                                <Field
                                    type="text"
                                    name="firstname"
                                    className={`input ${values.firstname && 'input-filled'}`}
                                />
                                <label htmlFor="firstname" className={`input-label ${values.firstname && 'label-up'}`}>
                                    Firstname
                                </label>
                                <ErrorMessage name="firstname" component="div" className="error" />
                            </div>
                            <div className='input-container'>
                                <Field
                                    type="text"
                                    name="lastname"
                                    className={`input ${values.lastname && 'input-filled'}`}
                                />
                                <label htmlFor="lastname" className={`input-label ${values.lastname && 'label-up'}`}>
                                    Lastname
                                </label>
                                <ErrorMessage name="lastname" component="div" className="error" />
                            </div>
                        </div>
                        <div className='input-container'>
                            <Field
                                type="text"
                                name="address"
                                className={`input ${values.address && 'input-filled'}`}
                            />
                            <label htmlFor="address" className={`input-label ${values.address && 'label-up'}`}>
                                Address
                            </label>
                            <ErrorMessage name="address" component="div" className="error" />
                        </div>
                        <div className='input-container'>
                            <Field
                                type="text"
                                name="zip"
                                className={`input ${values.zip && 'input-filled'}`}
                            />
                            <label htmlFor="zip" className={`input-label ${values.zip && 'label-up'}`}>
                                Zip code
                            </label>
                            <ErrorMessage name="zip" component="div" className="error" />
                        </div>
                        <div className='input-container'>
                            <Field
                                type="text"
                                name="city"
                                className={`input ${values.city && 'input-filled'}`}
                            />
                            <label htmlFor="city" className={`input-label ${values.city && 'label-up'}`}>
                                City
                            </label>
                            <ErrorMessage name="city" component="div" className="error" />
                        </div>
                        <div className='input-container'>
                            <Field as="select" name="country" className="input">
                                <option value="" disabled>Select a country</option>
                                <option value="France">France</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                            </Field>
                            <ErrorMessage name="country" component="div" className="error" />
                        </div>
                        <div className="payment-container">
                            <div className='pay-button' style={{ borderWidth: payment === 'applepay' ? '3px' : '1px' }} onClick={() => setPayment('applepay')}><img src='/assets/apple_pay.png' alt='apple_pay' /></div>
                            <div className='pay-button' style={{ borderWidth: payment === 'paypal' ? '3px' : '1px' }} onClick={() => setPayment('paypal')}><img src='/assets/paypal.png' alt='paypal' /></div>
                        </div>
                        <button type="submit" className='primary-button' disabled={isSubmitting || payment === null} style={{ cursor: isSubmitting || payment === null ? 'not-allowed' : 'pointer' }}>
                            Order
                        </button>
                    </Form>
                )}
            </Formik>
            <button className='secondary-button' onClick={() => navigate('/cart')}><BsArrowLeft />Cart</button>
        </div>
    )
        : null
}
