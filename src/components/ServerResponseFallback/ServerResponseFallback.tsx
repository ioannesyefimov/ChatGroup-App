import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import useError from "../../hooks/useErrorContext/useError";
import AuthSocialButtons from "../AuthButtons/AuthSocialButtons";
import Button from "../Button/Button";
import { Errors, isObj } from "../utils";
import { useAuth } from "../../hooks";
type ResponseFallbackType ={
    children?:React.ReactNode| React.ReactNode[]

}
 const ServerResponseFallback = ({children}:ResponseFallbackType)=>{
    const {serverResponse,setServerResponse}= useError();
    const navigate = useNavigate()
    const {clearState} = useAuth()
    if(!serverResponse){
        return <Outlet/>
    }
    let handleOnClick = serverResponse?.name === Errors.NOT_A_MEMBER ? ()=>{setServerResponse(null);window.location.replace('/chat')} : 
    serverResponse.message===Errors.JWT_MALFORMED ? (()=>{
        clearState('/auth/signin', navigate)
    }) : 
    ()=> {
        setServerResponse!(null);
        navigate('/auth/signin')
    }

    let responseArguments = serverResponse?.arguments ? isObj(serverResponse?.arguments) ? (
        Object.keys(serverResponse?.arguments)?.map((argument,i)=>{
            return (
                <span className='error-argument' key={i}>{argument}: {serverResponse.arguments[argument]}</span>
            )
        })
        ) : (null) : null
    

    let signedUpDifferently = (
        <>
            {responseArguments}
            <AuthSocialButtons authType='signin' socialBtn={serverResponse?.arguments?.loggedThrough ?? ''}/>
     
        </>
    )
    let errorName = serverResponse?.name==='TokenExpiredError' ? 'You need to try to authenticate again' : serverResponse?.name
   
    let displayedMsg = (
        <div className='fallback-component'>
            <span className='response-type'>{errorName}</span>
            {serverResponse?.name === Errors.SIGNED_UP_DIFFERENTLY && signedUpDifferently}            
            <Button onClick={handleOnClick} text='Reset'name='continue-btn' />
        </div>
    ) 
    return (
        <>
        {Object.keys(serverResponse).length ? displayedMsg : null}
        <Outlet/>
        </>
    )

}
export default ServerResponseFallback