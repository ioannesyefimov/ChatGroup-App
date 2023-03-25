import React, { useEffect } from 'react'
import { getFirstLetter } from '../../utils'
import useSearchChannels from '../../../hooks/useSearchChannels'
import { Link } from 'react-router-dom'
import './Channels.scss'
const Channels = ({...props}) => {
  const {search} = useSearchChannels()

  useEffect(() => {
    console.log(props.channels)
  
  }, [props.channels])
  
  return (
    <div className="channels">
        {props?.channels  ? (
            props?.channels instanceof Array ? (
              props?.channels.map((channel)=>{
                return (
                  <div key={channel?.id} className="channel">
                    <div className="channel-logo">{getFirstLetter(channel?.name,2)}</div>
                    <Link className='link-tag' to={`/chat/${channel?.name.trim().replaceAll(' ', '-')}`} replace><div className="channel-name">{channel?.name}</div></Link>
                  </div>
                )
              })
            ) :  (
                <div key={props?.channels?.id} className="channel">
                  <div className="channel-logo">{getFirstLetter(props?.channels?.name,2)}</div>
                  <Link to={`/chat/${props?.channel?.name.trim().replaceAll(' ', '-')}`} replace><div className="channel-name">{props?.channels?.name}</div></Link>
                </div>
            )
          ) :(
            <>
              <div className="channel">
                <div className="channel-logo">FD</div>
                <Link to={`/chat/${props.channel?.name.trim().replaceAll(' ', '-')}`} replace><div className="channel-name">front-end developers</div></Link>
              </div>
              <div className="channel">
                <div className="channel-logo">FD</div>
                <Link to={`/chat/${props.channel?.name.trim().replaceAll(' ', '-')}`} replace><div className="channel-name">front-end developers</div></Link>
              </div>
              <div className="channel">
                <div className="channel-logo">FD</div>
                <Link to={`/chat/${props.channel?.name.trim().replaceAll(' ', '-')}`} replace><div className="channel-name">front-end developers</div></Link>
              </div>
            </>
          )}  
        </div>
  )
}

export default Channels