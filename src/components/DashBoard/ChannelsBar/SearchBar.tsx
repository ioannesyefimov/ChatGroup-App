import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { searchIco } from '../../../assets'
import FormInput from '../../FormInput/FormInput'
import { ChannelType, UserType } from '../../types'
import { useSearch } from '../../../hooks'
type PropsType ={
  channels:ChannelType[]
  setSearchedChannels: React.Dispatch<React.SetStateAction<ChannelType[] | null>>
}
const SearchBar = ({setSearchedChannels,channels}:PropsType) => {
  const {search,SEARCH_TYPE,searchedValue,handleSearch ,handleSearchChange} = useSearch()

  useEffect(
    ()=>{
        if(search){

            let handle = ()=>handleSearch({search,searchType:SEARCH_TYPE.CHANNEL,channels})
            let timeout = setTimeout(handle,3000)
            console.log(`value:`,searchedValue);
            
            setSearchedChannels(searchedValue?.channels!)
            return ()=>clearTimeout(timeout)
        }else {
          setSearchedChannels(null)
        }
    },[search,searchedValue?.channels]
  )

  return (
    <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={handleSearchChange} value={search} />
  )
}

export default React.memo(SearchBar)

