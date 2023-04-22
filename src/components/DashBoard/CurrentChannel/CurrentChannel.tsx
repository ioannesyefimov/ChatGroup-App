import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './CurrentChannel.scss'
import { useAuth, useChat,useSocket, useError, useHandleChannel } from '../../../hooks'
import { ChannelType, MessageType, ResponseType, UserType } from '../../types'
import Message from '../Message/Message'
import { APIFetch, Errors, setter, throwErr, validateInput } from '../../utils'
import {Button, SubmitInput} from '../..'
import { ChannelsProps } from '../ChatContainer'
import { Socket } from 'socket.io-client'
import Messages from '../../Messages/Messages'
import { ResponseFallback } from '../../ErrorProvider/ErrorProvider'
import User from '../../UserComponent/User'

export type HandleClickType = {
  e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<any> | MouseEvent  | KeyboardEvent | undefined, 
  value: any, 
  setValue: Dispatch<SetStateAction<any>>,
  propsValue: any, 
  setPropsValue: Dispatch<SetStateAction<any>>
}
export type SocketResponse = {
  success:boolean
  data?: any
  message?: any
}

const CurrentChannel = () => {
  const [currentChannel,setCurrentChannel] =useState<ChannelType | null>(null)
  const {user,setLoading} = useAuth()
  const {setError,setServerResponse} = useError()
  const {handleCurrentChannel} =  useHandleChannel(setCurrentChannel)
  const scrollToRef = useRef<HTMLDivElement | undefined>()
  const socket = useSocket()!
  const location = useLocation()
  useEffect(
    ()=>{    
      setLoading(true)
  
      const controller = new AbortController()
      const {signal}=controller
      let handle = ()=>handleCurrentChannel({name:location.search,setter:setCurrentChannel,socket,scrollToRef,user,signal})
      let timeout = setTimeout(handle,2000)
      socket.connect()
      let onMessage = (data:SocketResponse)=>{
        console.log(`received message`, data);
        if(data.data.messages){
          setCurrentChannel(prevState=>({...prevState,messages:data.data.messages} as ChannelType))
        }
      }
      let onDeleteMessage = (data:SocketResponse)=>{
        if(data.success){
          console.log(`SUCCESS DELETE`, data);
          
          setCurrentChannel(data.data.channel)
        } else {
          setServerResponse(data.message)
        }
      }
      let onConnecting = ()=>{
        console.log(`CONNECTED BY ID ${socket.id}`)
      }
      let onJoinChannel=(data:SocketResponse)=>{
        console.log(`JOINED CHANNEL ${data.data.room}`);
        
      }
      socket.on('connect',onConnecting)
      socket.on('receive_message',onMessage)
      socket.on('delete_message',onDeleteMessage)
      socket.on('join_channel',onJoinChannel)
    
      return ()=>{
        socket?.off('delete_message',onDeleteMessage)
        socket?.off('receive_message',onMessage)
        socket?.off('connect',onConnecting)
        clearTimeout(timeout)
        controller?.abort()
        if(currentChannel?._id ){
          console.log(`LEAVING CHANNEL: ${currentChannel?._id}`);
          socket.emit('leave_channel',{user:user.email,id:currentChannel?._id})
        }
      }
  },[location.search,user]
  )
  const handleSubmitMessage =useCallback(async({e,value,setValue,propsValue,setPropsValue}:HandleClickType): Promise<void> =>{
    try {
        console.log(`SUBMITTING MESSAGE`)
      setLoading(true)
      if(!value) return console.log(`MESSAGE ISN'T TYPED `)
      if(!propsValue) return
      if(!user.email) return console.log(`USER IS ${user}`)
       socket.emit('send_message',{message:value,channelId: propsValue?._id,user,room:propsValue?._id})
    } catch (error) {
      setError(error)
      console.error(`error:`, error)
    } finally{
      setLoading(false)
      setValue('')
    }
 },[])


 const handleDeleteMessage = async(_id:string) => {
   try {
    if(!socket.connected){
      socket.connect()
    }
     setLoading(true)
     console.log(`DELETING :`, _id);
     console.log(`USER:`, user);
     console.log(`socket:`, socket);
     console.log(`channel:`, currentChannel);
     
     if(!_id) return console.error(`missing id`);
     
    socket.emit('delete_message',{channel_id:currentChannel?._id,message_id:_id,userEmail:user.email,})
  } catch (error) {
    setError(error)
  } finally{
    setLoading(false)
  }
}
    let channelContent =
    (
      <>
        <h2 className='channel-title'>{currentChannel?.channelName}</h2> 
        <Messages scrollToRef={scrollToRef} handleDelete={handleDeleteMessage} currentChannel={currentChannel} user={user} />
        <SubmitInput  handleClick={handleSubmitMessage} setPropsValue={setCurrentChannel} propsValue={currentChannel} name="message-input" placeholder="Type a message here" e={undefined} value={undefined} setValue={function (value: any): void {
          throw new Error('Function not implemented.')
        } } />
      </>
      )
          return (
    
      <div className="main-wrapper">
      {currentChannel?.channelName ? channelContent : 
        (
          <h2 className='channel-title'>Choose your channel</h2>
          ) 
        }
        </div>
  )
}

export default CurrentChannel