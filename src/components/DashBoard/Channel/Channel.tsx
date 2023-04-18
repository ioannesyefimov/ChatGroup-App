import { channel } from 'diagnostics_channel'
import React from 'react'
import { Link } from 'react-router-dom'
import { getFirstLetter } from '../../utils'
import './Channel.scss'
import { trashIco } from '../../../assets'
import { UserType } from '../../types'
type ChannelProps = {
    key:string|number
    name:string
    avatar?:string
    id?:string
    handleLeaveChannel?: (_id:string,)=>void
}
const Channel = ({key,name,avatar,id,handleLeaveChannel}:ChannelProps) => {
  return (
    <div key={key} className="channel">
        {avatar ? (
            <img src={avatar} alt="channel logo" className='channel-logo'/>
        ) : (
            <div className="channel-logo">{getFirstLetter(name,2)}</div>
        )}
        <Link className='link-tag' to={`/chat/?channel=${name?.replaceAll(' ', '-').trim()}`} replace><div className="channel-name">{name}</div></Link>
        {handleLeaveChannel  && (
            <button onClick={()=>handleLeaveChannel(id!)} className='left-btn'><img src={trashIco} alt="trash ico" /></button>
        )}
    </div> 
   )
}

export default Channel