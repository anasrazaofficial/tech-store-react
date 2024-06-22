import { useEffect, useState } from "react"
import { Link, Routes, Route, BrowserRouter } from "react-router-dom"


import { About, Cart, Checkout, Contact, Home, Login, Product, Shop, Signup, WhyUs } from "./Pages";
import { ErrorBoundary } from "./Components/ErrorBoundary";


function App() {
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0)

  useEffect(() => {
    let cart = localStorage.getItem('cart')
    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [cartLength]);


  return (
    <>
      <BrowserRouter>
        <div>
          <main>
            <Routes>

              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <Home cartChange={setCartLength} />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/login"
                element={
                  <ErrorBoundary>
                    <Login />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/signup"
                element={
                  <ErrorBoundary>
                    <Signup />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/about"
                element={
                  <ErrorBoundary>
                    <About />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/shop"
                element={
                  <ErrorBoundary>
                    <Shop />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/whyus"
                element={
                  <ErrorBoundary>
                    <WhyUs />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/contact"
                element={
                  <ErrorBoundary>
                    <Contact />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/cart"
                element={
                  <ErrorBoundary>
                    <Cart cartChange={setCartLength} />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/product"
                element={
                  <ErrorBoundary>
                    <Product cartChange={setCartLength} />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ErrorBoundary>
                    <Checkout />
                  </ErrorBoundary>
                }
              />

            </Routes>

          </main>
          {cart.length !== 0 && (
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