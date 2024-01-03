import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { url } from "../App";

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    useEffect(() => getCartProducts(), [])

    const getCartProducts = () => {
        axios.get(`${url}/cart`)
            .then(res => setCart(res.data))
            .catch(err => console.error(err))
    }

    const addProduct = (obj) => {
        axios.post(`${url}/cart`, obj)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    const deleteProduct = (id, func) => {
        axios.delete(`${url}/cart/${id}`)
            .then(() => func && typeof func === 'function' ? func() : null)
            .catch(err => console.error(err))
    }

    const updateProduct = (id, obj) => {
        axios.put(`${url}/cart/${id}`, obj)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    return (
        <CartContext.Provider value={{ cart, getCartProducts, addProduct, deleteProduct, updateProduct }}>
            {children}
        </CartContext.Provider>
    )
}

export const UseCartContext = () => useContext(CartContext)