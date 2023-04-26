import React, {ReactNode, SetStateAction, useState } from 'react'
import { ResponseType, UserType } from '../types'
import { useError } from '../../hooks'
import './Error.scss'
import { DisplayError, Errors, isObj } from '../utils'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import User from '../UserComponent/User'
import AuthSocialButtons from '../AuthButtons/AuthSocialButtons'



export const ErrorFallBack = () => {
    const {error} = useError()
    console.error(error);
   
    let  err = error.message === 'Failed to fetch' ? `server may be down, please try again later(●'◡'●)` : error?.message
    return(
        <div className='error-fallback' >
        <h1 className='error-heading'>Error has happened!</h1>
            {/* <p className='error-name'>{error?.name ??  'SOMETHING WENT WRONG'}</p> */}
            <DisplayError error={error}/>
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
    const [serverResponse,setServerResponse]=useState<any>({})
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