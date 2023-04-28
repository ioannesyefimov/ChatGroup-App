import React, { useEffect, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import { refreshIco, searchIco, settingIco } from '../../../assets'
import Channels from '../Channels/Channels'
import useSearchChannels from '../../../hooks/useSearch/useSearch'
import './ChannelsBar.scss'
import Hamburger from '../../HamburgerMenu/Hamburger'
import { useAuth, useChat, useWindowSize } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { ChannelType } from '../../types'
import UserBar from '../../UserBar/UserBar'
import { ChannelsProps } from '../ChatContainer'
import SearchBar from './SearchBar'
import { Button } from '../..'
import useFetchChannels from '../../../hooks/useFetchChannels/useFetchChannels'

const ChannelsBar = () => {
  const [searchedChannels,setSearchedChannels] = useState<ChannelType[]|null>(null)
  const navigate = useNavigate()
  const {channels,fetchChannels}=useFetchChannels()
  const {user} = useAuth()

  let content = (
     <Hamburger  type='channels'>
      <div className={`left-wrapper  `}  >
          <div className="left-wrapper-inner"  id="leftWrapperInner">
            <div className="flex flex--between">
            <span>Channels</span>
            <Button onClick={()=>navigate('/chat/manage')} name='link' img={settingIco} />
            </div>
            <SearchBar searchType='CHANNEL' channels={channels} setSearchedChannels={setSearchedChannels}  />
            <Channels user={user} type='leave' fallbackText={!searchedChannels ? 'Not found' : `You aren't member of any channels`} channels={searchedChannels === undefined ? searchedChannels: searchedChannels?.length ? searchedChannels: channels} />
            <Button name='refetch'  onClick={()=>fetchChannels!()} img={refreshIco} type='button'/>
          </div>
      </div>
      <UserBar user={user} />
     </Hamburger>
  )
  
  return content
}

export default ChannelsBar