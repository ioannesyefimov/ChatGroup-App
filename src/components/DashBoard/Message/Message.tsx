import React from 'react'
import './Message.scss'
import { createDate } from '../../utils'
type PropsType = {
    userName:string
    createdAt:{day:string,time:string}
    message:string
    profileImg?:string
    key:any
}

const displayDate = (date:{day:string,time:string}) => {
let newDate = createDate();
  let showedDate = '' 
  let day = Number(date.day.slice(0,2))
  let newDay = Number(newDate.day.slice(0,2))
  showedDate = `${date.day} at ${date.time}`
  if(day- newDay === 0){
    showedDate = `today at ${date.time}`
  }
  else if ((newDay-day) === 1){
    showedDate = `yesterday at ${date.time}`
  }
  return showedDate

}

const Message = ({userName,createdAt,message,profileImg,key}:PropsType) => {
  return (
    <div key={key} className='message'>
       <img className='message-logo' src={profileImg} alt="profile-logo" />
       <div className="message-wrapper">
         <span className="message-name">{userName}</span>
         <span className="message-date">{displayDate(createdAt)}</span>
       </div>
       <p className="message-text">{message}</p>
     </div>
  )
}

export default Message