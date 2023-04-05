import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'

const ProtectedRoute = () => {
    const {user} = useAuth()

    if(!user?.email) return <Navigate to="/auth/signin" replace/>

  return (
   <ChatProvider channels={[]} setChannels={()=>{}}  >
     <Outlet/>
   </ChatProvider>
  )
}

export default ProtectedRoute