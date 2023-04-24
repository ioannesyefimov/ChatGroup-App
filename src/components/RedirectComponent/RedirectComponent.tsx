import React, { useCallback, useEffect, useState } from 'react'
import { useAuth, useChat, useError, useGithub } from '../../hooks'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuthCookies from '../../hooks/useAuthCookies/useAuthCookies'
import { APIFetch, Errors, sleep, throwErr } from '../utils'
import { UserType } from '../types'
import { LoadingFallback } from '../LoadingFallback/LoadingFallback'
import './RedirectComponent.scss'


const RedirectComponent = () => {
    const URL = `http://localhost:5050/api`
    const [data,setData]=useState<{user:UserType | null,accessToken:string|null}>({user:null,accessToken:null})
    const {setLoading,loading,serverUrl}=useAuth()
    const {handleGitHubLogin}=useGithub('')
    const {setCookie,cookies} = useAuthCookies()
    const {setError,setServerResponse} = useError() 
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
                throwErr(response?.err)
            }
            setData({user:response.data.user,accessToken:response.data.accessToken})
        } catch (error) {
            setServerResponse(error)
            
           }finally {
            setLoading(false)
           }
        }
    
      let handleRedirect = 
        async(signal:AbortSignal)=>{
            try {
                setLoading(true)
                if(!location.search) {
                    return 
                }
                let query = new URLSearchParams(location.search)
                let type = query.get('type')
                let loggedThrough = query.get('loggedThrough')
                let accessToken = query.get('accessToken')
                let code = query.get("code")
                if(signal.aborted) return
                await sleep(3000);
                console.log(`STARTED `);
                if(code){
                    return await handleGitHubLogin(code,signal);
                }
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
                    handleLogin({accessToken,type,loggedThrough,signal});
                }
            } catch (error:any) {
                setServerResponse(error)
            }finally {
                setLoading(false)
            }
    }
    useEffect(
        ()=>{
            let controller = new AbortController()
            let {signal} = controller
            handleRedirect(signal)
            // signal?.addEventListener('abort',()=>console.log(`Aborted`))
            // return ()=>controller?.abort(); 
        },[location?.search])

    useEffect(
        ()=>{
            if(data.user){
                setCookie('user',data.user,{path:'/',maxAge:2000})
            }
            if(data.accessToken){
                setCookie('accessToken',data?.accessToken,{path:'/',maxAge:2000})
                }
        },[data]
    )
        
    if(loading) return <LoadingFallback/>
       
            return (
            <div className='redirect-component'>
                
                <Link to='/chat' replace>Home</Link>
            </div>
            )

}

export default RedirectComponent