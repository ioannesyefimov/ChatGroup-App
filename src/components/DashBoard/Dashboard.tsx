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
const Dashboard: React.FC = ()  => {
  
  return (
    <div className='dashboard-component'>
      <NavigationBar />
      <ChannelsBar/>
      <CurrentChannel />
    </div>
  )
}

export default Dashboard