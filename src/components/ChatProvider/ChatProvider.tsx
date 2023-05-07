import React,{FC, ReactNode, useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { profileIco } from '../../assets'
import { ChannelType, ChildrenType } from '../types'
import { APIFetch } from '../utils'


export type InitialChatStateType = {
    channels: ChannelType[] 
    currentChannel: ChannelType | null 
    setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>
    setCurrentChannel: React.Dispatch<React.SetStateAction<ChannelType | null>>

}
  
  type useChatContextType = ReturnType<typeof useChatContext>
  
  export const initChatContextState: InitialChatStateType ={
    channels: [],
    currentChannel:null,
    setCurrentChannel:()=>{},
    setChannels: ()=>{},
    
  }
  export const ChatContext = React.createContext<useChatContextType>(initChatContextState)
  
  export const useChatContext = (initChatContextState:InitialChatStateType)=>{
    const [channels,setChannels] = useState<ChannelType[]>([])
    const [currentChannel,setCurrentChannel] = useState<ChannelType | null>(null)
    useEffect(
      ()=>{
          console.log(`channels change`, channels)
      },[channels]
  )

    return {channels,currentChannel,setCurrentChannel,setChannels}
  }
  
 
  
   const ChatProvider  = (
    {children} :ChildrenType  
  ) => {
    return (
      <ChatContext.Provider value={useChatContext(initChatContextState)}>
          {children}
      </ChatContext.Provider>
    )
  }



export default ChatProvider