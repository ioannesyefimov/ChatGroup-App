import React, { useEffect } from 'react'
import ReactFacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { useAddScript, useAuth, useAuthCookies, useError } from '../index';
import { Errors,APIFetch } from '../../components/utils';
import useFetch from '../useFetch';

const useFacebook = (type:string) => {
    const {setError,setHasError} = useError()
    const {setCookie} = useAuthCookies()
    const {clearState,setLoading} = useAuth()
    const {handleDelete} = useFetch()

   
    useEffect(
        ()=>{
            const appendScript = async()=>{
                try {
                    const params = {
                        appId: import.meta.env.VITE_APP_FACEBOOK_APP_ID,
                        cookies: false,
                        xfbml: true,
                        version: 'v16.0'
                    }

                    FB?.init(params);
                    FB?.getLoginStatus((resp:ReactFacebookFailureResponse)  =>{
                        console.log(`FB:status: ${resp.status}`)
                    })
                } catch (error:any) {
                    console.log(error.name, ':', error.message)
                    
                }
            }
            appendScript()
        }, []
    )

    const url = `https://authentic-app-backend.onrender.com/api/`

    let newURL = location.href.split("?")[0];

    const handleFacebookRegister = async(credentials:ReactFacebookLoginInfo)=>{
        try {
            setLoading(true)
            console.log(`FB REGISTERING`)
            const response = await APIFetch({url: `${url}auth/facebook/register`, method:'POST', body: {credentials}});
            console.log(response)
            if(!response.success){
                clearState('')
                return setError({message: response?.message, loggedThrough:response?.loggedThrough})
            }
            
            setCookie('accessToken', response?.data?.accessToken, {path: '/', maxAge: 2000})
            localStorage.setItem('LOGIN_TYPE', 'signin')

        } catch (error) {
             setError({message: error})

        } finally {
            setLoading(false)
        }
    }

    const handleFacebookLogin = async({credentials,type}:{credentials:any,type:string}) =>{
        try {
            setLoading(true)
            console.log(`FB SIGNIN IN`)
            const response = await APIFetch({url: `${url}auth/facebook/${type}`, method:'POST', body: {credentials}});
            console.log(response)
            if(!response.success){
                clearState('')
                return setError({message: response?.message, loggedThrough:response?.loggedThrough})
            }
            
            setCookie('accessToken', response?.data?.accessToken, {path: '/', maxAge: 2000})
            localStorage.setItem('LOGIN_TYPE', 'signin')

        } catch (error) {
               setError({message: error})

        } finally {
            setLoading(false)
        }
    }

    const onSuccess = async(response:ReactFacebookLoginInfo, type:string)=>{
        try {
            localStorage.setItem('LOGIN_TYPE', type)
            localStorage.setItem('LOGGED_THROUGH', 'Facebook')
            console.log('ONSUCCESS TRIGGERED')
            console.log(`response: `, response)
            if(response?.email){
                // return type === 'register' ? 
                // await handleFacebookRegister({credentials: response})
                // : type === 'signin' ? 
                // await handleFacebookSignin({credentials: response})
                return type === 'delete' ?
                await handleFacebookDelete( response)
                :  
                await handleFacebookLogin({credentials: response, type})

                console.log('invalid type')
            }
        } catch (error) {
            return setError({message:error})
        }
    }
    
    const handleFacebook = async(type:string) => {

        try {
            setLoading(true)
            const params ={
                provider: 'facebook',
                fbAccessToken:''
            }; 

            console.log(`FACEBOOK HANDLING`)

                FB.getLoginStatus((resp:any)=>{
                    console.log(`FB:status: ${resp.status}`)
                    if(resp.status === 'connected'){
                        params.fbAccessToken = resp.authResponse.accessToken 
                        FB.api('/me', response=>{
                            console.log(`successful login for: ${response?.name}`)
                            console.log(`RESPONSE:` ,response)
    
                            // params.credentials = response
    
                        });
                    }
                });

          
                
            FB.login((resp:any)=>{
                if(resp.authResponse){
                    params.fbAccessToken = resp.authResponse.accessToken
                    FB.api(
                        '/me',
                        'GET',
                        {"fields":"email,name,birthday,photos{picture,images,from},about,hometown,picture{url}"},
                        (response)=>{
                            console.log(response)
                            console.log(`GOOD to see you, ${response?.name}.`)
                            console.log(`type: ${type}`)
                            onSuccess(response, type)
                        });

                } else {
                    console.log('User cancelled login or did not fully authorize.');
                   }
            }, {scope: 'email,name,photos{picture,images,from'});
            console.log(params)

            
        } catch (error) {
            console.log(error)
            return {message:error,success:false}
        } finally{
            setLoading(false)
        }
        


    }
    const handleFacebookDelete = async(credentials:ReactFacebookLoginInfo)=>{
        try {
            console.log(`credentials: `, credentials);
            if(!credentials) return setError({message:Errors.MISSING_ARGUMENTS})
            setLoading(true)
            const response = await APIFetch({url: `${url}auth/facebook/signin`, method:'POST', body: {credentials}});
            console.log(`deleting facebook`)
            console.log(response)
            if(!response.success){
                clearState('')
                return setError({message: response?.message, loggedThrough:response?.loggedThrough})
            }

         
            let  deleteUser =await handleDelete({accessToken: response?.data?.accessToken, user: credentials, deletedThrough: 'Facebook'});
            if(!deleteUser?.success) return setError({message: deleteUser.message});

            clearState('')
              
        } catch (error) {
            return setError({message: error})
        } finally{
            setLoading(false)
        }
    }


    return {handleFacebookDelete, handleFacebook,handleFacebookRegister}
}

export default useFacebook

function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}
