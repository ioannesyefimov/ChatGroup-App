import React, { ChangeEvent } from 'react'
import { searchIco } from '../../assets'
import useSearchChannels from '../../hooks/useSearchChannels'
import {FormInput} from '../index'
import { getFirstLetter } from '../utils'
import Channels from './Channels/Channels'
import CurrentChannel from './Channels/CurrentChannel'
import './Dashboard.scss'
import ChannelsBar from './ChannelsBar/ChannelsBar'
import NavigationBar from '../NavigationBar/NavigationBar'
import DashboardMain from './DashboardMain'
const Dashboard: React.FC = ()  => {
  
  return (
    <div className='dashboard-component'>
      <NavigationBar />
      <DashboardMain/>
   
    </div>
  )
}

export default Dashboard