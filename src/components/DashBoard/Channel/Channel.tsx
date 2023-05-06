import { channel } from 'diagnostics_channel'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getFirstLetter } from '../../utils'
import './Channel.scss'
import { correctUploadIco, joinIco, trashIco } from '../../../assets'
import { UserType } from '../../types'
import Button from '../../Button/Button'
import { useAuth, useHandleChannel } from '../../../hooks'
type ChannelProps = {
    id:string
    isJoined?:boolean 
    name:string
    avatar?:string
    type?:string
    handleChannel?:(_id:string,user:UserType)=>void 
}
const Channel = ({isJoined, name,avatar,handleChannel,id,type}:ChannelProps) => {
    const {user}=useAuth()
    const {handleLeaveChannel,handleJoinChannel} = useHandleChannel()
    const navigate=useNavigate()
    
    let handleFc =
     (type === 'leave') ?
         ()=>handleLeaveChannel(id!,user!) :
        (type==='join' ) ? 
        ()=> handleJoinChannel(id,user) :
         (isJoined) ?
          ()=>navigate(`/chat/?channel=${id}`)
           : ()=>{}
    let btmImg = (type==='leave') ? trashIco : (type==='join' ) ? joinIco : (isJoined) ? correctUploadIco : ''
    let content = (
        (
            <div className="channel">
                {avatar ? (
                    <img src={avatar} alt="channel logo" className='channel-logo'/>
                ) : (
                    <div className="channel-logo">{getFirstLetter(name,2)}</div>
                )}
                <Link className='link-tag' to={`/chat/?channel=${id}`} replace><div className="channel-name">{name}</div></Link>
                {type!==''  ? (
                    <Button onClick={handleFc} name={type??''} img={btmImg}  />
                ): (
                    null
                )}
            </div> 
           )
    )
  return content
}

export default Channel