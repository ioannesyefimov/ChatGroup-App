import React, { ForwardedRef, SetStateAction } from 'react'
import './Message.scss'
import { APIFetch, createDate, throwErr } from '../../utils'
import Button from '../../Button/Button'
import { trashIco, userIco } from '../../../assets'
import { UserType } from '../../types'
import MemberInfo from '../../UserSearch/UserSearch'
import { useNavigate } from 'react-router-dom'
import { useAuth, useMessagesContext } from '../../../hooks'
type PropsType = {
    createdAt:{day:string,time:string}
    message:string
    messageUser?:UserType
    key:any
    _id?: string
}

type DisplayDateProps ={
  date:{
    day:string,
    time:string
    date: ()=>Date 
    timeStamp:'string'

  }
}
const displayDate = (date:DisplayDateProps) => {
  let currentDate = Number(createDate().date())
  let messageDate = Number(new Date(date?.timeStamp)) 
  
  let isToday:boolean = (messageDate - currentDate == 0) 
  let isYesterday:boolean = (messageDate - currentDate < 0) 
  
  if(isToday){
    return `today at ${date.time}`
  }else if(isYesterday){
    return `yesterday at ${date.time}`

  }else {
    return `${date.day} at ${date.time}`

  }
}



const Message = React.forwardRef(({createdAt,message,messageUser,_id}:PropsType,ref:ForwardedRef<HTMLDivElement | undefined>) => {
  const {handleDeleteMessage}=useMessagesContext()!
  const {user} = useAuth()
  const navigate = useNavigate()
  let sentBy = user?._id === messageUser?._id ? 'sent' : 'received'  
  
  let visitProfileFunc = sentBy ==='received' ? (
    ()=>navigate(`/user?id=${messageUser?._id}`) 
  ) : ()=>navigate('/profile')

return (
    <div  className={`message ${sentBy}`}>
         <button onClick={visitProfileFunc} className='show-member-button'>
                <img className='message-logo' src={messageUser?.picture ?? userIco} alt="profile-logo" />
          </button>
      
       <div className="message-wrapper">
         <span className="message-name">{messageUser?.userName}</span>
         <span className="message-date">{displayDate(createdAt)}</span>
       </div>
       <p className="message-text">{message}</p>
       {sentBy==='sent'? (
         <Button img={trashIco} name='message-delete' type="button" onClick={()=>handleDeleteMessage(_id!,)} />

       ): (
        null
       )}
    <div className="scrolledToDiv" ref={ref}></div>
     </div>
  )
})

export default Message