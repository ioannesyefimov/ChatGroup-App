import React, { ReactNode, useCallback, useEffect } from 'react'
import CurrentChannel from './CurrentChannel/CurrentChannel'
import ChannelsBar from './ChannelsBar/ChannelsBar'
import "./ChatContainer.scss"
import { useAuth, useSearch } from '../../hooks'
import { ChannelType, UserType } from '../types'
import { Outlet} from 'react-router-dom'
import useFetchChannels from '../../hooks/useFetchChannels/useFetchChannels'
import CurrentChannelProvider from '../ChatProvider/CurrentChannelProvider'
export type ChannelsProps = {
  setChannels?: React.Dispatch<React.SetStateAction<ChannelType[]>>
  channels : ChannelType[]
  fetchChannels?: (signal?:AbortSignal) => Promise<void>
}

const ChatContainer = () => {
    let content = (
      <CurrentChannelProvider>
        <div className='chat-container-outer '>  
            <CurrentChannel />
            <Outlet/>
        </div>

      </CurrentChannelProvider>
    )
 
    
  return content
}

export default ChatContainer