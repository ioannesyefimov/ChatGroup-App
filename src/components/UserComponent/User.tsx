import React from 'react'
import { userIco } from '../../assets'
import { UserType } from '../types'

const User = ({key,user}:{key?:string,user?:UserType}) => {
    return (
      <div className='user' key={key}>
          <img src={user?.picture ? user.picture : userIco} alt="avatar" className='profile-img' />
        <p className='name'>{user?.userName}</p>
        
      </div>
    )
  }
  
export default User