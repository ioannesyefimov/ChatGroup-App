import  { useEffect } from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { useAddScript, useAuth } from '../../hooks'

const AuthenticationForm = () => {
  const {user} = useAuth()
  let location = useLocation()
  

  useEffect(() => {
    console.log(user)


  }, [])

  if(location.pathname === '/auth') return <Navigate to='/auth/signin' replace/>
  if(!user?.email) return <Outlet/> 
  return <Navigate to='/dashboard' replace/>

  
  
}


export default AuthenticationForm