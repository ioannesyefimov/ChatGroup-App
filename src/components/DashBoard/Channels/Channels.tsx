import React, { useEffect } from 'react'
import { APIFetch, getFirstLetter, throwErr } from '../../utils'
import useSearchChannels from '../../../hooks/useSearch'
import { Link } from 'react-router-dom'
import './Channels.scss'
import { ChannelType } from '../../types'
import Channel from '../Channel/Channel'
import { useAuth, useChat, useError } from '../../../hooks'
const Channels = ({...props}) => {
  const {setError}=useError()
  const {setLoading,serverUrl,user}=useAuth()
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
  let content = (
    Array.isArray(props.channels) && props.channels?.length ? (
      <div className='channels'>
        {props.channels.map((channel:ChannelType)=>{
          return (
            <Channel handleLeaveChannel={handleLeaveChannel} id={channel?._id} key={channel?._id ?? '228'} name={channel?.channelName} avatar={channel?.channelAvatar} />
          )
        })
        }
      </div>
    ) : (
        <h4 className='hint'>There is no channels yet</h4>
    )
  )


  return content
}

export default Channels