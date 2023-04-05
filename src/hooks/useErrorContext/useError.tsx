import {useContext } from "react"
import { ErrorContext } from "../../components/ErrorProvider/ErrorProvider"


const useError = () =>{
    const {error,hasError,setError,setHasError} = useContext(ErrorContext)
    
    return {error,hasError,setError,setHasError}
}

export default useError