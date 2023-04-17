import React, { useEffect } from 'react'
import './NavigationBar.scss'
import NavLink from './NavLink'
import { useAuth, useWindowSize } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { chatifyIco } from '../../assets'
import Hamburger from '../HamburgerMenu/Hamburger'
const NavigationBar = () => {
  const {clearState} = useAuth()
  const windowSize= useWindowSize()

  const navBar = (
    <div className="flex">
       <button className='nav-btn' onClick={()=>clearState('/auth', navigate)}>Logout</button>
      <button className='nav-btn back-btn' onClick={()=>navigate(-1)}>Back</button>
    </div>
  )
  const navigate = useNavigate()
    return (
    <div className='navbar-component' >
        <button className='logo-btn' onClick={()=>navigate('/chat')}>
          <img  src={chatifyIco} alt="logo" />
        </button>
      <div className="navbar-inner" id='navBarInner'>
        {windowSize?.width < 500 ? (
           <Hamburger type='navbar'>
           {navBar}
         </Hamburger>
        ) : (
           navBar
        )}
     
      </div>
    </div>
  )
}

export default NavigationBar