import React, { useEffect } from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuth, useAuthCookies, useChat } from '../../hooks'
import ChatProvider from '../ChatProvider/ChatProvider'
import ChannelsBar from '../DashBoard/ChannelsBar/ChannelsBar'
import CurrentChannelProvider from '../ChatProvider/CurrentChannelProvider'
import SocketStore from '../SocketStore'
import { sleep } from '../utils'
import { ChannelType } from '../types'


const {io,serverUrl,certOptions}=SocketStore()

const userSocket = io(`${serverUrl}/user`,{autoConnect:false,pfx:certOptions.pfx,passphrase:certOptions.passphrase});

const ProtectedRoute = () => {
  const {user,setUser,setLoading} = useAuth();
  const {cookies} = useAuthCookies()
  const {setChannels} =useChat()
  if(!user?.email && !cookies?.user?.email) return <Navigate to="/auth/signin" replace/> 
   
  useEffect(
    ()=>{
      console.log(`cookies`,cookies);
      
      sleep(500).then( 
        async()=>{
        let isLogged = cookies?.user
        let channels = cookies?.channels
        console.log(`cookie channels`, channels);
        let userchannels:any  = isLogged.channels.map(channel=>channel.channel)
        let longer = channels?.length > userchannels?.length  ? channels : userchannels
        console.log(`longer`,longer);
        
        if(isLogged){
          setUser(isLogged);
          if(longer?.length){
            setChannels(longer)
          }
      }
      setLoading(false)
      }
      )
      
    },[cookies.user]
  )
  useEffect(
    ()=>{
      if(user?.email){
        userSocket.connect()

        userSocket.emit('user_online',{userId:user?._id})
        let onOnline = (data: any)=>{
          console.log(`onOnline:`, data)
        } 
        let onConnection = ()=>{
          console.log(`CONNECTED TO USER SOCKET`,)
        }
  
        userSocket.on('user_online',onOnline)
        userSocket.on('connect',onConnection)
  
        return ()=>{
          userSocket.off('user_online')
          userSocket.off('connect',onConnection)
        }

      }

    },[user.email]
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