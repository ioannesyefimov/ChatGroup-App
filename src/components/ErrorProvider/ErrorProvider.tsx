import React, {ReactElement, ReactNode, useState } from 'react'
import { ChildrenType } from '../types'
import { loadingGif } from '../../assets'
import { useError } from '../../hooks'
export const Fallback = ()=> {

    return (
        <div style={{gap:'1rem',margin: '4rem auto',display:'grid', width: '60%', maxWidth: '500px'}}>
        <h1 style={{textAlign: 'center'}}>Loading...</h1>
        <img style={{margin: '0 auto', borderRadius: "15PX", maxWidth:'60%'}} className="box-shadow" src={loadingGif} alt="loading" />
        <button style={{borderRadius: "15PX", margin: '0 auto', padding: '.5rem 5rem' }} onClick={()=>window.location.reload()}>Reload</button>
    </div>
    )
}

export const ErrorFallBack = () => {
    const {error} = useError()
    return (
        <div style={{gap:'1rem',margin: '4rem auto',display:'grid', width: '60%', maxWidth: '500px'}}>
            <h1 style={{fontSize: '2.2rem',textAlign: 'center'}}>Error has happened!</h1>
            <p>{error?.message ?? 'SOMETHING WENT WRONG'}</p>
            <button style={{borderRadius: "15PX", margin: '0 auto', padding: '.5rem 5rem' }} onClick={()=>window.location.reload()}>Reload</button>
        </div>
    )
}
type ErrorInitialState ={
    hasError: boolean,
    error: any,
    setHasError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<undefined>>,
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
            {value.hasError ? (<Fallback/>) : (children)}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider