import React, { useState, useEffect } from 'react'
import { Navbar, Footer } from '../Components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { url } from '../App'
import { useCartContext } from '../Contexts/CartContext'


export const Home = () => {
    const [added, setAdded] = useState([])
    const [products, setProducts] = useState([])
    const { setUpdate } = useCartContext()


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
        <div className='bg-gray-100'>


            <div className='bg-banner h-screen px-5 sm:px-20'>
                <Navbar />
                <div className='sm:grid grid-cols-2 items-center sm:mt-40 sm:px-10'>
                    <div>
                        <section className='space-y-3 sm:space-y-5 text-white'>
                            <h3 className='font-bold text-3xl sm:text-5xl'>Computer & Laptop Accessories</h3>
                            <p className='text-justify sm:text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, obcaecati dolore ipsum vero delectus eius laborum odit recusandae repudiandae maiores.</p>
                        </section>
                        <div className='mt-8 space-x-3 text-white font-bold'>
                            <Link to='/shop' className='border-2 border-white py-3 px-5 hover:bg-[#ffffff26] transition-colors'>Buy Now</Link>
                            <Link to='/contact' className='border-2 border-white py-3 px-5 hover:bg-[#ffffff26] transition-colors'>Contact</Link>
                        </div>
                    </div>
                    <img src="\src\Assets\pc.png" alt="" className='mt-8' />
                </div>
            </div>


            <div className='px-5 sm:px-20 grid sm:grid-cols-3 gap-5 bg-white py-8 sm:py-14 mt-8 sm:mt-14'>
                <div className='border border-[--theme-secondary] p-5 rounded-xl space-y-3'>
                    <img src="\src\Assets\pr.png" alt="" className='mx-auto' />
                    <p className='font-semibold'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magnam neque aspernatur voluptatum sint vel, quod et provident libero sed ab voluptas adipisci tempora cum consectetur, similique, animi praesentium maxime!
                    </p>
                </div>
                <div className='border border-[--theme-secondary] p-5 rounded-xl space-y-3'>
                    <img src="\src\Assets\pr1.png" alt="" className='mx-auto' />
                    <p className='font-semibold'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magnam neque aspernatur voluptatum sint vel, quod et provident libero sed ab voluptas adipisci tempora cum consectetur, similique, animi praesentium maxime!
                    </p>
                </div>
                <div className='border border-[--theme-secondary] p-5 rounded-xl space-y-3'>
                    <img src="\src\Assets\pr2.png" alt="" className='mx-auto' />
                    <p className='font-semibold'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magnam neque aspernatur voluptatum sint vel, quod et provident libero sed ab voluptas adipisci tempora cum consectetur, similique, animi praesentium maxime!
                    </p>
                </div>
            </div>





            {/* Our Products */}
            <div className='px-5 sm:px-20 py-8 sm:py-14 bg-gray-100 space-y-5 sm:space-y-8 mt-8 sm:mt-14'>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Our Products</h2>
                <div className='bg-white grid sm:grid-cols-3 gap-5 p-5'>
                    {products.slice(0, 6).map((el, i) => (
                        <div key={el.id} className='flex flex-col items-center border-2 border-gray-100 rounded-lg py-3'>
                            <img src={el.img} alt={el.productName} title={el.productName} />
                            <h3 className='sm:text-2xl font-semibold'>{el.productName}</h3>
                            <small className='text-gray-600 text-lg mb-1 sm:mb-3'>Rs. {el.price}</small>
                            <div className='flex w-full px-5 gap-x-5'>
                                <Link to={{
                                    pathname: '/product',
                                    search: `?id=${el._id}`,
                                }} className='w-full bg-black text-center text-white py-2 hover:bg-[#313131] transition-colors'>More Info</Link>

                                {!added[i] && <button className='w-full bg-black text-center text-white py-2 hover:bg-[#313131] transition-colors' onClick={() => addToCart(i, el)}>Add to cart</button>}
                                {added[i] && <Link to='/cart' className='w-full bg-[--theme-secondary] text-center text-white py-2 hover:bg-[--theme-secondary-hover] transition-colors'>Go to cart</Link>}
                            </div>
                        </div>
                    ))}

                    <div className='sm:col-span-3 sm:grid grid-cols-3'>
                        <Link to='/shop' className='border-2 border-[--theme-secondary] text-[--theme-secondary] inline-block w-full font-semibold sm:font-bold hover:bg-[#48ca9526] transition-colors py-3 sm:col-start-2 text-center'>See more</Link>
                    </div>
                </div>
            </div>





            {/* Every Computer and laptop */}
            <div className='px-5 sm:px-20 py-8 sm:py-14 bg-banner mt-8 sm:mt-14 text-white sm:grid grid-cols-2'>
                <div className='space-y-8'>
                    <p className='sm:font-semibold sm:text-xl'>Every Computer and laptop</p>
                    <h2 className='text-3xl sm:text-4xl font-bold'>Up to 40% off !</h2>
                    <button>
                        <Link to='/contact' className='bg-[--theme-secondary] font-semibold sm:font-bold py-2 sm:py-3 px-8 sm:px-10 hover:bg-[--theme-secondary-hover] transition-colors'>Contact</Link>
                    </button>
                </div>
                <img src="\src\Assets\pc.png" alt="" className='mt-8 sm:mt-0' />
            </div>





            {/* CUSTOMER REVIEW */}
            <div className='px-5 sm:px-20 py-14 sm:py-28 bg-white space-y-5 sm:space-y-8'>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-[--theme-secondary] text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>CUSTOMER REVIEW</h2>
                <div className='grid sm:grid-cols-3 gap-3 sm:gap-5'>
                    <div className='relative'>
                        <img src="\src\Assets\double-quotes.png" alt="Quotes icon"
                            className='absolute -top-2 -left-3 w-4' />
                        <div className='space-y-3'>
                            <h3 className='font-bold text-2xl sm:inline-block'>John Doe</h3>
                            <p className='font-semibold text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde expedita, numquam sapiente fuga voluptate praesentium maiores odit quia amet quidem incidunt earum quas totam labore! Vel unde quasi sequi inventore.</p>
                        </div>
                    </div>

                    <div className='relative'>
                        <img src="\src\Assets\double-quotes.png" alt="Quotes icon"
                            className='absolute -top-2 -left-3 w-4' />
                        <div className='space-y-3'>
                            <h3 className='font-bold text-2xl sm:inline-block'>Elizabeth</h3>
                            <p className='font-semibold text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde expedita, numquam sapiente fuga voluptate praesentium maiores odit quia amet quidem incidunt earum quas totam labore! Vel unde quasi sequi inventore.</p>
                        </div>
                    </div>

                    <div className='relative'>
                        <img src="\src\Assets\double-quotes.png" alt="Quotes icon"
                            className='absolute -top-2 -left-3 w-4' />
                        <div className='space-y-3'>
                            <h3 className='font-bold text-2xl sm:inline-block'>Tony Stark</h3>
                            <p className='font-semibold text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde expedita, numquam sapiente fuga voluptate praesentium maiores odit quia amet quidem incidunt earum quas totam labore! Vel unde quasi sequi inventore.</p>
                        </div>
                    </div>
                </div>
            </div>





            {/* CUSTOMER REVIEW */}
            <div className='px-5 sm:px-20 bg-banner py-16 sm:py-28 text-white space-y-5 sm:space-y-8'>
                <h2 className='text-3xl sm:text-4xl font-bold border-b border-white text-center pb-4 sm:pb-6 mx-auto uppercase sm:w-fit px-5'>Contact Now</h2>
                <form className='border border-white p-3 sm:p-5 space-y-2 sm:space-y-4 sm:w-3/5 sm:mx-auto'>
                    <input type="text" placeholder='Name' className='px-3 py-4 w-full border-b-2 bg-transparent focus:border-2 focus-visible:outline-0' />
                    <input type="text" placeholder='Email' className='px-3 py-4 w-full border-b-2 bg-transparent focus:border-2 focus-visible:outline-0' />
                    <input type="text" placeholder='Phone number' className='px-3 py-4 w-full border-b-2 bg-transparent focus:border-2 focus-visible:outline-0' />
                    <textarea rows="10" placeholder='Comments' className='px-3 py-4 w-full border-b-2 bg-transparent focus:border-2 focus-visible:outline-0'></textarea>
                    <div className="text-center">
                        <button type='submit' className='border-2 border-[--theme-secondary] text-[--theme-secondary] font-semibold sm:font-bold py-3 w-2/5 hover:bg-[#48ca9526] transition-colors'>Send</button>
                    </div>
                </form>
            </div>




            {/* Footer */}
            <Footer />
        </div>
    )
}