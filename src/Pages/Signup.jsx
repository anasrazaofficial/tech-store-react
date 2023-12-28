import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        isLoggedin: true
    })
    const [pass, setPass] = useState(false)
    const [conPass, setConPass] = useState(false)

    const signupUser = (e) => {
        e.preventDefault()

        const post = () => {
            axios.post(`${url}/users`, user)
                .then((resp) => {
                    console.info(resp)
                    window.localStorage.setItem('active', 'true')
                    window.location.href = '/'
                })
                .catch((err) => console.error(err))
        }

        axios.get(`${url}/users`)
            .then((res) => {
                if (user.password === user.confirmPassword) {
                    if (res.data.length === 0) {
                        post()
                    } else {
                        let userFound = true
                        for (let i = 0; i < res.data.length; i++) {
                            const e = res.data[i];
                            if (e.username !== user.username && e.email !== user.email) userFound = true
                            else {
                                alert('Username or email not available')
                                userFound = false
                                break
                            }
                        }
                        if (userFound) {
                            res.data.forEach(e => axios.put(`http://localhost:3000/users/${e.id}`, { ...e, isLoggedin: false }));
                            post()
                        }
                    }
                } else {
                    alert("Password confrimation failed!")
                }
            }).catch((err) => console.error(err))
    }

    return (
        <div className='grid sm:grid-cols-3'>
            <div className='hidden bg-banner h-screen col-span-2 sm:flex justify-center items-center'>
                <img src="src\Assets\logo.png" alt="" className='w-2/4' />
            </div>
            <div className='sm:relative'>
                <div className='sm:absolute top-1/2 sm:-translate-y-1/2 left-1/2 sm:-translate-x-1/2 border px-4 sm:px-12 py-4 rounded-md bg-[--theme-primary] sm:bg-transparent h-screen sm:h-auto max-w-[100%] w-auto' style={{ boxShadow: '0px 0px 12px #48c8955c' }}>
                    <div className='text-center'>
                        <h2 className='text-2xl font-semibold text-center border-b pb-2 text-white sm:text-black sm:border-black sm:inline-block px-1 hidden'>Signup</h2>
                    </div>
                    <form onSubmit={signupUser} className='bg-white px-6 py-8 sm:p-0 rounded-md text-start absolute sm:static top-[60%] left-1/2 -translate-x-1/2 sm:translate-x-0 -translate-y-[60%] sm:translate-y-0 flex flex-col gap-3 sm:gap-4 w-80 sm:w-auto max-w-full'>
                        <h2 className='text-2xl font-semibold text-center pb-2 sm:text-black px-1 sm:hidden'>Signup</h2>
                        <div className='flex flex-col gap-y-1 sm:gap-y-2 mt-6'>
                            <label htmlFor="name" className='font-semibold'>Name</label>
                            <input type="text" id='name' name='name' placeholder='John Doe' className='border px-3 py-1 focus-visible:outline-black' required onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        </div>
                        <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <input type="email" id='email' name='email' placeholder='johndoe@hotmail.com' className='border px-3 py-1 focus-visible:outline-black' required onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                            <label htmlFor="username" className='font-semibold'>Create username</label>
                            <input type="text" id='username' name='username' placeholder='johndoe1234' className='border px-3 py-1 focus-visible:outline-black' required onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </div>
                        <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                            <label htmlFor="password" className='font-semibold'>Password</label>
                            <div className='flex items-center'>
                                <input type={pass ? 'text' : 'password'} name="password" id="password" placeholder='john2244' className='border px-3 py-1 w-full focus-visible:outline-black' required minLength='8' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                {pass ? <span className='text-blue-500 font-bold cursor-pointer px-2 border-y border-r py-1 hover:text-blue-600' onClick={() => setPass(false)}>Hide</span> : <span className='text-blue-500 font-bold cursor-pointer px-2 border-y border-r py-1 hover:text-blue-600' onClick={() => setPass(true)}>Show</span>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                            <label htmlFor="confirmPassword" className='font-semibold'>Confirm Password</label>
                            <div className='flex items-center'>
                                <input type={conPass ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" placeholder='john2244' className='border px-3 py-1 w-full focus-visible:outline-black' required minLength='8' onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                                {conPass ? <span className='text-blue-500 font-bold cursor-pointer px-2 border-y border-r py-1 hover:text-blue-600' onClick={() => setConPass(false)}>Hide</span> : <span className='text-blue-500 font-bold cursor-pointer px-2 border-y border-r py-1 hover:text-blue-600' onClick={() => setConPass(true)}>Show</span>}
                            </div>
                        </div>
                        <div className='mx-auto text-center mt-6'>
                            <button className='bg-[--theme-secondary] font-semibold sm:font-bold py-2 px-10 sm:px-8 hover:bg-[--theme-secondary-hover] transition-colors text-white'>Signup</button>
                        </div>
                        <p className='text-sm'>Already have an account! <Link to='/login' className='font-bold cursor-pointer'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup