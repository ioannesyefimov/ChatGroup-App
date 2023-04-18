import React, { MouseEventHandler } from 'react'
import { useAuth } from '../../hooks'
import './UserBar.scss'
import { triangleIco, userIco } from '../../assets'
import { UserType } from '../types'
import User from '../UserComponent/User'
const UserBar = ({user}:{user:UserType}) => {


  const content = (
    <div className='user-bar-component'>
      <User user={user}/>
      <img src={triangleIco} className='dropdown-img' alt="user menu dropdown" />
    </div>
  )
  
  return content
    
  
}

export default UserBar