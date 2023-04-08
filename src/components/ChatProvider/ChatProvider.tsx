import React,{FC, ReactNode, useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { profileIco } from '../../assets'
import { ChannelType, ChildrenType } from '../types'
import { APIFetch } from '../utils'


export type InitialChatStateType = {
    channels: ChannelType[] | ChannelType
    currentChannel: ChannelType | undefined
    setChannels: React.Dispatch<React.SetStateAction<ChannelType | ChannelType[]>>
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
    const [channels,setChannels] = useState<ChannelType[]|ChannelType>([])
    const [currentChannel,setCurrentChannel] =useState<ChannelType| undefined>(undefined)

    // useEffect(
    //     ()=>{
    //       // add sscripts
    //       const addScript = async(callback:CallableFunction)=>{
    //         try {
    //           return await callback()
    //         } catch (error) {
    //           console.log(error)
    //         }
    //       }
    //       addScript(addPolicyScript3)
    //       addScript(addPolicyScript2)
    //       addScript(addPolicyScript)
    //     },[]
    //   )
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