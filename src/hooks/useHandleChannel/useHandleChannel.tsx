import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { APIFetch, Errors, throwErr } from '../../components/utils';
import { useAuth, useResponseContext,useChat} from '..';
import { ChannelType, ResponseType, UserType } from '../../components/types';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useServerUrl, useSetLoading } from '../useAuthContext/useAuthContext';

const useHandleChannel = (setCurrent?:Dispatch<SetStateAction<any>> | undefined) => {
    const {setServerResponse}=useResponseContext()
    const setLoading = useSetLoading()
    const serverUrl = useServerUrl()
  const navigate = useNavigate()
    const {setChannels} =useChat() 
    const handleLeaveChannel = async(id:string,user:UserType)=>{
        try {
          if(!id) return
          console.log(`ID:${id}`);
          console.log(`userEmail:${user.email}`);
          setLoading(true)
          let response = await APIFetch({url:`${serverUrl}/channels/leave`,method:'PUT',body:{
            userEmail:user.email,channel_id:id
          }})
          if(!response.success){
            throwErr(response.err)
          }
          setChannels(prev=>(prev.filter(channel=>channel._id !== response.data.channel._id)))
        } catch (error) {
          setServerResponse(error)
        } 
      }
    const handleJoinChannel = async (id:string,user:UserType)=>{
          try {
              setLoading(true)
              let fields = {id}
              console.log(`FIELDS: `, fields)
              // let uploadedPicture = await APIFetch({url:`${serverUrl}/upload/picture`, body:{image:channelAvatar,accessToken:cookies?.accessToken}})
              let response:ResponseType = await APIFetch({url:`${serverUrl}/channels/join`, body:{channel_id:id,userEmail:user.email},method:'POST'})
              if(!response.success) throwErr(response?.err)
              setChannels(prev=>({...prev, ...response?.data?.channel }))
              navigate(`/chat/?channel=${response?.data?.channel?._id}`)
              console.log(`RESPONSE : `, response)
          } catch (error) {
              console.log(`ERROR:`,error)
              setServerResponse(error)
          }finally{
              setLoading(false)
          }
      }

       
    type HandleCurrentChannelProps ={
      setter: Dispatch<SetStateAction<ChannelType| null>>
      name:string
      socket:Socket<any,any>
      scrollToRef?: MutableRefObject<HTMLDivElement | undefined>  
      user:UserType
      signal?:AbortSignal
    } 

    const handleCurrentChannel =
      async({name,setter,socket,scrollToRef,user,signal}:HandleCurrentChannelProps)=>{
        try {
        console.log(`NAME: ${name}`);
        let query = new URLSearchParams(name)
        let channel_id = query.get('channel')
        console.log(`channel_id:`, channel_id);
        console.log(`user:`, user);
        if(!user?.email){
          return
        } 
        if(!channel_id){
          for(let i of name){
            if(i.includes('='))
             throwErr({name:Errors.CHANNEL_NOT_FOUND})            
           }
            setter(null)
          return setLoading(false)
        }
        socket.emit('get_channel', {channel_id,userEmail:user?.email})
          } catch (error) {
        setServerResponse(error)
      } finally{
        scrollToRef?.current?.scrollIntoView({behaivor:'smooth'})
      }
    }


    return {handleLeaveChannel,handleJoinChannel,handleCurrentChannel}
}

export default useHandleChannel