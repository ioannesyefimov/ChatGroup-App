import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth, useHandleChannel, useResponseContext } from '../../../hooks'
import { ChannelType,SocketResponse } from '../../types'
import {SubmitInput} from '../..'
import Messages from '../../Messages/Messages'
import SocketStore from '../../SocketStore'
import './CurrentChannel.scss'
export type HandleClickType = {
  e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<any> | MouseEvent  | KeyboardEvent | undefined, 
  value: any, 
  setValue: Dispatch<SetStateAction<any>>,
  propsValue: any, 
  setPropsValue: Dispatch<SetStateAction<any>>
}

const {io,certOptions} = SocketStore()


const CurrentChannel = () => {
  const channelSocket = io('https://localhost:5050/currentChannel',certOptions);
  const [currentChannel,setCurrentChannel] =useState<ChannelType | null>(null)
  const {user,setLoading} = useAuth()
  const {setServerResponse} = useResponseContext()
  const {handleCurrentChannel} =  useHandleChannel(setCurrentChannel)
  const scrollToRef = useRef!<HTMLDivElement>()
  const location = useLocation()
  useEffect(
    ()=>{
      let onGetChannel = (data:SocketResponse)=>{
        if(!data.success) setServerResponse(data.err)
        console.log(`GETTING CHANNEL`, data)
        setCurrentChannel(data?.data?.channel)
        channelSocket.emit('join_channel',{room:data.data.channel._id})

        if(!data.success && data.message){
          setServerResponse(data?.err)
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
          setServerResponse(data?.err)
        }
      }
      let onConnecting = ()=>{
        console.log(`CONNECTED BY ID ${channelSocket.id}`)
      }
      let onJoinChannel=(data:SocketResponse)=>{
        console.log(`JOINED CHANNEL ${data.data.room}`);
      }
      channelSocket.on('get_channel',onGetChannel)
      channelSocket.on('connect',onConnecting)
      channelSocket.on('receive_message',onMessage)
      channelSocket.on('delete_message',onDeleteMessage)
      channelSocket.on('join_channel',onJoinChannel)
      return ()=>{
        channelSocket.off('delete_message',onDeleteMessage);
        channelSocket.off('receive_message',onMessage);
        channelSocket.off('connect',onConnecting);
        channelSocket.off('get_channel',onGetChannel);
        if(currentChannel?._id ){
          console.log(`LEAVING CHANNEL: ${currentChannel?._id}`);
          channelSocket.emit('leave_channel',{user:user.email,id:currentChannel?._id})
        };
    }
     
    },[location.search]
  )
  useEffect(
    ()=>{    
      setLoading(true)
      let controller = new AbortController()
      let {signal} = controller
      let handle = ()=>handleCurrentChannel({name:location.search,setter:setCurrentChannel,socket:channelSocket,scrollToRef,user,signal})
      let timeout = setTimeout(handle,3000)
     return()=>{
        clearTimeout(timeout)
        controller?.abort()
      }
  },[location.search]
  )
  const handleSubmitMessage=async({e,value,setValue,propsValue,setPropsValue}:HandleClickType): Promise<void> =>{
    try {
      console.log(`SUBMITTING MESSAGE`)
      setLoading(true)
      channelSocket.emit('send_message',{message:value,channel_id: propsValue?._id,user,room:propsValue?._id})
    } catch (error) {
      setServerResponse(error)
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
     console.log(`socket:`, channelSocket);
     console.log(`channel:`, currentChannel);
     if(!_id) return console.error(`missing id`);
     channelSocket.emit('delete_message',{channel_id:currentChannel?._id,message_id:_id,userEmail:user.email,})
  } catch (error) {
    setServerResponse(error)
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