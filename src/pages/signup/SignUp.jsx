import React from 'react';
import './SignUp.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
    firstname: Yup.string().required('Required*'),
    lastname: Yup.string().required('Required*'),
    email: Yup.string().email('Invalid email address').required('Required*'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required*'),
});

export default function SignUp() {
    const handleSubmit = (values, { setSubmitting }) => {
        axios
            .post('http://localhost:3000/', values)
            .then((response) => {
                console.log('Signup successful', response.data);
            })
            .catch((error) => {
                console.error('Error signup', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className='signup-page'>
            <h1>Sign Up</h1>
            <Formik
                initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
                validationSchema={SignupSchema}
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
                            Sign Up
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
