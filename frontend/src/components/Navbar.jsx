import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger and close menu

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for menu toggle

  return (
    <div className='bg-white shadow-md py-4 px-6 md:px-16'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div>
          <img className="w-32 cursor-pointer" src={logo} alt="Logo" />
        </div>

        {/* Hamburger Icon for mobile */}
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes className='text-2xl' /> : <FaBars className='text-2xl' />}
          </button>
        </div>

        {/* Navigation Links - Hidden on small screens, visible on medium+ */}
        <div className='hidden md:flex gap-8'>
          <ul className='flex gap-8 pt-2 text-gray-700'>
            <li className='cursor-pointer hover:text-black'><a href="/">Home</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Profile">Profile</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Contact">Contact Us</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Feedback">Feedback</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Games">Games</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Skill">Skill</a></li>
          </ul>
        </div>

        {/* Login Button */}
        <div className='hidden md:block'>
          <a href="/login">
            <button className='p-2 px-4 border border-red-500 text-pink-500 rounded-full'>
              Login
            </button>
          </a>
        </div>
      </div>

      {/* Mobile Menu (Visible when open) */}
      {isOpen && (
        <div className='md:hidden mt-4'>
          <ul className='flex flex-col gap-4 text-gray-700'>
            <li className='cursor-pointer hover:text-black'><a href="/">Home</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Profile">Profile</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Contact">Contact Us</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Feedback">Feedback</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Games">Games</a></li>
            <li className='cursor-pointer hover:text-black'><a href="/Skill">Skill</a></li>
            <li>
              <a href="/login">
                <button className='w-full py-2 bg-pink-500 text-white rounded-full'>
                  Login
                </button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
