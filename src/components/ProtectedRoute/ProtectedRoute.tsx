import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuth } from '../Authentication/Provider/AuthProvider'

const ProtectedRoute = () => {
    const {user} = useAuth()

    if(!user?.email) return <Navigate to="/auth/signin" replace/>

  return <Outlet/>
}

export default ProtectedRoute