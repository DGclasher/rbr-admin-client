import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-950  w-full text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  overflow-x-hidden 
    items-center py-12 px-8  gap-8 font-main">
        <div className='w-full '>
            <div className='flex flex-col gap-8'>
                <span className='flex items-center gap-4'><img className='w-12 ' src="/logo.webp" alt="" /><h1 className='text-2xl font-bold'>Raudra Technologies</h1></span>
                <p className='font-medium '>Scaling Engineering Teams and Delivering Unparalleled Development Services in AI, ML, Data Science, Web and Mobile Applications</p>
            </div>
        </div>
        <div className='w-full flex justify-center flex-col items-start md:items-center  gap-4'>
          <p className='text-2xl font-semibold'>Quick Links</p>
          <ul className='flex flex-col gap-2'>
            <NavLink to='/' className='font-medium text-lg hover:underline'>Home</NavLink>
            <NavLink to='/careers' className='font-medium text-lg hover:underline'>Careers</NavLink>
          </ul>
        </div>
        <div className='flex w-full  flex-col items-start justify-center md:items-center gap-4 '>
            <p className='text-2xl font-semibold '>Contact Us</p>
            <p className='flex gap-4 items-center'><MdEmail className='text-xl'/>support@raudratechnologies.com</p>
        </div>
      </footer>
  )
}

export default Footer