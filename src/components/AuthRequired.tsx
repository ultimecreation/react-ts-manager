
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'

const AuthRequired = () => {
    const authContext = useContext(AuthContext)
    return authContext?.isAuthenticated === true ? <Outlet /> : <Navigate to={'/login'} />
}

export default AuthRequired