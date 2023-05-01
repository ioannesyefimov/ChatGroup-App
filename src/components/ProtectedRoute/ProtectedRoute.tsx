import React, { useEffect } from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuth, useAuthCookies } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'
import ChannelsBar from '../DashBoard/ChannelsBar/ChannelsBar'

import CurrentChannelProvider from '../ChatProvider/CurrentChannelProvider'
const ProtectedRoute = () => {
  const {user,setUser,setLoading} = useAuth();
  const {cookies} = useAuthCookies()
  if(!user?.email && !cookies?.user?.email) return <Navigate to="/auth/signin" replace/> 
   
  useEffect(
    ()=>{
      console.log(`APP RENDER`);
      if(!user?.email){
        let isLogged = cookies?.user
        console.log(`islogged`,isLogged);
        
        if(isLogged){
          setUser(isLogged)
        }
        
        console.log(`IS LOGGED`, isLogged);

      }
      
      setLoading(false)
    },[cookies.user]
  )
  return  (
    <ChatProvider>
      <CurrentChannelProvider>
      <div className='app-wrapper'>
        <ChannelsBar user={user} />
        <Outlet/>
      </div>
      </CurrentChannelProvider>
   </ChatProvider>
  )
}

export default ProtectedRoute