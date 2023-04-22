import React from 'react'
import { userIco } from '../../assets'
import { UserType } from '../types'
import { Link } from 'react-router-dom'

const User = ({user}:{user?:UserType}) => {
    return (
      <div className='user' >
          <img src={user?.picture ? user.picture : userIco} alt="avatar" className='profile-img' />
        <Link className='name' to={`/user?userName=${user?.userName}`}>{user?.userName}</Link>
        
      </div>
    )
  }
  
export default User