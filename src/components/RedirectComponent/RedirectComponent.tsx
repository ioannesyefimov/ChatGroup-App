import React, { useCallback, useEffect, useState } from 'react'
import { useAuth, useChat, useError } from '../../hooks'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuthCookies from '../../hooks/useAuthCookies/useAuthCookies'
import { APIFetch, Errors, throwErr } from '../utils'
import { UserType } from '../types'



const RedirectComponent = () => {
    const URL = `http://localhost:5050/api`
    const [serverResponse,setServerResponse]=useState<{user:UserType | null,accessToken:string|null}>({user:null,accessToken:null})
    const {setLoading,serverUrl}=useAuth()
    const {setCookie,cookies} = useAuthCookies()
    const {setError} = useError() 
    let location = useLocation()
    type HandleLoginProps = {
        accessToken: string
        type: string
        loggedThrough: string
        signal?: AbortSignal
    }
    let navigate = useNavigate()
    let handleLogin = 
        async({accessToken,type,loggedThrough,signal}:HandleLoginProps)=>{
           try {
            setLoading(true)
            let response = await APIFetch({url:`${serverUrl}/${type}?accessToken=${accessToken}&loggedThrough=${loggedThrough}`, method:'get', signal})
            if(!response?.success){
                throwErr(response?.message)
            }
            setServerResponse({user:response.data.user,accessToken:response.data.accessToken})
        } catch (error) {
            setError(error)
           }finally {
            setLoading(false)
           }
        }
    
      let handleRedirect = 
        async()=>{
            try {
                setLoading(true)
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
                // setCookies('accessToken', accessToken, {path:'/',maxAge: 2000})
                if(type==='newAccessToken'){
                    let redirect = query.get('redirectUrl')!
                    navigate(redirect)
                    console.log(`REDIRECTION to ${redirect}`)
                    return 
                }
                if(type && loggedThrough && accessToken){
                    handleLogin({accessToken,type,loggedThrough});
                }
                
            } catch (error) {
                setError(error)
            }finally {
                setLoading(false)
            }
    }
    useEffect(
        ()=>{
            handleRedirect()
        },[])

        useEffect(
            ()=>{
                console.log(`RESPONSE:`, serverResponse);
                if(serverResponse.user){
                    setCookie('user',serverResponse.user,{path:'/',maxAge:2000})
                }else if(serverResponse.accessToken){
                    setCookie('accessToken',serverResponse?.accessToken,{path:'/',maxAge:2000})
                    
                }
            },[serverResponse]
        )
        

    return <Outlet/>


}

export default RedirectComponent