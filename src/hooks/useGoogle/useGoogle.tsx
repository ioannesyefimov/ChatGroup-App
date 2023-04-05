import React, {useEffect, useLayoutEffect} from 'react'
import { useAddScript, useAuth, useAuthCookies, useError } from '../index';
import useFetch from '../useFetch';
import { APIFetch, timeout } from '../../components/utils';

const useGoogle = (loginType:string) => {
    const {setError,setHasError} = useError()
    const {setCookie} = useAuthCookies()
    const {clearState,setLoading,user} = useAuth()
    const {handleDelete} = useFetch()

    
    const handleGoogle = (response:any)=>{
        let loginType = window.localStorage.getItem('LOGIN_TYPE')
        console.log(loginType)
        console.log(response)
        if(!response?.credential) return console.log(`MISSING GOOGLE'S RESPONSE `)
        switch(loginType){
            case 'signin': return handleGoogleSignin(response);
            case 'register': return handleGoogleRegister(response);
            case 'delete': return handleGoogleDelete(response);
            default: return console.log(`NOT MATCHED TYPE `)
        }
    }
    useEffect(
        () => {
        if(window?.google){
            console.log(`firing`)
            window.localStorage.setItem('LOGIN_TYPE', loginType)
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogle
            })
            window.google.accounts.id.renderButton(document.getElementById('googleBtn'), {
                shape: "circle",
                type: "icon",
            })
        }
    
        
    }, [handleGoogle]
    )
    const url = `https://authentic-app-backend.onrender.com/api/auth/`


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