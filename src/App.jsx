import axios from "axios";
import { useEffect, useState } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"

function App() {
  const location = useLocation();
  const isAllowedRoute = ['/signup', '/login'].includes(location.pathname);
  const [cartProducts, setCartProducts] = useState('')

  useEffect(() => {
    const isLocalStorageActive = window.localStorage.getItem('active') === null;
    if (isLocalStorageActive && !isAllowedRoute) {
      window.location.href = '/login';
    }
  }, [location.pathname]);

  useEffect(() => {
    getCartItems()
    setInterval(() => {
      getCartItems()
    }, 5000)
  }, [])
  const getCartItems = () => {
    axios.get('http://localhost:3000/cart')
      .then(res => {
        setCartProducts(res.data)
      }).catch(err => console.error(err))
  }

  return (
    <>
      <Outlet />
      {!isAllowedRoute && cartProducts != 0 && <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5">
        <span className="absolute top-0 -right-2 bg-[--theme-secondary] rounded-full px-1.5 text-sm">{cartProducts.length}</span>
        <Link to='/cart' className="w-12 h-12 bg-[--theme-primary] rounded-full flex justify-center items-center hover:bg-[--bg-primary-hover]">
          <img src="src\Assets\icons\cart.svg" className="w-3/5" alt="" />
        </Link >
      </div>}
    </>
  )
}

export default App
