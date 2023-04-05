import React, {useEffect} from 'react'
import { Search } from 'react-router-dom';
import { useAuth, useAuthCookies, useError } from '../index'
import { HandleFetchProps,LogType } from '../../components/types'
import { APIFetch } from '../../components/utils';
import useFetch from '../useFetch';

const useGithub = (TYPE:string) => {
    const {getUserData} = useFetch()
    const {setError,setHasError} = useError()
    const {setCookie,cookies} = useAuthCookies()
    const {clearState,setLoading,user} = useAuth()
    const {handleDelete} = useFetch()
    const url = `https://authentic-app-backend.onrender.com/api/`

    let newURL = location.href.split("?")[0];
    newURL = '/auth/signin'

    useEffect(() => {
        let accessToken = cookies.accessToken
        
        if(!user?.email ){
          const queryString = window.location.search
        //   console.log(queryString.length)
                const checkQueryString = async(queryString:string) => {
                    try {
                        setLoading(true)
                        let LOGIN_TYPE = localStorage.getItem('LOGIN_TYPE')
                        let LOGGED_THROUGH = window.localStorage.getItem('LOGGED_THROUGH')
                        if(! LOGIN_TYPE|| !LOGGED_THROUGH) return
                       const urlParams = new URLSearchParams(queryString)
                       const codeParam = urlParams.get('code')
                         if(codeParam && LOGGED_THROUGH == 'Github' ) {
                         return await getGithubAccessToken(codeParam, LOGIN_TYPE);
                       } else {
                        //  return console.log('query is empty')
                       }
                   } catch (error) {
                     return setError({message:error})
           
                   } finally{
                     setLoading(false)
                   }
                   }
               checkQueryString(queryString)
            }
      }, [])



    const handleGitHub = (type:string) => {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_APP_GITHUB_APP_ID}`)
        // console.log('GHHH')
        // console.log(`type: ${type}`);
        window.localStorage.setItem('LOGIN_TYPE', type)
        window.localStorage.setItem('LOGGED_THROUGH', 'Github')
    }

    const handleGithubRegister = async(accessToken:string) => {
        // console.log(`GH REGISTERING`)
        try {
            const response = await APIFetch({url:`${url}auth/github/register`,method:'POST', body:{accessToken} });
            if(!response.success){
                clearState('')
                return setError({message: response?.message, loggedThrough:response?.loggedThrough})
            }
            setCookie('accessToken', response?.data?.accessToken, {path: '/', maxAge: 2000})
            localStorage.setItem('LOGIN_TYPE', 'signin')
        } catch (error) {
            clearState('')
            return setError({message: error})

        } finally{
            setLoading(false)
        }
    }

    const handleGithubDelete = async({accessToken, user}:HandleFetchProps)=>{
        // console.log(`github deleting`)
        // console.log(`github token:`, accessToken);
        try {
            const response = await APIFetch({url: `${url}auth/github/getUserToken` , headers: {
                "Authorization": accessToken 
              }, method:'GET'});

              if(!response?.success ){
                // console.log(response.message)
                return setError({message: response.message, loggedThrough: response.loggedThrough})
             }

             let  deleteUser =await handleDelete({accessToken: response?.data?.accessToken, user,deletedThrough:'Github'});
             if(!deleteUser?.success) return setError({message: deleteUser.message});
             

             clearState('/auth/signin')
            
           
        } catch (error) {
            return setError({message: error})

        } finally{
            setLoading(false)
        }
    }
    
    const getGithubAccessToken= async(codeParam:string,type:string) => {
        try {
            // console.log(`GH GETTING TOKEN`)
            setLoading(true)
            const reponse = await APIFetch({url:`${url}auth/github/getAccessToken?code=${codeParam}`, method: 'GET',headers:{ "Content-Type": "application/json"},});
    
            if(!reponse.success){
                window.history.pushState(null, document.title, newURL);

               return setError({message: reponse?.message})
            }
            //  console.log(reponse)
            setCookie('accessToken', reponse.data.accessToken, {path: '/', maxAge: 2000})
             window.history.pushState(null, document.title, newURL);
        // console.log(type)
        } catch (error) {

            return setError({message: error})

        } finally{
            setLoading(false)
        }


        // window.location.replace(`auth/${type}`)

    }
    const getUserDataGH = async(accessToken:string)=>{
        try {
            // console.log(`GH ACCESSTOKEN: ${accessToken}`)
            setLoading(true)
            // console.log(`GH GETTING USER`)

            const responseToken = await fetch(`${url}auth/github/getUserToken`, {
                method: "GET",
                headers: {
                  "Authorization": accessToken // Bearer ACCESSTOKEN
                }
            })

              let dbResponse = await responseToken.json();
              if(!dbResponse?.success ){
                // console.log(dbResponse.message)
                clearState('')
                return setError({message: dbResponse.message, loggedThrough: dbResponse.loggedThrough})
                }
                localStorage.clear()
                await getUserData(dbResponse?.data?.accessToken, 'Github')
            // removeCookie('accessToken', {path:'/'})


        } catch (error) {
            // console.log(error)
            return setError({message:error})

        } finally{
            setLoading(false)
        }

    }
  
  
    return {handleGithubDelete,handleGitHub,handleGithubRegister,getGithubAccessToken,getUserDataGH}
}

export default useGithub