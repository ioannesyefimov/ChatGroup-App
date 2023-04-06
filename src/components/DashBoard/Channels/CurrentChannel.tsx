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
    let filterCurrentChannel = () =>{
      let currentChanel = location.pathname.replace('/chat/', '')
      console.log(currentChanel)
      let filterCurrent = filteredChannels.filter(channel => channel?.name?.toLocaleLowerCase().replaceAll(' ', '-').includes(currentChanel))
      if(filterCurrent){
        setCurrentChannel(filterCurrent[0])
      }
      console.log(filterCurrent)
    }
    if(location.pathname.includes('chat')){
      filterCurrentChannel()
    }
  },[location.pathname])
  let title = <h2 className='channel-title'>{currentChannel?.name ?? "Choose your channel"}</h2>

    let channels =
    (
      <div className="channels-wrapper">
        {
            currentChannel?.messages instanceof Array ? 
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
        : (
          null
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