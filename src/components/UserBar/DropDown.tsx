import React, { useState } from 'react'
import Button from '../Button/Button'
import { logoutIco, profileIco, settingIco, triangleIco } from '../../assets'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks'

const DropDown = () => {
    const [isToggled,setIsToggled]= useState(false)
    const navigate = useNavigate()
    const {clearState}=useAuth()
    let content = (
        <>
        {isToggled && (
            <div className='dropdown'>
                <Button text='settings' img={settingIco} onClick={()=>navigate('/profile/settings')} name="link" />
                <Button text='profile' img={profileIco} onClick={()=>navigate(`/profile`)} name="link" />
                <Button text='Logout' img={logoutIco} onClick={()=>clearState('/auth/signin',navigate)} name="link logout-btn" />
            </div>
        )}
            

            <Button isToggled={isToggled}  img={triangleIco} name='dropdown-img'  text='' onClick={()=>setIsToggled(prev=>!prev)}/>
        </>
    )
  return content
}

export default DropDown