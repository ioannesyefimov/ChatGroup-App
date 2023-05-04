import React, { useEffect, useState } from 'react'
import { backIco, refreshIco, logoutIco, settingIco, chatifyIco } from '../../../assets'
import Channels from '../Channels/Channels'
import './ChannelsBar.scss'
import Hamburger from '../../HamburgerMenu/Hamburger'
import {  useCurrentContext, useHandleChannel } from '../../../hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChannelType, UserType } from '../../types'
import UserBar from '../../UserBar/UserBar'
import SearchBar from './SearchBar'
import { Button } from '../..'
import useFetchChannels from '../../../hooks/useFetchChannels/useFetchChannels'
import Members from './Members/Members'

const ChannelsBar = ({user}:{user:UserType}) => {
  const [searchedChannels,setSearchedChannels] = useState<ChannelType[]>([])
  const [showedBar , setShowedBar]=useState(false)
  const {currentChannel,setCurrentChannel}=useCurrentContext()
  const navigate = useNavigate()
  const {
    handleLeaveChannel
  } = useHandleChannel()
  const {channels,fetchChannels}=useFetchChannels(user)
  const  location = useLocation()
  
useEffect(
  ()=>{
    console.log(`CURRENT`, currentChannel);
    if(currentChannel){
      setShowedBar(true)
    }else {
      setShowedBar(false)
    }
  },[currentChannel,location.search]
)
  
  let content = showedBar ? (
    <Hamburger type='channels'>
       <div className={`left-wrapper`} data-showedbar={showedBar}  >
          <div className="left-wrapper-inner"  id="leftWrapperInner">
            <Button onClick={()=>setShowedBar(false)}  text='All channels' name='back' img={backIco} />
            <div className='channel'>
              <h4 className='channel-name'>{currentChannel?.channelName}</h4>
              <span className='channel-description'>{currentChannel?.channelDescription ?? 'Channel without description ᓚᘏᗢ'}</span>
              <div className='channel-members'>
                <h4>MEMBERS</h4>
                <Members members={currentChannel?.members}/>
              </div>
            </div>

          </div>
            <Button onClick={()=>navigate('/chat')}  text='leave room' name='leave' img={logoutIco} />
            <Button onClick={()=>handleLeaveChannel(currentChannel?._id,user)}  text='leave channel' name='leave' img={logoutIco} />

      </div>
      <UserBar user={user} />
    </Hamburger>
  ): (
     <Hamburger  type='channels'>
      <div className={`left-wrapper  `}  >
          <div className="left-wrapper-inner" data-showedbar={showedBar}  id="leftWrapperInner">
          {currentChannel?._id ? (
            <Button onClick={()=>setShowedBar(true)}  text='Back to channel' name='link back' img={backIco} />
            ) : (
              
              <Button onClick={()=>navigate('/chat')}   name='link back logo' img={chatifyIco} />
          )}
          

            <div className="flex flex--between">
            <span>Channels</span>
            <Button onClick={()=>navigate('/chat/manage')} name='link' img={settingIco} />
            </div>
            <SearchBar searchType='CHANNEL' channels={channels} setSearchedChannels={setSearchedChannels}  />
            <Channels type='leave' fallbackText={!searchedChannels?.length ? 'Not found' : `You aren't member of any channels`} channels={searchedChannels?.length  ? searchedChannels: channels} />
            <Button name='refetch'  onClick={()=>fetchChannels!(user)} img={refreshIco} type='button'/>
          </div>
      </div>
      <UserBar user={user} />
     </Hamburger>
  )
  
  return content
}

export default ChannelsBar