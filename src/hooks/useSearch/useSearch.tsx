import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChannelType, UserType } from '../../components/types'
import { APIFetch, Errors, sleep, throwErr } from '../../components/utils'
import { useAuth, useResponseContext } from '..'
const useSearch = () => {
    const {setLoading,user,serverUrl} = useAuth()
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
    const {setServerResponse} =useResponseContext()
 
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
            let result:ResultType= {users: [], channels:[],filtered:[]}
            // console.log(`SEARCH:`, search);
            // console.log(`type:`,searchType)
            search = search ? search.toLowerCase() : ''
            switch(searchType){
                case SEARCH_TYPE.CHANNELS:{
                    let response = await APIFetch({url:`${serverUrl}/channels`});
                    if(!response.success) return throwErr(response.message)
                    console.log(`RESPONSE:`, response);
                        let filtered = response?.data?.channels?.filter((channel:ChannelType)=>{
                            if(channel.members.find(member=>member?.member?._id?.includes(user?._id ?? ''))) {
                                channel.isJoined = true
                            }
                            console.log(`CHANNEL :`, channel);
                            let name = channel?.channelName?.toLowerCase() 
                            return name?.includes(search) || channel._id?.includes(search) 
                        })
                        // console.log(`FILTERED:`, filtered);
                        if(filtered.length){
                            result.channels = filtered 
                        } else if(!filtered.length && !search) {
                            result.channels = undefined
                        } else if(!filtered.length ) {
                            result.channels = response.data.channels
                        }
                    break
                    
                }
                case SEARCH_TYPE.CHANNEL:{
                        let filtered = channels?.filter((channel:ChannelType)=>{
                            let name = channel.channelName.toLowerCase() 
                            return name.includes(search)
                        })
                        if(filtered?.length){
                            result.channels = filtered
                            
                        }else if(!filtered?.length && search===''){
                            result.channels = channels

                        }else {
                            result.channels = undefined
                        }
                        // console.log(`FILTERED:`, filtered);
                    break
                }
                case SEARCH_TYPE.USERS: {
                    let response = await APIFetch({url:`${serverUrl}/auth/user/users`});
                    if(!response.success) throwErr(response.message)
                    console.log(`users search response:`, response);
                    result.users =  Array.isArray(response.data.users) ? response.data.users : [response.data.users]
                    break
                }
                case SEARCH_TYPE.USER: {
                    if(!searchedValue.users?.length) return console.error(`SEARCHED USERS IS `,searchedValue.users) 
                    let filtered = searchedValue?.users?.filter((user:UserType)=>{
                        console.log(`USER:`, user)
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
                default: return searchedValue
              
                }
            setSearchedValue(result)            
        } catch (error) {
            setServerResponse(error)
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