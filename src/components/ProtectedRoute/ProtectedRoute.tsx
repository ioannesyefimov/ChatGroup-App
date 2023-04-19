import React from 'react'
import { Navigate,Outlet, useLocation } from 'react-router-dom'
import { useAuth, useAuthCookies } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'
import NavigationBar from '../NavigationBar/NavigationBar'
import SocketProvider from '../SocketContext/SocketProvider'

const ProtectedRoute = () => {
  console.log(`PROTECTED ROUTE RENDER`);
  
    const {user} = useAuth()
    const {cookies} = useAuthCookies()
    if(!user?.email && !cookies?.user?.email) return <Navigate to="/auth/signin" replace/> 

  return  (
   <ChatProvider>
    <SocketProvider>
    <>
      <NavigationBar />
       <Outlet/>
    </>
    </SocketProvider>
   </ChatProvider>
  )
}

export default ProtectedRoute