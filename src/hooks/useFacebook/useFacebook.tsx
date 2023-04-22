import React, { useEffect } from 'react'
import ReactFacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { useAddScript, useAuth, useAuthCookies, useError, useOnlineStatus } from '../index';
import { Errors,APIFetch, throwErr } from '../../components/utils';
import useFetch from '../useFetch';
import { useNavigate } from 'react-router-dom';

const useFacebook = (loginType:string,redirectUrl:string|undefined) => {
  useAddScript({id: 'facebookAuth',src:'https://connect.facebook.net/en_US/sdk.js', text:''})

    const {setError,setServerResponse} = useError()
    const {clearState,setLoading} = useAuth()
    const {handleDelete} = useFetch()
    const navigate = useNavigate()
   
    useEffect(
        ()=>{
            const initFacebook = async()=>{
                try {
                    let FB = (window as any).FB
                    if(FB){
                        console.log(`initializing facebook oauth`);
                        console.log(`fb appid `, import.meta.env.VITE_APP_FACEBOOK_APP_ID);
                        
                        const params = {
                            appId: import.meta.env.VITE_APP_FACEBOOK_APP_ID,
                            cookies: false,
                            xfbml: true,
                            version: 'v16.0'
                        }
    
                        FB?.init(params);
                         FB?.getLoginStatus((resp:ReactFacebookFailureResponse)  =>{
                            console.log(`FB:status==: ${resp.status}`)
                        })
                    }
                } catch (error:{name?:any,message?:any}) {
                    console.error(error?.name, ':', error?.message)
                    
                }
            }
            let timeout = setTimeout(initFacebook,1500)

            return ()=>clearTimeout(timeout)
        }, []
    )

    const url = `https://authentic-app-backend.onrender.com/api/`


    const handleFacebookLogin = async({credentials}:{credentials:any}) =>{
        try {
            setLoading(true)
            console.log(`FB SIGNIN IN`)
            const response = await APIFetch({url: `${url}auth/facebook`, method:'POST', body: {credentials}});
            console.log(response)
            if(!response.success){
                clearState('')
                throwErr({message: response?.message, loggedThrough:response?.loggedThrough})
            } if(redirectUrl){
                console.log(`REDIRECT ULR : ${redirectUrl}`)
                navigate(`/auth/redirect/?type=newAccessToken&accessToken=${response?.data.accessToken}&redirectUrl=${redirectUrl}`)
                return 
            }
                
        } catch (error) {
               setError( error)
        } finally {
            setLoading(false)
        }
    }

    const onSuccess = async(response:ReactFacebookLoginInfo, type:string)=>{
        try {
            if(response?.email){
                return type === 'delete' ?
                await handleFacebookDelete( response)
                :  
                await handleFacebookLogin({credentials: response})
            }
        } catch (error) {
            return setError({message:error})
        }
    }
    
    const handleFacebook = async(type:string) => {

        try {
            setLoading(true)
            let FB = (window as any).FB
            if(FB){

                const params ={
                    provider: 'facebook',
                    fbAccessToken:''
                }; 
                console.log(`FACEBOOK HANDLING`)
    
                FB.getLoginStatus((resp:any)=>{
                    console.log(`FB:status: ${resp.status}`)
                    if(resp.status === 'connected'){
                        params.fbAccessToken = resp.authResponse.accessToken 
                        FB.api('/me', (response:any)=>{
                            console.log(`successful login for: ${response?.name}`)
                            console.log(`RESPONSE:` ,response)
    
                            // params.credentials = response
    
                        });
                    }
                });
    
                
                    
                FB.login((resp:any)=>{
                    console.log(`FB RESP`, resp);
                    
                    if(resp.authResponse){
                        params.fbAccessToken = resp.authResponse.accessToken
                        FB.api(
                            '/me',
                            'GET',
                            {"fields":"about,email,name,picture"},
                            (response:any)=>{
                                console.log(response)
                                console.log(`GOOD to see you, ${response?.name}.`)
                                console.log(`type: ${type}`)
                                onSuccess(response, type)
                            });
                            
                        
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                       }
                }, {scope: 'email,name,photos{picture,images'});
                console.log(params)
    
                
            } else {
                return console.log('FACEBOOK SCRIPT WAS NOT ADDED')
            }
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


    return {handleFacebookDelete, handleFacebook}
}

export default useFacebook
