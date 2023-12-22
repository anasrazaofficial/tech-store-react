import React, { useState } from 'react'
import { Footer, Navbar } from '../Components'
import { Link } from 'react-router-dom'

const Cart = () => {
    let [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    const decreaseQuantity = () => {
        if (quantity !== 1) setQuantity(quantity - 1)
    }

    return (
        <div>

            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
            </header>

            <div className='px-5 sm:px-20 py-8 sm:py-14 my-8 sm:my-14 space-y-5 sm:space-y-8'>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Cart</h2>
                <div className='grid sm:grid-cols-4 gap-5'>
                    <table className='w-full border text-[12px] sm:text-base sm:col-span-3 h-fit'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='py-3 border-x-2'>Product Id</th>
                                <th className='py-3 border-x-2'>Product Name</th>
                                <th className='py-3 border-x-2'>Quantity</th>
                                <th className='py-3 border-x-2'>Price</th>
                                <th className='py-3 border-x-2'>Total Amount</th>
                                <th className='py-3 border-x-2'></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>
                                    <div>
                                        <span className='px-1 sm:px-2 bg-[--theme-secondary] text-white sm:pb-1 cursor-pointer hover:bg-[--theme-secondary-hover]' onClick={decreaseQuantity}>-</span>
                                        <span className='px-2 sm:px-4' key={quantity}>{quantity}</span>
                                        <span className='px-1 sm:px-2 bg-[--theme-secondary] text-white sm:pb-1 cursor-pointer hover:bg-[--theme-secondary-hover]' onClick={increaseQuantity}>+</span>
                                    </div>
                                </td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 px-2'>
                                    <img src="\src\Assets\icons\cross.svg" alt="" className='mx-auto w-4 sm:w-auto' />
                                </td>
                            </tr>
                            <tr>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>
                                    <div>
                                        <span className='px-1 sm:px-2 bg-[--theme-secondary] text-white sm:pb-1 cursor-pointer hover:bg-[--theme-secondary-hover]'>-</span>
                                        <span className='px-2 sm:px-4'>1</span>
                                        <span className='px-1 sm:px-2 bg-[--theme-secondary] text-white sm:pb-1 cursor-pointer hover:bg-[--theme-secondary-hover]'>+</span>
                                    </div>
                                </td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 px-2'>
                                    <img src="\src\Assets\icons\cross.svg" alt="" className='mx-auto w-4 sm:w-auto' />
                                </td>
                            </tr>
                            <tr>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>
                                    <div>
                                        <span className='px-1 sm:px-2 bg-[--theme-secondary] text-white sm:pb-1 cursor-pointer hover:bg-[--theme-secondary-hover]'>-</span>
                                        <span className='px-2 sm:px-4'>1</span>
                                        <span className='px-1 sm:px-2 bg-[--theme-secondary] text-white sm:pb-1 cursor-pointer hover:bg-[--theme-secondary-hover]'>+</span>
                                    </div>
                                </td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 text-center border-x-2'>1</td>
                                <td className='py-3 px-2'>
                                    <img src="\src\Assets\icons\cross.svg" alt="" className='mx-auto w-4 sm:w-auto' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='border rounded-xl p-3 sm:p-5 h-fit'>
                        <div className='space-y-3 text-center border-b-4 pb-2'>
                            <h4 className='text-2xl font-semibold sm:font-bold'>Enter discount coupon</h4>
                            <input type="text" className='border-2 w-full rounded-lg px-3 py-1' placeholder='Enter Coupon code here' />
                            <button type='button' className='px-4 py-3 bg-[--theme-secondary] font-bold rounded-lg w-1/2 hover:bg-[--theme-secondary-hover] transition-colors text-white'>Submit</button>
                        </div>
                        <div className='grid grid-cols-2 items-center mt-2'>
                            <h5 className='text-xl font-semibold'>Total Amount :</h5>
                            <span>Rs.500</span>
                        </div>
                        <div className='grid grid-cols-2 items-center mt-1'>
                            <h5 className='text-xl font-semibold'>Discount % :</h5>
                            <span>5%</span>
                        </div>
                        <div className='grid grid-cols-2 items-center mt-1'>
                            <h5 className='text-xl font-semibold'>Discount Price :</h5>
                            <span>Rs.25</span>
                        </div>
                        <div className='grid grid-cols-2 items-center border-t-2 mt-2 pt-2'>
                            <h5 className='text-xl font-semibold'>Total Price :</h5>
                            <span>Rs.475</span>
                        </div>
                        <Link to='/checkout' className='block px-4 py-3 bg-[--theme-secondary] font-bold hover:bg-[--theme-secondary-hover] transition-colors text-white mt-8 text-center'>Proceed to Checkout</Link>
                    </div>
                </div>
            </div>


            <Footer />

        </div>
    )
}

export default Cart