import React, { ReactNode, useCallback, useEffect } from 'react'
import CurrentChannel from './CurrentChannel/CurrentChannel'
import ChannelsBar from './ChannelsBar/ChannelsBar'
import "./ChatContainer.scss"
import { useAuth, useAuthCookies, useChat, useError } from '../../hooks'
import { ChannelType, UserType } from '../types'
import { APIFetch, throwErr } from '../utils'
import { Outlet, useLocation } from 'react-router-dom'
import useSearchChannels from '../../hooks/useSearchChannels'
import useFetchChannels from '../../hooks/useFetchChannels/useFetchChannels'
export type ChannelsProps = {
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>
  channels : ChannelType[]
}
const ChatContainer = () => {
    const {channels,setChannels} = useFetchChannels()


    let content = (
      
      <div className='chat-container-outer '>  
        <div className='chat-container-inner '>  
            <ChannelsBar setChannels={setChannels} channels={channels ?? []}/>
            {/* <CurrentChannel location={location.pathname} /> */}
            <CurrentChannel  setChannels={setChannels} channels={channels} />
          <Outlet/>
        </div>
      </div>
    )
 
    
  return content
}

export default ChatContainer