import React, {useEffect, useLayoutEffect} from 'react'
import { useAddScript, useAuth, useAuthCookies, useError } from '../index';
import useFetch from '../useFetch';
import { APIFetch, timeout } from '../../components/utils';
import { useNavigate } from 'react-router-dom';

const useGoogle = (loginType:string) => {
    const {setError,setHasError} = useError()
    const {setCookie} = useAuthCookies()
    const {clearState,setLoading,user} = useAuth()
    const {handleDelete} = useFetch()
    const navigate = useNavigate()
    let url = `http://localhost:5050/api/auth`

   
    
    const handleGoogle = async(googleResponse:any)=>{
        // let loginType = window.localStorage.getItem('LOGIN_TYPE')
        console.log(loginType)
        console.log(googleResponse)
        if(!googleResponse?.credential) return console.log(`MISSING GOOGLE'S RESPONSE `)
        let response = await APIFetch({url:`${url}/google`,method:'POST',body:{credential:googleResponse.credential}})
        if(!response?.success){
            setError(response?.message)
            return
        }
        navigate(`/auth/redirect?type=auth/user&accessToken=${response?.data?.accessToken}&loggedThrough=Google`)

    }
    useEffect(
        () => {
            let googleBnt = document.getElementById('googleBtn') as HTMLButtonElement
            googleBnt.disabled = true
            let initializeGoogle = ()=>{
                let google = (window as any).google
                if(google ){
                    console.log(`ggogle`, google)
                    console.log(`initializing google ouath`)
                    window.localStorage.setItem('LOGIN_TYPE', loginType)
                    google.accounts.id.initialize({
                        client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
                        callback: handleGoogle
                    })
                    google.accounts.id.renderButton(document.getElementById('googleBtn'), {
                        shape: "circle",
                        type: "icon",
                    })
                    googleBnt.disabled = false
                }
            }
            let timeout = setTimeout(initializeGoogle,2000)

            return ()=>clearTimeout(timeout)
    }, [handleGoogle]
    )
    // const url = `https://authentic-app-backend.onrender.com/api/auth/`


    let newURL = location.href.split("?")[0];
    const handleGoogleSignin = async(googleResponse) =>{
        try {
            setLoading(true)

            let response = await APIFetch({url: `${url}google/signin`, method:'POST', body:{credential: googleResponse?.credential, loggedThrough: 'Google'}});
    
    
            if(!response?.success){
                clearState('')
                setError({message: response.message, loggedThrough: response?.loggedThrough})
                return console.log(response?.message)
            }
            console.log(response)
            setCookie("accessToken", response?.data?.accessToken, {path: '/',maxAge : 1200} );
                localStorage.setItem('LOGIN_TYPE', 'signin')
                localStorage.setItem('LOGGED_THROUGH', 'Google')
                console.log(`GETTING GOOGLE USER `)
        } catch (error) {
            return setError({message: error})

        }finally {
            setLoading(false)
        }
    }

    const handleGoogleRegister = async (googleResponse) => {
        try {
            setLoading(true)
            let response = await APIFetch({url:`${url}google/register`, method:'POST',body: {credential: googleResponse?.credential} });

            if(!response?.success ){
               return setError({message:response.message, loggedThrough: response?.loggedThrough})

            }
            console.log(`google response: ${response}`)
            let dbResponse = response?.data
            
                
            setCookie("accessToken", dbResponse?.accessToken,  {path: '/',maxAge : 1200});
            localStorage.setItem('LOGGED_THROUGH', 'Google')
            localStorage.setItem('LOGIN_TYPE', 'register')
            
        } catch (error) {
            
            return setError({message:error})

        }finally {
            setLoading(false)
        }
    }

    const handleGoogleDelete = async(googleResponse) =>{
        try {
            // console.log(`DELETING USER GOOGLE`)
            setLoading(true)

            let response = await APIFetch({url:`${url}google/signin`, method:'POST',body: {credential: googleResponse?.credential, loggedThrough: 'Google'} })
    
            // console.log(data)
            if(!response?.success && response?.message){
                // console.log(response)
                setError({message:response.message, loggedThrough: response?.loggedThrough})
            }
    
            let dbResponse = response.data
            // if(!dbResponse?.accessToken)return setError({message:``})
            let deleteUser = await handleDelete({accessToken: dbResponse?.accessToken, user, deletedThrough:'Google'})
            // console.log(deleteUser)
            if(!deleteUser?.success){
                // return console.log('USER IS NOT DELETED')
            }
            clearState('/auth/signin')
            // setCookie("accessToken", dbResponse?.accessToken,  {path: '/'}, {maxAge : "1200"});
        
            setLoading(false)
            
        } catch (error) {
            return  setError({message:error})
        } finally{
            setLoading(false)
        }
    }

  return {handleGoogleRegister,handleGoogleSignin, handleGoogleDelete,handleGoogle}
}

export default useGoogle