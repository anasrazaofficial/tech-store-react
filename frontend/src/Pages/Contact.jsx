import React, { useEffect } from 'react'
import { Navbar, Footer } from '../Components'

const Contact = () => {
    useEffect(() => window.scrollTo(0, 0), [])
    return (
        <div>

            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
            </header>


            <div className='px-5 sm:px-20 pt-16 pb-8 sm:pb-14 space-y-5 sm:space-y-8 '>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Contact us</h2>
                <form className='border-4 border-[--theme-secondary] p-3 sm:p-5 space-y-2 sm:space-y-4 sm:w-3/5 sm:mx-auto'>
                    <input type="text" placeholder='Name' className='px-3 py-4 w-full border-b-2 border-[--theme-secondary] bg-transparent focus:border-2 focus-visible:outline-0' />
                    <input type="text" placeholder='Email' className='px-3 py-4 w-full border-b-2 border-[--theme-secondary] bg-transparent focus:border-2 focus-visible:outline-0' />
                    <input type="text" placeholder='Phone number' className='px-3 py-4 w-full border-b-2 border-[--theme-secondary] bg-transparent focus:border-2 focus-visible:outline-0' />
                    <textarea rows="10" placeholder='Comments' className='px-3 py-4 w-full border-b-2 border-[--theme-secondary] bg-transparent focus:border-2 focus-visible:outline-0'></textarea>
                    <div className="text-center">
                        <button type='submit' className='bg-[--theme-secondary] text-white font-semibold sm:font-bold py-3 w-2/5 hover:bg-[--theme-secondary-hover] transition-colors'>Send</button>
                    </div>
                </form>
            </div>


            <Footer />
        </div>
    )
}

export default Contact