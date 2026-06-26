import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '@/context/AuthContext'
import { getCurrentUser } from '@/services/auth'

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await getCurrentUser()
    //         const json = res?.data
    //         setUser(json?.data)
    //     }
    //     fetchUser()
    // }, [])
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