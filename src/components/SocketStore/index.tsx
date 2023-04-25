import { Socket, io } from "socket.io-client";
const SocketStore = ()=>{
    const certOptions = {
        pfx:('./ssl/cert.pfx'),
        passphrase:'134679582ioa'
    }
    return {io,certOptions}
}
export default SocketStore


