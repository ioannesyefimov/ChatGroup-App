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



const CurrentChannel = ({channels,setChannels}:ChannelsProps) => {
  const [currentMessage,setCurrentMessage] = useState('')
  const [currentChannel,setCurrentChannel] =useState<ChannelType>()
  const {user,setLoading} = useAuth()
  const {setError} = useError()
  const location = useLocation()
 const handleSubmitMessage = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    try {
      setLoading(true)
      if(!currentMessage) return console.log(`MESSAGE ISN'T TYPED `)

      let response = await APIFetch({url: `http://localhost:5050/api/messages/create`,method:'POST', body: {
        userEmail: user?.email,channelName: currentChannel?.channelName,message:currentMessage
      }})

      if(!response.success) throwErr(response?.message) 

      setChannels((prev):ChannelType[]=>{
        let current = prev?.find((item)=>{
          if(item.channelName===currentChannel?.channelName) {
            item.messages = response?.data?.channel?.messages
          }
          return item
        })
        return [current!]
      })

    } catch (error) {
      setError(error)
      console.error(`error:`, error)
    } finally{
      setLoading(false)
    }
 }
  useEffect(
    ()=>{
      console.log(`rerender on change pathname`)
      const handleCurrentChannel = (channels:ChannelType[] | undefined,pathname:string,setCurrentChannel: React.Dispatch<React.SetStateAction<ChannelType|undefined>>)=>{
          if(!channels?.length)return console.log(`NOT FOUND CHANNELS`)
          if(currentChannel?.channelName) return 
          console.log(`channels:`, channels);
          console.log(`pathname:`, pathname);
          
          let filteredChannel = channels.find((channel:ChannelType,index:string|number)=>{
              let pathNameChannel = pathname.replace('/chat/','').replaceAll(' ', '-')
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
      }
      
      handleCurrentChannel(channels,location.pathname,setCurrentChannel)
    },[location.pathname]
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
                console.log(`MESSAGE: `, message);
                
                return (
                  <Message userName={message?.user.userName} message={message?.message} createdAt={message?.createdAt} profileImg={message?.user?.picture}  />
                  )
                })
                ) : (
                  <h4>There is no messages in {currentChannel?.channelName}</h4>
                  )
                }
        </div>
        <FormInput placeholder='Type a message here' name='message-input'    type="text" id="message-input" onChange={(e)=>{if(e.target){setCurrentMessage(e?.target?.value)}}}  value= {currentMessage}
        >
          <Button type='button' onClick={handleSubmitMessage} img={sendIco} name='submit-btn' text={''} />
        </FormInput> 
        
      </div>
  )
  return currentChannel?.channelName ? channelContent : (
   <div className='main-wrapper'>
     <h2 className='channel-title'>Choose your channel</h2>
    </div>
  )
}

export default CurrentChannel