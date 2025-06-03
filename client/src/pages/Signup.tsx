import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../assets/styles/signup.css';

const Signup: React.FC = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [createUser, { error, data, loading }] = useMutation(CREATE_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(`Changing: ${name} = ${value}`); // For debugging
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log('Submitting form state:', formState); // For debugging

        try {
            const { data } = await createUser({
                variables: { ...formState },
            });

            if (data && data.createUser && data.createUser.token) {
                Auth.login(data.createUser.token);
            } else {
                console.error('No token returned from createUser mutation.');
            }
        } catch (err) {
            console.error('Signup error:', err);
        }
    };

    return (
        <main className="signup-background">
            <div className="signup">
                <h4 className="card-header">Sign Up</h4>
                <div className="form-input">
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleFormSubmit} autoComplete="off">
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                className="form-input"
                                placeholder="Your username"
                                name="username"
                                type="text"
                                value={formState.username}
                                onChange={handleChange}
                                autoFocus
                                required
                            />

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
                                {loading ? 'Signing up...' : 'Submit'}
                            </button>

                            <Link
                                className="btn btn-block btn-secondary"
                                to="/login"
                            >
                                Sign In
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

export default Signup;
