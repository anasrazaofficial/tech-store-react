import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from '../Components'
import axios from 'axios';
import { url } from '../App';

export const Product = () => {
    const [product, setProduct] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0)

        let id = new URLSearchParams(window.location.search).get('id')
        axios.get(`${url}/product?id=${id}`)
            .then(res => {
                setProduct(res.data)
                console.log(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    const addToCart = () => {
        axios.get(`${url}/cart`)
            .then(response => {
                if (response.data.length === 0) {
                    axios.post(`${url}/cart`, product)
                        .then(() => window.location.href = '/cart')
                        .catch(err => console.error(err))
                } else {
                    let isFound = true
                    for (let i = 0; i < response.data.length; i++) {
                        const element = response.data[i];
                        if (element.id === product.id) {
                            const quan = element.quantity
                            axios.put(`${url}/cart/${product.id}`, { ...product, quantity: quan + 1 })
                                .then(() => {
                                    window.location.href = '/cart'
                                })
                                .catch(err => console.error(err))
                            isFound = false
                            break
                        } else isFound = true
                    }
                    if (isFound) {
                        axios.post(`${url}/cart`, product)
                            .then(() => window.location.href = '/cart')
                            .catch(err => console.error(err))
                    }
                }
            }).catch(err => console.error(err))
    }

    return (
        <div>

            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
            </header>

            <div className='px-5 sm:px-20 py-8 sm:py-14 my-8 sm:my-14 grid sm:grid-cols-2 gap-12'>
                <div>
                    <img src={product.img} alt={product.productName} title={product.productName} className='w-full h-auto' />
                </div>
                <div className='space-y-5 sm:space-y-8'>
                    <div className='space-y-2'>
                        <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] pb-4 sm:pb-6 uppercase sm:w-fit'>{product.productName}</h2>
                        <p className='text-gray-600'>{product.description}</p>
                    </div>
                    <ul>
                        {product?.features?.map((feature, i) => (
                            <li key={feature._id ? feature._id.$oid : feature.feature}>{typeof feature === 'string' ? feature : feature.feature}</li>
                        ))}
                    </ul>
                    <p className='text-lg text-gray-700 font-bold mt-2'>Rs. {product.price}</p>


                    <button className='bg-[--theme-secondary] font-semibold sm:font-bold py-2 sm:py-3 px-8 sm:px-10 hover:bg-[--theme-secondary-hover] transition-colors text-white' onClick={addToCart}>Add to cart</button>
                </div>
            </div>


            <Footer />

        </div>
    )
}