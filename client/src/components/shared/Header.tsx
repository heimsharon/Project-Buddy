import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/styles/header.css';


const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const hideUserActionsOn = ['/login', '/signup'];
    const isAuthenticated = !!localStorage.getItem('id_token');

    return (
        <header className="header">
            <div
                className="header-logo-group"
                onClick={() => navigate('/')}
                aria-label="Project Buddy Logo with Smarter Planning. Better Building."
                role="img"
            />
            {!hideUserActionsOn.includes(location.pathname) && (
                <div className="user-actions">
                    {!isAuthenticated ? (
                        <button
                            className="login-btn"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            className="logout-btn"
                            onClick={() => {
                                localStorage.removeItem('id_token');
                                navigate('/');
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
