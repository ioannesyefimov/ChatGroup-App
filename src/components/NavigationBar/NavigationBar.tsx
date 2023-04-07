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

  useEffect(
    ()=>{
      console.log(windowSize)
    },[windowSize]
  )

  const navBar = (
    <div className="flex">
       <button className='nav-btn' onClick={()=>clearState('/auth', navigate)}>Logout</button>
      <button className='nav-btn back-btn' onClick={()=>navigate(-1)}>Back</button>
    </div>
  )
  const navigate = useNavigate()
    return (
    <div className='navbar-component' >
        <div className='logo'>
          <img  src={chatifyIco} alt="logo" />
        </div>
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