import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChannelType, UserType } from '../components/types'
import { APIFetch, Errors, throwErr } from '../components/utils'
import useError from './useErrorContext/useError'
import { useAuth } from '.'
const useSearch = () => {
    const {setLoading} = useAuth()
    type SearchedValueType = {
        
        users?:UserType[],channels?:ChannelType[]
    }
    const [search, setSearch] = useState<any>('')
    const [searchedValue,setSearchedValue] = useState<SearchedValueType>(
        {
            users:[],
            channels:[]
        }
    )
    const {setError} = useError()
 
    type ResultType = typeof searchedValue
    type HandleSearchType ={
        search:any
        searchType:string
        channels?:ChannelType[]
    }
    const SEARCH_TYPE: {[index:string]:string} = {
        CHANNELS: 'CHANNELS',
        CHANNEL: 'CHANNEL',
        USERS:'USERS',
        USER:'USER',
        
    }
    const handleSearch = useCallback(async({search,searchType,channels}:HandleSearchType) =>{
        try {
            setLoading(true)
            if(!search)return
            let result:ResultType= {users: [], channels:[]}
            
            switch(searchType){
                case SEARCH_TYPE.CHANNELS:{
                    let response = await APIFetch({url:`http://localhost:5050/api/channels/`});
                    if(!response.success) return throwErr(response.message)
                    console.log(`RESPONSE:`, response);
                        let filtered = response?.data?.channels?.filter((channel:ChannelType)=>{
                            console.log(`CHANNEL :`, channel);
                            search = search.toLowerCase()
                            let name = channel.channelName.toLowerCase() 
                            return name.includes(search)
                        })
                        console.log(`FILTERED:`, filtered);
                    result.channels = filtered
                    break
                    
                }
                case SEARCH_TYPE.CHANNEL:{
                        let filtered = channels?.filter((channel:ChannelType)=>{
                            console.log(`CHANNEL :`, channel);
                            search = search.toLowerCase()
                            let name = channel.channelName.toLowerCase() 
                            return name.includes(search)
                        })
                        console.log(`FILTERED:`, filtered);
                        result.channels = filtered
                    break
                }
                case SEARCH_TYPE.USERS: {
                    let response = await APIFetch({url:`http://localhost:5050/api/user/get?${search}`});
                    if(!response.success) throwErr(response.message)
                    result.users =  Array.isArray(response.data.users) ? response.data.users : [response.data.users]
                    break
                }
              
                }
            setSearchedValue({channels:result?.channels,users:result?.users})            
        } catch (error) {
            setError(error)
        } finally{
            setLoading(false)

        }
            
    },[])
    const  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
        const value = e?.target.value
            setSearch(value)
      } 

     

      const value = useMemo(
        ()=>({
            SEARCH_TYPE,search,searchedValue,setSearchedValue,handleSearchChange,handleSearch
        }),[search,searchedValue]
      )
  return value
}

export default useSearch