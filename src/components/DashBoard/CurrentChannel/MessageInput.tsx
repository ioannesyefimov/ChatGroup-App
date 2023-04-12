import { type } from "os"
import React, { useState } from "react"
import { sendIco } from "../../../assets"
import Button from "../../Button/Button"
import { APIFetch, throwErr } from "../../utils"

const MessageInput = ({currentChannel,user,setCurrentChannel,setLoading,setError,name,placeholder}) => {
    const [currentMessage,setCurrentMessage] = useState('')
    const handleSubmitMessage = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        try {
            console.log(`SUBMITTING MESSAGE`)
          setLoading(true)
          if(!currentMessage) return console.log(`MESSAGE ISN'T TYPED `)
          if(!currentChannel) return
    
          let response = await APIFetch({url: `http://localhost:5050/api/messages/create`,method:'POST', body: {
            userEmail: user?.email,channelName: currentChannel?.channelName,message:currentMessage
          }})
    
          if(!response.success) throwErr(response?.message) 
    
          console.log(`response:` ,response);
          
          setCurrentChannel(response?.data?.channel )
    
        } catch (error) {
          setError(error)
          console.error(`error:`, error)
        } finally{
          setLoading(false)
          setCurrentMessage('')
        }
     }
  
    return (
      <div className={`inner-wrapper ${name}`}>
        <div className='form-wrapper'>
            <input onChange={(e)=>{if(e.target){setCurrentMessage(e?.target?.value)}}} value={currentMessage} placeholder={placeholder}  name={name} id={name} aria-label={`${name} `} />
        </div>
        <Button type='button' onClick={handleSubmitMessage} onKeyDown={(e) => {if(e.key==='Enter'){handleSubmitMessage}}} img={sendIco} name='submit-btn' text={''} />

    </div>
    
    )
  }
    
    
  
  export default MessageInput