import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuth, useAuthCookies } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'
import NavigationBar from '../NavigationBar/NavigationBar'

const ProtectedRoute = () => {
    const {user} = useAuth()
    const {cookies} = useAuthCookies()

    if(!user?.email && !cookies?.user) return <Navigate to="/auth/signin" replace/> 

  return (
   <ChatProvider>
    <>
      <NavigationBar />
       <Outlet/>
    </>
   </ChatProvider>
  )
}

export default ProtectedRoute