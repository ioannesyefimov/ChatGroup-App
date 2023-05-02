import React from 'react'
import { userIco } from '../../assets'
import { UserType } from '../types'
import { Link } from 'react-router-dom'
type PropsType = {
  user:UserType
  location?: 'profile' | 'bar' | ''
}

const User = ({user,location}:{user?:UserType,location:string}) => {
    return (
      <Link to={location==='profile' || location==='bar' ? '/profile' : `/user/${user?._id}`} className='user' >
          <img src={user?.picture ? user.picture : userIco} alt="avatar" className='user-img' />
          <span>{user?.userName}</span>        
      </Link>
    )
  }
  
export default User