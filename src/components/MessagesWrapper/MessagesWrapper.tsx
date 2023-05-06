import React, { SetStateAction, useEffect, useState } from 'react'
import { sleep, sortMessagesByDate } from '../utils'
import { ChannelType, MessageType } from '../types'
import Messages from './Messages/Messages'
import { useMessagesContext } from '../../hooks'
import SubmitInput from '../SubmitInput/SubmitInput'
import './MessagesWrapper.scss'
type PropsType ={
    currentChannel: ChannelType | null
    setCurrentChannel: React.Dispatch<SetStateAction<ChannelType|null>>
}


export default function MessagesWrapper({currentChannel,setCurrentChannel}:PropsType) {
   const {sortedMessages,setSortedMessages,handleSubmitMessage,handleDeleteMessage}=useMessagesContext()!

   let initMessages = async()=>{
    await sleep(1000);
    let messages= currentChannel?.messages
    if(!messages?.length) return
    let sorted = sortMessagesByDate(messages)
    if(sorted?.fullMessageArray?.length){
    if(sortedMessages?.length){
      setSortedMessages(sorted.fullMessageArray)
    }else{
      setSortedMessages(sorted.fullMessageArray)
    }
    }

   }
  
  useEffect(
    ()=>{
        initMessages()    
      
    },[currentChannel?.messages]
  )
  let messages= 
    sortedMessages?.length ? (
      
      // loop through array of every message
        Object.keys(sortedMessages).map((arrays: any,i:number)=>{
          // then loop through every instance of array that is created on different day
          
            return Object?.keys(sortedMessages[arrays]).map((key:any)=>{
              let date =new Date(key)?.toDateString()  
              let messages:unknown = sortedMessages[arrays][key]
              // and return Messages with divider for day and time
              return(
                    <Messages messages={messages as MessageType[]} date={date} key={sortedMessages[arrays][key]?._id ?? 'newkey'}   />
                )
                }) 
        }) 
        ): (
            <div>
              <h4>There is no any messages yet.</h4>
            </div>
          )
        // let todaysMessages =sortedMessages?.dayMessageArray.length ? (
        //     <Messages messages={sortedMessages?.dayMessageArray} date={'today'} />
        // ): (
        //   
        // )
  
  let content = (
    <div className='messages-wrapper-outer'>
      {messages}
      {/* {todaysMessages} */}
        
        <SubmitInput  handleClick={handleSubmitMessage} setPropsValue={setCurrentChannel} propsValue={currentChannel} name="message-input" placeholder="Type a message here" e={undefined} value={undefined} setValue={function (value: any): void {
      throw new Error('Function not implemented.')
    } } />
    </div>
  )
  return content
}
