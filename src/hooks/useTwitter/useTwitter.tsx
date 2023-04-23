import React from 'react'
import {useAuth, useAuthCookies, useError} from '../index'
import { APIFetch, getUrlWithQueryParams } from '../../components/utils'

const useTwitter = (loginType:string) => {
    const {setError,setServerResponse} = useError()
    const {setCookie} = useAuthCookies()
    const {clearState, setLoading} = useAuth()
    
    const url = `http://localhost:5050/api/auth/`

    const TWITTER_AUTH_URL = ``
    const TWITTER_SCOPE = ['tweet.read','users.read','offline.access'].join('')
    const TWITTER_STATE = `twitter-increaser-state`
    const TWITTER_CODE_CHALLENGE = `challenge`
    const redirectUri = 'https://authentic-app.netlify.app/auth/signin/profile'

    let newURL = location.href.split("?")[0];

    const handleTwitterDelete = async() =>{
        console.log('TWITTER DELETING')
    }

    const handleTwitterRegister = async({credentials}:any)=>{
        try {
            setLoading(true)
            console.log(`FB REGISTERING`)
            const response = await APIFetch({url: `${url}auth/facebook/register`, method:'POST', body: {credentials}});
            console.log(response)
            if(!response.success){
                clearState('')
                setError({message: response?.message, loggedThrough:response?.loggedThrough})
                return 
            }
            
            setCookie('accessToken', response?.data?.accessToken, {path: '/', maxAge: 2000})
            // setReload(prev=>prev+1)
            localStorage.setItem('LOGIN_TYPE', 'signin')
            // window.location.reload()

        } catch (error) {
            setServerResponse({message: error})

        } finally {
            setLoading(false)
        }
    }

    const handleTwitterLogin = async({credentials,type}:any) =>{
        try {
            setLoading(true)
            console.log(`FB SIGNIN IN`)
            const response = await APIFetch({url: `${url}auth/facebook/${type}`, method:'POST', body: {credentials}});
            console.log(response)
            if(!response.success){
                clearState('')
                setError({message: response?.message, loggedThrough:response?.loggedThrough})
            }
            
            setCookie('accessToken', response?.data?.accessToken, {path: '/', maxAge: 2000})
            // setReload(prev=>prev+1)
            localStorage.setItem('LOGIN_TYPE', 'signin')
            // window.location.reload()

        } catch (error) {
            setError({message: error})

        } finally {
            setLoading(false)
        }
    }


    const handleTwitter = (type:string) => {
        setError({message: 'UNAVAIBLE'})
        return 
        // can't access developer account on twitter, so left it 
        getUrlWithQueryParams(TWITTER_AUTH_URL, {
            response_type:'code',
            client_id: import.meta.env.VITE_APP_TWITTER_CLIENT_ID,
            redirect_uri: redirectUri,
            scope:TWITTER_SCOPE,
            state: TWITTER_STATE,
            code_challenge: TWITTER_CODE_CHALLENGE,
            code_challenge_method: 'plain,'

        })
        console.log(type)


    }


 
    return {handleTwitter,handleTwitterDelete}
}

export default useTwitter