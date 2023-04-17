import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChannelType, UserType } from '../components/types'
import { APIFetch, Errors, throwErr } from '../components/utils'
import useError from './useErrorContext/useError'
const useSearch = (channels:ChannelType[]| undefined) => {
    type SearchedValueType = {
        
        users?:UserType[],channels?:ChannelType[]
    }
    const [search, setSearch] = useState<any>('')
    const [searchedValue,setSearchedValue] = useState<SearchedValueType>()
    const {setError} = useError()
 
    type ResultType = typeof searchedValue
    type HandleSearchType ={
        search:any
        searchType:string
    }
    const SEARCH_TYPE = {
        CHANNELS: 'CHANNELS',
        USERS:'USERS',
        
    }
    const handleSearch = useCallback(async({search,searchType}:HandleSearchType) =>{
        try {
            if(!search) throwErr({name:Errors.MISSING_ARGUMENTS,arguments: 'search'}) 
            let result:ResultType= {users: [], channels:[]}
            
            switch(searchType){
                case SEARCH_TYPE.CHANNELS:
                    result.channels = channels?.filter((channel:ChannelType)=>{
                        return channel?.channelName.toLowerCase().includes(search.toLowerCase())
                    })
                case SEARCH_TYPE.USERS: 
                    let response = await APIFetch({url:`http://localhost:5050/api/user/get?${search}`});
                    if(!response.success) throwErr(response.message)
                    result.users =  Array.isArray(response.data.users) ? response.data.users : [response.data.users]
            }
            setSearchedValue({channels:result?.channels,users:result?.users})            
        } catch (error) {
            setError(error)
        }
            
    },[])
    const  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
        const value = e?.target.value
            setSearch(value)
      } 

     

      const value = useMemo(
        ()=>({
            search,searchedValue,setSearchedValue,handleSearchChange,handleSearch
        }),[search,searchedValue]
      )
  return value
}

export default useSearch