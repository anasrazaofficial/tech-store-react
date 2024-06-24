import { createContext, useState, useContext } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [update, setUpdate] = useState(0)
    return (
        <CartContext.Provider value={{ update, setUpdate }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)