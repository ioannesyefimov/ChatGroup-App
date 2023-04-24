import React, { useState } from 'react'
import Button from '../Button/Button'
import { profileIco, settingIco, triangleIco } from '../../assets'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks'

const DropDown = () => {
    const [isToggled,setIsToggled]= useState(false)
    const navigate = useNavigate()
    let content = (
        <>
        {isToggled && (
            <div className='dropdown'>
                <Button text='settings' img={settingIco} onClick={()=>navigate('/profile/settings')} name="link" />
                <Button text='profile' img={profileIco} onClick={()=>navigate(`/profile`)} name="link" />
            </div>
        )}
            

            <Button img={triangleIco} name='dropdown-img'  text='' onClick={()=>setIsToggled(prev=>!prev)}/>
        </>
    )
  return content
}

export default DropDown