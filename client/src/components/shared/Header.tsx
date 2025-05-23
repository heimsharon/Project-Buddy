import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/src/assets/image.png" alt="Logo" className="h-8 w-auto" />
        <nav className="flex space-x-6 text-gray-700 text-sm font-medium">
          <a href="#" className="hover:text-blue-600">My Projects</a>
          <a href="#" className="hover:text-blue-600">Estimator</a>
          <a href="#" className="hover:text-blue-600">Budget</a>
          <a href="#" className="hover:text-blue-600">Material List</a>
          <a href="#" className="hover:text-blue-600">Help Center</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;