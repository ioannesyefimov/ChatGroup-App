import React,{FC, ReactNode, useState} from 'react'
import {useCookies} from  'react-cookie'
import { Channel,User,ProviderProps,ContextAuth } from '../../types'


const defaulValue ={
    user: {name:'',email:'',photo:'',id:''},
    loading: false,
    cookies: ['user','accessToken']
}
export const AuthContext = React.createContext<ContextAuth>(defaulValue)

export const useAuth  = ()=>  {
    return React.useContext(AuthContext)
}

const AuthProvider : FC<ProviderProps>  = ({children}) => {
    const [cookies,setCookie,removeCookie] = useCookies<string>(['user' ,'accessToken']) 
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>({name:'',email:'',photo:'',id:''})


    const value:any = React.useMemo(
        ()=>(
            {
                user,loading,cookies,setUser,setCookie,removeCookie,setLoading
            }
        ),[user,loading,cookies]
    )

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider