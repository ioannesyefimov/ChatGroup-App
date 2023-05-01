import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { useAuth } from '../../hooks'
import { useUser } from '../../hooks/useAuthContext/useAuthContext'

const AuthenticationForm = () => {
  const user = useUser()
  let location = useLocation()
  if(location.pathname === '/auth') return <Navigate to='/auth/signin' replace/>
  if(!user?.email) return <Outlet/> 
  return <Navigate to='/chat' replace/>

  
  
}


export default AuthenticationForm