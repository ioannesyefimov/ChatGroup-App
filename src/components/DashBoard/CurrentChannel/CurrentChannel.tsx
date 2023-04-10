import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useSearchChannels from '../../../hooks/useSearchChannels'
import './CurrentChannel.scss'
import { useChat } from '../../../hooks'

const CurrentChannel:React.FC = ({...props}) => {
  const location = useLocation()
  const {filteredChannels,search,handleSearchChannels} = useSearchChannels()
  const {currentChannel,setCurrentChannel} = useChat()

  useEffect(
    ()=>{   
        const timeOutId = setTimeout(()=>handleSearchChannels(search),1000)
        console.log('filtered: ',filteredChannels)
        return () => clearTimeout(timeOutId)
    }, [search]
  ) 


  let title = <h2 className='channel-title'>{currentChannel?.name ?? "Choose your channel"}</h2>

    let channels =
    (
      <div className="channels-wrapper">
        {
            currentChannel?.messages instanceof Array && 
           (
            currentChannel?.messages.map((message,i)=>{
              return (
                <div key={message.date} className='message'>
                  <img className='message-logo' src={message.profileImg} alt="profile-logo" />
                  <div className="message-wrapper">
                    <span className="message-name">{message?.userName}</span>
                    <span className="message-date">{message?.date}</span>
                  </div>
                  <p className="message-text">{message?.message}</p>
                </div>
              )
            })
           )
       
        }
      </div>
  )
  return (
    <div className="main-wrapper">
      {title}
     
     {channels}
      </div>
    )
}

export default CurrentChannel