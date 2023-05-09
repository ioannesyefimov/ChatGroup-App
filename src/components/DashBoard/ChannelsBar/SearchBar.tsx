import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { searchIco } from '../../../assets'
import FormInput from '../../FormInput/FormInput'
import { ChannelType, UserType } from '../../types'
import { useAuth, useSearch } from '../../../hooks'
import { useLocation } from 'react-router-dom'
import { APIFetch, sleep } from '../../utils'
import useSWR from 'swr'
import { useAuthStore, useChatStore } from '../../../ZustandStore'
type PropsType ={
  channels:ChannelType[]
  user?:UserType
  searchType:string
  setSearchedChannels: (channel:ChannelType)=>void
}
const SearchBar = ({user,setSearchedChannels,channels,searchType}:PropsType) => {
  const serverUrl=useAuthStore(s=>s.serverUrl)
  const search = useChatStore(s=>s.search)
  const setSearch = useChatStore(s=>s.setSearch)
  const fetcher = ()=>APIFetch({
    url:`${serverUrl}/channels`,
    method:'GET'
  })
  const {data:searchedChannels,error,isLoading}=useSWR(()=>searchType==='CHANNELS' ? '/api/channels' : null,fetcher)
  const {SEARCH_TYPE,handleSearch ,handleSearchChange} = useSearch()
  
 
  const location = useLocation()
  useEffect(
    ()=>{
      sleep(1500).then(async()=>{
        let params = new URLSearchParams(location.search)
          let searchParam = params?.get('search') ?? search
          if(!searchParam)return setSearchedChannels(null)
        let result = await  handleSearch({search:searchParam,searchType:SEARCH_TYPE[searchType],searchValues:{channels}})
          setSearchedChannels(result?.filtered as any)
          // setSearchedChannels(searchedChannels?.data?.channels)
        } 
        )
          
    },[search,location.search]
  )
  // useEffect(
  //   ()=>{
  //       setSearchedChannels(searchedValue?.filteredChannels!)
  //       return ()=>{
  //         setSearchedChannels([]);
  //       }
  //   },[searchedValue]
  // )

  return (
    <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={(e)=>setSearch(e.currentTarget.value)} value={search} />
  )
}

export default SearchBar

