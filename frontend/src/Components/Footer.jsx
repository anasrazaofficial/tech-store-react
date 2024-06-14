import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='px-5 sm:px-20 pt-16 sm:pt-32 pb-8 sm:pb-14 text-white space-y-5 sm:space-y-8 bg-footer'>
            <div className='sm:grid grid-cols-4 space-y-5 sm:space-y-0 gap-x-8'>
                <div className='space-y-5 sm:space-y-8'>
                    <Link to='/' className='inline-block'><img src="\src\Assets\logo.png" alt="" /></Link>
                    <div className='flex gap-x-3 sm:gap-x-0 sm:justify-between'>
                        <a href="https://github.com/anasrazaofficial"><img src="\src\Assets\icons\github.svg" alt="" /></a>
                        <a href="https://instagram.com/syedanas2004/"><img src="\src\Assets\icons\instagram.svg" alt="" /></a>
                        <a href="https://linkedin.com/in/syedanasraza"><img src="\src\Assets\icons\linkedin.svg" alt="" /></a>
                        <a href="https://www.facebook.com/profile.php?id=100026970972687&mibextid=hIlR13"><img src="\src\Assets\icons\facebook.svg" alt="" /></a>
                        <img src="\src\Assets\icons" alt="" />
                    </div>
                </div>
                <div>
                    <h4 className='font-bold text-2xl'>About us</h4>
                    <p className='font-semibold sm:text-xl text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, recusandae. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                </div>
                <div>
                    <h4 className='font-bold text-2xl'>Contact us</h4>
                    <p className='font-semibold sm:text-xl text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, recusandae. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                </div>
                <div className='space-y-3'>
                    <h4 className='font-bold text-2xl'>Newsletter</h4>
                    <input type="text" className='px-3 py-2 w-full focus:border-2 focus-visible:outline-black focus-visible:border-none text-black rounded-xl font-bold' placeholder='Enter you email' />
                    <button className='px-4 py-3 bg-[--theme-secondary] font-bold rounded-2xl hover:bg-[--theme-secondary-hover] transition-colors'>SUBSCRIBE</button>
                </div>
            </div>
            <div>
                <hr />
                <p className='sm:text-xl sm:text-center mt-3 sm:mt-5'>&copy; 2019 All Rights Reserved. Design by <a href="https://github.com/anasrazaofficial">Syed Anas Raza</a></p>
            </div>
        </footer>
    )
}

export default Footer