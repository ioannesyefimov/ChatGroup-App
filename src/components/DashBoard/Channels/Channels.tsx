import React, { useEffect } from 'react'
import { APIFetch, getFirstLetter, throwErr } from '../../utils'
import useSearchChannels from '../../../hooks/useSearch'
import { Link } from 'react-router-dom'
import './Channels.scss'
import { ChannelType } from '../../types'
import Channel from '../Channel/Channel'
import { useAuth, useChat, useError, useHandleChannel } from '../../../hooks'
const Channels = ({...props}) => {
  const {handleLeaveChannel} = useHandleChannel()

  
  
  let content = (
    Array.isArray(props.channels) && props.channels?.length ? (
      <div className='channels'>
        {props.channels.map((channel:ChannelType)=>{
          return (
            <Channel key={channel?._id!} handleLeaveChannel={props?.location !== 'search'? handleLeaveChannel: undefined} name={channel?.channelName} avatar={channel?.channelAvatar} >{props.children ?? null}</Channel>
          )
        })
        }
      </div>
    ) : (
        <h4 className='hint'>{props.fallbackText ?? 'There is no channels yet'}</h4>
    )
  )


  return content
}

export default Channels