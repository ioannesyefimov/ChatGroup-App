import React,{FC, ReactElement, ReactNode, useCallback, useEffect, useState} from 'react'
import { io,Socket } from 'socket.io-client'
import { ChildrenType } from '../types';
interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }

export type InitialStateType = {
 socket: Socket | undefined
}



export const useSocketContext = ()=>{
    const socket:Socket<any> = io('http://localhost:5050',{autoConnect:false});

return socket
}
type UseSocketContextType =ReturnType<typeof useSocketContext> 
export const SocketContext = React.createContext<UseSocketContextType | null>(null)



 const SocketProvider  = (
  {children} :ChildrenType 
) => {
  const value= useSocketContext()

  return (
    <SocketContext.Provider value={value}>
        {children}
    </SocketContext.Provider>
  )
}



export default SocketProvider