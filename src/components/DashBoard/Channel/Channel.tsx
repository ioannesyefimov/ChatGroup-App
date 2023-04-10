import { channel } from 'diagnostics_channel'
import React from 'react'
import { Link } from 'react-router-dom'
import { getFirstLetter } from '../../utils'
import './Channel.scss'
type ChannelProps = {
    key:string|number
    name:string
    avatar?:string
}
const Channel = ({key,name,avatar}:ChannelProps) => {
  return (
    <div key={key} className="channel">
        {avatar ? (
            <img src={avatar} alt="channel logo" className='channel-logo'/>
        ) : (
            <div className="channel-logo">{getFirstLetter(name,2)}</div>
        )}
        <Link className='link-tag' to={`/chat/${name.trim().replaceAll(' ', '-')}`} replace><div className="channel-name">{name}</div></Link>
    </div> 
   )
}

export default Channel