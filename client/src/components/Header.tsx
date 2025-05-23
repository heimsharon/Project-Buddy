import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export default function Header({ showAuthButtons = true }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>DIY Tracker</h1>
        </Link>
        
        <nav className="nav-links">
          {user ? (
            <>
              <Link to="/projects">My Projects</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            showAuthButtons && (
              <>
                <Link to="/login" className="btn-login">
                  Login
                </Link>
                <Link to="/signup" className="btn-signup">
                  Sign Up
                </Link>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
}