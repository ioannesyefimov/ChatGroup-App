import React, { ChangeEvent } from 'react'
import { searchIco } from '../../assets'
import useSearchChannels from '../../hooks/useSearchChannels'
import { useAuth} from '../index'
import {FormInput} from '../index'
import { getFirstLetter } from '../utils'
import Channels from './Channels/Channels'
import CurrentChannel from './Channels/CurrentChannel'
import './Dashboard.scss'
const Dashboard: React.FC = ()  => {
  const {search,hanldeSearchChange, filteredChannels} = useSearchChannels()
  
  return (
    <div className='dashboard-component'>
      
        <div className="left-wrapper">
        <div className="flex flex--between">
          <span>Channels</span>
          <button className='add-btn'></button>
        </div>
        <div className="search-wrapper">
          <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={hanldeSearchChange} value={search} />
        </div>
        
       <Channels channels={filteredChannels} />
      </div>

      <CurrentChannel />
    </div>
  )
}

export default Dashboard