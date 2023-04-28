import React, { useEffect } from 'react'
import { Navigate,Outlet, useLocation } from 'react-router-dom'
import { useAuth, useAuthCookies } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'
import NavigationBar from '../NavigationBar/NavigationBar'
import { sleep } from '../utils'
import ChannelsBar from '../DashBoard/ChannelsBar/ChannelsBar'
import { useCookiesData } from '../../hooks/useAuthCookies/useAuthCookies'
import { useSetUser, useSetLoading, useUser } from '../../hooks/useAuthContext/useAuthContext'
async function wait(time:number){
  return  await sleep(time)
};
const ProtectedRoute = () => {
  const {cookies} = useAuthCookies()
  const user = useUser()
  const setUser = useSetUser()
  const setLoading = useSetLoading()
  useEffect(
    ()=>{
      console.log(`APP RENDER`);
      
      let isLogged = cookies?.user
      console.log(`IS LOGGED`, isLogged);
      
      if(isLogged){
        setUser(isLogged)
      }
      setLoading(false)
    },[cookies?.user]
  )
    if(!user?.email && !cookies?.user?.email) return <Navigate to="/auth/signin" replace/> 
    else if (!user.email && cookies?.user?.email) {
       sleep(2200)
    }
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