import  { useEffect } from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { useAddScript, useAuth } from '../../hooks'

const AuthenticationForm = () => {
  const {user} = useAuth()
  let location = useLocation()
  useAddScript({id:'oauthGoogle', src:'https://accounts.google.com/gsi/client',text:''})
  useAddScript({id: 'facebookAuth',src:'https://connect.facebook.net/en_US/sdk.js', text:''})

  useEffect(() => {
    console.log(user)


  }, [])

  if(location.pathname === '/auth') return <Navigate to='/auth/signin' replace/>
  if(!user?.email) return <Outlet/> 
  return <Navigate to='/dashboard' replace/>

  
  
}


export default AuthenticationForm