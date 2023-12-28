import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from '../Components'
import axios from 'axios'
import { url } from '../App'

const Checkout = () => {
    const [cartData, setCartData] = useState({})
    const [users, setUsers] = useState([])
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        address: '',
        paymentMethod: '',
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        let data = JSON.parse(window.localStorage.getItem('cartData'))
        setCartData(data)
        console.log(data);
        axios.get(`${url}/users`)
            .then(res => setUsers(res.data))
            .catch(err => console.error(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        let userId = users.find(u => u.isLoggedin)?.id
        axios.post(`${url}/checkout`, { ...customerData, ...cartData, userId })
            .then(() => {
                cartData.products.forEach(item => {
                    debugger
                    axios.delete(`${url}/cart/${item.id}`)
                        .then(resp => console.log(resp))
                        .catch(error => console.error(error))
                })
                window.localStorage.removeItem('cartData')
                window.location.href = '/'
            }).catch(err => console.error(err))
    }


    return (
        <div>

            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
            </header>


            <div className='px-5 sm:px-20 py-8 sm:py-14 my-8 sm:my-14 space-y-5 sm:space-y-8'>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Checkout</h2>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
                    <form className='border px-4 py-5 space-y-3 sm:space-y-5 h-fit' onSubmit={submit}>
                        <div className='grid sm:grid-cols-2 gap-3 sm:gap-5'>
                            <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                <label htmlFor="name" className='font-semibold'>Name</label>
                                <input type="text" id='name' placeholder='John Doe' className='border px-3 py-1' onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} required />
                            </div>
                            <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                <label htmlFor="email" className='font-semibold'>Email</label>
                                <input type="email" id='email' placeholder='johndoe@hotmail.com' className='border px-3 py-1' onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })} required />
                            </div>
                            <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                <label htmlFor="phone" className='font-semibold'>Phone number</label>
                                <input type="number" id='phone' placeholder='03xxxxxxxxx' className='border px-3 py-1' onChange={(e) => setCustomerData({ ...customerData, phoneNumber: e.target.value })} required />
                            </div>
                            <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                <label htmlFor="country" className='font-semibold'>Country</label>
                                <select id="country" className='border px-3 py-1' onChange={(e) => setCustomerData({ ...customerData, country: e.target.value })} required>
                                    <option>--Select Country--</option>
                                    <option>Pakistan</option>
                                    <option>USA</option>
                                    <option>UK</option>
                                    <option>China</option>
                                    <option>Turkey</option>
                                    <option>India</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                <label htmlFor="city" className='font-semibold'>City</label>
                                <input type="text" id='city' placeholder='Karachi' className='border px-3 py-1' onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })} required />
                            </div>
                            <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                <label htmlFor="address" className='font-semibold'>Address</label>
                                <input type="text" id='address' placeholder='House # 1, street abc, xyz road' className='border px-3 py-1' onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })} required />
                            </div>
                            <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                <label htmlFor="payMethod" className='font-semibold'>Payment method</label>
                                <select id="payMethod" className='border px-3 py-1' onChange={(e) => setCustomerData({ ...customerData, paymentMethod: e.target.value })} required>
                                    <option>--Select Payment method--</option>
                                    <option>JazzCash</option>
                                    <option>Easypaisa</option>
                                    <option>Bank transfer</option>
                                    <option>Cash on delivery</option>
                                </select>
                            </div>
                        </div>
                        <button className='block px-4 py-3 bg-[--theme-secondary] font-bold hover:bg-[--theme-secondary-hover] transition-colors text-white w-full'>Place order</button>
                    </form>

                    <div className='border px-4 py-5 space-y-3 sm:space-y-5 h-fit'>
                        <h3 className='text-2xl font-bold text-center border-b border-black pb-3'>Order Summary</h3>
                        <p className='font-semibold'>3 Items in cart <a href="" className='float-right text-blue-500 font-bold hover:text-blue-600'>Details</a></p>
                        <hr className='border' />
                        <div className='grid grid-cols-3 items-center mt-2'>
                            <h5 className='text-xl font-semibold col-span-2'>Total Amount :</h5>
                            <span>Rs. {cartData?.total}</span>
                        </div>
                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Discount % :</h5>
                            <span>0%</span>
                        </div>
                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Discount Price :</h5>
                            <span>Rs. 0</span>
                        </div>
                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Delivery charges :</h5>
                            <span>Rs.100</span>
                        </div>
                        <div className='grid grid-cols-3 items-center border-t-2 mt-2 pt-2'>
                            <h5 className='text-xl font-semibold col-span-2'>Total Price :</h5>
                            <span>Rs. {cartData?.total - 100}</span>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Checkout