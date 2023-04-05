import React, { useCallback, useEffect } from 'react'
import { useAuth } from '../../hooks'
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
    const {cookies} = useAuthCookies()
    let location = useLocation()
    let handleLogin = useCallback(
        async({accessToken,type,loggedThrough,signal}:HandleLoginProps)=>{
           
            let response = await APIFetch({url:`${URL}/auth/${type}`, method:'POST',body:{accessToken,loggedThrough}, signal})
            if(!response){
                
            }
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
            if(accessToken && type && loggedThrough){
                handleLogin({accessToken,type,loggedThrough,signal})
            }

            console.log(type)

            return ()=> controller.abort()
        },[])


    if(loading) return <Fallback />


}

export default RedirectComponent