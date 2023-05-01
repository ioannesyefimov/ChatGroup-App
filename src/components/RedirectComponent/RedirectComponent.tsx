import {  useEffect, useState } from 'react'
import { useAuth, useGithub, useResponseContext } from '../../hooks'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuthCookies from '../../hooks/useAuthCookies/useAuthCookies'
import { APIFetch, Errors, sleep, throwErr } from '../utils'
import { ChannelType, UserType } from '../types'
import { LoadingFallback } from '../LoadingFallback/LoadingFallback'
import './RedirectComponent.scss'
import SocketStore from '../SocketStore'

type StateType = {
    user:UserType | null,accessToken:string|null
    redirect: string | null
    channels?:ChannelType[] | null
}

let initDataState = {user:null,accessToken:null,redirect:null,channels:null}
const RedirectComponent = () => {
    const [data,setData]=useState<StateType>(initDataState)
    const {setLoading,loading,serverUrl}=useAuth()
    const {handleGitHubLogin}=useGithub('')
    const {setCookie} = useAuthCookies()
    const {setServerResponse} = useResponseContext() 
    let location = useLocation()
    const WELCOME_CHANNEL_ID = '644e9d88ffba9b7feb5d77f3'

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
            let response = await APIFetch({url:`${serverUrl}/${type}?accessToken=${accessToken}&loggedThrough=${loggedThrough}`, method:'get', signal})
            if(!response?.success){
                throwErr(response?.err)
            }
            console.log(`RESP:"`, response);
            let data=response.data
            setData({user:data.user,accessToken:data.accessToken,redirect:redirectUrl ?? data?.redirectUrl ?? `/chat?channel=${WELCOME_CHANNEL_ID}`,channels:data?.user?.channels})
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
                    handleLogin({accessToken,type,loggedThrough,signal,redirectUrl});
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

            
            if(data.user){
                let user= JSON.stringify(data.user)
                setCookie('user',user,{path:'/',maxAge:2000})
            }
            if(data.accessToken){
                setCookie('accessToken',data?.accessToken,{path:'/',maxAge:2500})
            }
            if(data.channels){
                let channels = JSON.stringify(data.channels)
                setCookie('channels',channels,{path:'/',maxAge:2000})
            }
            if(data.redirect){
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