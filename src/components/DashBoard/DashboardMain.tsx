import React from 'react'
import CurrentChannel from './Channels/CurrentChannel'
import ChannelsBar from './ChannelsBar/ChannelsBar'
import "./DashboardMain.scss"
const DashboardMain = () => {
  return (
    <div className='dashboard-main '>  
        <ChannelsBar/>
        <CurrentChannel />
    </div>
  )
}

export default DashboardMain