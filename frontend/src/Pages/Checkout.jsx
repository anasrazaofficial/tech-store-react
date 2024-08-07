import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

import { Navbar, Footer } from '../Components'
import { url } from '../App'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../Contexts/CartContext'

export const Checkout = () => {
    const [cart, setCart] = useState(null)
    const [user, setUser] = useState(null)
    const [subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [deliveryCharge, setDeliveryCharges] = useState(100)
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const { setUpdate } = useCartContext()
    const [payMeth, setPayMeth] = useState({
        jazzCash: {
            method: "Jazz Cash",
            isSelected: false,
            details: {
                phoneNumber: null
            }
        },
        easypaisa: {
            method: "Easypaisa",
            isSelected: false,
            details: {
                phoneNumber: null
            }
        },
        bankTransfer: {
            method: "Bank Transfer",
            isSelected: false,
            details: {
                cardNumber: null,
                cvv: null,
                expiryDate: null
            }
        },
        cashOnDelivery: {
            method: "Cash on delivery",
            isSelected: false
        }
    })
    const isDisable = payMeth.jazzCash.isSelected ||
        payMeth.bankTransfer.isSelected ||
        payMeth.cashOnDelivery.isSelected ||
        payMeth.easypaisa.isSelected


    useEffect(() => {
        window.scrollTo(0, 0)


        axios.get(`${url}/user`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => setUser(res.data)).catch(err => {
            console.error(err)
            console.log(err?.response?.data)
        })


        axios.get(`${url}/cart`).then(res => {
            setCart(res.data)
            if (res.data.length === 0) {
                setDiscount(0)
            } else {
                const priceOff = localStorage.getItem('discount')
                if (priceOff) {
                    setDiscount(Number.parseInt(priceOff))
                }
            }
        }).catch(err => {
            console.error(err)
            MySwal.fire({
                title: err?.response?.data,
                icon: "error"
            })
        })


        let cartLocal = JSON.parse(localStorage.getItem('cart'))
        setSubtotal(cartLocal?.reduce((total, item) =>
            total += (item.product.price * item.quantity),
            0)
        )
    }, [])


    const submit = (e) => {
        e.preventDefault()
        if (cart) {

            // Products
            let cartLocal = JSON.parse(localStorage.getItem('cart'))
            let products = cart[0].products.map((product, i) => {
                return {
                    productId: product.productId,
                    quantity: product.quantity,
                    price: product.quantity * cartLocal[i].product.price
                }
            })

            // Payment method
            let paymentMethod;
            Object.keys(payMeth).forEach(key => {
                if (payMeth[key].isSelected) {
                    paymentMethod = {
                        method: payMeth[key].method,
                        details: payMeth[key].details
                    }
                }
            })

            // Loyalty Points
            let loyaltyPoints = user.loyaltyPoints - (discount * 10)
            loyaltyPoints += Number(subtotal.toString().slice(0, subtotal.toString().length - 3)) * 100

            // Finalizing payload
            const payload = {
                userId: user.user_id,
                products,
                amount: {
                    subtotal,
                    discount,
                    deliveryCharge,
                    total: subtotal - discount + deliveryCharge
                },
                paymentMethod
            }

            // Hitting API request
            axios.post(`${url}/placeOrder`, payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(orderRes => {

                axios.put(`${url}/user/${user.user_id}`,
                    { loyaltyPoints },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                ).then(userRes => console.log(userRes.data)).catch(err => {
                    MySwal.fire({
                        title: err?.response?.data,
                        icon: "error"
                    })
                    console.log(err)
                })

                localStorage.removeItem('cart')
                localStorage.removeItem('discount')
                setUpdate(0)

                MySwal.fire({
                    title: orderRes.data,
                    icon: "success",
                    preConfirm: () => navigate('/')
                })
            }).catch(err => {
                console.error(err)
                MySwal.fire({
                    title: err?.response?.data,
                    icon: "error"
                })
            })
        } else {
            MySwal.fire({
                title: "Cart is empty. Would you like to browse our products?",
                icon: "error",
                confirmButtonText: "Yes",
                showDenyButton: true,
                preConfirm: () => navigate('/shop')
            })
        }
    }

    const selectMethod = (method) => {
        setPayMeth(prevState => {
            const newState = { ...prevState };
            Object.keys(newState).forEach(key => {
                newState[key].isSelected = false

                if (newState[key].hasOwnProperty('details')) {
                    Object.keys(newState[key].details).forEach(el => {
                        newState[key].details[el] = null;
                    })
                }
            });
            newState[method].isSelected = true;
            return newState;
        });

    };

    const setPaymentDetails = (value, method, field) => {
        setPayMeth(prevState => ({
            ...prevState,
            [method]: {
                ...prevState[method],
                details: {
                    ...prevState[method].details,
                    [field]: value
                }
            }
        }));
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
                            <div className={`border rounded - md py - 2 px - 3 space - y - 3 cursor - pointer ${payMeth.jazzCash.isSelected ? 'border-2 border-[--theme-secondary]' : ''}`} onClick={() => selectMethod('jazzCash')}>
                                <span>JazzCash</span>
                                <img src="src\Assets\payment-logo\jazzcash.png" alt="" />
                            </div>
                            <div className={`border rounded - md py - 2 px - 3 space - y - 3 cursor - pointer ${payMeth.easypaisa.isSelected ? 'border-2 border-[--theme-secondary]' : ''}`} onClick={() => selectMethod('easypaisa')}>
                                <span>Easypaisa</span>
                                <img src="src\Assets\payment-logo\easypaisa.png" alt="" />
                            </div>
                            <div className={`border rounded - md py - 2 px - 3 space - y - 3 cursor - pointer ${payMeth.bankTransfer.isSelected ? 'border-2 border-[--theme-secondary]' : ''}`} onClick={() => selectMethod('bankTransfer')}>
                                <span>Bank transfer</span>
                                <img src="src\Assets\payment-logo\bank-transfer.png" alt="" />
                            </div>
                            <div className={`border rounded - md py - 2 px - 3 space - y - 3 cursor - pointer ${payMeth.cashOnDelivery.isSelected ? 'border-2 border-[--theme-secondary]' : ''}`} onClick={() => selectMethod('cashOnDelivery')}>
                                <span>Cash on delivery</span>
                                <img src="src\Assets\payment-logo\cash-delivery.png" alt="" />
                            </div>
                        </div>



                        {payMeth.jazzCash.isSelected &&
                            <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base mt-6'>

                                <label htmlFor="jazzCash" className='font-semibold'>
                                    Enter phone number (JazzCash)
                                </label>

                                <input type="tel" id='jazzCash' name='jazzCash'
                                    placeholder='+923121234567'
                                    className='border px-2 sm:px-3 py-1 focus-visible:outline-black'
                                    minLength='13' maxLength='13' required
                                    onChange={(e) => setPaymentDetails(e.target.value, 'jazzCash', 'phoneNumber')}
                                />

                            </div>
                        }


                        {payMeth.easypaisa.isSelected &&
                            <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base mt-6'>

                                <label htmlFor="easypaisa" className='font-semibold'>
                                    Enter phone number (easypaisa)
                                </label>

                                <input type="tel" id='easypaisa' name='easypaisa'
                                    placeholder='+923121234567'
                                    className='border px-2 sm:px-3 py-1 focus-visible:outline-black'
                                    minLength='13' maxLength='13' required
                                    onChange={(e) => setPaymentDetails(e.target.value, 'easypaisa', 'phoneNumber')}
                                />

                            </div>
                        }


                        {payMeth.bankTransfer.isSelected &&
                            <div className='grid sm:grid-cols-4 gap-2'>

                                <div className='flex flex-col gap-y-1 sm:col-span-2 sm:gap-y-2 text-sm sm:text-base'>
                                    <label htmlFor="cardNumber" className='font-semibold'>
                                        Valid Card Number
                                    </label>

                                    <input type="tel" id='cardNumber' name='cardNumber'
                                        placeholder='1234123412341234'
                                        className='border px-2 sm:px-3 py-1 focus-visible:outline-black'
                                        minLength='19' maxLength='19' required
                                        onChange={(e) => setPaymentDetails(e.target.value, 'bankTransfer', 'cardNumber')}
                                    />
                                </div>

                                <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base'>
                                    <label htmlFor="cvv" className='font-semibold'>
                                        CVV
                                    </label>
                                    <input type="tel" id='cvv' name='cvv'
                                        placeholder='1234'
                                        className='border px-2 sm:px-3 py-1 focus-visible:outline-black'
                                        minLength='4' maxLength='4' required
                                        onChange={(e) => setPaymentDetails(e.target.value, 'bankTransfer', 'cvv')}
                                    />
                                </div>

                                <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base'>
                                    <label htmlFor="expiryDate" className='font-semibold'>
                                        Card Expiry Date
                                    </label>
                                    <input type="date" id='expiryDate' name='expiryDate'
                                        className='border px-2 sm:px-3 py-1 focus-visible:outline-black'
                                        required
                                        onChange={(e) => setPaymentDetails(e.target.value, 'bankTransfer', 'expiryDate')}
                                    />
                                </div>

                            </div>
                        }


                        <button className='block px-4 py-3 bg-[--theme-secondary] font-bold hover:bg-[--theme-secondary-hover] transition-colors text-white w-full'
                            disabled={!isDisable} >Place order</button>
                    </form>



                    <div className='border px-4 py-5 space-y-3 sm:space-y-5 h-fit'>
                        <h3 className='text-2xl font-bold text-center'>Order Summary</h3>

                        <div className='grid grid-cols-3 items-center mt-2'>
                            <h5 className='text-xl font-semibold col-span-2'>Total Amount :</h5>
                            <span>Rs. {subtotal === 0 ? 0 : subtotal}</span>
                        </div>

                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Discount % :</h5>
                            <span>{discount === 0 ? 0 : ((discount / (subtotal + discount)) * 100).toFixed(2)}%</span>
                        </div>

                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Discount Price :</h5>
                            <span>Rs. {discount === 0 ? 0 : discount}</span>
                        </div>

                        <div className='grid grid-cols-3 items-center mt-1'>
                            <h5 className='text-xl font-semibold col-span-2'>Delivery charges :</h5>
                            <span>Rs.{deliveryCharge}</span>
                        </div>

                        <div className='grid grid-cols-3 items-center border-t-2 mt-2 pt-2'>
                            <h5 className='text-xl font-semibold col-span-2'>Total Price :</h5>
                            <span>Rs. {subtotal - discount + deliveryCharge}</span>
                        </div>

                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
}