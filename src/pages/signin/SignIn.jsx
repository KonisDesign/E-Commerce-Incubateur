import React from 'react'
import './SignIn.scss'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required*'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required*'),
});

export default function SignIn() {

    const navigate = useNavigate()

    const handleSubmit = (values, { setSubmitting }) => {
        axios
            .post('http://localhost:3000/signin', values)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                if (JSON.parse(localStorage.getItem('cart'))) {
                    navigate('/cart')
                } else {
                    navigate('/')
                }
            })
            .catch((error) => {
                console.error('Error signup', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className='signin-page'>
            <h1>Sign In</h1>
            <Formik
                initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form className='form-container'>
                        <div className='input-container'>
                            <Field
                                type="email"
                                name="email"
                                className={`input ${values.email && 'input-filled'}`}
                            />
                            <label htmlFor="email" className={`input-label ${values.email && 'label-up'}`}>
                                Email
                            </label>
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div className='input-container'>
                            <Field
                                type="password"
                                name="password"
                                className={`input ${values.password && 'input-filled'}`}
                            />
                            <label htmlFor="password" className={`input-label ${values.password && 'label-up'}`}>
                                Password
                            </label>
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>
                        <button type="submit" className='primary-button' disabled={isSubmitting}>
                            Connection
                        </button>
                    </Form>
                )}
            </Formik>
            <button className='terciary-button' onClick={() => navigate('/signup')}>Create an account</button>
        </div>
    )
}
