import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar, Footer } from '../Components'
import axios from 'axios';
import { url } from '../App';
import { UseCartContext } from '../Contexts/CartContext';
import { UseUserContext } from '../Contexts/UserContext';

const Product = () => {
    const { user } = UseUserContext()
    const { cart, addProduct, updateProduct } = UseCartContext()
    const myParam = new URLSearchParams(useLocation().search).get('id');
    const [product, setProduct] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`${url}/products/${myParam}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err))
    }, [])

    const addToCart = () => {
        let itemFound = false
        if (cart.length === 0) {
            addProduct(product)
            window.location.href = '/cart'
        } else {
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                if (element.id === product.id) {
                    const quan = element.quantity
                    updateProduct(product.id, { ...product, quantity: quan + 1 })
                    window.location.href = '/cart'
                    itemFound = true
                    break
                } else itemFound = false
            }
        }
        if (!itemFound) {
            addProduct(product)
            window.location.href = '/cart'
        }
    }


    return (
        <div>

            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
            </header>

            <div className='px-5 sm:px-20 py-8 sm:py-14 my-8 sm:my-14 grid sm:grid-cols-2 gap-12'>
                <div>
                    <img src={product.url} alt="" className='w-full h-auto' />
                </div>
                <div className='space-y-5 sm:space-y-8'>
                    <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>{product.productName}</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil totam vel voluptates similique quam dolore commodi doloremque facilis saepe esse voluptatem non dolorum ut aperiam, rem veniam. Iste, sit repellat. <br />
                        <span className='text-lg text-gray-700 font-bold mt-2'>Rs. {product.price}</span>
                    </p>

                    <button className='bg-[--theme-secondary] font-semibold sm:font-bold py-2 sm:py-3 px-8 sm:px-10 hover:bg-[--theme-secondary-hover] transition-colors text-white' onClick={addToCart}>Add to cart</button>
                </div>
            </div>


            <Footer />

        </div>
    )
}

export default Product