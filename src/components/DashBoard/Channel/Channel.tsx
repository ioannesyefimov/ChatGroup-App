import { channel } from 'diagnostics_channel'
import React from 'react'
import { Link } from 'react-router-dom'
import { getFirstLetter } from '../../utils'
import './Channel.scss'
import { joinIco, trashIco } from '../../../assets'
import { UserType } from '../../types'
import Button from '../../Button/Button'
type ChannelProps = {
    key:string
    id:string
    name:string
    avatar?:string
    type?:string
    handleChannel?:(_id:string,)=>void 
}
const Channel = ({key,name,avatar,handleChannel,id,type}:ChannelProps) => {
  return (
    <div className="channel">
        {avatar ? (
            <img src={avatar} alt="channel logo" className='channel-logo'/>
        ) : (
            <div className="channel-logo">{getFirstLetter(name,2)}</div>
        )}
        <Link className='link-tag' to={`/chat/?channel=${name?.replaceAll(' ', '-').trim()}`} replace><div className="channel-name">{name}</div></Link>
        {type!==''  ? (
            <Button onClick={()=>handleChannel!(id)} name='handle-btn' img={type==='leave' ? trashIco : type==='join' ? joinIco : ''}  />
        ): (
            null
        )}
    </div> 
   )
}

export default Channel