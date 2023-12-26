import React, { useState } from 'react'
import { Footer, Navbar } from '../Components'
import { Link } from 'react-router-dom'

const Shop = () => {

    const [added, setAdded] = useState(false)

    return (
        <div>


            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
                <div className='px-5 sm:px-20 py-8 sm:py-14 text-white sm:grid grid-cols-2'>
                    <div className='space-y-8'>
                        <p className='sm:font-semibold sm:text-xl'>Every Computer and laptop</p>
                        <h2 className='text-3xl sm:text-4xl font-bold'>Up to 40% off !</h2>
                        <button>
                            <Link to='/contact' className='bg-[--theme-secondary] font-semibold sm:font-bold py-2 sm:py-3 px-8 sm:px-10 hover:bg-[--theme-secondary-hover] transition-colors text-white'>Contact</Link>
                        </button>
                    </div>
                    <img src="\src\Assets\pc.png" alt="" className='mt-8 sm:mt-0' />
                </div>
            </header>


            <div className='px-5 sm:px-20 py-8 sm:py-14 space-y-5 sm:space-y-8 my-8 sm:my-14'>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Shop</h2>
                <div className='grid sm:grid-cols-3 gap-5 p-5'>
                    <div className='flex flex-col items-center border-2 border-gray-100 rounded-lg py-3'>
                        <img src="\src\Assets\product1.png" alt="" />
                        <div className='flex w-full px-5 gap-x-5'>
                            <Link to='/product/{id}' className='w-full bg-black text-center text-white py-2 hover:bg-[#313131] transition-colors'>More Info</Link>
                            {!added && <button className='w-full bg-black text-center text-white py-2 hover:bg-[#313131] transition-colors' onClick={() => setAdded(true)}>Add to cart</button>}
                            {added && <Link to='/cart' className='w-full bg-black text-center text-white py-2 hover:bg-[#313131] transition-colors'>Go to cart</Link>}
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Shop