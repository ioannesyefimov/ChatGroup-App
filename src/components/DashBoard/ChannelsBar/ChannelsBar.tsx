import React, { useEffect, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import { searchIco, settingIco } from '../../../assets'
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
import { Button } from '../..'

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
            <Button onClick={()=>navigate('/chat/manage')} name='add-btn' img={settingIco} />
            </div>
            <SearchBar searchType='CHANNEL' channels={channels} setSearchedChannels={setSearchedChannels}  />
            <Channels fallbackText={`You aren't member of any channels`} channels={ searchedChannels ?? channels  } />
          </div>
      </div>
      <UserBar user={user} />
     </Hamburger>
  )
  
  return content
}

export default ChannelsBar