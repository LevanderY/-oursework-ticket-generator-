import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

interface AuthContextInterface {
    currentUser: any
    login: any
}

const AuthContext = createContext({} as AuthContextInterface)

const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('')

    const login = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password)

    useEffect(() => {
        const unsubscribe: () => void = auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
