import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import AuthSocialButtons from "../AuthButtons/AuthSocialButtons";
import Button from "../Button/Button";
import { Errors, isObj } from "../utils";
import { useAuth, useResponseContext } from "../../hooks";
import NavigationBar from "../NavigationBar/NavigationBar";
type ResponseFallbackType ={
    children?:React.ReactNode| React.ReactNode[]

}

 const ServerResponseFallback = ({children}:ResponseFallbackType)=>{
    const {serverResponse,setServerResponse}= useResponseContext();
    const navigate = useNavigate()
    const {clearState} = useAuth()
    let content = (
        <>
        <NavigationBar/>
        <Outlet/>
        </>
    )
    if(!serverResponse)return content
    let handleOnClick = serverResponse?.name === Errors.NOT_A_MEMBER ? ()=>{setServerResponse(null);navigate(`/chat/manage/join?search=${serverResponse?.arguments?.channel_id}`)} : 
    serverResponse.message===Errors.JWT_MALFORMED ? (()=>{
        clearState('/auth/signin', navigate)
    }) : 
    ()=> {
        setServerResponse!(null);
        navigate('/auth/signin')
    }

    let btnText = serverResponse?.name === Errors.NOT_A_MEMBER ? 'Join' : serverResponse.message===Errors.JWT_MALFORMED ? (
        'signin'
    ) : 'reload'

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
            <Button onClick={handleOnClick} text={btnText}name='continue-btn' />
        </div>
    ) 
    return <>
        {Object.keys(serverResponse).length ? displayedMsg : null}
        {content}
    </>

}
export default ServerResponseFallback