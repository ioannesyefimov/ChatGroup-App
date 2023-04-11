import React, { MouseEventHandler } from 'react'
import { useAuth } from '../../hooks'
import './UserBar.scss'
import { triangleIco } from '../../assets'
const UserBar = () => {
  const {user}=useAuth()


  const content = (
    <div className='user-bar-component'>
      <img src={user?.picture} alt="" className='profile-img' />
      <p className='name'>{user?.userName}</p>
      <img src={triangleIco} className='dropdown-img' alt="user menu dropdown" />
    </div>
  )
  
  return content
    
  
}

export default UserBar