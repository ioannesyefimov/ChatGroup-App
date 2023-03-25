import React, { useEffect, useMemo, useState } from 'react'
import { useChatContext } from '../components/ChatProvider/ChatProvider'
import { Channel } from '../components/types'
const useSearchChannels = () => {
    const [search, setSearch] = useState<string>('')
    const [filteredChannels,setFilteredChannels] = useState<Channel[]>([])
    

    const {channels} = useChatContext()

    useEffect(
        ()=>{   
            const timeOutId = setTimeout(()=>handleSearchChannels(search),500)
            console.log('filtered: ',filteredChannels)
            return () => clearTimeout(timeOutId)
        }, [search]
    )

    const handleSearchChannels = (search:string) =>{
        // console.log('h')
        let result
            if(channels instanceof Array ){
                result = channels.filter((channel)=>{
                    return channel?.name.toLowerCase().includes(search.toLowerCase())
                    
                })
            }
            if(result){
                setFilteredChannels(result)
            }
            
    }
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