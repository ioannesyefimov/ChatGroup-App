import React, { ReactNode, useEffect, useState } from 'react'
import './UserSearch.scss'
import { UserType } from '../types'
import { APIFetch, Errors, throwErr } from '../utils'
import { useAuth, useError, useSearch } from '../../hooks'
import User from '../UserComponent/User'
import { Link } from 'react-router-dom'
const UserSearch = () => {
    const [showedUser,setShowedUser] = useState<UserType|UserType[]>([])
    const {serverUrl,setLoading} = useAuth()
    const {handleSearch, searchedValue,setSearchedValue} = useSearch([])
    const {setError} = useError()
    const findUser = async(query:URLSearchParams)=>{
       try {
        let email = query.get('email')
        let userName = query.get('userName')
        let id = query.get('id')
        let params = {email,userName,id}
        setLoading(true)
       await handleSearch({search:`email=${email}&userName=${userName}&id=${id}`,searchType:'USERS'})
        if(searchedValue?.users){
            setShowedUser(searchedValue.users)
        }
       } catch (error) {
        setError(error)
       } finally{
        setLoading(false)
       } 
       
    }
    useEffect(
        ()=>{
            findUser(new URLSearchParams(location.search))

            return ()=>setSearchedValue({})
        },[]
    )
    let content = (
        <div className='member-info'>  
        {
            (showedUser as Array<UserType>).map((user:UserType)=>{
                return <Link to={`/user?userEmail=${user.email}`} replace ><User key={user._id!} user={user}/></Link> 
            })
        }      
        </div>
    )
                
    return content
  

}

export default UserSearch