import React, { useCallback, useRef, useState } from 'react'
import {AuthForm,FormInput,Button,UploadInput} from '../'
import { APIFetch, convertBase64, throwErr, validateInput } from '../utils'
import { useAuth, useAuthCookies, useChat, useError, useUpload } from '../../hooks'
import { ResponseType } from '../types'
import { useNavigate } from 'react-router-dom'
import { trashIco } from '../../assets'

import './ChannelCreate.scss'

const ChannelCreate = ()=>{
    const [channelName,setChannelName] = useState<string>('')
    const [channelDescription,setChannelDescription] = useState<string>('')



    const {file,handleUpload}=useUpload()
    const {setError} = useError()
    const {serverUrl,setLoading} = useAuth()
    const {cookies} = useAuthCookies()
    const {setChannels} = useChat()


    const nameRef = useRef<null | HTMLLabelElement >(null)
    const descriptionRef = useRef<null | HTMLLabelElement >(null)
    const avatarRef = useRef<null | HTMLLabelElement >(null)
        const navigate = useNavigate()
    const handleSubmit = 
       async (e:React.MouseEvent)=>{
            e.preventDefault()
            try {
                setLoading(true)
                let fields = {channelName,channelDescription}
                console.log(`FIELDS: `, fields)
                let isEmpty = await validateInput({fields,refs:{channelName:nameRef,channelDescription:descriptionRef}})
                if(!isEmpty?.success){
                    throwErr(isEmpty?.errors)
                }
                // let uploadedPicture = await APIFetch({url:`${serverUrl}/upload/picture`, body:{image:channelAvatar,accessToken:cookies?.accessToken}})
                let response:ResponseType = await APIFetch({url:`${serverUrl}/channels/create`, body:{accessToken:cookies?.accessToken,channelName,channelAvatar:file,channelDescription},method:'POST'})
                if(!response.success) throwErr(response?.message)
                setChannels(prev=>({...prev, ...response?.data }))
                navigate(`/chat?channel=${channelName}`)
                console.log(`RESPONSE : `, response)
            } catch (error) {
                console.log(`ERROR:`,error)
                setError(error)
            }finally{
                setLoading(false)

            }
        }

    
    const handleRemoveImg = useCallback(
        ()=>{
            handleUpload()
        },[]
    )
    return (
        <div className='prompt-menu-component  box-shadow--gray'>
            <form action="">
                <FormInput ref={nameRef} labelName='Channel Name:' value={channelName} onChange={(e)=>{setChannelName(e.target.value)}}  type='text' placeholder={`type in channel's name`} name="name"id="channel-name"/>
                
                <FormInput ref={descriptionRef} labelName='Channel description:' value={channelDescription} onChange={(e)=>{setChannelDescription(e.target.value)}}  type='text' placeholder={`type in channel's description`} name="description"id="channel-description"/>
            
                <UploadInput removeImg={handleRemoveImg} value={file} ref={avatarRef} labelName='Channel Avatar:' id="image-input" onChange={(e)=>handleUpload(e)}/>
                <Button text='Create' name='submit-btn' onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default ChannelCreate