import {   useContext } from "react"
import { ChatContext } from "../../components/ChatProvider/ChatProvider"
export const useChannels = ()=>useContext(ChatContext).channels
export const useSetChannels = ()=>useContext(ChatContext).setChannels
 const useChat = () =>{
    const {channels, setChannels } = useContext(ChatContext)
    return {channels, setChannels}
}
 
export default useChat