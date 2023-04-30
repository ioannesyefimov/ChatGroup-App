import React, { useEffect, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import { backIco, refreshIco, searchIco, settingIco } from '../../../assets'
import Channels from '../Channels/Channels'
import useSearchChannels from '../../../hooks/useSearch/useSearch'
import './ChannelsBar.scss'
import Hamburger from '../../HamburgerMenu/Hamburger'
import { useAuth, useChat, useCurrentContext, useWindowSize } from '../../../hooks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChannelType, UserType } from '../../types'
import UserBar from '../../UserBar/UserBar'
import SearchBar from './SearchBar'
import { Button } from '../..'
import useFetchChannels from '../../../hooks/useFetchChannels/useFetchChannels'
import User from '../../UserComponent/User'

const ChannelsBar = ({user}:{user:UserType}) => {
  const [searchedChannels,setSearchedChannels] = useState<ChannelType[]|null>(null)
  const [showedBar , setShowedBar]=useState(false)
  const [currentChannel,setCurrentChannel]=useCurrentContext()
  const navigate = useNavigate()
  const {channels,fetchChannels}=useFetchChannels(user)
  const  location = useLocation()
  
useEffect(
  ()=>{
    if(currentChannel?._id){
      setShowedBar(true)
    }else {
      setShowedBar(false)
    }
  },[currentChannel]
)

  let inChannelContent = (
    <Hamburger type='channels'>
       <div className={`left-wrapper  `}  >
          <div className="left-wrapper-inner"  id="leftWrapperInner">
            <div className="flex flex--between">
              <Button onClick={()=>setShowedBar(false)}  text='All channels' name='link' img={backIco} />
            </div>
            <div className='members-wrapper'>
              {
                currentChannel?.members?.map((member as UserType)=>{
                  return <User  user={member} location=""/>
                })
              }
            </div>
            <Channels type='leave' fallbackText={!searchedChannels ? 'Not found' : `You aren't member of any channels`} channels={searchedChannels === undefined ? searchedChannels: searchedChannels?.length ? searchedChannels: channels} />
          </div>
      </div>
      <UserBar user={user} />
    </Hamburger>
  )
  
  let content = (
     <Hamburger  type='channels'>
      <div className={`left-wrapper  `}  >
          <div className="left-wrapper-inner"  id="leftWrapperInner">
            <div className="flex flex--between">
            <span>Channels</span>
            <Button onClick={()=>navigate('/chat/manage')} name='link' img={settingIco} />
            </div>
            <SearchBar searchType='CHANNEL' channels={channels} setSearchedChannels={setSearchedChannels}  />
            <Channels type='leave' fallbackText={!searchedChannels ? 'Not found' : `You aren't member of any channels`} channels={searchedChannels === undefined ? searchedChannels: searchedChannels?.length ? searchedChannels: channels} />
            <Button name='refetch'  onClick={()=>fetchChannels!(user)} img={refreshIco} type='button'/>
          </div>
      </div>
      <UserBar user={user} />
     </Hamburger>
  )
  
  return content
}

export default ChannelsBar