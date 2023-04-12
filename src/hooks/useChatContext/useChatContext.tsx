import {  Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo } from "react"
import { ChatContext } from "../../components/ChatProvider/ChatProvider"
import { useAuth, useError } from ".."
import { APIFetch, throwErr } from "../../components/utils"
import { UserType } from "../../components/types"
import { CookiesType } from "../useAuthCookies/useAuthCookies"


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