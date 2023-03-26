import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSearchChannels from '../../../hooks/useSearchChannels'
import { Channel } from '../../types'
import './CurrentChannel.scss'

const CurrentChannel:React.FC = ({...props}) => {
  const location = useLocation()
  const [currentChannel,setCurrentChannel] =useState<Channel>()
  const {filteredChannels} = useSearchChannels()
  useEffect(()=>{
    let currentChanel = location.pathname.replace('/chat/', '')
    console.log(currentChanel)
    let filterCurrent = filteredChannels.filter(channel => channel?.name?.toLocaleLowerCase().replaceAll(' ', '-').includes(currentChanel))
    if(filterCurrent){
      setCurrentChannel(filterCurrent[0])
    }
    console.log(filterCurrent)
  },[location.pathname])
  return (
    <div className="main-wrapper">
      {currentChannel ? (
        <h2 className='channel-title'>{currentChannel?.name}</h2>

      ) : (
        <h2 className='channel-title'>Choose your channel</h2>

      )}
      <div className="messages-wrapper">
        { currentChannel?.messages && currentChannel.messages instanceof Array ? 
         (
          currentChannel?.messages.map((message,i)=>{
            return (
              <div key={i} className='message'>
                <img className='message-logo' src={message.profileLogo} alt="profile-logo" />
                <div className="message-wrapper">
                  <span className="message-name">{message?.userName}</span>
                  <span className="message-date">{message?.date}</span>
                </div>
                <p className="message-text">{message?.message}</p>
              </div>
            )
          })
        ): (
          null
        ) }
      
      </div>
      </div>
    )
}

export default CurrentChannel