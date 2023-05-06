import {  Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo } from "react"
import { ChatContext } from "../../components/ChatProvider/ChatProvider"
import { useAuth, useError } from ".."
import { APIFetch, throwErr } from "../../components/utils"
import { UserType } from "../../components/types"
import { CookiesType } from "../useAuthCookies/useAuthCookies"

export const useChannels = ()=>useContext(ChatContext).channels
export const useSetChannels = ()=>useContext(ChatContext).setChannels
 const useChat = () =>{
    const {channels, setChannels } = useContext(ChatContext)
    
    return {channels, setChannels}
}
 
export default useChat