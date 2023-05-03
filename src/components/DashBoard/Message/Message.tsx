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

const displayDate = (date:{day:string,time:string}) => {
  let currentDate = createDate()
  let day = Number(date.day.slice(8,10))
  let currentDay = Number(currentDate.day.slice(8,10))
    
  if(day-currentDay === 0){
    return `today at ${date.time}`
  }else if(day-currentDay === -1){
    return `yesterday at ${date.time}`

  }else {
    return `${date.day} at ${date.time}`

  }
}



const Message = React.forwardRef(({createdAt,message,messageUser,_id}:PropsType,ref:ForwardedRef<HTMLDivElement | undefined>) => {
  const {handleDeleteMessage}=useMessagesContext()!
  const {user} = useAuth()
  const navigate = useNavigate()
  console.log(`user`,user);
  console.log(`sentuser`,messageUser);
  
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