import React from 'react'
import { Navigate,Outlet, useLocation } from 'react-router-dom'
import { useAuth, useAuthCookies } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'
import NavigationBar from '../NavigationBar/NavigationBar'
import { sleep } from '../utils'
async function wait(time:number){
  return  await sleep(time)
};
const ProtectedRoute = () => {
    const {user} = useAuth()
    if(!user?.email) return <Navigate to="/auth/signin" replace/> 

  return  (
   <ChatProvider>
       <Outlet/>
   </ChatProvider>
  )
}

export default ProtectedRoute