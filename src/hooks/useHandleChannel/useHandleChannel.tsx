import React, { Dispatch, SetStateAction } from 'react'
import { APIFetch, throwErr } from '../../components/utils';
import { useAuth } from '..';
import useChat from '../useChatContext/useChatContext';
import useError from '../useErrorContext/useError';
import { ChannelType, ResponseType, UserType } from '../../components/types';
import { Socket } from 'socket.io-client';

const useHandleChannel = () => {
    const {setError}=useError()
    const {setLoading,serverUrl}=useAuth()
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
            throwErr(response.message)
          }
          setChannels(response.data.channel)
        } catch (error) {
          setError(error)
        } finally{
          setLoading(false)
        }
      }

      const handleJoinChannel = 
      async (id:string,user:UserType)=>{
           try {
               setLoading(true)
               let fields = {id}
               console.log(`FIELDS: `, fields)
               // let uploadedPicture = await APIFetch({url:`${serverUrl}/upload/picture`, body:{image:channelAvatar,accessToken:cookies?.accessToken}})
               let response:ResponseType = await APIFetch({url:`${serverUrl}/channels/join`, body:{channel_id:id,userEmail:user.email},method:'POST'})
               if(!response.success) throwErr(response?.message)
               setChannels(prev=>({...prev, ...response?.data?.channel }))
               window.location.replace(`/chat/${response?.data?.channel?.channelName.replaceAll(' ','-')}`)
               console.log(`RESPONSE : `, response)
           } catch (error) {
               console.log(`ERROR:`,error)
               setError(error)
           }finally{
               setLoading(false)
           }
       }

       

 const handleCurrentChannel = async(name:string,setter:Dispatch<SetStateAction<ChannelType| null>>,socket:Socket<any,any>,user:UserType)=>{

  try {
    console.log(`NAME: ${name}`);
    if(!user.email) return
    if(!name.includes('?channel=')) {
      return setter(null)
    }
    name = name?.trim().replace('?channel=','').replaceAll('-', ' ')
    setLoading(true)
    console.log(`name:`, name);
   socket.emit('get_channel',{channelName:name,user})
   
  } catch (error) {
    setError(error)
  } finally{
    setLoading(false)
  }
}
      return {handleLeaveChannel,handleJoinChannel,handleCurrentChannel}
}

export default useHandleChannel