import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './channelManager.scss'
import ChannelJoin from './ChannelJoin/ChannelJoin'
import ChannelCreate from './ChannelCreate/ChannelCreate'
const ChannelManager = () => {
    const location = useLocation()

    let content = (
        <div className='channel-manager-component'>
            {location.pathname==='/chat/manage' ? (
                <div className='wrapper'>
                    <Link to={`/chat/manage/join`}  replace>Join channel</Link>
                    <Link to={`/chat/manage/create`}  replace>Create new channel</Link>
                </div>

            ): (
                location.pathname === '/chat/manage/join' ? (
                    <ChannelJoin/>
                )  : (
                    location.pathname === '/chat/manage/create' ? (
                        <ChannelCreate/>
                    ) : (
                        null
                    )
                )
            )
            }
        </div>
    )

    // if(location.pathname === '/chat/manage/join') return <ChannelJoin/>
    // if(location.pathname === '/chat/manage/create') return <ChannelCreate/>
  return   content
  
}

export default ChannelManager