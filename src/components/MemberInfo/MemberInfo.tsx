import React, { ReactNode, useState } from 'react'
import './MemberInfo.scss'
import { UserType } from '../types'
import { userIco } from '../../assets'
const MemberInfo = ({user}:{user:UserType |undefined}) => {
    const [isToggled,setIsToggled]=useState<boolean>(false)
    const toggle =()=>setIsToggled(prev=>!prev)
    let content = isToggled ? (
        <div className='member-info'>
            <img src={user?.picture ?? userIco} alt="" className='profile-img' />
            <p className='name'>{user?.userName}</p>
            <button className="hide" onClick={toggle}>hide</button>
        </div>
    ) : (
        <>
            <button className='show-member-button' onClick={toggle}>
                <img className='message-logo' src={user?.picture ?? userIco} alt="profile-logo" />
            </button>
        </>
    )
  return content

}

export default MemberInfo