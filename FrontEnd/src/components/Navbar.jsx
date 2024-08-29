import React from 'react'
import { IoPerson} from "react-icons/io5";
import { useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import logo from '../assests/website_logo.jpg'
import {ImSearch } from 'react-icons/im';
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  const[load,setLoad] = useState(false);

    const handleNav = () => {
        setShowMenu(!showMenu);
      }
      const handle_route = (path) =>{
        setLoad(true);
        setTimeout(()=>{
          setLoad(false);
          navigate(path);
        },1000)
      }
  return (
    <div className={`flex justify-between items-center h-24 max-w-6xl mx-auto px-4 `}>
      {load && <div className={`border fixed shadow rounded-md p-4 max-w-full min-h-full inset-0 z-50 w-full md:w-[100%]  ml-0  mx-auto ${theme === 'dark' ? 'bg-gray-800 border-blue-300 ' : 'bg-white border-gray-200'} sm:ml-0`} >
    <div className="animate-pulse flex space-x-4 mt-16">
  <div className={`rounded-full h-10 w-10`}></div>
  <div className="flex-1 space-y-6 py-10 md:py-1">
    <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
    <div className="space-y-5 md:space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded col-span-2`}></div>
        <div className={`h-2 w-[70%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded col-span-1`}></div>
      </div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className="grid grid-cols-3 gap-4">
      <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2  ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      </div>
      
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className="grid grid-cols-3 gap-4">
      <div className={`h-2  ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      
      </div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className="grid grid-cols-3 gap-4">
      <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2  ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      </div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className="grid grid-cols-3 gap-4">
      <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2  ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      </div>
    </div>
    
  </div>
</div>
</div>
}
    {/* Left side - Demo text */}
    <img
  src={logo}
  alt="logo"
  className="w-32 h-32 mt-5 object-cover object-center"
/>


    {/* Middle - Home link */}
    <ul className='flex-grow flex justify-start md:ml-16'>
      <li className='p-4  w-20 h-10 justify-center items-center pt-2 text-gray-500  duration-200 cursor-pointer font-semibold hover:text-black' onClick={()=>handle_route('/')}>Home</li>
      <li className='p-4  w-20 h-10 justify-center items-center pt-2 text-gray-500  duration-200 cursor-pointer font-semibold hover:text-black'>Profile</li>
      <li className='md:block lg:block p-4  w-20 h-10 justify-center items-center pt-2 text-gray-500  duration-200 cursor-pointer font-semibold hover:text-black sm:block hidden'>Contact</li>
      <li className='px-10  w-20 h-10 md:block lg:block hidden'>
      <div className='flex flex-row'>
            <input
              type="search"
              placeholder="Search"
              className={`p-2 border rounded-md shadow-md focus:outline-none focus:ring-1  `} 
              // onChange={(e) => onSearch(e.target.value)}
            />
            <div className={`flex mt-4 `}>
              <ImSearch className='right-6 relative' />
            </div>
          </div>
      </li>
    </ul>

    {/* Right side - Sign Up and Login buttons */}
    <ul className='hidden md:flex items-center gap-[2vw]'>
  <li className='flex items-center p-4 mx-2 w-30 h-10 justify-center text-amber-400 rounded-xl hover:bg-white shadow-2xl hover:shadow duration-200 cursor-pointer hover:text-black border border-solid border-amber-300'>
    <IoPerson className='mr-2' />Sign Up
  </li>
  <li className='p-4 mx-2 bg-amber-300 w-24 h-10 justify-center items-center pt-2 text-black rounded-xl hover:bg-amber-400 shadow-2xl hover:shadow duration-200 cursor-pointer'>
    Login
  </li>
</ul>


    {/* Mobile Menu Icon */}
    <div onClick={handleNav} className='block md:hidden'>
      {showMenu ? <IoCloseCircle size={30} /> : <CiMenuFries size={30} />}
    </div>

    {/* Mobile Menu */}
    {showMenu ? (
      <div className='fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-zinc-900 ease-in-out duration-700 md:hidden z-50'>
        <h1 className='w-full text-3xl text-white p-4'>Demo</h1>
        <ul className='pt-2 uppercase'>
          <li className='p-4 border-b border-zinc-100 text-amber-400'>Home</li>
          <li className='p-4 border-b border-zinc-100 text-amber-400'>Sign Up</li>
          <li className='p-4 border-b border-zinc-100 text-amber-400'>Login</li>
          <li>  <div className='flex flex-row'>
            <input
              type="search"
              placeholder="Search"
              className={`p-2 border rounded-md shadow-md focus:outline-none focus:ring-1  `} 
              // onChange={(e) => onSearch(e.target.value)}
            />
            <div className={`flex mt-4 `}>
              <ImSearch className='right-6 relative' />
            </div>
          </div></li>
        </ul>
      </div>
    ) : null}
  </div>

  )
}

export default Navbar
