import React, { SetStateAction } from 'react'
import './Message.scss'
import { APIFetch, createDate, throwErr } from '../../utils'
import Button from '../../Button/Button'
import { trashIco, userIco } from '../../../assets'
import { UserType } from '../../types'
import MemberInfo from '../../UserSearch/UserSearch'
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

const displayDate = (date:{day:string,time:string}) => {
  let currentDate = createDate()
  let day = Number(date.day.slice(0,2))
  let currentDay = Number(currentDate.day.slice(0,2))
    
  if(day-currentDay === 0){
    return `today at ${date.time}`
  }else if(day-currentDay === -1){
    return `yesterday at ${date.time}`

  }else {
    return `${date.day} at ${date.time}`

  }
}



const Message = ({deleteMessage,user,createdAt,message,messageUser,key,_id}:PropsType) => {


console.log(`USERID:`, user._id);
console.log(`messageUserId:`, messageUser?._id);

  return (
    <div key={key} className='message'>
         <button className='show-member-button'>
                <img className='message-logo' src={user?.picture ?? userIco} alt="profile-logo" />
            </button>
      
       <div className="message-wrapper">
         <span className="message-name">{user?.userName}</span>
         <span className="message-date">{displayDate(createdAt)}</span>
       </div>
       <p className="message-text">{message}</p>
       {user?._id == messageUser?._id ? (
         <Button img={trashIco} name='message-delete' type="button" onClick={()=>deleteMessage(_id!)} />

       ): (null)}
     </div>
  )
}

export default Message