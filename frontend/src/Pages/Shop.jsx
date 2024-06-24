import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from '../Components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { url } from '../App'
import { useCartContext } from '../Contexts/CartContext'

export const Shop = () => {
    const { setUpdate } = useCartContext()
    const [added, setAdded] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`${url}/products`)
            .then(res => {
                setProducts(res.data);

                const initialAdded = new Array(res.data.length).fill(false);

                const localProducts = JSON.parse(localStorage.getItem('cart'));
                if (localProducts) {
                    res.data.forEach((product, i) => {
                        initialAdded[i] = localProducts.some(localProduct => localProduct.product._id === product._id)
                    })
                }
                setAdded(initialAdded);
            })
    }, [])

    const addToCart = (i, product) => {
        setAdded((prevAdded) => {
            const newAdded = [...prevAdded];
            newAdded[i] = true;
            return newAdded;
        });

        let cart;
        let cartLocal = JSON.parse(localStorage.getItem('cart'))
        cart = cartLocal ? cartLocal : []
        cart.push({ quantity: 1, product })
        localStorage.setItem('cart', JSON.stringify(cart))
        setUpdate(cart.length)
    }

    return (
        <div>


            <header className='bg-banner px-5 sm:px-20'>
                <Navbar />
                <div className='px-5 sm:px-20 py-8 sm:py-14 text-white sm:grid grid-cols-2'>
                    <div className='space-y-8'>
                        <p className='sm:font-semibold sm:text-xl'>Every Computer and laptop</p>
                        <h2 className='text-3xl sm:text-4xl font-bold'>Up to 40% off !</h2>
                        <button>
                            <Link to='/contact' className='bg-[--theme-secondary] font-semibold sm:font-bold py-2 sm:py-3 px-8 sm:px-10 hover:bg-[--theme-secondary-hover] transition-colors text-white'>Contact</Link>
                        </button>
                    </div>
                    <img src="\src\Assets\pc.png" alt="" className='mt-8 sm:mt-0' />
                </div>
            </header>


            <div className='px-5 sm:px-20 py-8 sm:py-14 space-y-5 sm:space-y-8 my-8 sm:my-14'>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Shop</h2>
                <div className='grid sm:grid-cols-3 gap-5 p-5'>
                    {products.map((el, i) => (
                        <div className='flex flex-col items-center border-2 border-gray-100 rounded-lg py-3' key={el.id}>
                            <img src={el.img} alt={el.productName} title={el.productName} />
                            <h3 className='sm:text-2xl font-semibold'>{el.productName}</h3>
                            <small className='text-gray-600 text-lg mb-1 sm:mb-3'>Rs. {el.price}</small>
                            <div className='flex w-full px-5 gap-x-5'>
                                <Link to={{
                                    pathname: '/product',
                                    search: `?id=${el.id}`,
                                }} className='w-full bg-black text-center text-white py-2 hover:bg-[#313131] transition-colors'>More Info</Link>
                                {!added[i] && <button className='w-full bg-black text-center text-white py-2 hover:bg-[#313131] transition-colors' onClick={() => addToCart(i, el)}>Add to cart</button>}
                                {added[i] && <Link to='/cart' className='w-full bg-[--theme-secondary] text-center text-white py-2 hover:bg-[--theme-secondary-hover] transition-colors'>Go to cart</Link>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <Footer />
        </div >
    )
}