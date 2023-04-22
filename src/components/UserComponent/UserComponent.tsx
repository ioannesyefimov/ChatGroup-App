import React, { useEffect, useState } from 'react'
import { backIco, triangleIco, userIco } from '../../assets'
import { ChannelType, UserType } from '../types'
import './UserComponent.scss'
import { useSearch } from '../../hooks'
import { Link, useLocation } from 'react-router-dom'
import Channel from '../DashBoard/Channel/Channel'
import User from './User'
import NavigationBar from '../NavigationBar/NavigationBar'
const UserComponent = () => {
  const location = useLocation()
  const [showedUser,setShowedUser] = useState<UserType|null>()
  const {handleSearch,searchedValue,setSearchedValue} = useSearch()

  useEffect(
    ()=>{
      let search = location.search
      if(!search) return console.log(`Search is empty`);
      let query = new URLSearchParams(search)
      console.log(`SEARCHD:`, searchedValue);
      
      let email = query.get('email')
      let userName = query.get('userName')
      let id = query.get('id')
      handleSearch({search:`email=${email}&userName=${userName}&id=${id}`,searchType:'USERS'})
      return ()=>{setSearchedValue({});setShowedUser(null)}

    },[]
  )

  useEffect(()=>{
    if(searchedValue?.users){
        setShowedUser(searchedValue.users[0])
    }
  },[searchedValue])
  type UserChannelsType = {default?:any,channel:ChannelType,_id:string}
  let userChannels =(
    <div className="user-channels">
      <h4 className='subtitle'>Users channels:</h4>
        {showedUser?.channels ? ( 
           showedUser.channels.map((c)=>{
            let channel = c.channel ?? c
            return <Channel id={channel._id!} key={channel._id ?? '13'} name={channel.channelName} avatar={channel.channelAvatar} />
             })
          ): (
          <h4>isn't member of any channels</h4>
          )
        }
      </div>
  )
  let content = (
    <>
      <div className='user-component' >
       <User user={showedUser!} key={showedUser?._id}/>
        {userChannels}

        <Link to='/chat' replace className='back-btn flex'><img src={backIco} alt="back-icon" /> Home</Link>
      </div>
    </>
  )


  return showedUser ? (
    content
  ) : (
    <div className="user-component">
      <h2>Not Found...</h2>
      <span>Check spelling if you are sure there is such user...</span>
      <Link to="/search">Search again</Link>
    </div>
  )
} 

export default UserComponent