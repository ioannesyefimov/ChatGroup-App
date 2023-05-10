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
  channels:ChannelType[]|null
  user?:UserType
  searchType:string
  fetchParams?:{
    url:string
    isFetch:boolean
    swrKey:string
  }
  setSearchedChannels: (channel:ChannelType[])=>void
}
const SearchBar = ({user,fetchParams,setSearchedChannels,channels,searchType}:PropsType) => {
  const serverUrl=useAuthStore(s=>s.serverUrl)
  const search = useChatStore(s=>s.search)
  const setSearch = useChatStore(s=>s.setSearch)
  const fetcher = ()=>APIFetch({
    url:`${serverUrl}/${fetchParams}`,
    method:'GET'
  })
  const {data:searchedChannels,error,isLoading}=useSWR(()=>fetchParams?.isFetch ? fetchParams?.swrKey : null,fetcher)
  const {SEARCH_TYPE,handleSearch ,handleSearchChange} = useSearch()
  
    async function  initSearch(){
      await sleep(1500);
        let params = new URLSearchParams(location.search)
        let searchParam = params?.get('search') ?? search
        console.log(`SEARCHPARAM`,searchParam);
        console.log(Boolean(searchParam))
        if(!searchParam && fetchParams?.isFetch) {
         return setSearchedChannels(searchedChannels?.data?.channels ?? searchedChannels?.data?.users)
        }
        if(!searchParam)return setSearchedChannels(null)
        let result = await  handleSearch({search:searchParam,searchType:SEARCH_TYPE[searchType],searchValues:{channels}})
          setSearchedChannels(result?.filtered as any)
          // setSearchedChannels(searchedChannels?.data?.channels)
    } 

  const location = useLocation()
  useEffect(
    ()=>{
      
          initSearch()
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

