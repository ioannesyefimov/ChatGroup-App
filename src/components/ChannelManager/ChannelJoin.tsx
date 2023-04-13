import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import './ChannelCreate.scss'
import FormInput from '../FormInput/FormInput'
import UploadInput from '../UploadInput/UploadInput'
import { APIFetch, convertBase64, throwErr, validateInput } from '../utils'
import Button from '../UserBar/UserBar'
import { useAuth, useAuthCookies, useChat, useError } from '../../hooks'
import AuthForm from '../Authentication/AuthForm/AuthForm'
import { ResponseType } from '../types'
import { useNavigate } from 'react-router-dom'


const ChannelJoin = ()=>{
    const [channelName,setChannelName] = useState<string>('')
    const [channelDescription,setChannelDescription] = useState<string>('')
    const [channelAvatar,setChannelAvatar] = useState<string>('');

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
    const handleSubmit = 
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
                <FormInput ref={nameRef} labelName='Channel Name:' value={channelName} onChange={(e)=>{setChannelName(e.target.value)}}  type='text' placeholder={`type in channel's name`} name="name"id="channel-name"/>
                <button className='submit-btn' onClick={(e)=>handleSubmit(e)}>Join</button>
            </form>
        </div>
    )
}

export default ChannelJoin