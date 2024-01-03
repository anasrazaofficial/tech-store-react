import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { url } from '../App'


const UserContext = createContext()

export const ContextProvider = ({ children, id, obj }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get(`${url}/users`)
            .then(res => setUsers(res.data))
            .catch(err => console.error(err))
    }, [])

    const getUser = () => {
        axios.get(`${url}/users/${id}`)
            .then(res => res.data)
            .catch(err => console.error(err))
    }
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
        <UserContext.Provider value={{ users, getUser, addUser, updateUser }} >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)