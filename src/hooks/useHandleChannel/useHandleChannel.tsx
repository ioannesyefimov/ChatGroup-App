import React from 'react'
import { APIFetch, throwErr } from '../../components/utils';
import { useAuth } from '..';
import useChat from '../useChatContext/useChatContext';
import useError from '../useErrorContext/useError';

const useHandleChannel = () => {
    const {setError}=useError()
    const {setLoading,user,serverUrl}=useAuth()
    const {setChannels} =useChat() 
    const handleLeaveChannel = async(id:string)=>{
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


      return {handleLeaveChannel}
}

export default useHandleChannel