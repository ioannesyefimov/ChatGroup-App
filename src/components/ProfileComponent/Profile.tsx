import React, { useEffect } from 'react'
import './Profile.scss'
import { useAuth, useChat } from '../../hooks'
import UserComponent from '../UserComponent/UserComponent'
import Channels from '../DashBoard/Channels/Channels'
import User from '../UserComponent/User'
import useFetchChannels from '../../hooks/useFetchChannels/useFetchChannels'
import { Link } from 'react-router-dom'
const Profile = () => {
    const {user} = useAuth()
    // const {channels,fetchChannels} = useFetchChannels()
    const {channels}=useChat()   
    // useEffect(
    //     ()=>{
    //         fetchChannels()
    //     },[]
    // )
    let content = (

        <div className='profile-component' >
            <Link className='link' to='settings'>Settings</Link>
            <User location='profile'  user={user!} key={user?._id}/>

            <Channels channels={channels} type='leave' fallbackText='there is no channels yet' /> 
       </div>
    )

    return content
}

export default Profile