import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from '../Components'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Cart = () => {
    const [cartProds, setCartProds] = useState([])
    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)
        getProducts()
    }, [])

    const getProducts = () => {
        axios.get('http://localhost:3000/cart')
            .then(res => {
                setCartProds(res.data)
                getSubtotal(res.data)
            }).catch(err => console.error(err))
    }

    const increaseQuantity = (product) => {
        product.quantity++
        updateQuantity(product, product.quantity)
    }

    const decreaseQuantity = (product) => {
        (product.quantity !== 1) ? product.quantity-- : null
        updateQuantity(product, product.quantity)

    }

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:3000/cart/${id}`)
            .then(() => getProducts())
            .catch(err => console.error(err))
    }

    const submit = () => {
        let data = {
            products: cartProds,
            total: subtotal
        }
        window.localStorage.setItem('cartData', JSON.stringify(data))
        cartProds.forEach(product => {
            axios.put(`http://localhost:3000/cart/${product.id}`, { ...product, quantity: product.quantity })
                .then(res => console.log(res))
                .catch(err => console.error(err))
        })
        window.location.href = '/checkout'
    }

    const updateQuantity = (product, newQuantity) => {
        setCartProds(prevCart => {
            return prevCart.map(item => {
                if (item.id === product.id) {
                    getSubtotal(prevCart)
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const getSubtotal = (items) => setSubtotal(items.reduce((total, item) => total += (item.price * item.quantity), 0))

    return (
        <div>

            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
            </header>

            <div className='px-5 sm:px-20 py-8 sm:py-14 my-8 sm:my-14 space-y-5 sm:space-y-8 relative'>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5 relative'>Cart
                    <Link to='/checkout' className='absolute right-0 top-5 cursor-pointer hover:drop-shadow-lg font-semibold sm:hidden flex gap-x-3 items-center text-[10px]'>Checkout <img src="src\Assets\icons\arrow-right.svg" alt="" /></Link>  </h2>
                <div className='grid sm:grid-cols-4 gap-5'>
                    <table className='w-full border text-[12px] sm:text-base sm:col-span-3 h-fit'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='py-3 border-x-2'>S.No</th>
                                <th className='py-3 border-x-2'>Product Id</th>
                                <th className='py-3 border-x-2'>Product Name</th>
                                <th className='py-3 border-x-2'>Quantity</th>
                                <th className='py-3 border-x-2'>Price</th>
                                <th className='py-3 border-x-2'>Total</th>
                                <th className='py-3 border-x-2'></th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartProds.map((prod, i) => (<tr key={prod.id}>
                                <td className='py-3 text-center border-x-2'>{i + 1}</td>
                                <td className='py-3 text-center border-x-2'>{prod.id}</td>
                                <td className='py-3 text-center border-x-2'>{prod.productName}</td>
                                <td className='py-3 text-center border-x-2'>
                                    <div>
                                        <span className='px-1 sm:px-2 bg-[--theme-secondary] text-white sm:pb-1 cursor-pointer hover:bg-[--theme-secondary-hover]' onClick={() => decreaseQuantity(prod)}>-</span>
                                        <span className='px-2 sm:px-4'>{prod.quantity}</span>
                                        <span className='px-1 sm:px-2 bg-[--theme-secondary] text-white sm:pb-1 cursor-pointer hover:bg-[--theme-secondary-hover]' onClick={() => increaseQuantity(prod)}>+</span>
                                    </div>
                                </td>
                                <td className='py-3 text-center border-x-2'>Rs.  {prod.price}</td>
                                <td className='py-3 text-center border-x-2'>{prod.price * prod.quantity}</td>
                                <td className='py-3 px-2'>
                                    <img src="\src\Assets\icons\cross.svg" alt="" className='mx-auto w-4 sm:w-auto cursor-pointer' onClick={() => deleteProduct(prod.id)} />
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                    <div className='border rounded-xl p-3 sm:p-5 h-fit relative'>
                        <Link to='/checkout' className='absolute right-0 -top-16 cursor-pointer hover:drop-shadow-lg font-semibold hidden sm:flex gap-x-3 items-center'>Checkout <img src="src\Assets\icons\arrow-right.svg" alt="" /></Link>
                        <div className='space-y-3 text-center border-b-4 pb-2'>
                            <h4 className='text-2xl font-semibold sm:font-bold'>Enter discount coupon</h4>
                            <input type="text" className='border-2 w-full rounded-lg px-3 py-1' placeholder='Enter Coupon code here' />
                            <button type='button' className='px-4 py-3 bg-[--theme-secondary] font-bold rounded-lg w-1/2 hover:bg-[--theme-secondary-hover] transition-colors text-white'>Submit</button>
                        </div>
                        <div className='grid grid-cols-3 items-center mt-2'>
                            <h5 className='text-xl font-semibold col-span-2'>Subtotal :</h5>
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
                        <div className='grid grid-cols-3 items-center border-t-2 mt-2 pt-2'>
                            <h5 className='text-xl font-semibold col-span-2'>Total Amount :</h5>
                            <span>Rs. {subtotal}</span>
                        </div>
                        <button className='block px-4 py-3 bg-[--theme-secondary] font-bold hover:bg-[--theme-secondary-hover] transition-colors text-white mt-8 text-center' onClick={submit}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>


            <Footer />

        </div>
    )
}

export default Cart