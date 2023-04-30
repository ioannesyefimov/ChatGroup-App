import React from 'react'
import { userIco } from '../../assets'
import { UserType } from '../types'
import { Link } from 'react-router-dom'
type PropsType = {
  user:UserType
  location?: 'profile' | 'bar' | ''
}

const User = ({user,location}:{user?:UserType,location:string}) => {
  let username = location =='profile' || location==='bar' ? (
    <Link to='/profile' className='user-name'>{user?.userName}</Link>
  ) : (
    <Link className='user-name' to={`/user?userName=${user?.userName}`}>{user?.userName}</Link>

  )
    return (
      <div className='user' >
          <img src={user?.picture ? user.picture : userIco} alt="avatar" className='user-img' />
          {username}
        
      </div>
    )
  }
  
export default User