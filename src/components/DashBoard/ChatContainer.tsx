import React, { ReactNode, useCallback, useEffect } from 'react'
import CurrentChannel from './CurrentChannel/CurrentChannel'
import ChannelsBar from './ChannelsBar/ChannelsBar'
import "./ChatContainer.scss"
import { useSearch, useSocket } from '../../hooks'
import { ChannelType, UserType } from '../types'
import { APIFetch, throwErr } from '../utils'
import { Outlet, useLocation } from 'react-router-dom'
import useSearchChannels from '../../hooks/useSearch'
import useFetchChannels from '../../hooks/useFetchChannels/useFetchChannels'
import { Socket } from 'socket.io-client/build/esm/socket'
import {io} from 'socket.io-client'
export type ChannelsProps = {
  setChannels?: React.Dispatch<React.SetStateAction<ChannelType[]>>
  channels : ChannelType[]
}

const ChatContainer = () => {
  const {channels,fetchChannels} = useFetchChannels()
  const socket = useSocket()
  
  useEffect(
    ()=>{
      fetchChannels()
    },[]
    )

    let content = (
      
      <div className='chat-container-outer '>  
        <div className='chat-container-inner '>  
            <ChannelsBar channels={channels} />
            {/* <CurrentChannel location={location.pathname} /> */}
            <CurrentChannel socket={socket!}  channels={channels} />
          <Outlet/>
        </div>
      </div>
    )
 
    
  return content
}

export default React.memo(ChatContainer)