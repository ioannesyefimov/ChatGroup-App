import React,{FC, ReactNode, useEffect, useState} from 'react'
import {useCookies} from  'react-cookie'
import { Channel,UserType,ProviderProps,ContextAuth, MessageType } from '../../types'
import { addPolicyScript,addPolicyScript2,addPolicyScript3 } from '../../../scripts/scripts'
import { NavigateFunction } from 'react-router-dom'


const defaulValue ={
    user: {userName:'',email:'',photo:'',id:'',loggedThrough: ''} ,
       loading: false,
    cookies: ['user','accessToken'],
    Message: {success: null, message:null}
}
export const AuthContext = React.createContext<any>(null)

export const useAuth  = ()=>  {
    return React.useContext(AuthContext)
}

const AuthProvider : FC<ProviderProps>  = ({children}) => {
    const [cookies,setCookie,removeCookie] = useCookies<string>(['user' ,'accessToken']) 
    const [loading, setLoading] = useState<boolean>(false)
    const [isLogged,setIsLogged] = useState<boolean>(false)
    const [Message,setMessage] = useState<MessageType>()
    const [user, setUser] = useState<UserType>(defaulValue.user)

    useEffect(
        ()=>{
          // add sscripts
          const addScript = async(callback:CallableFunction)=>{
            try {
              return await callback()
            } catch (error) {
              console.log(error)
            }
          }
          addScript(addPolicyScript3)
          addScript(addPolicyScript2)
          addScript(addPolicyScript)
        },[]
      )
    
  
  
  
      const clearState = (replace:string, navigate:NavigateFunction) => {
        // console.log('CLEARNING STATE')
        setUser(defaulValue.user)
        setIsLogged(false)
        setMessage(defaulValue.Message)
        removeCookie('accessToken', {path:'/'})
        removeCookie('refreshToken', {path:'/'})
        if(!replace){
          console.log(`not replacing`)
        }else if(navigate){
          navigate(replace)
        } else if(replace && !navigate) {
            window.location.replace(replace)
        }
        window.localStorage.clear()
        removeCookie('user', {path:'/'})
        
  
      }

    const value:any = React.useMemo(
        ()=>(
            {
                user,loading,cookies,isLogged,Message,setIsLogged,setUser,setCookie,removeCookie,setLoading,setMessage,clearState
            }
        ),[user,loading,cookies,isLogged,Message]
    )

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider