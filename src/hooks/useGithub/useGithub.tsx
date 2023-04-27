import React, {useEffect} from 'react'
import { Search, useNavigate } from 'react-router-dom';
import { useAuth, useAuthCookies, useResponseContext } from '../index'
import { HandleFetchProps,LogType } from '../../components/types'
import { APIFetch, throwErr } from '../../components/utils';
import useFetch from '../useFetch';

const useGithub = (TYPE?:string) => {
    const {setServerResponse} = useResponseContext()
    const {setCookie} = useAuthCookies()
    const {clearState,setLoading,user,serverUrl} = useAuth()
    const {handleDelete} = useFetch()
    const navigate = useNavigate()
    const handleGitHub = (type:string) => {
        setServerResponse(null)
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_APP_GITHUB_APP_ID}`)
    }

    const handleGitHubLogin = async(codeParams:string,signal?:AbortSignal)=>{
        try {
            if(signal?.aborted){
                return
            }
            setLoading(true)

            let ghToken = await getGithubAccessToken(codeParams,signal);
            if(!ghToken?.gh_token){
                return console.log('MISSING TOKEN')
            }
            let accessToken = await getUserDataGH(ghToken?.gh_token!,signal)
            if(!accessToken.success){
                return console.log('ERR:',  accessToken)
            }
            let response = await APIFetch({url:`${serverUrl}/auth/github`,method:'post',body:{accessToken:accessToken.accessToken}});
            console.log(`RESPONSE:`, response);
            
            if(!response.success){
                throwErr(response.err)
            }
            setCookie('user',response?.data?.user,{path:'/',maxAge:3000})
        } catch (error) {
            console.error(error);
            
             setServerResponse(error)
        }   finally{
            setLoading(false)
        }
    }

    const handleGithubDelete = async({accessToken, user}:HandleFetchProps)=>{
        // console.log(`github deleting`)
        // console.log(`github token:`, accessToken);
        try {
            const response = await APIFetch({url: `${serverUrl}/auth/github/getUserToken` , headers: {
                "Authorization": accessToken 
              }, method:'GET'});

              if(!response?.success ){
                // console.log(response.message)
                throwErr({message: response.message, loggedThrough: response.loggedThrough})
             }

             let  deleteUser =await handleDelete({accessToken: response?.data?.accessToken, user,deletedThrough:'Github'});
             if(!deleteUser?.success) throwErr({message: deleteUser.message});
             

             clearState('/auth/signin')
            
           
        } catch (error) {
             setServerResponse({message: error})

        } finally{
            setLoading(false)
        }
    }
    
    const getGithubAccessToken= async(codeParam:string,signal?:AbortSignal) => {
        try {
            navigate('')
            setLoading(true)
            const response = await APIFetch({url:`${serverUrl}/auth/github/getAccessToken?code=${codeParam}`, method: 'GET',headers:{ "Content-Type": "application/json"},signal});
    
            if(!response.success){
               return response
            }
            //  console.log(reponse)
            return {success:true,gh_token: response.data.accessToken}
        } catch (error) {
             console.error(error)

        } finally{
            setLoading(false)
        }


        // window.location.replace(`auth/${type}`)

    }
    const getUserDataGH = async(accessToken:string,signal?:AbortSignal)=>{
        try {
            let response = await APIFetch({signal,url:`${serverUrl}/auth/github/getUserToken`,headers:{
                "Authorization": accessToken
            },method:'GET'})
              if(!response?.success ){
                return response
            }
                return {success:true,accessToken:response.data.accessToken}
        } catch (error) {
            setServerResponse(error)

        }

    }
  
  
    return {handleGithubDelete,handleGitHub,handleGitHubLogin,getGithubAccessToken,getUserDataGH}
}

export default useGithub