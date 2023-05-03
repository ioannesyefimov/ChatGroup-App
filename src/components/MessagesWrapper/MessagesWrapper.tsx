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
    console.log(`current channel`, currentChannel);
    
      console.log('messages arr',messages )
    let sorted = sortMessagesByDate(messages)
    console.log(`SORTED`, sorted);
    if(sorted?.fullMessageArray?.length){
      if(sortedMessages?.fullMessageArray?.length){
        setSortedMessages(sorted)
      }
    }

   }
  
  useEffect(
    ()=>{
        initMessages()    
      
    },[currentChannel?.messages]
  )
  let content = (
    <div className='messages-wrapper-outer'>
        {
            sortedMessages?.fullMessageArray?.length ? (
              // loop through array of every message
                Object.keys(sortedMessages?.fullMessageArray).map((messages,i)=>{
                  // then loop through every instance of array that is created on different day
                  
                    return Object?.entries(sortedMessages?.fullMessageArray![messages]).map((arr,inx)=>{
                      let date =new Date(arr[0])?.toDateString()  
                      // and return Messages with divider for day and time
                      return (
                            <Messages messages={arr[1]} date={date} key={arr[1]?.id ?? inx}  />
                        )
                        }) 
                })
            ) : (
                <div>
                    <h4>There is no any messages yet.</h4>
                </div>
            )
        }
        <SubmitInput  handleClick={handleSubmitMessage} setPropsValue={setCurrentChannel} propsValue={currentChannel} name="message-input" placeholder="Type a message here" e={undefined} value={undefined} setValue={function (value: any): void {
      throw new Error('Function not implemented.')
    } } />
    </div>
  )
  return content
}
