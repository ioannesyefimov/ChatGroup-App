import { useMemo,useContext, useCallback, useEffect} from "react"
import { CurrentChannelContext } from "../../components/ChatProvider/CurrentChannelProvider"
import useSWR from 'swr'
import { APIFetch } from "../../components/utils"
import SocketStore from "../../components/SocketStore"
import { useAuth } from ".."
import { UserType } from "../../components/types"
import { channelSocket } from "../../components/DashBoard/CurrentChannel/CurrentChannel"
 
 const serverUrl = SocketStore().serverUrl

 export function useCurrentChat() {
    return useContext(CurrentChannelContext)
 }
export default function useCurrentContext(channel_id:string,user:UserType) {
    const {currentChannel,setCurrentChannel} = useContext(CurrentChannelContext)
    const fetcher = useCallback(
        ()=>APIFetch({
                url:`${serverUrl}/api/channels/channel/${channel_id}?userEmail=${user?.email}`,method:'GET'
            })
        ,[channel_id,user?.email]
    )
    const {data:channel,error,isLoading}=useSWR(()=>channel_id ? `/api/channels/channel/${channel_id}` : null,fetcher    )


    useEffect(
        ()=>{
            if(channel?.data){
                console.log(`CURRENT CHANNEL RESPONSE `, channel);
                let current = channel?.data?.channel
                if(current){
                    setCurrentChannel(current)
                    channelSocket.emit('join_channel',{room:current?._id})

                }
                
            }
        },[channel?.data]
    )

    

    return {currentChannel,setCurrentChannel}
}