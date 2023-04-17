import React, { MouseEventHandler } from 'react'
import { useAuth } from '../../hooks'
import './UserBar.scss'
import { triangleIco, userIco } from '../../assets'
import { UserType } from '../types'
import UserComponent from '../UserComponent/UserComponent'
const UserBar = ({user}:{user:UserType}) => {


  const content = (
    <div className='user-bar-component'>
      <UserComponent user={user}/>
      <img src={triangleIco} className='dropdown-img' alt="user menu dropdown" />
    </div>
  )
  
  return content
    
  
}

export default UserBar