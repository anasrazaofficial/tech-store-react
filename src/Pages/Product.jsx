import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Footer } from '../Components'

const Product = () => {
    return (
        <div>

            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
            </header>

            <div className='px-5 sm:px-20 py-8 sm:py-14 my-8 sm:my-14 grid sm:grid-cols-2 gap-12'>
                <div>
                    <img src="\src\Assets\product1.png" alt="" className='w-full h-auto' />
                </div>
                <div className='space-y-5 sm:space-y-8'>
                    <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Product Name</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil totam vel voluptates similique quam dolore commodi doloremque facilis saepe esse voluptatem non dolorum ut aperiam, rem veniam. Iste, sit repellat.</p>
                    <button>
                        <Link to='/cart' className='bg-[--theme-secondary] font-semibold sm:font-bold py-3 px-5 sm:px-8 hover:bg-[--theme-secondary-hover] transition-colors text-white'>Add to cart</Link>
                    </button>
                </div>
            </div>


            <Footer />

        </div>
    )
}

export default Product