import React, { useCallback, useEffect } from 'react'
import { useAuth, useError } from '../../hooks'
import { Fallback } from '../ErrorProvider/ErrorProvider'
import { useLocation } from 'react-router-dom'
import useAuthCookies from '../../hooks/useAuthCookies/useAuthCookies'
import { APIFetch } from '../utils'

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
    useEffect(
        ()=>{
            let query = new URLSearchParams(location.search)
            let type = query.get('type')
            let loggedThrough = query.get('loggedThrough')
            let accessToken = query.get('accessToken')
            let controller = new AbortController()
            let signal = controller.signal
            console.log(`type: ${type}`)
            console.log(`loggedThrough: ${loggedThrough}`)
            console.log(`accessToken: ${accessToken}`)
            if(accessToken && type && loggedThrough){
                handleLogin({accessToken,type,loggedThrough,signal})
            }

            console.log(type)

            return ()=> controller.abort()
        },[])


    if(loading) return <Fallback />


}

export default RedirectComponent