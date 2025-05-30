import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import React from 'react';
import '../assets/styles/signup.css';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [createUser, { error, data }] = useMutation(CREATE_USER);

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
            const { data } = await createUser({
                variables: { ...formState },
            });
            console.log(data);
            console.log(data.createUser.token);
            Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
            console.log(error);
        }
    };

    return (
        <main className="signup-background">
            <div className="signup">
                    <h4 className="card-header">
                        Sign Up
                    </h4>
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
                                    placeholder="Your username"
                                    name="username"
                                    type="text"
                                    value={formState.username}
                                    onChange={handleChange}
                                />
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
                                    placeholder="Your Password"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>

        </main>
    );
};

export default Signup;
