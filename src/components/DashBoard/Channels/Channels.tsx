import React, { useEffect } from 'react'
import { APIFetch, getFirstLetter, throwErr } from '../../utils'
import useSearchChannels from '../../../hooks/useSearch/useSearch'
import { Link } from 'react-router-dom'
import './Channels.scss'
import { ChannelType, UserType } from '../../types'
import Channel from '../Channel/Channel'
import { useAuth, useChat, useHandleChannel } from '../../../hooks'
import { useUser } from '../../../hooks/useAuthContext/useAuthContext'
type PropsType = {
  type:string 
  fallbackText:string 
  channels: ChannelType[] 
}
const Channels = ({type,fallbackText,channels}:PropsType) => {
  const user=useUser()
  let content = (
    channels?.length ? (
      <div className='channels'>
        <div className="channels-wrapper">
          {
            channels.map((channel:ChannelType,index)=>{
              let isJoined = channel?.members?.some((member:UserType)=>member?.member?._id === user?._id! || member.member === user?._id);
            return (
            <Channel isJoined={isJoined} type={type} id={channel?._id!} key={channel?._id!}  name={channel?.channelName} avatar={channel?.channelAvatar}/>
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