import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from '../Components'
import axios from 'axios'
import { url } from '../App'

const Checkout = () => {
    const [cartData, setCartData] = useState({})
    const [users, setUsers] = useState([])
    const [subtotal, setSubtotal] = useState(0)
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
        axios.get(`${url}/cart`)
            .then(res => {
                setCartData(res.data)
                setSubtotal(res.data.reduce((total, item) => total += (item.price * item.quantity), 0))
            })
            .catch(err => console.error(err))
        axios.get(`${url}/users`)
            .then(res => setUsers(res.data))
            .catch(err => console.error(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        let userId = users.find(u => u.isLoggedin)?.id
        axios.post(`${url}/checkout`, { ...customerData, ...cartData, subtotal, userId })
            .then(() => {
                cartData.products.forEach(item => {
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
                        <label htmlFor="payMethod" className='font-semibold'>Payment method</label>
                        <div className='grid grid-cols-2'>
                            <div className='border rounded-md'>
                                <span>JazzCash</span>
                                <img src="src\Assets\payment-logo\jazzcash.png" alt="" />
                            </div>
                            <div className='border rounded-md'>
                                <span>Easypaisa</span>
                                <img src="src\Assets\payment-logo\easypaisa.png" alt="" />
                            </div>
                            <div className='border rounded-md'>
                                <span>Bank transfer</span>
                                <img src="src\Assets\payment-logo\bank-transfer.png" alt="" />
                            </div>
                            <div className='border rounded-md'>
                                <span>Cash on delivery</span>
                                <img src="src\Assets\payment-logo\cash-delivery.png" alt="" />
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
                            <span>Rs. {subtotal}</span>
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
                            <span>Rs. {subtotal + 100}</span>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Checkout