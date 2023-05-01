import React from 'react'
import CurrentChannel from './CurrentChannel/CurrentChannel'
import "./ChatContainer.scss"
import { Outlet} from 'react-router-dom'

const ChatContainer = () => {
    let content = (
        <div className='chat-container-outer '>  
            <CurrentChannel />
            <Outlet/>
        </div>
    )
 
    
  return content
}

export default ChatContainer