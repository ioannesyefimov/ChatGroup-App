import { io } from "socket.io-client";
const SocketStore = ()=>{
    const certOptions = {
        pfx:('./ssl/cert.pfx'),
        passphrase:'134679582ioa'
    }

const serverUrl = import.meta.env.VITE_IP_ADDRESS ?  'https://192.168.1.102:5050/api' : 'https://localhost:5050/api'
    return {io,certOptions,serverUrl}
}
export default SocketStore


