import React, { ReactNode, useCallback, useEffect } from 'react'
import CurrentChannel from './CurrentChannel/CurrentChannel'
import ChannelsBar from './ChannelsBar/ChannelsBar'
import "./ChatContainer.scss"
import { useAuth, useAuthCookies, useChat, useError } from '../../hooks'
import { ChannelType, UserType } from '../types'
import { APIFetch, throwErr } from '../utils'
import { Outlet, useLocation } from 'react-router-dom'
import useSearchChannels from '../../hooks/useSearchChannels'
const ChatContainer = () => {
    const {setLoading,user,serverUrl} = useAuth()
    const {cookies} = useAuthCookies()
    const {setError} = useError()
    const {channels,setChannels} = useChat()

 
    const fetchChannels = useCallback(async()=>{
        try {
          if(!user?.email && !cookies.user?.email) return console.log(`USER IS UNDEFINED`)
        setLoading(true)
    
        let response = await APIFetch({url: `${serverUrl}/channels?userEmail=${user?.email}`, method:"GET",headers: {"Content-Type":"application/json"}})
        console.log(`CHANNELS RESPONSE:`, response)
        if(!response?.success){
            console.log(`ERROR`)
            throwErr(response?.message)
        }
    
        setChannels([response?.data.channels])
       } catch (error) {
        console.error(error)
        setError(error)
       } 
    },[]
    )
     useEffect(
    ()=>{
        fetchChannels() 
    },[]
    )
 
    
  return (
    
    <div className='chat-container-outer '>  
        <div className='chat-container-inner '>  
            <ChannelsBar channels={channels}/>
            {/* <CurrentChannel location={location.pathname} /> */}
            <CurrentChannel channels={channels} />

        </div>
    </div>
  )
}

export default ChatContainer