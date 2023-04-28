import React from 'react'
import { Navigate,Outlet, useLocation } from 'react-router-dom'
import { useAuth, useAuthCookies } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'
import NavigationBar from '../NavigationBar/NavigationBar'
import { sleep } from '../utils'
import ChannelsBar from '../DashBoard/ChannelsBar/ChannelsBar'
import { useCookiesData } from '../../hooks/useAuthCookies/useAuthCookies'
async function wait(time:number){
  return  await sleep(time)
};
const ProtectedRoute = () => {
    const {user} = useAuth()
    const cookies= useCookiesData()
    if(!user?.email && !cookies.user.email) return <Navigate to="/auth/signin" replace/> 

  return  (
   <ChatProvider>
    <div className='app-wrapper'>
      <ChannelsBar />
      <Outlet/>
    </div>
   </ChatProvider>
  )
}

export default ProtectedRoute