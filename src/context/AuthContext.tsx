"use client"
import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { User } from "../types/User";


type AuthContextType = {
    isAuthenticated: boolean
    user: User | null | undefined
    login: (user: User) => void
    logout: () => void
    loadUser: () => void
    // setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}
export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const checkAuth = async () => {
            await loadUser()
        }
        checkAuth()

    }, [])
    const login = async (user: User) => {
        await localStorage.setItem("user", JSON.stringify(user))
        await setUser(user)
        await setIsAuthenticated(true)
    }

    const logout = () => {
        setUser(undefined)
        setIsAuthenticated(false)
    }
    const loadUser = async () => {
        const storedUser = localStorage.getItem("user")
        if (storedUser !== null) {
            const user = await JSON.parse(storedUser)
            if (user !== null) {
                await login(user)
                return true
            }
            return false

        }
    }

    return <AuthContext.Provider value={{
        isAuthenticated,
        user,
        login,
        logout,
        loadUser
    }}>
        {children}
    </AuthContext.Provider>
}