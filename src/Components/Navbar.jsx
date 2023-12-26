import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = useState(false)

    useEffect(() => {
        const updateNavState = () => {
            if (window.innerWidth < 640) {
                setNav(false);
            } else {
                setNav(true);
            }
        };
        updateNavState();
        window.addEventListener('resize', updateNavState);
        return () => {
            window.removeEventListener('resize', updateNavState);
        };
    }, []);

    const logout = () => {
        window.localStorage.clear()
        axios.get('http://localhost:3000/users')
            .then((res) => {
                res.data.map(el => {
                    axios.put(`http://localhost:3000/users/${el.id}`, { ...el, isLoggedin: false })
                })
                window.location.href = '/'
            }).catch(err => console.error(err))
    }

    return (
        <nav className='flex py-5 items-start sm:items-center justify-between'>

            <Link to='/'><img src="\src\Assets\logo.png" alt="" /></Link>
            <button className='sm:hidden mt-8' onClick={() => setNav(!nav)}>
                <img src="\src\Assets\menu-icon.png" alt="" />
            </button>

            {nav && <div className='absolute sm:static sm:flex justify-end gap-x-20 items-center bg-[--theme-secondary] sm:bg-transparent top-28 w-full left-0 px-5 py-3 text-white sm:font-bold'>
                <ul className='space-y-3 sm:space-y-0 uppercase sm:flex gap-x-5'>
                    <li><NavLink to='/home' className={({ isActive }) => `cursor-pointer hover:text-[--theme-secondary] transition-colors ${isActive ? 'sm:text-[--theme-secondary] text-[--theme-primary]' : ''}`}>home</NavLink></li>

                    <li><NavLink to='/about' className={({ isActive }) => `cursor-pointer hover:text-[--theme-secondary] transition-colors ${isActive ? 'sm:text-[--theme-secondary] text-[--theme-primary]' : ''}`}>about</NavLink></li>

                    <li><NavLink to='/shop' className={({ isActive }) => `cursor-pointer hover:text-[--theme-secondary] transition-colors ${isActive ? 'sm:text-[--theme-secondary] text-[--theme-primary]' : ''}`}>Shop</NavLink></li>

                    <li><NavLink to='/whyus' className={({ isActive }) => `cursor-pointer hover:text-[--theme-secondary] transition-colors ${isActive ? 'sm:text-[--theme-secondary] text-[--theme-primary]' : ''}`}>Why us</NavLink></li >

                    <li><NavLink to='/contact' className={({ isActive }) => `cursor-pointer hover:text-[--theme-secondary] transition-colors ${isActive ? 'sm:text-[--theme-secondary] text-[--theme-primary]' : ''}`}>Contact</NavLink></li >
                </ul >
                <button className='mt-5 sm:mt-0 bg-[--theme-primary] w-full sm:w-auto py-2 sm:p-0 cursor-pointer hover:text-[--theme-secondary] transition-colors' onClick={logout}>Logout</button>
            </div >}
        </nav >
    )
}

export default Navbar