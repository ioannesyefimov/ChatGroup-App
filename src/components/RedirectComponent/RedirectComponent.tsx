import React, { useCallback, useEffect } from 'react'
import { useAuth, useError } from '../../hooks'
import { Fallback } from '../ErrorProvider/ErrorProvider'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuthCookies from '../../hooks/useAuthCookies/useAuthCookies'
import { APIFetch, Errors, throwErr } from '../utils'

type HandleLoginProps = {
    accessToken: string
    type: string
    loggedThrough: string
    signal?: AbortSignal
}


const RedirectComponent = () => {
    const URL = `http://localhost:5050/api`
    
    const {loading,response} = useAuth()
    const {cookies,setCookie} = useAuthCookies()
    const {setError} = useError() 
    let location = useLocation()
    let navigate = useNavigate()
    let handleLogin = useCallback(
        async({accessToken,type,loggedThrough,signal}:HandleLoginProps)=>{
           
            let response = await APIFetch({url:`${URL}/${type}`, method:'POST',body:{accessToken,loggedThrough}, signal})
            if(!response?.success){
                setError(response?.message)
                return    
            }
            setCookie('user', response?.data?.user,{path:'/',maxAge:2000})

            console.log(`response: ` , response)
        },[]
    )
      let handleRedirect = useCallback(
        async(controller:AbortController,signal:AbortSignal)=>{
            try {
                let query = new URLSearchParams(location.search)
                let type = query.get('type')
                let loggedThrough = query.get('loggedThrough')
                let accessToken = query.get('accessToken')
                console.log(`type: ${type}`)
                console.log(`loggedThrough: ${loggedThrough}`)
                console.log(`accessToken: ${accessToken}`)
                if(!accessToken) {
                    throwErr({name:Errors.MISSING_ARGUMENTS,arguments:'accessToken'})
                }
                if(!type) throwErr({name:Errors.MISSING_ARGUMENTS,arguments:'type'})
                setCookie('accessToken', accessToken, {path:'/',maxAge: 2000})

                if(type==='newAccessToken'){
                    let redirect = query.get('redirectUrl')!
                    navigate(redirect)
                    console.log(`REDIRECTION to ${redirect}`)
                    return 
                }
                if(type && loggedThrough && accessToken){
                    handleLogin({accessToken,type,loggedThrough,signal})
                }
        
                console.log(type)
                
            } catch (error) {
                setError(error)
            }
    },[])
    useEffect(
        ()=>{
            let controller = new AbortController()
            let signal = controller.signal
            
            handleRedirect(controller,signal)

            return ()=> controller.abort()
        },[])


    if(loading) return <Fallback />

    return <Outlet/>


}

export default RedirectComponent