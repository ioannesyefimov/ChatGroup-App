import React, { useEffect, useState } from 'react'
import Message from '../../DashBoard/Message/Message';
import { ChannelType, MessageType, UserType } from '../../types';
import Button from '../../Button/Button';
import { sortMessages } from '../../utils';
import { useMessagesContext } from '../../../hooks';
type PropsType ={
    
    messages?: MessageType[]
    date?: string
    user?:UserType
    scrollToRef?:  React.ForwardedRef<HTMLDivElement |undefined>
}
const Messages = ({messages,user,scrollToRef,date}:PropsType) => {
  
    let content = (
      <>
        <div className="messages-wrapper" id='messagesWrapper' >
          <div className='data-divider'>
            <span >{date}</span>
          </div> 
          {
            messages?.map((message:MessageType,i:number|string)=>{
              return (
                <Message ref={scrollToRef} _id={message?.id} key={message?.id}  message={message?.message} createdAt={message?.createdAt} messageUser={message?.user}  />
                )
              })
            }
            <Button onClick={()=>{document.getElementById('messagesWrapper')!.scrollTop = 10000}} name='down-btn' text="↓"/>
        </div>
      </>
    )
  return content
}

export default Messages