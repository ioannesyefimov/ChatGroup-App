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
    
 
    const clearState =(replace:string, navigate?:NavigateFunction) => {
        console.log('CLEARNING STATE')
        setUser(initAuthContextState.user)
        removeCookie('accessToken', {path:'/'})
        removeCookie('refreshToken', {path:'/'})
        removeCookie('channels', {path:'/'})
        if(!replace){
          console.log(`not replacing`)
        }else if(navigate !== undefined){
          navigate(replace)
        } else if(replace && navigate===undefined)  {
            window.location.replace(replace)
        }
        window.localStorage.clear()
        removeCookie('user', {path:'/'})
      }
 
    return {user,loading,serverUrl,setUser,setLoading,clearState}
}