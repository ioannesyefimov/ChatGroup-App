import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth, useCurrentContext, useHandleChannel, useResponseContext } from '../../../hooks'
import { ChannelType,SocketResponse } from '../../types'
import {SubmitInput} from '../..'
import Messages from '../../MessagesWrapper/Messages/Messages'
import SocketStore from '../../SocketStore'
import './CurrentChannel.scss'
import MessagesProvider from '../../MessagesWrapper/Context/MessagesContext'
import MessagesWrapper from '../../MessagesWrapper/MessagesWrapper'
import { sleep } from '../../utils'

const {certOptions,io,serverUrl} = SocketStore()
export const channelSocket = io(`${serverUrl}/currentChannel`,{
  pfx:certOptions.pfx,passphrase:certOptions.passphrase,reconnection:true,reconnectionDelayMax:5000,reconnectionAttempts:Infinity});

const CurrentChannel = () => {
  const {currentChannel,setCurrentChannel}=useCurrentContext()
  const {user,setLoading} = useAuth()
  const {setServerResponse} = useResponseContext()
  const {handleCurrentChannel} =  useHandleChannel(setCurrentChannel)
  const scrollToRef = useRef<HTMLDivElement>()
  const location = useLocation()
  useEffect(
    ()=>{
      let onConnect = ()=>{
        console.log(`CONNECTED BY ID ${channelSocket.id}`)
      }
      let onGetChannel = (data:SocketResponse)=>{
        if(!data.success) setServerResponse(data.err)
        console.log(`GETTING CHANNEL`, data)
        setCurrentChannel(data?.data?.channel)
        channelSocket.emit('join_channel',{room:data.data.channel._id})

        if(!data.success && data.message){
          setServerResponse(data?.err)
        }
        setLoading(false)
      }
      let onMessage = (data:SocketResponse)=>{
        console.log(`received message`, data);
        
        if(data.data.messages){
          setCurrentChannel(prevState=>({...prevState,messages:data.data.messages} as ChannelType))
        }
      }
      let onDeleteMessage = (data:SocketResponse)=>{
        console.log(`DELETING  MESSAGE RESPONSE`,data);
        if(data.success){
          console.log(`SUCCESS DELETE`, data);
          
          setCurrentChannel(data.data.channel)
        } else {
          setServerResponse(data?.err)
        }
      }
      let onDisconnect = ()=>{
        console.log(`Disconnected from server`)
      }
      let onJoinChannel=(data:SocketResponse)=>{
        console.log(`JOINED CHANNEL ${data.data.room}`);
      }
      channelSocket.on('get_channel',onGetChannel)
      channelSocket.on('disconnect',onDisconnect)
      channelSocket.on('connect',onConnect)
      channelSocket.on('receive_message',onMessage)
      channelSocket.on('delete_message',onDeleteMessage)
      channelSocket.on('join_channel',onJoinChannel)
      return ()=>{
        channelSocket.off('delete_message',onDeleteMessage);
        channelSocket.off('receive_message',onMessage);
        channelSocket.off('connect',onConnect);
      channelSocket.off('disconnect',onDisconnect)
        channelSocket.off('get_channel',onGetChannel);
          console.log(`LEAVING CHANNEL: ${currentChannel?._id}`);
          channelSocket.emit('leave_channel',{user:user.email,id:currentChannel?._id})
        setCurrentChannel(null)
    }
     
    },[location.search,user.email]
  )
  let initCurrentChannel = async(signal:AbortSignal)=>{
    setLoading(true)
    await sleep(1500)
     handleCurrentChannel({name:location.search,setter:setCurrentChannel,socket:channelSocket,scrollToRef,user,signal})
    
  }
  useEffect(
    ()=>{    
      let controller = new AbortController()
      let {signal} = controller
      initCurrentChannel(signal)
     return()=>{
      
        controller?.abort()
      }
  },[location.search,user.email,channelSocket.connected]
  )
  
  let channelContent =
  (
    <>
      <h2 className='channel-title'>{currentChannel?.channelName}</h2> 
      <MessagesProvider>
        <MessagesWrapper setCurrentChannel={setCurrentChannel} currentChannel={currentChannel}/>
      </MessagesProvider>
    </>
    )
    return (
    
    <div className="main-wrapper">
      {
        currentChannel?.channelName ? (
          channelContent 
        ) : 
        (
          <h2 className='channel-title dashboard'>Choose your channel</h2>
          ) 
      }
    </div>
)
}

export default CurrentChannel
