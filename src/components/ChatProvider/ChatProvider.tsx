import React,{FC, ReactNode, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { Channel,ProviderProps,ContextChat } from '../types'

const defaultValue = {
    channels: [],

}

export const ChatContext = React.createContext<ContextChat >(defaultValue)

export const useChatContext  = ()=>  {
    return React.useContext(ChatContext)
}

const ChatProvider : FC<ProviderProps>  = ({children}) => {
    const [channels,setChannels] = useState<Channel[] >([
        {name:'front-end developers', id:1, messages: [{date: 'yesterday at 2:29 AM', userName: 'Nellie Francis', message: 'Suspendisse enim tel....'}]},
        {name:'random', id:2, messages: [{date: 'yesterday at 2:29 AM', userName: 'Nellie Francis', message: 'Suspendisse enim tel....'}]},
        {name:'back-end', id:3, messages: [{date: 'yesterday at 2:29 AM', userName: 'Nellie Francis', message: 'Suspendisse enim tel....'}],},
        {name:'cats and dogs', id:4, messages: [{date: 'yesterday at 2:29 AM', userName: 'Nellie Francis', message: 'Suspendisse enim tel....'}],},
        {name:'welcome', id:5, messages: [{date: 'yesterday at 2:29 AM', userName: 'Nellie Francis', message: 'Suspendisse enim tel....'}],},
    ])
    

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