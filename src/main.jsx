import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import WhyUs from './Pages/WhyUs'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import Checkout from './Pages/Checkout'
import Login from './Pages/Login'
import Signup from './Pages/Signup'


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='shop' element={<Shop />} />
      <Route path='whyus' element={<WhyUs />} />
      <Route path='contact' element={<Contact />} />
      <Route path='cart' element={<Cart />} />
      <Route path='product' element={<Product />} />
      <Route path='checkout' element={<Checkout />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={routes} />
  // </React.StrictMode>,
)
