import React,{FC, ReactElement, ReactNode, useCallback, useEffect, useState} from 'react'
import {Cookies, ReactCookieProps, useCookies} from  'react-cookie'
import { UserType,ChildrenType,ResponseType } from '../../types'
import { LoadingFallback } from '../../LoadingFallback/LoadingFallback'
import { useAuthCookies } from '../../../hooks'

export type InitialStateType = {
  user: UserType 
  loading: boolean
  cookies?: {user?:UserType,accessToken?:string,refreshToken?:string}
  response?: ResponseType 
  serverUrl:string
}

type UseAuthContextType = ReturnType<typeof useAuthContext>

export const initAuthContextState: UseAuthContextType ={
  user: { userName: '', email: '', picture: '', _id: '', loggedThrough: '',channels:[] },
  loading: false,
  setUser: () => { },
  setLoading: () => { },
  serverUrl:'https://localhost:5050/api'
}
export const AuthContext = React.createContext<UseAuthContextType>(initAuthContextState)

export const useAuthContext = (initAuthContextState:InitialStateType)=>{
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState(initAuthContextState.user)
  const serverUrl =  initAuthContextState.serverUrl
  const {cookies}=useAuthCookies()

  useEffect(
    ()=>{
      console.log(`APP RENDER`);
      
      let isLogged = cookies?.user
      console.log(`IS LOGGED`, isLogged);
      
      if(isLogged){
        setUser(isLogged)
      }
      setLoading(false)
    },[cookies?.user]
  )
   

  return {user,loading,serverUrl,setUser,setLoading}
}


 const AuthProvider  = (
  {children} :ChildrenType 
) => {
  const value= useAuthContext(initAuthContextState)

  return (
    <AuthContext.Provider value={value}>
        <>
        {value.loading && <LoadingFallback/>}
        {children}
        </>
    </AuthContext.Provider>
  )
}



export default AuthProvider