import React from 'react';
import './Checkout.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Required*'),
    lastname: Yup.string().required('Required*'),
    address: Yup.string().required('Required*'),
    city: Yup.string().required('Required*'),
    country: Yup.string().required('Required*'),
});

export default function Checkout() {
    const navigate = useNavigate();


    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    
            values.orders = [...values.orders, ...cartData];
    
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
    
            await axios.post(`http://localhost:3000/order/${userId}`, values);
    
            localStorage.removeItem('cart');
    
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='checkout-page'>
            <h1>Checkout</h1>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    address: '',
                    city: '',
                    country: '',
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
                                <option value="">Select a country</option>
                                <option value="France">France</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                            </Field>
                            <ErrorMessage name="country" component="div" className="error" />
                        </div>
                        <button type="submit" className='primary-button' disabled={isSubmitting}>
                            Order
                        </button>
                    </Form>
                )}
            </Formik>
            <button className='secondary-button' onClick={() => navigate('/cart')}><BsArrowLeft />Cart</button>
        </div>
    )
}
