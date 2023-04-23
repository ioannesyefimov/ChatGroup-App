import React, {ReactNode, SetStateAction, useState } from 'react'
import { ResponseType, UserType } from '../types'
import { useError } from '../../hooks'
import './Error.scss'
import { Errors, isObj } from '../utils'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import User from '../UserComponent/User'

type ResponseFallbackType ={
    children?:ReactNode| ReactNode[]

}
export const ResponseFallback = ({children}:ResponseFallbackType)=>{
    const {serverResponse,setServerResponse}= useError()
    if(!serverResponse?.name) return <>{children}</>
    let handleOnClick = serverResponse.name === Errors.NOT_A_MEMBER ? ()=>{serverResponse(null);window.location.replace('/chat')} :()=> setServerResponse!(null)
    let displayedMsg = (
        <div className='fallback-component'>
            {serverResponse?.arguments?.channel?.members.map((member: {member:UserType,roles:string[],_id:string})=>{
         console.log(`MEMBER:`, member.member);
                
                return (
                  <User key={member.member._id} user={member?.member}/>
                )
              })}
            <span className='response-type'>{serverResponse.name ?? JSON.stringify(serverResponse)}</span>
            <Button onClick={handleOnClick} text='Continue'name='continue-btn' />
        </div>
    ) 
    return displayedMsg

}

export const ErrorFallBack = () => {
    const {error} = useError()
    console.error(error);
    
    let  err = error.message === 'Failed to fetch' ? `server may be down, please try again later(●'◡'●)` : error?.message
    return(
        <div className='error-fallback' >
        <h1 className='error-heading'>Error has happened!</h1>
            <p className='error-name'>{err  ?? error.name ??  'SOMETHING WENT WRONG'}</p>
            <button onClick={()=>window.location.reload()}>Reload</button>
        </div>
    )
}
type ErrorInitialState ={
    serverResponse: any,
    error: any,
    setServerResponse: React.Dispatch<React.SetStateAction<any>>,
    setError: React.Dispatch<React.SetStateAction<{
        [index: string]: any;
    } | undefined>>,
}

const initialState:ErrorInitialState = {
    serverResponse: null,
    error:null,
    setError: ()=>{},
    setServerResponse: ()=>{},
}

export const ErrorContext = React.createContext<UseErrorContextType>(initialState)

export type UseErrorContextType = ReturnType<typeof useErrorContext>

export const useErrorContext = (initErrorContextState: ErrorInitialState) => {
    const [error,setError] = useState<any>()
    const [serverResponse,setServerResponse]=useState<any>()
    return {error,setError,serverResponse,setServerResponse}
}

type ErrorProviderType = {
    children?: ReactNode | ReactNode[]
    Fallback:()=> JSX.Element
}

const ErrorProvider = ({children,Fallback}: ErrorProviderType) => {
    const value = useErrorContext(initialState)

    return (
        <ErrorContext.Provider value={value}>
            {value.error ? (<ErrorFallBack />) :children}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider