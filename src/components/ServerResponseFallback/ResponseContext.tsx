import React, { SetStateAction, useState } from 'react'
import { ChildrenType } from '../types'
import { Outlet } from 'react-router-dom'
import ServerResponseFallback from './ServerResponseFallback'

type ResponseState = {
    serverResponse:any,
    setServerResponse:React.Dispatch<SetStateAction<any>>,
}

const initialState:ResponseState = {
    serverResponse:null,
    setServerResponse: ()=>{},
}

const useResponseContext = (initErrorContextState?: ResponseState) => {
    const [serverResponse,setServerResponse] = useState<any>(null)
    return {serverResponse,setServerResponse}
}
export type UseReponseContextType = ReturnType<typeof useResponseContext>
export const ResponseContext = React.createContext<UseReponseContextType>(initialState)

const ServerResponseProvider = ({children}: ChildrenType) => {

    return (
        <ResponseContext.Provider value={useResponseContext(initialState)}>
            <ServerResponseFallback><Outlet/></ServerResponseFallback>
        </ResponseContext.Provider>
)
}
export default ServerResponseProvider