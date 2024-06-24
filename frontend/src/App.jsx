import { useEffect, useState } from "react"
import { Link, Routes, Route, BrowserRouter } from "react-router-dom"


import { About, Cart, Checkout, Contact, Home, Login, Product, Shop, Signup, WhyUs } from "./Pages";
import { useCartContext } from "./Contexts/CartContext";


function App() {
  const [cart, setCart] = useState([]);
  const { update } = useCartContext()


  useEffect(() => {
    let cart = localStorage.getItem('cart')
    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [update]);


  return (
    <>
      <BrowserRouter>
        <div>
          <main>
            <Routes>

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/signup"
                element={<Signup />}
              />

              <Route
                path="/about"
                element={<About />}
              />

              <Route
                path="/shop"
                element={<Shop />}
              />

              <Route
                path="/whyus"
                element={<WhyUs />}
              />

              <Route
                path="/contact"
                element={<Contact />}
              />

              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/product"
                element={<Product />}
              />

              <Route
                path="/checkout"
                element={<Checkout />}
              />

            </Routes>

          </main>
          {(cart.length !== 0 &&
            window.location.pathname !== '/signup' &&
            window.location.pathname !== '/login') && (
              <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5">
                <span className="absolute top-0 -right-2 bg-[--theme-secondary] rounded-full px-1.5 text-sm">{cart.length}</span>
                <Link to='/cart' className="w-12 h-12 bg-[--theme-primary] rounded-full flex justify-center items-center hover:bg-[--bg-primary-hover]">
                  <img src="src\Assets\icons\cart.svg" className="w-3/5" alt="" />
                </Link>
              </div>
            )}
        </div>
      </BrowserRouter>
    </>
  );
}


export default App


export const url = 'http://localhost:5000'