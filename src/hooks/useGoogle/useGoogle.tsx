import React, {useEffect, useLayoutEffect} from 'react'
import { useAddScript, useAuth, useAuthCookies, useResponseContext} from '../index';
import useFetch from '../useFetch';
import { APIFetch, throwErr, timeout } from '../../components/utils';
import { useNavigate } from 'react-router-dom';


const useGoogle = (loginType:string,redirectUrl:string|undefined) => {
  useAddScript({id:'oauthGoogle', src:'https://accounts.google.com/gsi/client',text:''})
    const {setServerResponse} = useResponseContext()
    const {setCookie} = useAuthCookies()
    const {clearState,setLoading,user,serverUrl} = useAuth()
    const {handleDelete} = useFetch()
    const navigate = useNavigate()
  

   
    
    const handleGoogle = async(googleResponse:any)=>{
        try {
            setServerResponse(null)
            // let loginType = window.localStorage.getItem('LOGIN_TYPE')
            console.log(loginType)
            console.log(googleResponse)
            if(!googleResponse?.credential) return console.log(`MISSING GOOGLE'S RESPONSE `)
            let response = await APIFetch({url:`${serverUrl}/auth/google`,method:'POST',body:{credential:googleResponse.credential}})
            if(!response?.success){
                throwErr(response?.message)
            }
            if(redirectUrl){
                console.log(`REDIRECT ULR : ${redirectUrl}`)
                navigate(`/auth/redirect/?type=newAccessToken&accessToken=${response?.data.accessToken}&redirectUrl=${redirectUrl}`)
                return 
            }
            navigate(`/auth/redirect/?type=auth/user&accessToken=${response?.data?.accessToken}&loggedThrough=Google`)
            
        } catch (error) {
            setServerResponse(error)
        }

}
    useEffect(
        () => {
            let googleBnt = document.getElementById('googleBtn') as HTMLButtonElement
             if(googleBnt){

                 googleBnt.disabled = true
                 let initializeGoogle = ()=>{
                     let google = (window as any).google
                     if(google){
                         console.log(`ggogle`, google)
                         console.log(`initializing google ouath`)
                         window.localStorage.setItem('LOGIN_TYPE', loginType)
                         google.accounts.id.initialize({
                             client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
                             callback: handleGoogle
                         })
                         google.accounts.id.renderButton(googleBnt, {
                             shape: "circle",
                             type: "icon",
                         })
                         googleBnt.disabled = false
                     }
                 }            
                 let timeout = setTimeout(initializeGoogle,3000)
                 return ()=>clearTimeout(timeout)
             }
            
    }, [handleGoogle,window]
    )
 
    const handleGoogleDelete = async(googleResponse:any) =>{
        try {
            // console.log(`DELETING USER GOOGLE`)
            setLoading(true)
            let params = new URLSearchParams(googleResponse)
            let response = await APIFetch({url:`${serverUrl}/google/delete?credentials=${params}`, method:'DELETE',body: {credential: googleResponse?.credential, loggedThrough: 'Google'} })
            // console.log(data)
            if(!response?.success && response?.message){
                // console.log(response)
                throwErr({message:response.message, loggedThrough: response?.loggedThrough})
            }
            let dbResponse = response.data
            // if(!dbResponse?.accessToken)return setServerResponse({message:``})
            let deleteUser = await handleDelete({accessToken: dbResponse?.accessToken, user, deletedThrough:'Google'})
            // console.log(deleteUser)
            if(!deleteUser?.success){
                // return console.log('USER IS NOT DELETED')
            }
            clearState('/auth/signin')
        
            setLoading(false)
            
        } catch (error) {
            return  setServerResponse({message:error})
        } finally{
            setLoading(false)
        }
    }

  return {handleGoogleDelete,handleGoogle}
}

export default useGoogle