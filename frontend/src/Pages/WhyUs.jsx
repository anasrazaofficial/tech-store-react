import React from 'react'
import { Footer, Navbar } from '../Components'

const WhyUs = () => {
    return (
        <div>
            
            
            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
            </header>


            <div className='px-5 sm:px-20 py-8 sm:py-14 my-8 sm:my-14'>
                <h2 className='text-2xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Why Shop with us</h2>
                <div className='grid sm:grid-cols-3 gap-5 mt-5 sm:mt-8'>
                    <div className='border border-[--theme-secondary] p-5 rounded-xl space-y-3'>
                        <img src="\src\Assets\icons\truck.svg" alt="" className='mx-auto w-1/2' />
                        <h4 className='font-bold text-xl text-center'>Fast Delivery</h4>
                        <p className='font-semibold'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magnam neque aspernatur voluptatum sint vel, quod et provident libero sed ab voluptas adipisci tempora cum consectetur, similique, animi praesentium maxime!
                        </p>
                    </div>
                    <div className='border border-[--theme-secondary] p-5 rounded-xl space-y-3'>
                        <img src="\src\Assets\icons\free.svg" alt="" className='mx-auto w-1/2' />
                        <h4 className='font-bold text-xl text-center'>Free Shipping</h4>
                        <p className='font-semibold'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magnam neque aspernatur voluptatum sint vel, quod et provident libero sed ab voluptas adipisci tempora cum consectetur, similique, animi praesentium maxime!
                        </p>
                    </div>
                    <div className='border border-[--theme-secondary] p-5 rounded-xl space-y-3'>
                        <img src="\src\Assets\icons\quality.svg" alt="" className='mx-auto w-1/2' />
                        <h4 className='font-bold text-xl text-center'>Best Quality</h4>
                        <p className='font-semibold'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magnam neque aspernatur voluptatum sint vel, quod et provident libero sed ab voluptas adipisci tempora cum consectetur, similique, animi praesentium maxime!
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default WhyUs