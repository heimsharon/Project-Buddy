import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import React from 'react';
import '../assets/styles/login.css';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data, loading }] = useMutation(LOGIN_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState },
            });
            Auth.login(data.login.token);
        } catch (e) {
            // error handled below
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
                <div className="form-input">
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleFormSubmit} autoComplete="on">
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                className="form-input"
                                placeholder="Your password"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                className="btn btn-block btn-primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Submit'}
                            </button>
                            <Link
                                className="btn btn-block btn-secondary"
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                            <Link
                                className="forgot-password-link"
                                to="/forgot-password"
                            >
                                Forgot password?
                            </Link>
                        </form>
                    )}
                    {error && (
                        <div className="error-message" aria-live="polite">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Login;
