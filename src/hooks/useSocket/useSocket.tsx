import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../../components/SocketContext/SocketProvider'

const useSocket = () => {
    const socket = useContext(SocketContext)

    
    
    return socket
 }

export default useSocket