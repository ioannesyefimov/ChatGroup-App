import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSearchChannels from '../../../hooks/useSearchChannels'
import './CurrentChannel.scss'
import { useAuth, useChat, useError } from '../../../hooks'
import { ChannelType, MessageType, UserType } from '../../types'
import Message from '../Message/Message'
import FormInput from '../../FormInput/FormInput'
import { APIFetch, setter, throwErr, validateInput } from '../../utils'
import { sendIco } from '../../../assets'
import { Button, SubmitInput } from '../..'
import { ChannelsProps } from '../ChatContainer'
import MessageInput from '../../SubmitInput/SubmitInput'



const CurrentChannel = ({channels,setChannels}:ChannelsProps) => {
  const [currentChannel,setCurrentChannel] =useState<ChannelType | null>(null)
  
  const {user,setLoading} = useAuth()
  const {setError} = useError()
  const location = useLocation()



 const handleCurrentChannel = async(channels:ChannelType[] ,pathname:string)=>{

  try {
    setLoading(true)

    let pathNameChannel = pathname.replace('/chat/','').replaceAll(' ', '-')?.trim()
   if(currentChannel?.channelName && pathNameChannel !== currentChannel.channelName.replaceAll(' ', '-')) {
     setCurrentChannel(null)
   }
 
   
   console.log(`channels:`, channels);
   console.log(`pathname:`, pathname);
   
   let filteredChannel = channels.find((channel:ChannelType,index:string|number)=>{
       console.log(`pathNameChannel: ${pathNameChannel}`);
       console.log(`channel.channelName: ${channel.channelName}`);
       
       if(channel.channelName.replaceAll(' ', '-') === pathNameChannel){
         return channel
       }
   })
   console.log(`FILTERED CHANNEL:` , filteredChannel);
   
   if(!filteredChannel){
       return console.log(`CURRENT CHANNEL ISN'T FOUND`)
   }
   setCurrentChannel(filteredChannel)
   if(!channels.length){
     let response = await APIFetch({url:`http://localhost:5050/api/channel/${pathNameChannel}?userEmail=${user?.email}`,method:'GET'});
     if(!response.success) throwErr(response?.message)
     setCurrentChannel(response?.data?.channels)
     return
 
   }
    
  } catch (error) {
    setError(error)
  } finally{
    setLoading(false)
  }
}
  useEffect(
    ()=>{
      console.log(`rerender on change pathname`)
      handleCurrentChannel(channels,location.pathname)
    },[location.pathname,channels]
  )
  const handleSubmitMessage = async(e:React.MouseEvent<HTMLButtonElement> |React.KeyboardEvent<any> | undefined, value:any,setValue:Dispatch<SetStateAction<any>>,propsValue:any,setPropsValue:Dispatch<SetStateAction<any>>)=>{
    try {
        console.log(`SUBMITTING MESSAGE`)
      setLoading(true)
      if(!value) return console.log(`MESSAGE ISN'T TYPED `)
      if(!propsValue) return

      let response = await APIFetch({url: `http://localhost:5050/api/messages/create`,method:'POST', body: {
        userEmail: user?.email,channelName: currentChannel?.channelName,message:value
      }})

      if(!response.success) throwErr(response?.message) 

      console.log(`response:` ,response);
      
      setPropsValue(response?.data?.channel )

    } catch (error) {
      setError(error)
      console.error(`error:`, error)
    } finally{
      setLoading(false)
      setValue('')
    }
 }
 const deleteMessage = async(_id:string) => {
  if(!_id) return
  try {
    let response = await APIFetch({url:`http://localhost:5050/api/messages/delete?userEmail=${user.email}&channelName=${currentChannel?.channelName}&_id=${_id}`,method:'DELETE'});
    if(!response.success) throwErr(response?.message)
  } catch (error) {
    setError(error)
  }
}

  let title = <h2 className='channel-title'>{currentChannel?.channelName}</h2>

    let channelContent =
    (
      <div className="main-wrapper">
        {title}
        <div className="messages-wrapper">
          {
              currentChannel?.channelName && currentChannel?.messages.length ?  
             (
              currentChannel?.messages.map((message:MessageType,i:number|string)=>{
                console.log(`MESSAGE: `, message);
                
                return (
                  <Message deleteMessage={deleteMessage} channelName={currentChannel.channelName} _id={message?.id} key={message?.id} user={message?.user} message={message?.message} createdAt={message?.createdAt} messageUser={message?.user}  />
                  )
                })
                ) : (
                  <h4>There is no messages in {currentChannel?.channelName}</h4>
                  )
                }
        </div>
        {/* <FormInput placeholder='Type a message here' name='message-input'    type="text" id="message-input" onChange={}  value= {currentMessage} */}
        {/* > */}
        {/* </FormInput>  */}
        <SubmitInput handleClick={handleSubmitMessage} setPropsValue={setCurrentChannel} propsValue={currentChannel} name="message-input" placeholder="Type a message here" e={undefined} value={undefined} setValue={function (value: any): void {
            throw new Error('Function not implemented.')
          } } />
      </div>
  )
  return currentChannel?.channelName ? channelContent : (
   <div className='main-wrapper'>
     <h2 className='channel-title'>Choose your channel</h2>
    </div>
    
  )
}

export default CurrentChannel