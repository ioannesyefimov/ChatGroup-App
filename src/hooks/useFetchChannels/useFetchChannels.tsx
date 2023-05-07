import {useAuth, useAuthCookies } from '..'
import { APIFetch, Errors, throwErr } from '../../components/utils'
import { useNavigate } from 'react-router-dom'
import { useServerUrl, useSetLoading, useUser } from '../useAuthContext/useAuthContext'
import { useChannels, useSetChannels } from '../useChatContext/useChatContext'
import { useCallback, useEffect, useMemo } from 'react'
import { UserType } from '../../components/types'

const useFetchChannels = (user:UserType) => {
    const serverUrl = useServerUrl()
    // const {user}=useAuth()
    const setLoading = useSetLoading()
    const {cookies,setCookie} = useAuthCookies()
    const channels = useChannels()
    const setChannels = useSetChannels()
    // const user=useUser()
    const fetchChannels = useCallback(
    async(user:UserType,signal?:AbortSignal)=>{
        setLoading(true)
        try {
            if(!user?.email ) {
                return console.log(`USER IS UNDEFINED`)
            } 
            let response = await APIFetch({signal,url: `${serverUrl}/channels/userChannels?userEmail=${user?.email ? user.email : cookies.user.email}`, method:"GET",headers: {"Content-Type":"application/json"}})
            console.log(`CHANNELS RESPONSE:`, response)
            if(!response?.success){
                throwErr(response?.err)
            }
            let channels = response?.data?.channels
            console.log(`channels`, channels);
            
            setCookie('channels', channels, {maxAge: 2000,path:'/'})
            // let updatedUser = {...user,channels:channels}
            
            setCookie('user',response.data.user,{path:'/',maxAge:2000})
        } catch (error) {
        console.error(error)
        } finally{
            setLoading(false)
        }
    },[user])
    
    useEffect(
        ()=>{
            setLoading(true)
            let userchannels:any  = user?.channels.map(channel=>channel.channel)
            // let longer = channels?.length > userchannels?.length  ? channels : userchannels
            console.log(`user channels`, userchannels);
            // console.log(`longer`,longer);
            // if(longer?.length){
            if(userchannels?.length){
                setChannels(userchannels)
            }
                setLoading(false)
        },[user.channels]
        )
    
 
        let value =useMemo(
            ()=>({channels,fetchChannels}),[channels]) 
    return value

}

export default  useFetchChannels