import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './CurrentChannel.scss'
import { useAuth, useChat,useSocket, useError } from '../../../hooks'
import { ChannelType, MessageType, ResponseType, UserType } from '../../types'
import Message from '../Message/Message'
import { APIFetch, Errors, setter, throwErr, validateInput } from '../../utils'
import {SubmitInput} from '../..'
import { ChannelsProps } from '../ChatContainer'
import { Socket } from 'socket.io-client'
import Messages from '../../Messages/Messages'
import { ResponseFallback } from '../../ErrorProvider/ErrorProvider'

export type HandleClickType = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<any> | undefined, value: any, setValue: Dispatch<SetStateAction<any>>, propsValue: any, setPropsValue: Dispatch<SetStateAction<any>>) => Promise<void>
}
export type SocketResponse = {
  success:boolean
  data?: any
  message?: any
}

const CurrentChannel = () => {
  const socket = useSocket()!
  const [currentChannel,setCurrentChannel] =useState<ChannelType | null>(null)
  const {user,setLoading} = useAuth()
  const [serverResponse,setServerResponse]= useState<ResponseType | null>(null)
  const {setError} = useError()
  const location = useLocation()


 const handleCurrentChannel = async(name:string)=>{

  try {
    console.log(`NAME: ${name}`);
    
    if(!name.includes('?channel=')) {
      return setCurrentChannel(null)
    }
    name = name?.trim().replace('?channel=','').replaceAll('-', ' ')
    setLoading(true)
    console.log(`name:`, name);
   socket.emit('get_channel',{channelName:name,user})
   
  } catch (error) {
    setError(error)
  } finally{
    setLoading(false)
  }
}

  useEffect(
    ()=>{   
      let handle = ()=>handleCurrentChannel(location.search)
      let timeout = setTimeout(handle,1000)
      return ()=>clearTimeout(timeout)
    },[location.search]
  )

  useEffect(
    ()=>{
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
          setError(data.message)
        }
      }
      let onGetChannel = (data:SocketResponse)=>{
        console.log(`connection channel:`,data);
        if(!data.success){
          setServerResponse(data?.message)
        }
        if(data?.data?.channels){
          setCurrentChannel(data.data?.channels)
         socket.emit('join_channel',data?.data?.channels?._id)
        }
      }
      let onConnecting = ()=>{
        console.log(`CONNECTED BY ID ${socket.id}`)
      }
      socket.on('connect',onConnecting)
      socket.on('receive_message',onMessage)
      socket.on('delete_message',onDeleteMessage)
      socket.on('get_channel',onGetChannel)
      return ()=>{
        socket?.off('get_channel',onGetChannel)
        socket?.off('delete_message',onDeleteMessage)
        socket?.off('receive_message',onMessage)
        socket?.off('connection',onConnecting)
        if(currentChannel?._id ){
          console.log(`LEAVING CHANNEL: ${currentChannel?._id}`);
          socket.emit('leave_channel',{user:user.email,id:currentChannel?._id})
        }
      }
    },[]
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
 const handleDeleteMessage = async(_id:string) => {
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
  let channelResponse = (
    (
      <div className='main-wrapper'>
        <h2 className='channel-title'>Choose your channel</h2>
       </div>
       
     )
  )
  let title = <h2 className='channel-title'>{currentChannel?.channelName}</h2>
    let channelContent =
    (
      <div className="main-wrapper">
        {title}
        <Messages handleDelete={handleDeleteMessage} currentChannel={currentChannel} user={user} />
        <SubmitInput  handleClick={handleSubmitMessage} setPropsValue={setCurrentChannel} propsValue={currentChannel} name="message-input" placeholder="Type a message here" e={undefined} value={undefined} setValue={function (value: any): void {
            throw new Error('Function not implemented.')
          } } />
      </div>
  )
  return (
    <ResponseFallback response={serverResponse} setResponse={setServerResponse}>
      {currentChannel?.channelName ? channelContent : channelResponse}
    </ResponseFallback>
  )
}

export default CurrentChannel