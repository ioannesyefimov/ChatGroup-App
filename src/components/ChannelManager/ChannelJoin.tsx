import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import './channelJoin.scss'
import FormInput from '../FormInput/FormInput'
import { APIFetch, convertBase64, throwErr, validateInput } from '../utils'
import { useAuth, useAuthCookies, useChat, useError } from '../../hooks'
import AuthForm from '../Authentication/AuthForm/AuthForm'
import { ChannelType, ResponseType } from '../types'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../DashBoard/ChannelsBar/SearchBar'
import Channels from '../DashBoard/Channels/Channels'
import Button from '../Button/Button'
import { joinIco } from '../../assets'

const ChannelJoin = ()=>{
    const [searchedChannels,setSearchedChannels] = useState<ChannelType[] | null>(null)

    const {setError} = useError()
    const {serverUrl,setLoading} = useAuth()
    const {cookies} = useAuthCookies()
    const {setChannels,channels,} = useChat()
    if(!cookies?.accessToken) return (
        <div className='prompt'>       
            <h2 style={{marginBottom:'1rem', color:'red'}}>You need to log in again: </h2>
            <AuthForm type='signin' redirectType='newAccessToken' redirectUrl='/channel/join'/>
        </div>
    )


    const nameRef = useRef<null | HTMLLabelElement >(null)
    const navigate = useNavigate()
    useEffect(
        ()=>{
            console.log(`SEARCHED:`, searchedChannels);
            
        },[searchedChannels]
    )
    
    const handleJoin = 
       async (e:React.MouseEvent)=>{
            e.preventDefault()
            try {
                setLoading(true)
                let fields = {channelName}
                console.log(`FIELDS: `, fields)
                let isEmpty = await validateInput({fields,refs:{channelName:nameRef}})
                if(!isEmpty?.success){
                    throwErr(isEmpty?.errors)
                }
                // let uploadedPicture = await APIFetch({url:`${serverUrl}/upload/picture`, body:{image:channelAvatar,accessToken:cookies?.accessToken}})
                let response:ResponseType = await APIFetch({url:`${serverUrl}/channels/join`, body:{accessToken:cookies?.accessToken,channelName,},method:'POST'})
                if(!response.success) throwErr(response?.message)
                setChannels({...channels, ...response?.data?.channel })
                navigate(`/chat/${channelName}`)
                console.log(`RESPONSE : `, response)
            } catch (error) {
                console.log(`ERROR:`,error)
                setError(error)
            }finally{
                setLoading(false)

            }
        }
    return (
        <div className='prompt-menu-component  box-shadow--gray'>
            <form>
                <SearchBar channels={channels} searchType='CHANNELS' setSearchedChannels={setSearchedChannels}/>
                <Channels handleJoinChannel={handleJoin} type="join" fallbackText={`Nothing  was found...`}  channels={searchedChannels ?? channels}/>
            </form>
        </div>
    )
}

export default ChannelJoin