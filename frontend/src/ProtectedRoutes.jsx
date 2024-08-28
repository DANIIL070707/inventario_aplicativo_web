import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthenticationContext'
function ProtectedRoutes() {

    const {isAuthenticated} = useAuth()
    if(!isAuthenticated)  return < Navigate to = '/' replace></Navigate>
    return (
<Outlet/>
  )
}

export default ProtectedRoutes