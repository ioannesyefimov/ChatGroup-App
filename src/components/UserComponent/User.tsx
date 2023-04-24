import React from 'react'
import { userIco } from '../../assets'
import { UserType } from '../types'
import { Link } from 'react-router-dom'

const User = ({user,location}:{user?:UserType,location:string}) => {
    return (
      <div className='user' >
          <img src={user?.picture ? user.picture : userIco} alt="avatar" className='user-img' />
          {location =='profile' ? (
            <span className='user-name'>{user?.userName}</span>
          ) : (
            <Link className='user-name' to={`/user?userName=${user?.userName}`}>{user?.userName}</Link>

          )}
        
      </div>
    )
  }
  
export default User