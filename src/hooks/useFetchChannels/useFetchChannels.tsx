import React, { useCallback, useEffect } from 'react'
import { useAuth, useAuthCookies, useChat, useError } from '..'
import { APIFetch, Errors, throwErr } from '../../components/utils'
import { useNavigate } from 'react-router-dom'
import { useLoading, useServerUrl, useSetLoading, useUser } from '../useAuthContext/useAuthContext'
import { useChannels, useSetChannels } from '../useChatContext/useChatContext'

const useFetchChannels = () => {
    const user = useUser()
    const serverUrl = useServerUrl()
    const setLoading = useSetLoading()
    const {cookies,setCookie} = useAuthCookies()
    const channels = useChannels()
    const setChannels = useSetChannels()
    const navigate=useNavigate()
       const fetchChannels = async()=>{
        try {
          if(!user?.email && !cookies.user.email ) {
              navigate('/auth/signin')
              return console.log(`USER IS UNDEFINED`)
          } 
          
        setLoading(true)
    
        let response = await APIFetch({url: `${serverUrl}/channels/userChannels?userEmail=${user?.email ? user.email : cookies.user.email}`, method:"GET",headers: {"Content-Type":"application/json"}})
        console.log(`CHANNELS RESPONSE:`, response)
        setCookie('channels', response?.data?.channels ?? null, {maxAge: 450,path:'/'})
        if(!response?.success){
            console.log(`ERROR`)
            throwErr(response?.err)
        }
        setChannels(response?.data.channels)
       } catch (error) {
        console.error(error)
        // setError(error)
       } finally{
            setLoading(false)
       }
    }
    

 
  
    return {channels,fetchChannels}

}

export default useFetchChannels