import React from 'react'
import { Navigate,Outlet, useLocation } from 'react-router-dom'
import { useAuth, useAuthCookies } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'
import NavigationBar from '../NavigationBar/NavigationBar'
import { sleep } from '../utils'

const ProtectedRoute = () => {
    const {user} = useAuth()
    const {cookies} = useAuthCookies()
    if(!user?.email ) return <Navigate to="/auth/signin" replace/> 

  return  (
   <ChatProvider>
    <>
      <NavigationBar />
       <Outlet/>
    </>
   </ChatProvider>
  )
}

export default ProtectedRoute