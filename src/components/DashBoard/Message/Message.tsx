import React, { SetStateAction } from 'react'
import './Message.scss'
import { APIFetch, createDate, throwErr } from '../../utils'
import Button from '../../Button/Button'
import { trashIco } from '../../../assets'
import { UserType } from '../../types'
type PropsType = {
  user:UserType
    createdAt:{day:string,time:string}
    message:string
    messageUser?:UserType
    key:any
    _id?: string
    channelName: string
    deleteMessage: (_id:string) => Promise<void>
}

const displayDate = (date:Date) => {
 
}


const Message = ({deleteMessage,user,createdAt,message,messageUser,key,_id}:PropsType) => {



  return (
    <div key={key} className='message'>
       <img className='message-logo' src={messageUser?.picture} alt="profile-logo" />
       <div className="message-wrapper">
         <span className="message-name">{user?.userName}</span>
         <span className="message-date">{displayDate(createdAt)}</span>
       </div>
       <p className="message-text">{message}</p>
       {user?.id === messageUser?.id ? (
         <Button img={trashIco} name='msg-delete' type="button" onClick={()=>deleteMessage(_id)} />

       ): (null)}
     </div>
  )
}

export default Message