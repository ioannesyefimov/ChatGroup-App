import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChannelType, UserType } from '../components/types'
import { APIFetch, Errors, sleep, throwErr } from '../components/utils'
import useError from './useErrorContext/useError'
import { useAuth } from '.'
const useSearch = () => {
    const {setLoading} = useAuth()
    type SearchedValueType = {
        
        users?:UserType[],channels?:ChannelType[],filtered:ChannelType[] | UserType[] | []
    }
    const [search, setSearch] = useState<any>('')
    const [searchedValue,setSearchedValue] = useState<SearchedValueType>(
        {
            users:[],
            channels:[],
            filtered:[],
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
    const handleSearch = async({search,searchType,channels}:HandleSearchType) =>{
        try {
            setLoading(true)
            if(!search)return
            let result:ResultType= {users: [], channels:[],filtered:[]}
            console.log(`SEARCH:`, search);
            console.log(`type:`,searchType)
            
            switch(searchType){
                case SEARCH_TYPE.CHANNELS:{
                    let response = await APIFetch({url:`https://localhost:5050/api/channels`});
                    if(!response.success) return throwErr(response.message)
                    console.log(`RESPONSE:`, response);
                        let filtered = response?.data?.channels?.filter((channel:ChannelType)=>{
                            console.log(`CHANNEL :`, channel);
                            search = search.toLowerCase()
                            let name = channel?.channelName?.toLowerCase() 
                            return name?.includes(search)
                        })
                        console.log(`FILTERED:`, filtered);
                        if(filtered.length){
                            result.channels = filtered 
                        } else {
                            result.channels = response?.data?.channels 

                        }
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
                    let response = await APIFetch({url:`https://localhost:5050/api/auth/user/users`});
                    if(!response.success) throwErr(response.message)
                    console.log(`users search response:`, response);
                    result.users =  Array.isArray(response.data.users) ? response.data.users : [response.data.users]
                    break
                }
                case SEARCH_TYPE.USER: {
                    if(!searchedValue.users?.length) return console.error(`SEARCHED USERS IS `,searchedValue.users) 
                    let filtered = searchedValue?.users?.filter((user:UserType)=>{
                        console.log(`USER:`, user)
                        search = search.toLowerCase()
                        let username=user.userName.toLocaleLowerCase()
                        let id = user._id?.toLocaleLowerCase()
                        let email = user.email.toLocaleLowerCase()
                        if(username.includes(search) || id?.includes(search) || email.includes(search)){
                            return user
                        }
                    })
                        result.filtered = filtered
                    break
                }
              
                }
            setSearchedValue(result)            
        } catch (error) {
            setError(error)
        } finally{
            setLoading(false)

        }
            
    }
    const  handleSearchChange = async(e: React.ChangeEvent<HTMLInputElement>) =>{
        setSearch(e.target.value)
    } 

     

      const value = useMemo(
        ()=>({
            SEARCH_TYPE,search,searchedValue,setSearchedValue,handleSearchChange,handleSearch
        }),[search,searchedValue]
      )
  return value
}

export default useSearch