import React, { useEffect, useState } from 'react'
import { ChildrenType } from '../../types';
import { useError, useOnlineStatus } from '../../../hooks';
import { throwErr } from '../../utils';
export const OnlineStatusContext = React.createContext(true);

const initState = {
    onlineStatus:true,
    setOnlineStatus:()=>{},
}

const useOnlineStatusStore = ()=>{
    const [onlineStatus, setOnlineStatus] = useState<boolean>(true);
    const [rendered,setRendered]=useState(false)
    const {setError}=useError()
    
    useEffect(() => {
        const onRender = ()=>{
            setRendered(true)
            console.log(`RENDERED`);
            
        }
        window.addEventListener('load', onRender)
        const online = (e)=>{
            console.log('ONLINE');
            setOnlineStatus(true);
        }
        const offline = (e)=>{
            setOnlineStatus(false);
            console.error('OFFLINE');
        }
        window.addEventListener("online", online);
        window.addEventListener("offline", offline);
        return () => {
            window.removeEventListener("offline", offline);
            window.removeEventListener("online", online);
            window.removeEventListener('load', onRender)
        };
      }, [rendered]);

      useEffect(
        ()=>{
            if(!onlineStatus){
                setError({name:'connection is disrupted',code:12029,message:'please connect to the internet'})
            }
        },[onlineStatus]
      )
    return onlineStatus
}

type useOnlineStatuStoreType = ReturnType<typeof useOnlineStatusStore>


const OnlineStatusProvider= ({ children }:ChildrenType) => {
  const value = useOnlineStatusStore()
  
    return (
      <OnlineStatusContext.Provider value={value}>
        {children}
      </OnlineStatusContext.Provider>
    );
  };
  export default  OnlineStatusProvider