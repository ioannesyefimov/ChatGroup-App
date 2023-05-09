import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAuth, useCurrentChannel, useHandleChannel, useResponseContext } from '../../../hooks'
import { ChannelType,SocketResponse } from '../../types'
import {SubmitInput} from '../..'
import Messages from '../../MessagesWrapper/Messages/Messages'
import SocketStore from '../../SocketStore'
import './CurrentChannel.scss'
import MessagesProvider from '../../MessagesWrapper/Context/MessagesContext'
import MessagesWrapper from '../../MessagesWrapper/MessagesWrapper'
import { sleep } from '../../utils'
import { useAuthStore, useChatStore } from '../../../ZustandStore'

const {certOptions,io,serverUrl} = SocketStore()
export const channelSocket = io(`${serverUrl}/currentChannel`,{
  pfx:certOptions.pfx,passphrase:certOptions.passphrase,reconnection:true,reconnectionDelayMax:5000,reconnectionAttempts:Infinity});

const CurrentChannel = () => {
  const setLoading = useAuthStore(state=>state.setLoading)
  const user = useAuthStore(state=>state.user)
  const {setServerResponse} = useResponseContext()
  const {channel_id}=useParams()
  const {currentChannel,setCurrentChannel,setCurrentChannelMessages,currentChannelMessages}=useCurrentChannel(channel_id ?? '',user)
  const deleteCurrentChannelMessage = useChatStore(s=>s.deleteCurrentChannelMessage)

  const scrollToRef = useRef<HTMLDivElement>()
  useEffect(
    ()=>{
      let onConnect = ()=>{
        console.log(`CONNECTED BY ID ${channelSocket.id}`)
      }
      let onMessage = (data:SocketResponse)=>{
        if(!data?.success) setServerResponse(data?.err)
        console.log(`received message`, data);
        
        if(data?.data?.messages){
          setCurrentChannelMessages(data?.data?.messages)
        }
        setLoading(false)
      }
      let onDeleteMessage = (data:SocketResponse)=>{
        if(!data?.success) setServerResponse(data?.err)
        console.log(`DELETING  MESSAGE RESPONSE`,data);
        if(data?.success){
          console.log(`SUCCESS DELETE`, data);
          deleteCurrentChannelMessage(data?.data?.message?._id)
        } else {
          setServerResponse(data?.err)
        }
        setLoading(false)

      }
      let onDisconnect = ()=>{
        console.log(`Disconnected from server`)
      }
      let onJoinChannel=(data:SocketResponse)=>{
        if(!data?.success) setServerResponse(data?.err)
        console.log(`JOINED CHANNEL ${data.data.room}`);
      }
      // channelSocket.on('get_channel',onGetChannel)
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
        // channelSocket.off('get_channel',onGetChannel);
        if(currentChannel?._id){
          channelSocket.emit('leave_channel',{user:user.email,id:currentChannel?._id})
          console.log(`LEAVING CHANNEL: ${currentChannel?._id}`);
            setCurrentChannel(null)
        }
    }
     
    },[]
  )
  let channelContent =
  (
    <>
      <h2 className='channel-title'>{currentChannel?.channelName}</h2> 
      <MessagesProvider>
        <MessagesWrapper currentChannelMessages={currentChannelMessages} setCurrentChannel={setCurrentChannel} currentChannel={currentChannel}/>
      </MessagesProvider>
    </>
    )
    return (
    
    <div className="main-wrapper">
      {
        currentChannel?._id ? (
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
