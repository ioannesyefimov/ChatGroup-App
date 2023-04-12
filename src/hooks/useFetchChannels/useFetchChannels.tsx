import React, { useCallback, useEffect } from 'react'
import { useAuth, useAuthCookies, useChat, useError } from '..'
import { APIFetch, throwErr } from '../../components/utils'

const useFetchChannels = () => {
    const {setLoading,user,serverUrl} = useAuth()
    const {cookies} = useAuthCookies()
    const {setChannels,channels} = useChat()
    const {setError} = useError();
       const fetchChannels = useCallback(async()=>{
        try {
          if(!user?.email && !cookies.user.email ) return console.log(`USER IS UNDEFINED`)
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
  
    return {channels,setChannels}

}

export default useFetchChannels