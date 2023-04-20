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
  const {handleLeaveChannel,handleJoinChannel} = useHandleChannel()
  
  let handleFc = type === 'leave' ? handleLeaveChannel: type==='join' ? handleJoinChannel : ()=>{}
  let content = (
    Array.isArray(channels) && channels?.length ? (
      <div className='channels'>
        {channels.map((channel:ChannelType)=>{
          return (
            <Channel type={type} id={channel._id!} key={channel?._id!} handleChannel={handleFc} name={channel?.channelName} avatar={channel?.channelAvatar}/>
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