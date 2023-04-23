import React, { useEffect } from 'react'
import './NavigationBar.scss'
import NavLink from './NavLink'
import { useAuth, useWindowSize } from '../../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { chatifyIco } from '../../assets'
import Hamburger from '../HamburgerMenu/Hamburger'
const NavigationBar = () => {
  const {clearState,user} = useAuth()
  const windowSize= useWindowSize()

  const navBar = user.email ? (

    <div className="flex">
       <button className='nav-btn link' onClick={()=>clearState('/auth', navigate)}>Logout</button>
      <button className='nav-btn back-btn link' onClick={()=>navigate(-1)}>Back</button>
    </div>
  ) : (
    <div className="flex">
       <Link to='/auth/register' replace >Register</Link>
       <Link to='/auth/signin' replace >Signin</Link>
    </div>
  )
  const navigate = useNavigate()
    return (
    <div className='navbar-component' >
        <button className='logo-btn link' onClick={()=>navigate('/chat')}>
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