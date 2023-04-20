import { useCallback, useContext, useEffect, useMemo } from "react"
import { AuthContext, initAuthContextState } from "../../components/Authentication/Provider/AuthProvider"
import { NavigateFunction } from "react-router-dom"
import useAuthCookies from "../useAuthCookies/useAuthCookies"
import useChat from "../useChatContext/useChatContext"


export default () =>{
    const {user,loading,serverUrl,response,setUser,setLoading,setResponse} = useContext(AuthContext)
    const {setCookie,removeCookie,cookies} = useAuthCookies()
    useEffect(
      ()=>{
        let isLogged = cookies?.user
        if(isLogged){
          setUser(isLogged)
        }
      },[cookies?.user]
    )
 
    const clearState = useCallback((replace:string, navigate?:NavigateFunction) => {
        // console.log('CLEARNING STATE')
        setUser(initAuthContextState.user)
        setResponse(initAuthContextState.response)
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

      const value = useMemo(
        ()=>({
          user,loading,response,serverUrl,setUser,setResponse,setLoading,clearState
        }),
        [user,loading,response]
      )
    return value
}