import React, { useEffect, useState } from 'react'
import { ChannelType, UserType } from '../types'
import './UserComponent.scss'
import { useAuth, useResponseContext, useSearch } from '../../hooks'
import { Link, useLocation, useParams } from 'react-router-dom'
import Channel from '../DashBoard/Channel/Channel'
import User from './User'
import NavigationBar from '../NavigationBar/NavigationBar'

import useSWR from 'swr'
import { APIFetch } from '../utils'
import { LoadingFallback } from '../LoadingFallback/LoadingFallback'

const UserComponent = () => {
  // const {handleSearch,searchedValue,setSearchedValue} = useSearch()
  // const [showedUser,setShowedUser] = useState<UserType|null>()
  let {userId} = useParams()
  console.log(`id`,userId)
  const {serverUrl}=useAuth()
  const {setServerResponse}=useResponseContext()
  const fetcher = ()=>APIFetch({url:`${serverUrl}/users/user/${userId}`,method:'GET'})
  const {data,isLoading,error}=useSWR(`/api/users/user/${userId}`,fetcher)

  if(isLoading) return <LoadingFallback/>
  if(error) setServerResponse(error)

  // useEffect(
  //   ()=>{
  //     console.log(`id`,userId);
  //     if(!userId) return console.log(`params is empty`);
  //     handleSearch({search:userId,searchType:'USERS'})
  //     return ()=>{setSearchedValue({});setShowedUser(null)}
  //   },[]
  // )
  // useEffect(()=>{
  //   console.log(`SEARCHEDVALUE `, searchedValue);
    
  //   if(searchedValue?.users){
  //     handleSearch({search:userId,searchType:'USER'})
  //   }
  //   if(searchedValue?.filteredUsers){
  //     setShowedUser(searchedValue.filteredUsers[0])
  //   }
  // },[searchedValue])

  type UserChannelsType = {default?:any,channel:ChannelType,_id:string}

  const showedUser = data?.data?.user
  let userChannels =(
    <div className="user-channels">
      <h4 className='subtitle'>Users channels:</h4>
        {showedUser?.channels ? ( 
           showedUser.channels.map((c:any)=>{
            let channel = c.channel ?? c
            return <Channel id={channel._id!} key={channel._id ?? '13'} name={channel.channelName} avatar={channel.channelAvatar} type='' />
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
       <User location="profile" user={showedUser!} key={showedUser?._id}/>
        {userChannels}
      </div>
    </>
  )
  return(
    <>
    <NavigationBar/>
    { 
     showedUser ? 
     
     (
        content
      ) : (
        <div className="user-component">
          <h2>Not Found...</h2>
          <span>Check spelling if you are sure there is such user...</span>
          <Link to="/search">Search again</Link>
        </div>
    )}
    </>
  )
} 

export default UserComponent