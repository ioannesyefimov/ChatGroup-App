import {  useCallback, useContext, useEffect, useMemo } from "react"
import { ChatContext } from "../../components/ChatProvider/ChatProvider"
import { useAuth, useError } from ".."
import { APIFetch } from "../../components/utils"
import { UserType } from "../../components/types"


 const useChat = () =>{
    const {channels,currentChannel,setCurrentChannel, setChannels } = useContext(ChatContext)
    
    const {user,setLoading} = useAuth()
    const {setError }= useError()
    let url = `http://localhost:5050/api/channels`

    const fetchChannels = useCallback(async(user:UserType,signal:AbortSignal)=>{
        try {
        setLoading(true)

        let response = await APIFetch({url: `${url}?userEmail=${user?.email}`, method:"GET",signal,headers: {"Content-Type":"application/json"}})
        console.log(`CHANNELS RESPONSE:`, response)
        if(!response?.success){
            console.log(`ERROR`)
            return
        }

        setChannels(response?.data.channels)
       } catch (error) {
        console.error(error)
        setError(error)
       } 
    },[])

    useEffect(
        ()=>{
            let controller = new AbortController()
            let signal = controller.signal
            if(user?.email){
                fetchChannels(user,signal)
            }

        },[user]
    )

    const value = useMemo(
        ()=>({
            channels,setChannels
        }),[channels]
    )
    return value
}
 
export default useChat