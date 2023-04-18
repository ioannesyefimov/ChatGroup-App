import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChannelType, UserType } from '../components/types'
import { APIFetch, Errors, throwErr } from '../components/utils'
import useError from './useErrorContext/useError'
import { useAuth } from '.'
const useSearch = () => {
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
        channels?:ChannelType[]
    }
    const SEARCH_TYPE = {
        CHANNELS: 'CHANNELS',
        CHANNEL: 'CHANNEL',
        USERS:'USERS',
        USER:'USER',
        
    }
    const handleSearch = useCallback(async({search,searchType,channels}:HandleSearchType) =>{
        try {
            if(!search) throwErr({name:Errors.MISSING_ARGUMENTS,arguments: 'search'}) 
            let result:ResultType= {users: [], channels:[]}
            
            switch(searchType){
                case SEARCH_TYPE.CHANNELS:{
                    let response = await APIFetch({url:`http://localhost:5050/api/channels/`});
                    if(!response.success) return throwErr(response.message)
                    console.log(`RESPONSE:`, response);
                    if(response.data.channels){
                        let filtered = response.data.channels?.filter((channel:ChannelType)=>{
                            console.log(`CHANNEL :`, channel);
                            search = search.toLowerCase()
                            let name = channel.channelName.toLowerCase() 
                            return name.includes(search)
                        })
                        console.log(`FILTERED:`, filtered);
                        result.channels = filtered
                    }
                    break
                    
                }
                case SEARCH_TYPE.CHANNEL:{
                    // let response = await APIFetch({url:`http://localhost:5050/api/channels/userChannels?userEmail=${user.email}`});
                    // if(!response.success) return throwErr(response.message)
                    // console.log(`RESPONSE:`, response);
                    // if(response.data.channels){
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
                case SEARCH_TYPE.USER: {
                    let response = await APIFetch({url:`http://localhost:5050/api/user/get?${search}`});
                    if(!response.success) throwErr(response.message)
                    result.users =  Array.isArray(response.data.users) ? response.data.users : [response.data.users]
                    break
                }
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
            SEARCH_TYPE,search,searchedValue,setSearchedValue,handleSearchChange,handleSearch
        }),[search,searchedValue]
      )
  return value
}

export default useSearch