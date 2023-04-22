import React, { useEffect } from 'react'
import { APIFetch, getFirstLetter, throwErr } from '../../utils'
import useSearchChannels from '../../../hooks/useSearch'
import { Link } from 'react-router-dom'
import './Channels.scss'
import { ChannelType } from '../../types'
import Channel from '../Channel/Channel'
import { useAuth, useChat, useError, useHandleChannel } from '../../../hooks'
type PropsType = {
  type:string 
  fallbackText:string 
  channels: ChannelType[] | null
}
const Channels = ({type,fallbackText,channels}:PropsType) => {
  
 
  let content = (
    Array.isArray(channels) && channels?.length ? (
      <div className='channels'>
        {channels.map((channel:ChannelType)=>{
          return (
            <Channel type={type} id={channel._id!} key={channel?._id!}  name={channel?.channelName} avatar={channel?.channelAvatar ?? getFirstLetter(channel?.channelName,2)}/>
          )
        })
        }
      </div>
    ) : (
        <h4 className='hint'>{fallbackText ?? 'There is no channels yet'}</h4>
    )
  )


  return content
}

export default Channels