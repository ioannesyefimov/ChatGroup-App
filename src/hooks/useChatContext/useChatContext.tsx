import {  useCallback, useContext, useEffect, useMemo } from "react"
import { ChatContext } from "../../components/ChatProvider/ChatProvider"
import { useAuth, useError } from ".."
import { APIFetch, throwErr } from "../../components/utils"
import { UserType } from "../../components/types"


 const useChat = () =>{
    const {channels,currentChannel,setCurrentChannel, setChannels } = useContext(ChatContext)

    useEffect(
        ()=>{
            console.log(`CURRENT CHANNEL IS CHANGED:`, currentChannel)
            console.log(`CHANNELs ARE CHANGED:`, channels)
        },[currentChannel,channels]
    )
 
    const value = useMemo(
        ()=>({
            channels,currentChannel,setCurrentChannel , setChannels
        }),[channels]
    )
    return value
}
 
export default useChat