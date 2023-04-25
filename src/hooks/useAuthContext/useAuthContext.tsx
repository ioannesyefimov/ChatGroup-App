import { useCallback, useContext, useEffect, useMemo } from "react"
import { AuthContext, initAuthContextState } from "../../components/Authentication/Provider/AuthProvider"
import { NavigateFunction } from "react-router-dom"
import useAuthCookies from "../useAuthCookies/useAuthCookies"
import useChat from "../useChatContext/useChatContext"

export const useUser = ()=>useContext(AuthContext).user
export const useLoading = ()=>useContext(AuthContext).loading
export const useSetLoading = ()=>useContext(AuthContext).setLoading
export const useServerUrl = ()=>useContext(AuthContext).serverUrl
export const useSetUser = ()=>useContext(AuthContext).setUser

export default () =>{
    const {user,loading,serverUrl,setUser,setLoading} = useContext(AuthContext)
    
    const {removeCookie,cookies} = useAuthCookies()
    
 
    const clearState = useCallback((replace:string, navigate?:NavigateFunction) => {
        // console.log('CLEARNING STATE')
        setUser(initAuthContextState.user)
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
      },[])
 
    return {user,loading,serverUrl,setUser,setLoading,clearState}
}