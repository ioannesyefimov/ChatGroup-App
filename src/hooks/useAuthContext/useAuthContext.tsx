import { useContext  } from "react"
import { AuthContext, initAuthContextState } from "../../components/Authentication/Provider/AuthProvider"
import { NavigateFunction } from "react-router-dom"
import useAuthCookies from "../useAuthCookies/useAuthCookies"

export const useUser = ()=>useContext(AuthContext).user
export const useLoading = ()=> useContext(AuthContext).loading
export const useSetLoading = ()=>useContext(AuthContext).setLoading
export const useServerUrl = ()=>useContext(AuthContext).serverUrl
export const useSetUser = ()=>useContext(AuthContext).setUser



export default () =>{
    const {user,loading,serverUrl,setUser,setLoading} = useContext(AuthContext)
    
    const {removeCookie,cookies} = useAuthCookies()
    
 
    
 
    return {user,loading,serverUrl,setUser,setLoading}
}