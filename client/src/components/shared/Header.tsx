import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
       
        <nav className="flex space-x-6 text-gray-700 text-sm font-medium"> 
            <img src="/src/assets/image.png" alt="Logo" style={{ height: '100px', width: 'auto' }} />
        <Link to = "/login"><button>Login</button></Link>
        <Link to = "/signup"><button>Sign Up</button></Link>
          <a href="/" className="text-gray-700 hover:text-blue-600">Home Page</a>
          <a href="/profiles/:username" className="text-gray-700 hover:text-blue-600">Profile</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">My Projects</a>
          <a href="/calculator" className="text-gray-700 hover:text-blue-600">Calculator</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Budget</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Material List</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;