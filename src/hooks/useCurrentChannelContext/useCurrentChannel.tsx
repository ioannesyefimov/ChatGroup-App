import { useMemo,useContext, useCallback, useEffect} from "react"
import { CurrentChannelContext } from "../../components/ChatProvider/CurrentChannelProvider"
import useSWR from 'swr'
import { APIFetch } from "../../components/utils"
import SocketStore from "../../components/SocketStore"
import { useAuth } from ".."
import { UserType } from "../../components/types"
import { channelSocket } from "../../components/DashBoard/CurrentChannel/CurrentChannel"
import { useChatStore } from "../../ZustandStore"
import { useLocation } from "react-router-dom"
 
 const serverUrl = SocketStore().serverUrl

export default function useCurrentChannel(channel_id:string,user:UserType) {
    const currentChannel=useChatStore(state=>state.currentChannel)
    const setCurrentChannel=useChatStore(state=>state.setCurrentChannel)  
    const setCurrentChannelMessages = useChatStore(s=>s.setCurrentChannelMessages)
    const currentChannelMessages = useChatStore(s=>s.currentChannelMessages)
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
            if(location.pathname ==='/chat') return setCurrentChannel([])
            if(channel?.data){
                console.log(`CURRENT CHANNEL RESPONSE `, channel);
                let current = channel?.data?.channel
                if(current){
                    setCurrentChannel(current)
                    channelSocket.emit('join_channel',{room:current?._id})

                }
                
            }
        },[channel?.data,user?.email,location.pathname]
    )

    

    return {currentChannel,currentChannelMessages,setCurrentChannel,setCurrentChannelMessages}
}