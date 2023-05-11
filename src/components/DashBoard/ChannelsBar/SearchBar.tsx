import  {  useEffect, useState } from 'react'
import { searchIco } from '../../../assets'
import FormInput from '../../FormInput/FormInput'
import { ChannelType, UserType } from '../../types'
import { useSearch } from '../../../hooks'
import { useLocation } from 'react-router-dom'
import { APIFetch, sleep } from '../../utils'
import useSWR from 'swr'
import { useAuthStore } from '../../../ZustandStore'
type PropsType ={
  channels:ChannelType[]|null
  user?:UserType
  searchType:string
  fetchParams?:{
    url:string
    isFetch:boolean
    swrKey:string
  }
  setSearchedChannels: (channel:ChannelType[] | null)=>void
}
const SearchBar = ({user,fetchParams,setSearchedChannels,channels,searchType}:PropsType) => {
  const serverUrl=useAuthStore(s=>s.serverUrl)
  const setServerResponse=useAuthStore(s=>s.setServerResponse)
  const [search,setSearch]=useState('')
  // const search = useChatStore(s=>s.search)
  // const setSearch = useChatStore(s=>s.setSearch)
  const fetcher = ()=>APIFetch({
    url:`${serverUrl}/${fetchParams?.url}`,
    method:'GET'
  })
  const {data,error,isLoading}=useSWR(()=>fetchParams?.isFetch ? fetchParams?.swrKey : null,fetcher)
  const {SEARCH_TYPE,handleSearch} = useSearch()
  if(error){
    setServerResponse(error)
  }  
    async function  initSearch(){
      await sleep(3000);
        let params = new URLSearchParams(location.search)
        let searchParam = params?.get('search') ?? search
        console.log(Boolean(searchParam))
        if(!searchParam && fetchParams?.isFetch) {
         return setSearchedChannels(data?.data?.channels ?? data?.data?.users)
        }
        if(!searchParam)return setSearchedChannels(null)
        let result = await  handleSearch({search:searchParam,searchType:SEARCH_TYPE[searchType],searchValues:{channels:data?.data?.channels ?? channels}})
          setSearchedChannels(result?.filtered as any)
          // setSearchedChannels(searchedChannels?.data?.channels)
    } 

  const location = useLocation()
  useEffect(
    ()=>{
      
          initSearch()
    },[search,data?.data]
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

