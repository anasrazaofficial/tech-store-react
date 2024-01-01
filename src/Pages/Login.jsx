import { info } from 'autoprefixer'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [pass, setPass] = useState(false)
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const loginUser = (e) => {
        e.preventDefault()
        axios.get('http://localhost:3000/users')
            .then((res) => {
                console.info(res)
                if (res.data.length !== 0) {
                    let invalid = true
                    for (let i = 0; i < res.data.length; i++) {
                        const element = res.data[i];
                        if (element.username === user.username && element.password == user.password) {
                            axios.put(`http://localhost:3000/users/${element.id}`, { ...element, isLoggedin: true })
                            localStorage.setItem('active', 'true')
                            invalid = false
                            window.location.href = '/'
                            break
                        }
                    }
                    invalid ? alert("Invalid credentials") : null
                } else {
                    alert("Invalid credentials")
                }
            })
            .catch((err) => console.error(err))
    }

    return (
        <div className='grid sm:grid-cols-3'>
            <div className='hidden bg-banner h-screen col-span-2 sm:flex justify-center items-center'>
                <img src="src\Assets\logo.png" alt="" className='w-2/4' />
            </div>
            <div className='sm:relative'>
                <div className='sm:absolute top-1/2 sm:-translate-y-1/2 left-1/2 sm:-translate-x-1/2 border px-4 sm:px-6 py-4 rounded-md bg-[--theme-primary] sm:bg-transparent h-screen sm:h-auto max-w-[100%] w-auto' style={{ boxShadow: '0px 0px 12px #48c8955c' }}>
                    <div className='text-center'>
                        <h2 className='text-2xl font-semibold text-center border-b pb-2 text-white sm:text-black sm:border-black sm:inline-block px-1 hidden'>Login</h2>
                    </div>
                    <form onSubmit={loginUser} className='bg-white px-6 py-8 sm:p-0 rounded-md text-start absolute sm:static top-[60%] left-1/2 -translate-x-1/2 sm:translate-x-0 -translate-y-[60%] sm:translate-y-0 flex flex-col gap-3 sm:gap-4 w-80 sm:w-auto max-w-full'>
                        <h2 className='text-2xl font-semibold text-center pb-2 sm:text-black px-1 sm:hidden'>Login</h2>
                        <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base mt-6'>
                            <label htmlFor="username" className='font-semibold'>Username</label>
                            <input type="text" id='username' name='username' placeholder='john123' className='border px-2 sm:px-3 py-1 focus-visible:outline-black' required onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </div>
                        <div className='flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base'>
                            <label htmlFor="password" className='font-semibold'>Password</label>
                            <div className='flex items-center'>
                                <input type={pass ? 'text' : 'password'} name="password" id="password" placeholder='dummypassword' className='border px-2 sm:px-3 py-1 w-full focus-visible:outline-black' required minLength='8' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                {pass ? <span className='text-blue-500 font-bold cursor-pointer px-2 border-y border-r py-1 hover:text-blue-600' onClick={() => setPass(false)}>Hide</span> : <span className='text-blue-500 font-bold cursor-pointer px-2 border-y border-r py-1 hover:text-blue-600' onClick={() => setPass(true)}>Show</span>}
                            </div>
                        </div>
                        <div className='mx-auto text-center mt-6'>
                            <button type='submit' className='bg-[--theme-secondary] font-semibold sm:font-bold py-2 px-10 sm:px-8 hover:bg-[--theme-secondary-hover] transition-colors text-white cursor-pointer'>Login</button>
                        </div>
                        <p className='text-sm'>Don't have an account! <Link to='/signup' className='font-bold cursor-pointer'>Signup</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login