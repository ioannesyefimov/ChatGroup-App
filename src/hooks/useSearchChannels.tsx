import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useChatContext } from '../components/ChatProvider/ChatProvider'
import { ChannelType } from '../components/types'
import useChat from './useChatContext/useChatContext'
const useSearchChannels = () => {
    const [search, setSearch] = useState<string>('')
    const [filteredChannels,setFilteredChannels] = useState<ChannelType[]>([])
 
    const handleSearchChannels = useCallback((search:string) =>{
        if(!search) return 
        let result
            if(channels instanceof Array ){
                result = channels.filter((channel)=>{
                    return channel?.name.toLowerCase().includes(search.toLowerCase())
                    
                })
            }
            if(result){
                setFilteredChannels(result)
            }
            
    },[])
    const  hanldeSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
        const value = e?.target.value
            setSearch(value)
      } 

      const value = useMemo(
        ()=>({
            search,filteredChannels,hanldeSearchChange,handleSearchChannels
        }),[search,filteredChannels]
      )
  return value
}

export default useSearchChannels