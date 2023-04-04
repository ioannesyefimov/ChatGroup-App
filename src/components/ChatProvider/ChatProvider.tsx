import React,{FC, ReactNode, useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { profileIco } from '../../assets'
import { Channel, ChildrenType } from '../types'
import { APIFetch } from '../utils'


export type InitialChatStateType = {
    channels: Channel[] | Channel
    setChannels: React.Dispatch<React.SetStateAction<Channel | Channel[]>>

}
  
  type useChatContextType = ReturnType<typeof useChatContext>
  
  export const initChatContextState: InitialChatStateType ={
    channels: [],
    setChannels: ()=>{}
  }
  export const ChatContext = React.createContext<useChatContextType>(initChatContextState)
  
  export const useChatContext = (initChatContextState:InitialChatStateType)=>{
    const [channels,setChannels] = useState<Channel[]|Channel>([])
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
    return {channels,setChannels}
  }
  
 
  
   const ChatProvider  = (
    {children,...initState} :ChildrenType & InitialChatStateType 
  ) => {
    return (
      <ChatContext.Provider value={useChatContext(initState)}>
          {children}
      </ChatContext.Provider>
    )
  }



export default ChatProvider