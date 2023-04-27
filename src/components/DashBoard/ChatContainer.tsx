import React, { ReactNode, useCallback, useEffect } from 'react'
import CurrentChannel from './CurrentChannel/CurrentChannel'
import ChannelsBar from './ChannelsBar/ChannelsBar'
import "./ChatContainer.scss"
import { useSearch } from '../../hooks'
import { ChannelType, UserType } from '../types'
import { Outlet} from 'react-router-dom'
import useFetchChannels from '../../hooks/useFetchChannels/useFetchChannels'
export type ChannelsProps = {
  setChannels?: React.Dispatch<React.SetStateAction<ChannelType[]>>
  channels : ChannelType[]
  fetchChannels?: (signal?:AbortSignal) => Promise<void>
}

const ChatContainer = () => {
  const {channels,fetchChannels} = useFetchChannels()
  
  useEffect(
    ()=>{
      let controller = new AbortController()
      let {signal}=controller
      let handle = ()=>fetchChannels(signal)
      let timeout = setTimeout(handle,2000)
      return ()=>clearTimeout(timeout)
    },[]
    )

    let content = (
      
      <div className='chat-container-outer '>  
        <div className='chat-container-inner '>  
          <ChannelsBar fetchChannels={fetchChannels} channels={channels} />
          <CurrentChannel />
          <Outlet/>
        </div>
      </div>
    )
 
    
  return content
}

export default ChatContainer