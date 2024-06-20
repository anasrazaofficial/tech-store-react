import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from '../Components'
import axios from 'axios'
import { url } from '../App'

export const Checkout = () => {
    const [cartData, setCartData] = useState({})
    const [user, setUser] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(window.localStorage.getItem('discount'))
    const [payMeth, setPayMeth] = useState({
        jazzCash: {
            isSelected: false,
            phoneNumber: null,
        },
        easypaisa: {
            isSelected: false,
            phoneNumber: null,
        },
        bankTransfer: {
            isSelected: false,
            details: {
                cardNumber: null,
                cvv: null,
                expiryDate: null,
                otp: null
            }
        },
        cashOnDelivery: {
            isSelected: false
        }
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
            .then(res => res.data.forEach(el => el.isLoggedin ? setUser(el) : null))
            .catch(err => console.error(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        let paymentSelected = true
        for (let i = 0; i < Object.keys(payMeth).length; i++) {
            const element = Object.keys(payMeth)[i];
            if (payMeth[element].isSelected) {
                let { username, password, confirmPassword, isLoggedin, id, ...newUser } = user
                let { isSelected, ...method } = payMeth[element]
                let obj = {
                    ...newUser,
                    userId: user.id,
                    cart: cartData,
                    paymentMethod: { [element]: method },
                    subtotal,
                    discount,
                    total: Math.round(subtotal - discount)
                }
                axios.post(`${url}/orders`, obj)
                    .then(() => {
                        cartData.forEach(data => axios.delete(`${url}/cart/${data.id}`).catch(err => console.error(err)))
                        window.localStorage.removeItem('discount')
                        window.location.href = '/'
                    }).catch(err => console.error(err))

                    
                // Adding Loyalty points to users
                let points;
                if (subtotal > 999) {
                    points = Number(subtotal.toString().slice(0, subtotal.toString().length - 3))
                    if (user.hasOwnProperty('loyaltyPoints')) points += user.loyaltyPoints
                    axios.put(`${url}/users/${user.id}`, { ...user, loyaltyPoints: points })
                }

                paymentSelected = false
                break
            }
        }
        if (paymentSelected) alert('Select payment method')
    }

    const selectMethod = (method) => {
        setPayMeth(prevState => {
            const newState = { ...prevState };
            Object.keys(newState).forEach(key => {
                newState[key].isSelected = false

                if (newState[key].hasOwnProperty('phoneNumber')) newState[key].phoneNumber = null
                else if (newState[key].hasOwnProperty('details')) {
                    newState[key].details.cardNumber = null
                    newState[key].details.cvv = null
                    newState[key].details.expiryDate = null
                    newState[key].details.otp = null
                }
            });
            newState[method].isSelected = true;
            return newState;
        });

    };

    const setPaymentDetails = (value, method, field) => {
        if (method === 'bankTransfer') {
            setPayMeth((prevState) => ({
                ...prevState,
                bankTransfer: {
                    ...prevState.bankTransfer,
                    details: {
                        ...prevState.bankTransfer.details,
                        [field]: value,
                    },
                },
            }));
        } else {
            setPayMeth(prevState => ({
                ...prevState,
                [method]: {
                    ...prevState[method],
                    phoneNumber: value
                }
            }));
        }
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
                        <h3 className='text-2xl font-bold text-center'>Payment method</h3>
                        <div className='grid sm:grid-cols-4 gap-3'>
                            <div className={`border rounded-md py-2 px-3 space-y-3 cursor-pointer ${payMeth.jazzCash.isSelected ? 'border-2 border-[--theme-secondary]' : ''}`} onClick={() => selectMethod('jazzCash')}>
                                <span>JazzCash</span>
                                <img src="src\Assets\payment-logo\jazzcash.png" alt="" />
                            </div>
                            <div className={`border rounded-md py-2 px-3 space-y-3 cursor-pointer ${payMeth.easypaisa.isSelected ? 'border-2 border-[--theme-secondary]' : ''}`} onClick={() => selectMethod('easypaisa')}>
                                <span>Easypaisa</span>
                                <img src="src\Assets\payment-logo\easypaisa.png" alt="" />
                            </div>
                            <div className={`border rounded-md py-2 px-3 space-y-3 cursor-pointer ${payMeth.bankTransfer.isSelected ? 'border-2 border-[--theme-secondary]' : ''}`} onClick={() => selectMethod('bankTransfer')}>
                                <span>Bank transfer</span>
                                <img src="src\Assets\payment-logo\bank-transfer.png" alt="" />
                            </div>
                            <div className={`border rounded-md py-2 px-3 space-y-3 cursor-pointer ${payMeth.cashOnDelivery.isSelected ? 'border-2 border-[--theme-secondary]' : ''}`} onClick={() => selectMethod('cashOnDelivery')}>
                                <span>Cash on delivery</span>
                                <img src="src\Assets\payment-logo\cash-delivery.png" alt="" />
                            </div>
                        </div>


                        {payMeth.jazzCash.isSelected &&
                            <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base mt-6'>
                                <label htmlFor="jazzCash" className='font-semibold'>Enter phone number (JazzCash)</label>
                                <input type="tel" id='jazzCash' name='jazzCash' placeholder='+923121234567' className='border px-2 sm:px-3 py-1 focus-visible:outline-black' maxLength='13' required onChange={(e) => setPaymentDetails(e.target.value, 'jazzCash', '')} />
                            </div>}

                        {payMeth.easypaisa.isSelected &&
                            <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base mt-6'>
                                <label htmlFor="easypaisa" className='font-semibold'>Enter phone number (easypaisa)</label>
                                <input type="tel" id='easypaisa' name='easypaisa' placeholder='+923121234567' className='border px-2 sm:px-3 py-1 focus-visible:outline-black' maxLength='13' required onChange={(e) => setPaymentDetails(e.target.value, 'easypaisa', '')} />
                            </div>}

                        {payMeth.bankTransfer.isSelected &&
                            <div className='grid sm:grid-cols-2 gap-2'>
                                <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base'>
                                    <label htmlFor="cardNumber" className='font-semibold'>Valid Card Number</label>
                                    <input type="tel" id='cardNumber' name='cardNumber' placeholder='1234 1234 1234 1234' className='border px-2 sm:px-3 py-1 focus-visible:outline-black' minLength={19} maxLength={19} required onChange={(e) => setPaymentDetails(e.target.value, 'bankTransfer', 'cardNumber')} />
                                </div>
                                <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base'>
                                    <label htmlFor="cvv" className='font-semibold'>CVV</label>
                                    <input type="tel" id='cvv' name='cvv' placeholder='1234' className='border px-2 sm:px-3 py-1 focus-visible:outline-black' minLength={4} maxLength={4} required onChange={(e) => setPaymentDetails(e.target.value, 'bankTransfer', 'cvv')} />
                                </div>
                                <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base'>
                                    <label htmlFor="expiryDate" className='font-semibold'>Card Expiry Date</label>
                                    <input type="date" id='expiryDate' name='expiryDate' className='border px-2 sm:px-3 py-1 focus-visible:outline-black' required onChange={(e) => setPaymentDetails(e.target.value, 'bankTransfer', 'expiryDate')} />
                                </div>
                                <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base'>
                                    <label htmlFor="otp" className='font-semibold'>OTP</label>
                                    <input type="tel" id='otp' name='otp' placeholder='1234' className='border px-2 sm:px-3 py-1 focus-visible:outline-black' minLength={4} maxLength={4} required onChange={(e) => setPaymentDetails(e.target.value, 'bankTransfer', 'otp')} />
                                </div>
                            </div>}


                        <button className='block px-4 py-3 bg-[--theme-secondary] font-bold hover:bg-[--theme-secondary-hover] transition-colors text-white w-full'>Place order</button>
                    </form>

                    <div className='border px-4 py-5 space-y-3 sm:space-y-5 h-fit'>
                        <h3 className='text-2xl font-bold text-center'>Order Summary</h3>
                        <div className='grid grid-cols-3 items-center mt-2'>
                            <h5 className='text-xl font-semibold col-span-2'>Total Amount :</h5>
                            <span>Rs. {subtotal}</span>
                        </div>
                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Discount % :</h5>
                            <span>{((discount / (subtotal)) * 100).toFixed(2)}%</span>
                        </div>
                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Discount Price :</h5>
                            <span>Rs. {discount}</span>
                        </div>
                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Delivery charges :</h5>
                            <span>Rs.100</span>
                        </div>
                        <div className='grid grid-cols-3 items-center border-t-2 mt-2 pt-2'>
                            <h5 className='text-xl font-semibold col-span-2'>Total Price :</h5>
                            <span>Rs. {subtotal - discount + 100}</span>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
}