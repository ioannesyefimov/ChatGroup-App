import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './CurrentChannel.scss'
import { useAuth, useChat, useError } from '../../../hooks'
import { ChannelType, MessageType, UserType } from '../../types'
import Message from '../Message/Message'
import { APIFetch, setter, throwErr, validateInput } from '../../utils'
import {SubmitInput} from '../..'
import { ChannelsProps } from '../ChatContainer'
import { Socket } from 'socket.io-client'

export type HandleClickType = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<any> | undefined, value: any, setValue: Dispatch<SetStateAction<any>>, propsValue: any, setPropsValue: Dispatch<SetStateAction<any>>) => Promise<void>
}
export type SocketResponse = {
  success:boolean
  data?: any
  message?: any
}
const CurrentChannel = ({socket,channels,setChannels}:ChannelsProps&{socket: Socket<any>}) => {
  const [currentChannel,setCurrentChannel] =useState<ChannelType | null>(null)
  // const socket = useSocket()!
  const {user,setLoading} = useAuth()
  const {setError} = useError()
  const location = useLocation()


 const handleCurrentChannel = async(channels:ChannelType[] ,pathname:string)=>{

  try {
    if(!pathname.includes('/chat/'))return setCurrentChannel(null)
    if(!user.email) return 
    setLoading(true)
    let pathNameChannel = pathname.replace('/chat/','').replaceAll('-', ' ')?.trim()
   if(currentChannel?.channelName && pathNameChannel !== currentChannel.channelName.replaceAll(' ', '-')) {
     setCurrentChannel(null)
   }
   
   socket.emit('get_channel',{channelName:pathNameChannel,user, })
   
    
  } catch (error) {
    setError(error)
  } finally{
    setLoading(false)
  }
}

  useEffect(
    ()=>{
      handleCurrentChannel(channels,location.pathname)
     },[location.pathname]
  )

  useEffect(
    ()=>{
      socket.on('receive_message',(data:SocketResponse)=>{
        if(data.data.channel){
          console.log(`received message`, data.data.channel);
          
          setCurrentChannel(data.data?.channel)
        }
      })
      socket.on('delete_message',(data:SocketResponse)=>{
        if(data.success){
          console.log(`SUCCESS DELETE`, data);
          
          setCurrentChannel(data.data.channel)
        } else {
          setError(data.message)
        }
      })
      socket.on('get_channel',(data:SocketResponse)=>{
        console.log(`data:`,data);
        if(data.data.channel){
          setCurrentChannel(data.data.channel)
        socket.emit('join_channel',data.data.channel._id)
        }
        return
      })
    },[socket,currentChannel]
  )
  const handleSubmitMessage = async(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<any> | MouseEvent  | KeyboardEvent | undefined, value: any, setValue: Dispatch<SetStateAction<any>>, propsValue: any, setPropsValue: Dispatch<SetStateAction<any>>): Promise<void> =>{
    try {
        console.log(`SUBMITTING MESSAGE`)
      setLoading(true)
      if(!value) return console.log(`MESSAGE ISN'T TYPED `)
      if(!propsValue) return
       socket.emit('send_message',{message:value,channelId: currentChannel?._id,user,room:currentChannel?._id})
    } catch (error) {
      setError(error)
      console.error(`error:`, error)
    } finally{
      setLoading(false)
      setValue('')
    }
 }
 const deleteMessage = async(_id:string) => {
  console.log(`DELETING :`, _id);
  console.log(`USER:`, user);
  console.log(`channel:`, currentChannel);
  
  if(!_id) return
  try {
    setLoading(true)
    socket.emit('delete_message',{channel_id:currentChannel?._id,message_id:_id,userEmail:user.email,})
  } catch (error) {
    setError(error)
  } finally{
    setLoading(false)
  }
}

  let title = <h2 className='channel-title'>{currentChannel?.channelName}</h2>
    let channelContent =
    (
      <div className="main-wrapper">
        {title}
        <div className="messages-wrapper" id='messagesWrapper' >
          {
            currentChannel?.channelName && currentChannel?.messages.length ?  
            (
            currentChannel?.messages.map((message:MessageType,i:number|string)=>{
              console.log(`MESSAGE:`, message);
              
              return (
                <Message deleteMessage={deleteMessage} channelName={currentChannel.channelName} _id={message?.id} key={message?.id} user={user} message={message?.message} createdAt={message?.createdAt} messageUser={message?.user}  />
                )
              })
              ) : (
                <h4 key="no-message">There is no messages in {currentChannel?.channelName}</h4>
                )
            }
            <button onClick={()=>{document.getElementById('messagesWrapper')!.scrollTop = 10000}} id={'downBtn'} className='down-btn'>↓</button>
        </div>
        <SubmitInput  handleClick={handleSubmitMessage} setPropsValue={setCurrentChannel} propsValue={currentChannel} name="message-input" placeholder="Type a message here" e={undefined} value={undefined} setValue={function (value: any): void {
            throw new Error('Function not implemented.')
          } } />
      </div>
  )
  return currentChannel?.channelName ? channelContent : (
   <div className='main-wrapper'>
     <h2 className='channel-title'>Choose your channel</h2>
    </div>
    
  )
}

export default CurrentChannel