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
import SearchBar from './SearchBar'

const ChannelsBar = ({channels,setChannels}:ChannelsProps) => {
  const [searchedChannels,setSearchedChannels] = useState<ChannelType[]|null>(null)

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
            <SearchBar channels={channels} setSearchedChannels={setSearchedChannels}  />
            <Channels location={'bar'} channels={ searchedChannels ?? channels  } />
          </div>
      </div>
      <UserBar user={user} />
     </Hamburger>
  )
  
  return content
}

export default ChannelsBar