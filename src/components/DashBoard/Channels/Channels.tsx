import React, { useEffect } from 'react'
import { getFirstLetter } from '../../utils'
import useSearchChannels from '../../../hooks/useSearchChannels'
import { Link } from 'react-router-dom'
import './Channels.scss'
import { ChannelType } from '../../types'
import Channel from '../Channel/Channel'
const Channels = ({...props}) => {

  let content = (
    Array.isArray(props.channels) && props.channels?.length ? (
      <div className='channels'>
        {props.channels.map((channel:ChannelType)=>{
          return (
            <Channel key={channel?._id!} name={channel?.channelName} avatar={channel?.channelAvatar} />
          )
        })
        }
      </div>
    ) : (
        <Channel key="first" name="FRONT-END DEVELOPERS"  />
    )
  )


  return content
}

export default Channels