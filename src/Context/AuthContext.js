import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();

    function register(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return unsuscribe;
    }, [])


    const value = {
        currentUser,
        register
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
