import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { searchIco } from '../../../assets'
import FormInput from '../../FormInput/FormInput'
import { ChannelType, UserType } from '../../types'
import { useAuth, useSearch } from '../../../hooks'
import { useLocation } from 'react-router-dom'
import { APIFetch, sleep } from '../../utils'
import useSWR from 'swr'
type PropsType ={
  channels:ChannelType[]
  user?:UserType
  searchType:string
  setSearchedChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>
}
const SearchBar = ({user,setSearchedChannels,channels,searchType}:PropsType) => {
  const {serverUrl}=useAuth()
  const fetcher = ()=>APIFetch({
    url:`${serverUrl}/channels`,
    method:'GET'
  })
  const {data:searchedChannels,error,isLoading}=useSWR(()=>searchType==='CHANNELS' ? '/api/channels' : null,fetcher)
  const {search,SEARCH_TYPE,handleSearch ,handleSearchChange} = useSearch()
  
 
  const location = useLocation()
  useEffect(
    ()=>{
      let params = new URLSearchParams(location.search)
      let searchParam = params?.get('search') ?? search
        sleep(1500).then(async()=>{
        let result = await  handleSearch({search:searchParam,searchType:SEARCH_TYPE[searchType],searchValues:{channels}})
        if(result?.filtered?.length){
          setSearchedChannels(result?.filtered as ChannelType[])
        }else if(searchedChannels?.data?.channels) {
          
          setSearchedChannels(searchedChannels?.data?.channels)
        }
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
    <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={(e)=>handleSearchChange(e)} value={search} />
  )
}

export default SearchBar

