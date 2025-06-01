import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import React from 'react';
import '../assets/styles/login.css';
import logo from '../assets/project-buddy-with-tagline.png';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="login-background">
            <div className="login">
                <h4 className="card-header">Project Buddy Login</h4>
                <img
                    src={logo}
                    alt="Project Buddy Logo"
                    className="login-logo"
                />
                <div className="form-input">
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="Your password"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button
                                className="btn btn-block btn-primary"
                                type="submit"
                            >
                                Submit
                            </button>
                            <Link
                                className="btn btn-block btn-secondary"
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                        </form>
                    )}

                    {error && (
                        <div className="error-message">{error.message}</div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Login;
