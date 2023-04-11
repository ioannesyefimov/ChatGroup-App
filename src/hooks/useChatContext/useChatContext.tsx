import {  useCallback, useContext, useEffect, useMemo } from "react"
import { ChatContext } from "../../components/ChatProvider/ChatProvider"
import { useAuth, useError } from ".."
import { APIFetch, throwErr } from "../../components/utils"
import { UserType } from "../../components/types"


 const useChat = () =>{
    const {channels, setChannels } = useContext(ChatContext)

  
 
    const value = useMemo(
        ()=>({
            channels, setChannels
        }),[channels]
    )
    return value
}
 
export default useChat