import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = sessionStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider