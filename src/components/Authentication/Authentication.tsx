import React, { useEffect } from 'react'
import {Navigate, Outlet, RouteObject, useLocation} from 'react-router-dom'
import AuthForm from './AuthForm/AuthForm'
import { useAuth } from './Provider/AuthProvider'

const AuthenticationForm = ():JSX.Element<T> => {
  const {user} = useAuth()
  let location = useLocation()

  useEffect(() => {
    console.log(user)


  }, [])

  if(location.pathname === '/auth') return <Navigate to='/auth/signin' replace/>
  if(!user?.email) return <Outlet/>

  
  
}


export default AuthenticationForm