import React, { SetStateAction, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSearchChannels from '../../../hooks/useSearchChannels'
import './CurrentChannel.scss'
import { useAuth, useChat, useError } from '../../../hooks'
import { ChannelType, MessageType, UserType } from '../../types'
import Message from '../Message/Message'
import FormInput from '../../FormInput/FormInput'
import { APIFetch, setter, throwErr, validateInput } from '../../utils'
import { sendIco } from '../../../assets'
import { Button } from '../..'
import { ChannelsProps } from '../ChatContainer'
import MessageInput from './MessageInput'



const CurrentChannel = ({channels,setChannels}:ChannelsProps) => {
  const [currentChannel,setCurrentChannel] =useState<ChannelType | null>(null)
  const {user,setLoading} = useAuth()
  const {setError} = useError()
  const location = useLocation()

 const handleCurrentChannel = async(channels:ChannelType[] ,pathname:string)=>{
   let pathNameChannel = pathname.replace('/chat/','').replaceAll(' ', '-')?.trim()
  if(currentChannel?.channelName && pathNameChannel !== currentChannel.channelName.replaceAll(' ', '-')) {
    setCurrentChannel(null)
  }

  
  console.log(`channels:`, channels);
  console.log(`pathname:`, pathname);
  
  let filteredChannel = channels.find((channel:ChannelType,index:string|number)=>{
      console.log(`pathNameChannel: ${pathNameChannel}`);
      console.log(`channel.channelName: ${channel.channelName}`);
      
      if(channel.channelName.replaceAll(' ', '-') === pathNameChannel){
        return channel
      }
  })
  console.log(`FILTERED CHANNEL:` , filteredChannel);
  
  if(!filteredChannel){
      return console.log(`CURRENT CHANNEL ISN'T FOUND`)
  }
  setCurrentChannel(filteredChannel)
  if(!channels.length){
    let response = await APIFetch({url:`http://localhost:5050/api/channel/${pathNameChannel}?userEmail=${user?.email}`,method:'GET'});
    if(!response.success) throwErr(response?.message)
    setCurrentChannel(response?.data?.channels)
    return

  }
}
  useEffect(
    ()=>{
      console.log(`rerender on change pathname`)
      handleCurrentChannel(channels,location.pathname)
    },[location.pathname,channels]
  )

  let title = <h2 className='channel-title'>{currentChannel?.channelName}</h2>

    let channelContent =
    (
      <div className="main-wrapper">
        {title}
        <div className="messages-wrapper">
          {
              currentChannel?.channelName && currentChannel?.messages.length ?  
             (
              currentChannel?.messages.map((message:MessageType,i:number|string)=>{
                
                return (
                  <Message key={message?.id} userName={message?.user.userName} message={message?.message} createdAt={message?.createdAt} profileImg={message?.user?.picture}  />
                  )
                })
                ) : (
                  <h4>There is no messages in {currentChannel?.channelName}</h4>
                  )
                }
        </div>
        {/* <FormInput placeholder='Type a message here' name='message-input'    type="text" id="message-input" onChange={}  value= {currentMessage} */}
        {/* > */}
        {/* </FormInput>  */}
        <MessageInput name="message-input" placeholder="Type a message here" />
      </div>
  )
  return currentChannel?.channelName ? channelContent : (
   <div className='main-wrapper'>
     <h2 className='channel-title'>Choose your channel</h2>
    </div>
  )
}

export default CurrentChannel