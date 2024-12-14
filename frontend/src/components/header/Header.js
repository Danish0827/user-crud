import React, { useState } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-3xl font-extrabold">
          <a href="/"><img src='https://storecdn.goqii.com/media/goqiiweb/assets/images/site-logo.png'/></a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="hover:bg-lime-400 px-4 py-2 rounded-md transition-all duration-200">Add User</a>
          <a href="/view-user" className="hover:bg-blue-700 px-4 py-2 rounded-md transition-all duration-200">View User</a>
          <a href="/contact-us" className="hover:bg-red-500 px-4 py-2 rounded-md transition-all duration-200">Contact Us</a>
        </nav>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? (
              <IoClose className="text-3xl" />
            ) : (
              <FaHamburger className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown menu for mobile */}
      <div className={`md:hidden flex flex-col space-y-4 mt-4 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <a href="/" className="text-white hover:bg-lime-400 px-4 py-2 rounded-md transition-all duration-200">Add User</a>
        <a href="/view-user" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-all duration-200">View User</a>
        <a href="/contact-us" className="text-white hover:bg-red-500 px-4 py-2 rounded-md transition-all duration-200">Contact Us</a>
      </div>
    </header>
  );
};

export default Header;
