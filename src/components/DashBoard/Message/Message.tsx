import React from 'react'
import './Message.scss'
type PropsType = {
    userName:string
    date:string
    message:string
    profileImg?:string
}

const Message = ({userName,date,message,profileImg}:PropsType) => {
  return (
    <div key={date} className='message'>
       <img className='message-logo' src={profileImg} alt="profile-logo" />
       <div className="message-wrapper">
         <span className="message-name">{userName}</span>
         <span className="message-date">{date}</span>
       </div>
       <p className="message-text">{message}</p>
     </div>
  )
}

export default Message