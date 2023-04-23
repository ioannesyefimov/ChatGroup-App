import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './CurrentChannel.scss'
import { useAuth, useError, useHandleChannel } from '../../../hooks'
import { ChannelType, MessageType, ResponseType, UserType } from '../../types'
import {SubmitInput} from '../..'
import {  io } from 'socket.io-client'
import Messages from '../../Messages/Messages'

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
const currentChannelSocket = io('http://localhost:5050/currentChannel')
const CurrentChannel = () => {
  const [currentChannel,setCurrentChannel] =useState<ChannelType | null>(null)
  const {user,setLoading} = useAuth()
  const {setError,setServerResponse} = useError()
  const {handleCurrentChannel} =  useHandleChannel(setCurrentChannel)
  const scrollToRef = useRef<HTMLDivElement | undefined>()
  // const {currentChannelSocket} = useSocket()!
  const location = useLocation()
  useEffect(
    ()=>{    
      // currentChannelSocket.connect()
      setLoading(true)
      let handle = ()=>handleCurrentChannel({name:location.search,setter:setCurrentChannel,socket:currentChannelSocket,scrollToRef,user})
      let timeout = setTimeout(handle,2000)
      let onGetChannel = (data:SocketResponse)=>{
        console.log(`GETTING CHANNEL`, data)
        setCurrentChannel(data?.data?.channels ?? null)
        currentChannelSocket.emit('join_channel',{room:data.data.channels._id})

        if(!data.success && data.message){
          setServerResponse(data?.message)
        }
      }
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
        console.log(`CONNECTED BY ID ${currentChannelSocket.id}`)
      }
      let onJoinChannel=(data:SocketResponse)=>{
        console.log(`JOINED CHANNEL ${data.data.room}`);
        
      }
      currentChannelSocket.on('get_channel',onGetChannel)
      currentChannelSocket.on('connect',onConnecting)
      currentChannelSocket.on('receive_message',onMessage)
      currentChannelSocket.on('delete_message',onDeleteMessage)
      currentChannelSocket.on('join_channel',onJoinChannel)
    
      return ()=>{
        currentChannelSocket?.off('delete_message',onDeleteMessage)
        currentChannelSocket?.off('receive_message',onMessage)
        currentChannelSocket?.off('connect',onConnecting)
        currentChannelSocket?.off('get_channel',onGetChannel)
        clearTimeout(timeout)
        if(currentChannel?._id ){
          console.log(`LEAVING CHANNEL: ${currentChannel?._id}`);
          currentChannelSocket.emit('leave_channel',{user:user.email,id:currentChannel?._id})
        }
      }
  },[location.search,currentChannelSocket.connected]
  )
  const handleSubmitMessage=async({e,value,setValue,propsValue,setPropsValue}:HandleClickType): Promise<void> =>{
    try {
        console.log(`SUBMITTING MESSAGE`)
      setLoading(true)
      // if(!value) return console.log(`MESSAGE ISN'T TYPED `)
      // if(!propsValue) return
      // if(!user.email) return console.log(`USER IS`,user)
      currentChannelSocket.emit('send_message',{message:value,channelId: propsValue?._id,user,room:propsValue?._id})
    } catch (error) {
      setError(error)
      console.error(`error:`, error)
    } finally{
      setLoading(false)
      setValue('')
    }
 }


 const handleDeleteMessage = async(_id:string) => {
   try {
     setLoading(true)
     console.log(`DELETING :`, _id);
     console.log(`USER:`, user);
     console.log(`socket:`, currentChannelSocket);
     console.log(`channel:`, currentChannel);
     
     if(!_id) return console.error(`missing id`);
     
     currentChannelSocket.emit('delete_message',{channel_id:currentChannel?._id,message_id:_id,userEmail:user.email,})
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