import  { useEffect } from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import {  useAuthCookies } from '../../hooks'
import ChannelsBar from '../DashBoard/ChannelsBar/ChannelsBar'
import SocketStore from '../SocketStore'
import { sleep } from '../utils'


import { useAuthStore, useChatStore } from '../../ZustandStore'

const {io,serverUrl,certOptions}=SocketStore()

const userSocket = io(`${serverUrl}/user`,{autoConnect:false,pfx:certOptions.pfx,passphrase:certOptions.passphrase});

const ProtectedRoute = () => {
  const setChannels =useChatStore(s=>s.setChannels)
  const {cookies,clearState} = useAuthCookies()
  const {user,setUser,setLoading}=useAuthStore()
  if(!user?.email && !cookies?.user?.email) return <Navigate to="/auth/signin" replace/> 
   
  useEffect(
    ()=>{
      console.log(`cookies`,cookies);
      
      sleep(500).then( 
        async()=>{
        let isLogged = cookies?.user
      
        if(isLogged?.email){
          setUser(isLogged);
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
      setLoading(false)
      }
      )
    },[cookies.user]
  )

  useEffect(
    ()=>{
      if(!cookies.accessToken){
        clearState('')
      }
    },[cookies.accessToken]
  )
  return  (
      <div className='app-wrapper'>
        <ChannelsBar user={user} />
        <Outlet/>
      </div>
  )
}

export default ProtectedRoute