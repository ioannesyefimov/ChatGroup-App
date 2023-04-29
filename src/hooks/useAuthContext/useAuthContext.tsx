import { useCallback, useContext, useEffect, useMemo } from "react"
import { AuthContext, initAuthContextState } from "../../components/Authentication/Provider/AuthProvider"
import { NavigateFunction } from "react-router-dom"
import useAuthCookies from "../useAuthCookies/useAuthCookies"
import useChat from "../useChatContext/useChatContext"

export const useUser = ()=>{
  const {cookies}=useAuthCookies()
  const {user,setUser,setLoading}=useContext(AuthContext)
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

   return user
}
export const useLoading = ()=> useContext(AuthContext).loading
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
        }else if(navigate !== undefined){
          navigate(replace)
        } else if(replace && navigate===undefined)  {
            window.location.replace(replace)
        }
        window.localStorage.clear()
        removeCookie('user', {path:'/'})
      },[])
 
    return {user,loading,serverUrl,setUser,setLoading,clearState}
}