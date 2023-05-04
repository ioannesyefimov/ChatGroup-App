import {useAuth, useAuthCookies } from '..'
import { APIFetch, Errors, throwErr } from '../../components/utils'
import { useNavigate } from 'react-router-dom'
import { useServerUrl, useSetLoading, useUser } from '../useAuthContext/useAuthContext'
import { useChannels, useSetChannels } from '../useChatContext/useChatContext'
import { useCallback, useEffect, useMemo } from 'react'
import { UserType } from '../../components/types'

const useFetchChannels = (user:UserType) => {
    const serverUrl = useServerUrl()
    const setLoading = useSetLoading()
    const {cookies,setCookie} = useAuthCookies()
    const channels = useChannels()
    const setChannels = useSetChannels()
    // const user=useUser()
    const fetchChannels = 
    async(user:UserType,signal?:AbortSignal)=>{
        setLoading(true)
        try {
            if(!user?.email ) {
                return console.log(`USER IS UNDEFINED`)
            } 
            let response = await APIFetch({signal,url: `${serverUrl}/channels/userChannels?userEmail=${user?.email ? user.email : cookies.user.email}`, method:"GET",headers: {"Content-Type":"application/json"}})
            console.log(`CHANNELS RESPONSE:`, response)
            let channels = JSON.stringify(response?.data?.channels)

            setCookie('channels', channels, {maxAge: 450,path:'/'})
            if(!response?.success){
                console.log(`ERROR`)
                throwErr(response?.err)
            }
            // let updatedChannels = {...cookies.channels,channels:response.data.channels} 
            // setCookie('channels',updatedChannels,{path:'/',maxAge:2000})
        } catch (error) {
        console.error(error)
        } finally{
            setLoading(false)
        }
    }
    
    useEffect(
        ()=>{
            setLoading(true)
            let isChannels = cookies?.channels
            if(isChannels?.length){
                console.log(`CHANNELS`, isChannels);
                
                setChannels(typeof isChannels ==='object' ? isChannels : [isChannels])
            }else if(user.channels?.length) {
                
                setChannels(typeof user.channels ==='object' ? user.channels : [user.channels])
            }
            setLoading(false)
        },[user?.email,cookies.channels]
        )
    
 
        let value =useMemo(
            ()=>({channels,fetchChannels}),[channels]) 
    return value

}

export default  useFetchChannels