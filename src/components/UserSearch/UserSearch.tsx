import React, { ReactNode, useEffect, useRef, useState } from 'react'
import './UserSearch.scss'
import { UserType } from '../types'
import { APIFetch, Errors, sleep, throwErr } from '../utils'
import { useAuth, useResponseContext, useSearch } from '../../hooks'
import User from '../UserComponent/User'
import { Link } from 'react-router-dom'
import { searchIco } from '../../assets'
import FormInput from '../FormInput/FormInput'
import Button from '../Button/Button'
import useSWR from 'swr'
import { LoadingFallback } from '../LoadingFallback/LoadingFallback'


const UserSearch = () => {
    let fetcher = ()=>APIFetch({url:`${serverUrl}/users`,method:'GET'})
    const {data:users,isLoading,error}=useSWR('/api/auth/users',fetcher)
    const [showedUser,setShowedUser]=useState<UserType | UserType[]>()

    // let fetcher = ()=>APIFetch({url:`${serverUrl}/users?email=${query.get("email")}&userName=${query.get("userName")}&id=${query.get("id")}`,method:'GET'})



    const {serverUrl} = useAuth()
 
    const {handleSearch,search,handleSearchChange} = useSearch()
    useEffect(
        ()=>{
            sleep(1000).then(
                async ()=>{
                    if(search){
                        let result =await  handleSearch({search,searchType:'USER',searchValues: {users:users?.data?.users}})
                        console.log(`result`,result);
                        
                        setShowedUser(result?.filtered as UserType[])
                    } else {
                        setShowedUser(users?.data?.users)
                    }
                }
            )
        },[search]
    )
    // useEffect(
    //     ()=>{
    //         console.log(`SEARCHED:`, searchedValue);
            
    //         if(searchedValue?.filtered?.length){
    //             setShowedUser(searchedValue.filtered as UserType[])
    //         } else
    //         if(searchedValue.users){
    //             setShowedUser(searchedValue.users)
    //         }
           
    //     },[searchedValue]
    // )


    if(isLoading)return <LoadingFallback/>

    let content = (
        <div className='member-info'>  
       <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={(e)=>handleSearchChange(e)} value={search} />
        {
            (showedUser as UserType[])?.map((user:UserType)=>{
                return (
                    <Link key={user._id!} to={`/user?id=${user._id}`} replace >
                        <User location=''  user={user}/>
                    </Link> 
                )
            })
        }      
        </div>
    )
                

    return content
  

}

export default UserSearch