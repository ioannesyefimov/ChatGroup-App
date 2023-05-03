import React, { SetStateAction, useEffect, useState } from 'react'
import { sleep, sortMessages } from '../utils'
import { ChannelType, MessageType } from '../types'
import Messages from './Messages/Messages'
import { useMessagesContext } from '../../hooks'
import SubmitInput from '../SubmitInput/SubmitInput'

type PropsType ={
    currentChannel: ChannelType | null
    setCurrentChannel: React.Dispatch<SetStateAction<ChannelType|null>>
}


export default function MessagesWrapper({currentChannel,setCurrentChannel}:PropsType) {
   const {sortedMessages,setSortedMessages,handleSubmitMessage,handleDeleteMessage}=useMessagesContext()!

   let initMessages = async()=>{
    await sleep(1000);
    let messages= currentChannel?.messages
    console.log(`current channel`, currentChannel);
    
      if(!messages?.length) return
      console.log('messages arr',messages )
    let sorted = sortMessages(messages)
    console.log(`SORTED`, sorted);
    if(sorted?.fullMessageArray?.length){
      setSortedMessages(sorted)
    }

   }
  
  useEffect(
    ()=>{
        initMessages()    
      
    },[currentChannel?.messages]
  )
  let content = (
    <div className='messages-wrapper'>
        {
            sortedMessages?.fullMessageArray?.length ? (
                Object.keys(sortedMessages?.fullMessageArray).map((messages,i)=>{
                    return Object?.entries(sortedMessages?.fullMessageArray![messages]).map((arr,inx)=>{
                        return (
                            <Messages messages={arr[1]} date={arr[0]} key={arr[1]?.id ?? inx}  />
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
