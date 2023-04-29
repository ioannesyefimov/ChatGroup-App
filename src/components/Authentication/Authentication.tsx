import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { useAuth } from '../../hooks'

const AuthenticationForm = () => {
  const {user,clearState} = useAuth()
  let location = useLocation()
  if(location.pathname.includes('/auth/redirect')){
    clearState('')
  }
  if(location.pathname === '/auth') return <Navigate to='/auth/signin' replace/>
  if(!user?.email) return <Outlet/> 
  return <Navigate to='/chat' replace/>

  
  
}


export default AuthenticationForm