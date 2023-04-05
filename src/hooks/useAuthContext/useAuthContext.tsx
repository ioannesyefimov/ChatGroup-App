import { useCallback, useContext } from "react"
import { AuthContext, initAuthContextState } from "../../components/Authentication/Provider/AuthProvider"
import { NavigateFunction } from "react-router-dom"
import useAuthCookies from "../useAuthCookies/useAuthCookies"


export default () =>{
    const {user,loading,response,setUser,setLoading,setResponse} = useContext(AuthContext)
    const {removeCookie} = useAuthCookies()

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
    return {user,loading,response,setUser,setLoading,setResponse,clearState}
}