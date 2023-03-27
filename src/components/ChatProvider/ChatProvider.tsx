import React,{FC, ReactNode, useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { profileIco } from '../../assets'
import { Channel,ProviderProps,ContextChat } from '../types'
import { APIFetch } from '../utils'

const defaultValue = {
    channels: [],

}

export const ChatContext = React.createContext<ContextChat >(defaultValue)

export const useChatContext  = ()=>  {
    return React.useContext(ChatContext)
}

const ChatProvider : FC<ProviderProps>  = ({children}) => {
    const [channels,setChannels] = useState<Channel[] >([])
    
    useEffect(
        ()=>{
            let controller = new AbortController()
            let fetchChannels = async()=>{
                let signal = controller.signal
                return await fetch('./ChatData.json',{
                    headers: {
                        'Accept': 'application/json'
                      }
                }).then(resp=>resp.json())
            }
            let data = fetchChannels()
            console.log(data)
            return () => controller.abort()
        },[]
    )

    const value:any = React.useMemo(
        ()=>(
            {
                channels,setChannels,
            }
            )
            
    ,[channels]
    )

  return (
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
  )
}



export default ChatProvider