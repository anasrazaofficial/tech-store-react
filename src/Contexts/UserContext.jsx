import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { url } from '../App'


const UserContext = createContext()

export const ContextProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get(`${url}/users`)
            .then(res => {
                setUsers(res.data)
                res.data.forEach(user => user.isLoggedin ? setUser(user) : null)
            })
            .catch(err => console.error(err))
    }, [])


    const addUser = (obj) => {
        axios.post(`${url}/users`, obj)
            .then(res => res.data)
            .catch(err => console.error(err))
    }
    const updateUser = (id, obj) => {
        axios.put(`${url}/users/${id}`, obj)
            .then(res => res.data)
            .catch(err => console.error(err))
    }
    return (
        <UserContext.Provider value={{ users, user, addUser, updateUser }} >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)