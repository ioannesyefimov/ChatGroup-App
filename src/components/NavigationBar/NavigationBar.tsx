import React from 'react'
import './NavigationBar.scss'
import NavLink from './NavLink'
import { useAuth } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { chatifyIco } from '../../assets'
const NavigationBar = () => {
  const {clearState} = useAuth()
  const navigate = useNavigate()
    return (
    <div className='navbar-component'>
        <img className='logo' src={chatifyIco} alt="logo" />
        <div className="flex">
            <button className='nav-btn' onClick={()=>clearState('/auth', navigate)}>Logout</button>
            <button className='nav-btn back-btn' onClick={()=>navigate(-1)}>Back</button>
        </div>
    </div>
  )
}

export default NavigationBar