import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
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
  const [serverResponse,setServerResponse]= useState<ResponseType | null>(null)
  const [currentChannel,setCurrentChannel] =useState<ChannelType | null>(null)
  const socket = useSocket()!
  const {user,setLoading} = useAuth()
  const {setError} = useError()
  const location = useLocation()
  const navigate = useNavigate()
  const {handleCurrentChannel} =  useHandleChannel()

  useEffect(
    ()=>{   
      setLoading(true)
      let handle = ()=>handleCurrentChannel(location.search,setCurrentChannel,socket,user)
      let timeout = setTimeout(handle,1500)
      return ()=>clearTimeout(timeout)
    },[location.search,user.email]
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
      socket.connect()
      socket.on('connect',onConnecting)
      socket.on('receive_message',onMessage)
      socket.on('delete_message',onDeleteMessage)
      socket.on('get_channel',onGetChannel)
      return ()=>{
        socket?.off('get_channel',onGetChannel)
        socket?.off('delete_message',onDeleteMessage)
        socket?.off('receive_message',onMessage)
        socket?.off('connect',onConnecting)
        if(currentChannel?._id ){
          console.log(`LEAVING CHANNEL: ${currentChannel?._id}`);
          socket.emit('leave_channel',{user:user.email,id:currentChannel?._id})
        }
      }
    },[socket]
  )

  const handleSubmitMessage =useCallback(async({e,value,setValue,propsValue,setPropsValue}:HandleClickType): Promise<void> =>{
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
 },[])
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
  
  let fallbackContent = (
    (
        <h2 className='channel-title'>Choose your channel</h2>
     )
  )
  let title = <h2 className='channel-title'>{currentChannel?.channelName}</h2>
    let channelContent =
    (
      <>
      {title}
        <Messages handleDelete={handleDeleteMessage} currentChannel={currentChannel} user={user} />
        <SubmitInput  handleClick={handleSubmitMessage} setPropsValue={setCurrentChannel} propsValue={currentChannel} name="message-input" placeholder="Type a message here" e={undefined} value={undefined} setValue={function (value: any): void {
            throw new Error('Function not implemented.')
          } } />
      </>
      )
          return (
    <ResponseFallback  response={serverResponse} resetResponse={()=>setServerResponse(prev=>({...prev,name:'',code:''}))}>
      <div className="main-wrapper">
      {currentChannel?.channelName ? channelContent : serverResponse?.arguments.channel ? (
          <div className='response-fallback'>
            <h2>Members of this channel</h2>
            <div className="users-wrapper">
              {serverResponse?.arguments?.channel?.members.map((member: {member:UserType,roles:string[],_id:string})=>{
                console.log(`MEMBER:`, member.member);
                
                return (
                  <User key={member.member._id} user={member?.member}/>
                )
              })}
            </div>
              <Link className='link' to={`/chat/manage/join?search=${serverResponse.arguments.channel.channelName.replaceAll(' ', '-')}`} replace >Join</Link>
            </div>
        ) :
        (
          fallbackContent
          ) 
        }
        </div>
    </ResponseFallback>
  )
}

export default CurrentChannel