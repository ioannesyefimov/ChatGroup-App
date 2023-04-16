import React,{FC, ReactElement, ReactNode, useCallback, useEffect, useState} from 'react'
import {Cookies, ReactCookieProps, useCookies} from  'react-cookie'
import { UserType,ChildrenType,ResponseType } from '../../types'
import { LoadingFallback } from '../../LoadingFallback/LoadingFallback'

export type InitialStateType = {
  user: UserType 
  loading: boolean
  cookies?: {user?:UserType,accessToken?:string,refreshToken?:string}
  response?: ResponseType 
  serverUrl:string
}

type UseAuthContextType = ReturnType<typeof useAuthContext>

export const initAuthContextState: UseAuthContextType ={
  user: { userName: '', email: '', picture: '', id: '', loggedThrough: '',channels:[] },
  loading: false,
  response: { success: false, message: null },
  setUser: () => { },
  setLoading: () => { },
  setResponse: () => { },
  serverUrl:'http://localhost:5050/api'
}
export const AuthContext = React.createContext<UseAuthContextType>(initAuthContextState)

export const useAuthContext = (initAuthContextState:InitialStateType)=>{
  const [loading, setLoading] = useState<boolean>(false)
  const [response,setResponse] = useState<ResponseType>()
  const [user, setUser] = useState(initAuthContextState.user)
  const serverUrl =  initAuthContextState.serverUrl

  return {user,loading,response,serverUrl,setUser,setLoading,setResponse}
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