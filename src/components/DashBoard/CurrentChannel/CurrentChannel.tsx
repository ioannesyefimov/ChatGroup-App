import React, { SetStateAction, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSearchChannels from '../../../hooks/useSearchChannels'
import './CurrentChannel.scss'
import { useAuth, useChat, useError } from '../../../hooks'
import { ChannelType, MessageType, UserType } from '../../types'
import Message from '../Message/Message'
import FormInput from '../../FormInput/FormInput'
import { APIFetch, setter, throwErr } from '../../utils'
type PropsType = {
  channels: ChannelType[]
  currentChannel: ChannelType
  setCurrentChannel: React.Dispatch<SetStateAction<ChannelType>>
}
const CurrentChannel = ({channels}:{channels:ChannelType[]}) => {
  const [currentMessage,setCurrentMessage] = useState('')
  const [currentChannel,setCurrentChannel] =useState<ChannelType>()
  const location = useLocation()

  useEffect(
    ()=>{
      console.log(`rerender on change pathname`)
      const handleCurrentChannel = (channels:ChannelType[],pathname:string,setCurrentChannel: React.Dispatch<React.SetStateAction<ChannelType|undefined>>)=>{
          if(!channels) return console.log(`CHANNELs AREN'T FOUND`)
          if(currentChannel?.channelName) return 
          console.log(`channels:`, channels);
          console.log(`pathname:`, pathname);
          
          let filteredChannel = channels.find((channel:ChannelType,index:string|number)=>{
              let pathNameChannel = pathname.replace('/chat/','')
              channel.channelName = channel.channelName.replaceAll(' ', '-');
              console.log(`pathNameChannel: ${pathNameChannel}`);
              console.log(`channel.channelName: ${channel.channelName}`);
              
              
             return channel.channelName=== pathNameChannel
          })
          console.log(`FILTERED CHANNEL:` , filteredChannel);
          
          if(!filteredChannel){
              return console.log(`CURRENT CHANNEL ISN'T FOUND`)
          }
          setCurrentChannel(filteredChannel)
      }
      
      handleCurrentChannel(channels,location.pathname,setCurrentChannel)
    },[location.pathname]
  )

  let title = <h2 className='channel-title'>{currentChannel?.channelName ?? "Choose your channel"}</h2>

    let channelContent =
    (
      <div className="channels-wrapper">
        {
            currentChannel?.messages.length ?  
           (
            currentChannel?.messages.map((message:MessageType,i:number|string)=>{
              return (
                <Message userName={message?.userName} message={message?.message} date={message?.date} profileImg={message?.profileImg}  />
                )
            })
           ) : (
            <h4>There is nothing to show</h4>
           )
       
        }
      </div>
  )
  return (
    <div className="main-wrapper">
      {title}
      {channelContent}
      <FormInput name='message-input' type="text" id="message-input" onChange={(e)=>setter(e,setCurrentChannel)} value={currentMessage} /> 
      </div>
    )
}

export default CurrentChannel