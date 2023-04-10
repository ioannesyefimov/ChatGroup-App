import React, { useCallback, useEffect } from 'react'
import CurrentChannel from './CurrentChannel/CurrentChannel'
import ChannelsBar from './ChannelsBar/ChannelsBar'
import "./DashboardMain.scss"
import { useAuth, useAuthCookies, useChat, useError } from '../../hooks'
import { UserType } from '../types'
import { APIFetch, throwErr } from '../utils'
const DashboardMain = () => {
  const {setLoading,user,serverUrl} = useAuth()
  const {setError} = useError()
  const {setChannels} = useChat()
  const {cookies} = useAuthCookies()

  const fetchChannels = useCallback(async(user:UserType,signal:AbortSignal)=>{
      try {
      setLoading(true)

      let response = await APIFetch({url: `${serverUrl}/channels?userEmail=${user?.email}`, method:"GET",signal,headers: {"Content-Type":"application/json"}})
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
  },[])

  useEffect(
      ()=>{
          let controller = new AbortController()
          console.log(`RERENDER USECHATCONTEXT`)
          let signal = controller.signal
          if(user?.email){
              fetchChannels(user,signal)
          }

      },[]
  )
  return (
    <div className='dashboard-main '>  
        <ChannelsBar/>
        <CurrentChannel />
    </div>
  )
}

export default DashboardMain