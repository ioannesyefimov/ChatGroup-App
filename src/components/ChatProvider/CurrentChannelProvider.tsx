import React,{FC, ReactNode, useEffect, useState} from 'react'
import { ChannelType, ChildrenType } from '../types'


export type InitialChatStateType = {
  currentChannel:ChannelType | null, 
  setCurrentChannel: React.Dispatch<React.SetStateAction<ChannelType | null>>
}
  

export const initChatContextState: InitialChatStateType = {
    currentChannel: null,
    setCurrentChannel: ()=>{}
}    
    export const useCurrentChannel = ()=>{
    const [currentChannel,setCurrentChannel] = useState<ChannelType | null>(null)
    

    return {currentChannel,setCurrentChannel}
  }
type useCurrentChannelContext = ReturnType<typeof useCurrentChannel>
export const CurrentChannelContext = React.createContext<useCurrentChannelContext>(initChatContextState)

  
 
  
   const CurrentChannelProvider  = (
    {children} :ChildrenType  
  ) => {
    return (
      <CurrentChannelContext.Provider value={useCurrentChannel()}>
          {children}
      </CurrentChannelContext.Provider>
    )
  }



export default CurrentChannelProvider