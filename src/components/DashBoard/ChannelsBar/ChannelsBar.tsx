import React, { useEffect, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import { searchIco } from '../../../assets'
import Channels from '../Channels/Channels'
import useSearchChannels from '../../../hooks/useSearch'
import './ChannelsBar.scss'
import Hamburger from '../../HamburgerMenu/Hamburger'
import { useAuth, useChat, useWindowSize } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { ChannelType } from '../../types'
import UserBar from '../../UserBar/UserBar'
import { ChannelsProps } from '../ChatContainer'

const ChannelsBar = ({channels,setChannels}:ChannelsProps) => {
  const {search,handleSearchChange} = useSearchChannels(channels)
  const navigate = useNavigate()
  const {user} = useAuth()

  let content = (
     <Hamburger  type='channels'>
      <div className={`left-wrapper  `}  >
          <div className="left-wrapper-inner"  id="leftWrapperInner">
            <div className="flex flex--between">
            <span>Channels</span>
            <button onClick={()=>navigate('/channel/manage')} className='add-btn'></button>
            </div>
            <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={handleSearchChange} value={search} />
            <Channels channels={ channels  } />
          </div>
      </div>
      <UserBar user={user} />
     </Hamburger>
  )
  
  return content
}

export default ChannelsBar