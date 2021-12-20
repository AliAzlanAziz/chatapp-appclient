import React from 'react'

export const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = React.useState('')

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}