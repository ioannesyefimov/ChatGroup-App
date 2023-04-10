import React,{FC, ReactNode, useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { profileIco } from '../../assets'
import { ChannelType, ChildrenType } from '../types'
import { APIFetch } from '../utils'


export type InitialChatStateType = {
    channels: ChannelType[] | []
    currentChannel: ChannelType | undefined
    setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>
    setCurrentChannel: React.Dispatch<React.SetStateAction<ChannelType | undefined>>

}
  
  type useChatContextType = ReturnType<typeof useChatContext>
  
  export const initChatContextState: InitialChatStateType ={
    channels: [],
    currentChannel: undefined,
    setChannels: ()=>{},
    setCurrentChannel: ()=>{}
    
  }
  export const ChatContext = React.createContext<useChatContextType>(initChatContextState)
  
  export const useChatContext = (initChatContextState:InitialChatStateType)=>{
    const [channels,setChannels] = useState<ChannelType[]>([])
    const [currentChannel,setCurrentChannel] =useState<ChannelType| undefined>(undefined)


    return {channels,currentChannel,setChannels,setCurrentChannel}
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