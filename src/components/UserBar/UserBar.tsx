import React, { MouseEventHandler } from 'react'
import { useAuth } from '../../hooks'
type PropsType = {
 
}
const UserBar = () => {
  const {user}=useAuth()


  const content = (
    <div className='user-bar-component'>
      <img src={user?.photo} alt="user image" className='profile-img' />
      <p className='name'>{user?.userName}</p>
    </div>
  )
  
  return content
    
  
}

export default UserBar