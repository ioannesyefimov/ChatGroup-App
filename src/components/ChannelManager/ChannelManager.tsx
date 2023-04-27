import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './channelManager.scss'
const ChannelManager = () => {
    const location = useLocation()

    let content = (
        <div className='channel-manager-component'>
            {location.pathname === '/chat/manage' ? (
            <div className='wrapper'>
                <Link to={`join`}  replace>Join existing</Link>
                <Link to={`create`}  replace>Create new</Link>
            </div>
            ): (
                    <Outlet/>
            )}
    </div>
    )
  return content
}

export default ChannelManager