import React from 'react'
import './Dashboard.scss'
import ChatContainer from './ChatContainer'
import { Outlet } from 'react-router-dom'
const Dashboard: React.FC = ()  => {
  
  return (
    <div className='dashboard-component'>
      <ChatContainer />
      <Outlet/>
    </div>
  )
}

export default Dashboard