import React, {ReactElement, ReactNode, useState } from 'react'
import { ChildrenType } from '../types'
import { loadingGif } from '../../assets'
import { useError } from '../../hooks'
import './Error.scss'
import { isObj } from '../utils'


export const ResponseFallback = ({children}:{children?: ReactNode | ReactNode[]})=>{
    const {error,setError} = useError()

    return (
        <>
        {error ? (
            <div className='fallback-component'>
            {isObj(error) ? Object.keys(error).map(err=>{
                return (<span key={error[err]} className='error'>{err}: {error[err]}</span>)
            }) : JSON.stringify(error)}
            <button  onClick={()=>setError('')}>Continue</button>
        </div>

        ) : null}
            {children}
        </>
    )
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
            {value.hasError ? (<ErrorFallBack />) : (<ResponseFallback>{children}</ResponseFallback>)}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider