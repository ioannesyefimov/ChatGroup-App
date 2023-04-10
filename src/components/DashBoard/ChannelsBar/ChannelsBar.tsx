import React, { useEffect, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import { searchIco } from '../../../assets'
import Channels from '../Channels/Channels'
import useSearchChannels from '../../../hooks/useSearchChannels'
import './ChannelsBar.scss'
import Hamburger from '../../HamburgerMenu/Hamburger'
import { useChat, useWindowSize } from '../../../hooks'
import { useNavigate } from 'react-router-dom'

const ChannelsBar = () => {
  const {search,hanldeSearchChange, filteredChannels} = useSearchChannels()
  const {channels} = useChat()
  const navigate = useNavigate()
  useEffect
  (
    ()=>{
      console.log(channels);
      console.log(filteredChannels);
      
    },[channels,filteredChannels]
  )

  let content = (
     <Hamburger  type='channels'>
      <div className={`left-wrapper  `}  >
          <div className="left-wrapper-inner"  id="leftWrapperInner">
            <div className="flex flex--between">
            <span>Channels</span>
            <button onClick={()=>navigate('/channel/create')} className='add-btn'></button>
            </div>
            <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={hanldeSearchChange} value={search} />
            <Channels channels={ channels  } />
          </div>
      </div>
     </Hamburger>
  )
  
  return content
}

export default ChannelsBar