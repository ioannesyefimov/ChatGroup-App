import React, {ReactNode, SetStateAction, useState } from 'react'
import { ResponseType } from '../types'
import { useError } from '../../hooks'
import './Error.scss'
import { Errors, isObj } from '../utils'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

type ResponseFallbackType ={
    children?:ReactNode| ReactNode[]
    response:ResponseType | null
    setResponse: React.Dispatch<SetStateAction<ResponseType|null>>
    resetResponse:()=>void
}
export const ResponseFallback = ({children,response,setResponse,resetResponse}:ResponseFallbackType)=>{
console.log(`response`,response);
    const navigate = useNavigate()
    if(!response) return <>{children}</>
    let handleOnClick = response.name === Errors.NOT_A_MEMBER ? ()=>{navigate('/chat/manage/join');setResponse(null)} :()=> setResponse(null)
    let displayedMsg = (
        <div className='fallback-component'>
            <span className='response-type'>{response.name ?? JSON.stringify(response)}</span>
            <Button onClick={handleOnClick} text='Continue'name='continue-btn' />
        </div>
    ) 
    return displayedMsg

}

export const ErrorFallBack = () => {
    const {error} = useError()
    return(
       
            <div className='fallback-component' style={{gap:'1rem',margin: '4rem auto',display:'grid', width: '60%', maxWidth: '500px'}}>
                <h1 style={{fontSize: '2.2rem',textAlign: 'center'}}>Error has happened!</h1>
                <p>{JSON.stringify(error) ?? 'SOMETHING WENT WRONG'}</p>
                <button style={{borderRadius: "15PX", margin: '0 auto', padding: '.5rem 5rem' }} onClick={()=>window.location.reload()}>Reload</button>
            </div>
    )
}
type ErrorInitialState ={
    hasError: boolean,
    error: any,
    setHasError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<{
        [index: string]: any;
    } | undefined>>,
}

const initialState:ErrorInitialState = {
    hasError: false,
    error:undefined,
    setError: ()=>{},
    setHasError: ()=>{},
}

export const ErrorContext = React.createContext<UseErrorContextType>(initialState)

export type UseErrorContextType = ReturnType<typeof useErrorContext>

export const useErrorContext = (initErrorContextState: ErrorInitialState) => {
    const [hasError,setHasError]= useState(false)
    const [error,setError] = useState<any>()

    return {error,hasError,setHasError,setError}
}

type ErrorProviderType = {
    children?: ReactNode | ReactNode[]
    Fallback:()=> JSX.Element
}

const ErrorProvider = ({children,Fallback}: ErrorProviderType) => {
    const value = useErrorContext(initialState)

    return (
        <ErrorContext.Provider value={value}>
            {value.hasError ? (<ErrorFallBack />) :children}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider