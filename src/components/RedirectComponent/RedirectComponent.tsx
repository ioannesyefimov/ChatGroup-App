import {  useEffect, useState } from 'react'
import {  useGithub, useResponseContext } from '../../hooks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthCookies from '../../hooks/useAuthCookies/useAuthCookies'
import { APIFetch, Errors, sleep, throwErr } from '../utils'
import { ChannelType, UserType } from '../types'
import './RedirectComponent.scss'
import { useAuthStore } from '../../ZustandStore'

type StateType = {
    user:UserType | null,accessToken:string|null
    redirect: string | null
    channels?:ChannelType[] | null
}

let initDataState = {user:null,accessToken:null,redirect:null,channels:null}
const RedirectComponent = () => {
    const [data,setData]=useState<StateType>(initDataState)
    const {setLoading,loading,serverUrl}=useAuthStore()
    const {handleGitHubLogin}=useGithub('')
    const {setCookie} = useAuthCookies()
    const {setServerResponse} = useResponseContext() 
    let location = useLocation()

    type HandleLoginProps = {
        accessToken: string
        type: string
        loggedThrough: string
        signal?: AbortSignal
        redirectUrl:string | null
    }


    let navigate = useNavigate()
    let handleLogin = 
        async({accessToken,type,loggedThrough,signal,redirectUrl}:HandleLoginProps)=>{
           try {
            console.log(`LOGGIN IN`);
            setLoading(true)
            let response = await APIFetch({setError:setServerResponse, url:`${serverUrl}/${type}?accessToken=${accessToken}&loggedThrough=${loggedThrough}`, method:'get', signal})
            if(!response?.success){
                throwErr(response?.err)
            }
            console.log(`RESP:"`, response);
            let data=response.data
            setData({user:data?.user,accessToken:data?.accessToken,redirect:redirectUrl ?? data?.redirectUrl ?? '/chat' ,channels:data?.user?.channels})
        } catch (error) {
            setServerResponse(error)
            
           }finally {
            setLoading(false)
           }
        }
    
      let handleRedirect = 
        async(signal:AbortSignal,token?:string)=>{
            try {
                setLoading(true)
                let query = new URLSearchParams(location.search)
                let type = query.get('type')
                let loggedThrough = query.get('loggedThrough')
                let accessToken = query.get('accessToken')
                let code = query.get("code")
                let redirectUrl = query.get("redirectUrl")
                if(signal.aborted) return
                await sleep(2000);
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
                    return false
                }
                if(type && loggedThrough && accessToken){
                   return handleLogin({accessToken,type,loggedThrough,signal,redirectUrl});
                }
            } catch (error:any) {
                setServerResponse(error)
            }
    }
    useEffect(
        ()=>{
            if(!location.search)return 
            let controller = new AbortController()
            let {signal} = controller
            handleRedirect(signal)
        },[location.search])

    useEffect(
        ()=>{
            if(data?.user){
                let user= JSON.stringify(data.user)
                setCookie('user',user,{path:'/',maxAge:2000})
            }
            if(data?.accessToken){
                setCookie('accessToken',data?.accessToken,{path:'/',maxAge:2500})
            }
            if(data?.channels){
                setCookie('channels',data?.channels,{path:'/',maxAge:2000})
            }
            if(data?.redirect){
                navigate(data.redirect)
            }
        },[data]
    )
        
    return (
    <div className='redirect-component'>
        <Link to='/chat' replace>Home</Link>
    </div>
    )

}

export default RedirectComponent