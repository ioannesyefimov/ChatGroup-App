import React, { Dispatch, MutableRefObject, SetStateAction, useCallback } from 'react'
import { APIFetch, throwErr } from '../../components/utils';
import { useAuth } from '..';
import useChat from '../useChatContext/useChatContext';
import useError from '../useErrorContext/useError';
import { ChannelType, ResponseType, UserType } from '../../components/types';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const useHandleChannel = (setCurrent?:Dispatch<SetStateAction<any>> | undefined) => {
    const {setError,setServerResponse}=useError()
    const {setLoading,serverUrl}=useAuth()
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
          setChannels(response.data.channel)
        } catch (error) {
          setError(error)
        } finally{
          setLoading(false)
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
              navigate(`/chat/channel=${response?.data?.channel?.channelName.replaceAll(' ','-')}`)
              console.log(`RESPONSE : `, response)
          } catch (error) {
              console.log(`ERROR:`,error)
              setError(error)
          }finally{
              setLoading(false)
          }
      }

       
    type HandleCurrentChannelProps ={
      setter: Dispatch<SetStateAction<ChannelType| null>>
      name:string
      socket:Socket<any,any>
      scrollToRef: MutableRefObject<HTMLDivElement |undefined>  
      user:UserType
      signal?:AbortSignal
    } 

    const handleCurrentChannel =
      async({name,setter,socket,scrollToRef,user,signal}:HandleCurrentChannelProps)=>{
        try {
        setLoading(true)
        console.log(`NAME: ${name}`);
        let query = new URLSearchParams(name)
        let channelName = query.get('channel')
        console.log(`channelName:`, channelName);
        console.log(`user:`, user);
        if(!user?.email){
          return
        } 
        if(!channelName){
            setter(null)
          return
        }
        socket.emit('get_channel', {channelName,userEmail:user?.email})
          } catch (error) {
        setError(error)
      } finally{
        setLoading(false)
        scrollToRef?.current?.scrollIntoView({behaivor:'smooth'})
      }
    }


    return {handleLeaveChannel,handleJoinChannel,handleCurrentChannel}
}

export default useHandleChannel