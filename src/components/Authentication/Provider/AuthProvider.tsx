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
  serverUrl:import.meta.env.VITE_IP_ADDRESS ?  'https://192.168.1.102:5050/api' : 'https://localhost:5050/api'
}
export const AuthContext = React.createContext<UseAuthContextType>(initAuthContextState)

export const useAuthContext = (initAuthContextState:InitialStateType)=>{
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState(initAuthContextState.user)
  const serverUrl =  initAuthContextState.serverUrl
  console.log(`server url : ${serverUrl}`)

   

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