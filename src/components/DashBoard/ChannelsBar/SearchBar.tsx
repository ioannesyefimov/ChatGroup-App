import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { searchIco } from '../../../assets'
import FormInput from '../../FormInput/FormInput'
import { ChannelType, UserType } from '../../types'
import { useSearch } from '../../../hooks'
import { useLocation } from 'react-router-dom'
import { sleep } from '../../utils'
type PropsType ={
  channels:ChannelType[]
  user?:UserType
  searchType:string
  setSearchedChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>
}
const SearchBar = ({user,setSearchedChannels,channels,searchType}:PropsType) => {
  const {search,setSearchedValue,SEARCH_TYPE,searchedValue,handleSearch ,handleSearchChange} = useSearch()
  const location = useLocation()
  useEffect(
    ()=>{
      let urlSearch = location.search
      let handle
      let params = new URLSearchParams(urlSearch)
      let searchParam = params?.get('search')
      if(searchParam){
        sleep(1500).then(()=>handleSearch({search:searchParam,searchType:SEARCH_TYPE[searchType],channels}))
      } else {
        sleep(1500).then(()=>handleSearch({search,searchType:SEARCH_TYPE[searchType],channels}))
        }

    },[search,location.search]
  )
  useEffect(
    ()=>{
        setSearchedChannels(searchedValue?.filteredChannels!)
        return ()=>{
          setSearchedChannels([]);
        }
    },[searchedValue]
  )

  return (
    <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={handleSearchChange} value={search} />
  )
}

export default SearchBar

