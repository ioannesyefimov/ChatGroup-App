import {  useContext } from "react"
import { ChatContext } from "../../components/ChatProvider/ChatProvider"


 const useChat = () =>{
    const {channels,setChannels } = useContext(ChatContext)

    return {channels,setChannels}
}
 
export default useChat