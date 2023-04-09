import React,{FC, ReactElement, ReactNode, useCallback, useEffect, useState} from 'react'
import {Cookies, ReactCookieProps, useCookies} from  'react-cookie'
import { UserType,ChildrenType,ResponseType } from '../../types'

export type InitialStateType = {
  user: UserType 
  loading: boolean
  cookies?: {user?:UserType,accessToken?:string,refreshToken?:string}
  response?: ResponseType 
  serverUrl:string
}

type UseAuthContextType = ReturnType<typeof useAuthContext>

export const initAuthContextState: UseAuthContextType ={
  user: { userName: '', email: '', photo: '', id: '', loggedThrough: '' },
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

  // useEffect(
  //     ()=>{
  //       // add sscripts
  //       const addScript = async(callback:CallableFunction)=>{
  //         try {
  //           return await callback()
  //         } catch (error) {
  //           console.log(error)
  //         }
  //       }
  //       addScript(addPolicyScript3)
  //       addScript(addPolicyScript2)
  //       addScript(addPolicyScript)
  //     },[]
  //   )
   


  return {user,loading,response,serverUrl,setUser,setLoading,setResponse}
}


 const AuthProvider  = (
  {children,...initState} :ChildrenType & InitialStateType 
) => {
   

  return (
    <AuthContext.Provider value={useAuthContext(initState)}>
        {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider