import React from 'react'
import FormInput from '../../Authentication/AuthForm/FormInput'
import { searchIco } from '../../../assets'
import Channels from '../Channels/Channels'
import useSearchChannels from '../../../hooks/useSearchChannels'
import './ChannelsBar.scss'
import Hamburger from '../../HamburgerMenu/Hamburger'

const ChannelsBar = () => {
  const {search,hanldeSearchChange, filteredChannels} = useSearchChannels()

  return (
    <div className="left-wrapper" id="sideBar" aria-checked={false}>
    <div className="flex flex--between">
      <span>Channels</span>
      <button className='add-btn'></button>
    </div>
    <div className="search-wrapper">
      <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={hanldeSearchChange} value={search} />
    </div>
    
   <Channels channels={filteredChannels} />
  </div>
  )
}

export default ChannelsBar