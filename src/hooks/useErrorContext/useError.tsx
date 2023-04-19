import {useContext, useMemo } from "react"
import { ErrorContext } from "../../components/ErrorProvider/ErrorProvider"


const useError = () =>{
    const {error,hasError,setError,setHasError} = useContext(ErrorContext)
    const value = useMemo(
        ()=>({
            error,hasError,setError,setHasError
        }),[error,hasError]
    )
    return value
}

export default useError