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
  const {user,setUser,setLoading} = useAuth();
  const {cookies} = useAuthCookies()
  if(!user?.email && !cookies?.user?.email) return <Navigate to="/auth/signin" replace/> 
   
  useEffect(
    ()=>{
      console.log(`APP RENDER`);
      if(!user?.email){
        let isLogged = cookies?.user
        if(isLogged){
          setUser(isLogged)
        }
        console.log(`IS LOGGED`, isLogged);

      }
      
      setLoading(false)
    },[cookies?.user]
  )
  return  (
    <ChatProvider>
     <div className='app-wrapper'>
      <ChannelsBar user={user} />
      <Outlet/>
    </div>
   </ChatProvider>
  )
}

export default ProtectedRoute