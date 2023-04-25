import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { searchIco } from '../../../assets'
import FormInput from '../../FormInput/FormInput'
import { ChannelType, UserType } from '../../types'
import { useSearch } from '../../../hooks'
import { useLocation } from 'react-router-dom'
type PropsType ={
  channels:ChannelType[]
  searchType:string
  setSearchedChannels: React.Dispatch<React.SetStateAction<ChannelType[] | null>>
}
const SearchBar = ({setSearchedChannels,channels,searchType}:PropsType) => {
  const {search,SEARCH_TYPE,searchedValue,handleSearch ,handleSearchChange} = useSearch()
  const location = useLocation()
  useEffect(
    ()=>{
      let urlSearch = location.search
      let handle
      if(urlSearch.includes('?=search')){
        urlSearch = urlSearch.replace('?search=','')
        handle = ()=>handleSearch({search:urlSearch,searchType:SEARCH_TYPE[searchType],channels})
      } else {
        handle = ()=>handleSearch({search,searchType:SEARCH_TYPE[searchType],channels})
        }
      let timeout = setTimeout(handle,1500)
      // if(!search){
        // setSearchedChannels(null)
      // }
      return ()=>clearTimeout(timeout)

    },[search,location.search]
  )
  useEffect(
    ()=>{
        setSearchedChannels(searchedValue?.channels! ?? null)
    },[searchedValue]
  )

  return (
    <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={handleSearchChange} value={search} />
  )
}

export default React.memo(SearchBar)

