import { channel } from 'diagnostics_channel'
import React from 'react'
import { Link } from 'react-router-dom'
import { getFirstLetter } from '../../utils'
import './Channel.scss'
import { trashIco } from '../../../assets'
import { UserType } from '../../types'
type ChannelProps = {
    key:string
    name:string
    avatar?:string
    handleLeaveChannel?:(_id:string,)=>void 
    children?: React.ReactNode
}
const Channel = ({key,name,avatar,handleLeaveChannel, ...props}:ChannelProps) => {
  return (
    <div key={key} className="channel">
        {avatar ? (
            <img src={avatar} alt="channel logo" className='channel-logo'/>
        ) : (
            <div className="channel-logo">{getFirstLetter(name,2)}</div>
        )}
        <Link className='link-tag' to={`/chat/?channel=${name?.replaceAll(' ', '-').trim()}`} replace><div className="channel-name">{name}</div></Link>
        {handleLeaveChannel  ? (
            <button onClick={()=>handleLeaveChannel(key!)} className='left-btn'><img src={trashIco} alt="trash ico" /></button>
        ): null}
        {props.children ?? null}
    </div> 
   )
}

export default Channel