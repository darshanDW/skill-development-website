import React, { useState } from 'react';
import logo from '../assets/logo.png';
import LoginButton from './LoginButton';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger and close menu
import { jwtDecode } from 'jwt-decode';
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to track mobile menu
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
  }
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className='bg-white shadow-md py-4 px-6 md:px-16'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div>
          <img className="w-32 cursor-pointer" src={logo} alt="Logo" />
        </div>

        {/* Hamburger Icon for mobile */}
        <div className='md:hidden'>
          <button onClick={toggleMobileMenu} className='text-gray-700'>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links - Hidden on small screens, visible on medium+ */}
        <div className='hidden md:flex gap-8'>
          <ul className='flex gap-8 pt-2 text-gray-700'>
            <li className='cursor-pointer hover:text-black'><a href="/">Home</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Skill">Skill</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Games">Games</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Profile">Profile</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Contact">Contact Us</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Feedback">Feedback</a></li>
          </ul>
        </div>

        {/* Login Button */}
        <div className='hidden md:block'>
          <LoginButton />
        </div>
      </div>

      {/* Mobile Menu (Visible when open) */}
      {isMobileMenuOpen && (
        <div className='md:hidden mt-4'>
          <ul className='flex flex-col gap-4 text-gray-700'>
            <li className='cursor-pointer hover:text-black'><a href="/">Home</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Profile">Profile</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Contact">Contact Us</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Feedback">Feedback</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Games">Games</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Skill">Skill</a></li>
            <li>
              {(() => {
                if (token) {


                  if (decodedToken.exp < currentTime) {
                    return (
                      <a href="/login">
                        <button className='w-full py-2 bg-pink-500 text-white rounded-full'>
                          Login
                        </button>
                      </a>
                    );
                  }
                  else {
                    return (
                      <a>
                        <button className='w-full py-2 bg-pink-500 text-white rounded-full'>
                          Logout
                        </button>
                      </a>
                    );
                  }
                }
              })()}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
