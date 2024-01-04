import axios from "axios";
import { useEffect, useState } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { UserContextProvider } from "./Contexts/UserContext";
import { UseCartContext } from "./Contexts/CartContext";

function App() {
  const { cart, getProducts } = UseCartContext()
  const location = useLocation();
  const isAllowedRoute = ['/signup', '/login'].includes(location.pathname);

  useEffect(() => {
    const isLocalStorageActive = window.localStorage.getItem('active') === null;
    if (isLocalStorageActive && !isAllowedRoute) {
      window.location.href = '/login';
    }
  }, [location.pathname]);

  useEffect(() => {
    getProducts()
    setInterval(() => getProducts(), 5000)
  }, [])


  return (
    <UserContextProvider>
      <Outlet />
      {!isAllowedRoute && cart.length != 0 && <div className="fixed bottom-3 sm:bottom-8 right-3 sm:right-5">
        <span className="absolute top-0 -right-2 bg-[--theme-secondary] rounded-full px-1.5 text-sm">{cart.length}</span>
        <Link to='/cart' className="w-12 h-12 bg-[--theme-primary] rounded-full flex justify-center items-center hover:bg-[--bg-primary-hover]">
          <img src="src\Assets\icons\cart.svg" className="w-3/5" alt="" />
        </Link >
      </div>}

      {isAllowedRoute && window.localStorage.getItem('active') !== null && <div className="fixed top-3 sm:top-8 right-3 sm:right-5">
        <Link to='/' className="py-1 px-2 text-white bg-[--theme-primary] rounded-full flex justify-center items-center hover:bg-[--bg-primary-hover] animate-bounce">Go to home</Link>
      </div>}
    </UserContextProvider>
  )
}

export default App


export const url = 'http://localhost:3000'