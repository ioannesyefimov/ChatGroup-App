import React, { useEffect } from 'react'
import { APIFetch, getFirstLetter, throwErr } from '../../utils'
import useSearchChannels from '../../../hooks/useSearch/useSearch'
import { Link } from 'react-router-dom'
import './Channels.scss'
import { ChannelType } from '../../types'
import Channel from '../Channel/Channel'
import { useAuth, useChat, useError, useHandleChannel } from '../../../hooks'
import { useUser } from '../../../hooks/useAuthContext/useAuthContext'
type PropsType = {
  type:string 
  fallbackText:string 
  channels: ChannelType[] | null
}
const Channels = ({type,fallbackText,channels}:PropsType) => {
  const user=useUser()
 
  let content = (
    Array.isArray(channels) && channels?.length ? (
      <div className='channels'>
        <div className="channels-wrapper">
          {channels.map((channel:ChannelType)=>{
            console.log(`channel`, channel);
            return (
              <Channel isJoined={channel?.isJoined ?? false} type={type} id={channel?._id!} key={channel?._id!}  name={channel?.channelName} avatar={channel?.channelAvatar ?? getFirstLetter(channel?.channelName,2)}/>
            )
          })
          }
         
        </div>
      </div>
    ) : (
        <h4 className='hint'>{fallbackText ?? 'There is no channels yet'}</h4>
    )
  )


  return content
}

export default Channels