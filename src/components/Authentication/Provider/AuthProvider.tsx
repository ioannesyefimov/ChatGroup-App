import React,{FC, ReactElement, ReactNode, useCallback, useEffect, useState} from 'react'
import {Cookies, ReactCookieProps, useCookies} from  'react-cookie'
import { UserType,ChildrenType,ResponseType } from '../../types'
import { addPolicyScript,addPolicyScript2,addPolicyScript3 } from '../../../scripts/scripts'
import { CookieSetOptions } from 'universal-cookie'

export type InitialStateType = {
  user: UserType 
  loading: boolean
  cookies?: {user?:UserType,accessToken?:string,refreshToken?:string}
  response?: ResponseType 
}

type useAuthContextType = ReturnType<typeof useAuthContext>

export const initAuthContextState: useAuthContextType ={
  user: { userName: '', email: '', photo: '', id: '', loggedThrough: '' },
  loading: false,
  response: { success: false, message: null },
  setUser: () => { },
  setLoading: () => { },
  setResponse: () => { },
}
export const AuthContext = React.createContext<useAuthContextType>(initAuthContextState)

export const useAuthContext = (initAuthContextState:InitialStateType)=>{
  const [loading, setLoading] = useState<boolean>(false)
  const [response,setResponse] = useState<ResponseType>()
  const [user, setUser] = useState(initAuthContextState.user)

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
   


  return {user,loading,response,setUser,setLoading,setResponse}
}

export const useAuth  = ()=>  {
    return React.useContext(AuthContext)
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