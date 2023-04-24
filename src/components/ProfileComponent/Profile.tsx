import React, { useEffect } from 'react'
import './Profile.scss'
import { useAuth, useChat } from '../../hooks'
import UserComponent from '../UserComponent/UserComponent'
import Channels from '../DashBoard/Channels/Channels'
import User from '../UserComponent/User'
import useFetchChannels from '../../hooks/useFetchChannels/useFetchChannels'
const Profile = () => {
    const {user} = useAuth()
    const {channels,fetchChannels} = useFetchChannels()

    useEffect(
        ()=>{
            fetchChannels()
        },[]
    )
    let content = (

        <div className='profile-component' >
        <User location='profile'  user={user!} key={user?._id}/>
         <Channels channels={channels} type='leave' fallbackText='there is no channels yet' /> 
       </div>
    )

    return content
}

export default Profile