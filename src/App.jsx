import { useEffect } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { UseCartContext } from "./Contexts/CartContext";
import { UseUserContext } from "./Contexts/UserContext";

function App() {
  const { cart, getProducts } = UseCartContext()
  const { user } = UseUserContext()
  const location = useLocation();
  const notAllowedRoute = ['/cart', '/checkout'].includes(location.pathname);
  const authRoutes = ['/login', '/signup'].includes(location.pathname);


  useEffect(() => {
    if (notAllowedRoute && !user) {
      // if (notAllowedRoute && (!Array.isArray(user) || user.length === 0 || !user.some(u => u.isLoggedin))) {
      window.location.href = '/login';
    }
  }, [location.pathname, user]);


  useEffect(() => {
    getProducts()
    setInterval(() => getProducts(), 5000)
  }, [])


  return (
    <>
      <Outlet />
      {!authRoutes && cart.length != 0 && <div className="fixed bottom-3 sm:bottom-8 right-3 sm:right-5">
        <span className="absolute top-0 -right-2 bg-[--theme-secondary] rounded-full px-1.5 text-sm">{cart.length}</span>
        <Link to='/cart' className="w-12 h-12 bg-[--theme-primary] rounded-full flex justify-center items-center hover:bg-[--bg-primary-hover]">
          <img src="src\Assets\icons\cart.svg" className="w-3/5" alt="" />
        </Link >
      </div>}

      {authRoutes && <div className="fixed top-3 sm:top-8 right-3 sm:right-5">
        <Link to='/' className="py-1 px-2 text-white bg-[--theme-primary] rounded-full flex justify-center items-center hover:bg-[--bg-primary-hover] animate-bounce">Go to home</Link>
      </div>}
    </>
  )
}

export default App


export const url = 'http://localhost:3000'