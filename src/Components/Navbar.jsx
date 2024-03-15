import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { user } = React.useContext(AuthContext);
  const { logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex navbar bg-white shadow-md font-main fixed w-screen top-0 items-center justify-between md:justify-around  h-20 z-20 px-4 py-4">
      <div className="flex justify-end flex-col">
        <NavLink to='/' className=''>
          <span className="font-bold flex items-center gap-1 text-lg md:text-xl lg:text-2xl">
            <img className='w-auto h-6' src='/logo.webp' alt="Raudra Technologies Logo"/>
            <span className="logo-text leading-tight">Raudra Technologies</span>
          </span>
        </NavLink>
      </div>
      <div className="md:hidden">
        <button onClick={handleToggleMenu} className="block text-gray-800 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>
      {/* Menu items for sm and md screens */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full py-8  rounded-b-lg left-0 w-full bg-white shadow-lg transition-transform duration-300 transform`}>
        <ul className="flex flex-col items-center justify-center py-2 space-y-2">
          {!user && (
            <li>
            <NavLink to='/' className="font-semibold lg:text-xl hover:underline" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          </li>
          )}
         
          
          {user && (
            <ul className='space-y-2'>
              <li>
              <NavLink to='/admin/dashboard' className="font-semibold lg:text-xl hover:underline" >Dashboard</NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className='bg-rose-500 px-4 py-2 text-white rounded' >Logout</button>
            </li>
            
            </ul>
          )}
        </ul>
      </div>
      {/* Menu items for lg screens and above */}
      <ul className={`md:flex md:items-center md:space-x-8 hidden ${isMenuOpen ? 'block' : ''}`}>
        {!user && (
          <li>
          <NavLink to='/' className="font-semibold lg:text-xl hover:underline" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        </li>
        )}
        {user && (
          <ul className='flex items-center gap-6'>
          
        <li>
              <NavLink to='/admin/dashboard' className='font-semibold lg:text-xl hover:underline'>Dashboard</NavLink>
            </li>
        <li>
            <button onClick={handleLogout} className='bg-rose-500 px-4 py-2 text-white rounded' >Logout</button>
          </li>
        </ul>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
