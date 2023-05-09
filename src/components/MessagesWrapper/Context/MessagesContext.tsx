import React, { Dispatch, SetStateAction, useState } from "react";
import { ChildrenType, MessageType } from "../../types";
import { useSetLoading } from "../../../hooks/useAuthContext/useAuthContext";
import { useAuth, useResponseContext } from "../../../hooks";
import { channelSocket } from "../../DashBoard/CurrentChannel/CurrentChannel";
import { useCurrentChannel } from "../../ChatProvider/CurrentChannelProvider";
import { useAuthStore, useChatStore } from "../../../ZustandStore";

export type HandleClickType = {
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<any> | MouseEvent  | KeyboardEvent | undefined, 
    value: any, 
    setValue: Dispatch<SetStateAction<any>>,
    propsValue: any, 
    setPropsValue: Dispatch<SetStateAction<any>>
  }

const initMessagesContextState= {
    handleSubmitMessage:({ e, value, setValue, propsValue, setPropsValue }: HandleClickType)=>{},
    handleDeleteMessage:(message_id:string)=>{},
    sortedMessages:[{fullMessageArray:[],dayMessageArray:[]}],
    setSortedMessages:()=>{},
    
}



type SortedStateType = {
  [index:number | string]: MessageType[]
}
const useMessagesStore = ()=>{
    const [sortedMessages,setSortedMessages]=useState<SortedStateType>()
    const user=useAuthStore(s=>s.user)
    const setLoading=useAuthStore(s=>s.setLoading)
    const {setServerResponse} = useResponseContext()
    const currentChannel=useChatStore(s=>s.currentChannel)
  console.log(`USER`,user);
  
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
    
    
     const handleDeleteMessage = async(message_id:string,channel_id:string) => {
       try {
         setLoading(true)
         console.log(`DELETING :`, message_id);
         console.log(`USER:`, user);
         console.log(`channelid`,currentChannel?._id);
        //  console.log(`channel:`, currentChannel);
         if(!message_id) return console.error(`missing id`);
         channelSocket.emit('delete_message',{channel_id,message_id,userEmail:user.email,})
      } catch (error) {
      } finally{
        setLoading(false)
      }
    }
    return {
        handleDeleteMessage,handleSubmitMessage,sortedMessages,setSortedMessages
    }
}

type UseMessageStoreType = ReturnType<typeof useMessagesStore>
export const MessagesContext = React.createContext<UseMessageStoreType | null>(null)

const MessagesProvider = ({children}:ChildrenType)=>{
    return (
        <MessagesContext.Provider value={useMessagesStore()}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesProvider