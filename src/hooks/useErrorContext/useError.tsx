import {useContext, useMemo } from "react"
import { ErrorContext } from "../../components/ErrorProvider/ErrorProvider"


const useError = () =>{
    const {error,setError,serverResponse,setServerResponse} = useContext(ErrorContext)
    const value = useMemo(
        ()=>({
            error,serverResponse,setError,setServerResponse
        }),[error,serverResponse]
    )
    return value
}

export default useError