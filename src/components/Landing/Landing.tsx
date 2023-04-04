import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import './Landing.scss'
const Landing: React.FC = () => {
  let location = useLocation()
    const navigate = useNavigate()
  return (
    <div className='landing-component box-shadow--gray'>
    <div className="wrapper">
    <h3>Join our community and start communicating with them or your friends right now</h3>
    <button type='button' onClick={()=> navigate('/auth/register')}>Register</button>
    </div>
    <div className="wrapper">
    <p>or log in to your account and contunie communicating!</p>
    <button type='button' onClick={()=> navigate('/auth/signin')}>Sign In</button>
    </div>
</div>  )
}

export default Landing