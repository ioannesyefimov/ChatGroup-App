import React from 'react'
import Message from '../DashBoard/Message/Message';
import { ChannelType, MessageType, UserType } from '../types';
type PropsType ={
    handleDelete: (_id:string) => Promise<void>
    currentChannel: ChannelType | null
    user?:UserType
    scrollToRef?:  React.MutableRefObject<HTMLDivElement |undefined>
}
const Messages = ({handleDelete,currentChannel,user,scrollToRef}:PropsType) => {
    
    let content = (
      <>
        <div className="messages-wrapper" id='messagesWrapper' >
          {
            currentChannel?.channelName && currentChannel?.messages.length ?  
            (
            currentChannel?.messages.map((message:MessageType,i:number|string)=>{
              return (
                <Message ref={scrollToRef} handleDelete={handleDelete} channelName={currentChannel.channelName} _id={message?.id} key={message?.id} user={user!} message={message?.message} createdAt={message?.createdAt} messageUser={message?.user}  />
                )
              })
              ) : (
                <h4 key="no-message">There is no messages in {currentChannel?.channelName}</h4>
                )
            }
            <button  onClick={()=>{document.getElementById('messagesWrapper')!.scrollTop = 10000}} id={'downBtn'} className='down-btn'>↓</button>
        </div>
      </>
    )
  return content
}

export default Messages