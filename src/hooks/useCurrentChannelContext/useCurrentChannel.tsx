import {  useCallback, useEffect} from "react"
import useSWR from 'swr'
import { APIFetch } from "../../components/utils"
import SocketStore from "../../components/SocketStore"
import { UserType } from "../../components/types"
import { channelSocket } from "../../components/DashBoard/CurrentChannel/CurrentChannel"
import { useChatStore } from "../../ZustandStore"
import { useLocation } from "react-router-dom"
 
 const serverUrl = SocketStore().serverUrl

export default function useCurrentChannel(channel_id:string,user:UserType) {
    const currentChannel=useChatStore(state=>state.currentChannel)
    const setCurrentChannel=useChatStore(state=>state.setCurrentChannel)  
    const addCurrentChannelMessage = useChatStore(s=>s.addCurrentChannelMessage)
    const currentChannelMessages = useChatStore(s=>s.currentChannel?.messages)
    
    const location = useLocation()
      const fetcher = useCallback(
        ()=>APIFetch({
                url:`${serverUrl}/api/channels/channel/${channel_id}?userEmail=${user?.email}`,method:'GET'
            })
        ,[channel_id,user?.email]
    )
    const {data:channel,error,isLoading}=useSWR(()=>channel_id ? `/api/channels/channel/${channel_id}` : null,fetcher    )


    useEffect(
        ()=>{
            console.log(`channelid`,channel_id);
            
            if(location.pathname ==='/chat') return setCurrentChannel([])
            if(channel?.data){
                console.log(`CURRENT CHANNEL RESPONSE `, channel);
                let current = channel?.data?.channel
                if(current?._id){
                    setCurrentChannel(current)
                    channelSocket.emit('join_channel',{room:current?._id})

                }
                
            }
        },[channel?.data,user?.email,location.pathname]
    )

    

    return {currentChannel,currentChannelMessages,setCurrentChannel,addCurrentChannelMessage}
}