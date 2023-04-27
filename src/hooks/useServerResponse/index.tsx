import { useContext } from "react";
import { ResponseContext } from "../../components/ServerResponseFallback/ResponseContext";



export default function useResponseContext(){
    const {serverResponse,setServerResponse} =useContext(ResponseContext)

    return {serverResponse,setServerResponse}
}