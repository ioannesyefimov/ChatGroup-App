import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import {AuthForm,FormInput,Button,UploadInput} from '../..'
import { APIFetch, convertBase64, throwErr, validateInput } from '../../utils'
import { useAuth, useAuthCookies, useChat, useResponseContext, useUpload } from '../../../hooks'
import { ResponseType } from '../../types'
import { useNavigate } from 'react-router-dom'
import { backIco, closeIco, trashIco } from '../../../assets'

import './ChannelCreate.scss'

const ChannelCreate = ()=>{
    const [channelName,setChannelName] = useState<string>('')
    const [channelDescription,setChannelDescription] = useState<string>('')
    const [channelAvatar,setChannelAvatar] = useState<string>('')
    const {file,handleUpload}=useUpload()
    const {setServerResponse} = useResponseContext()
    const {serverUrl,setLoading,user} = useAuth()
    const {cookies,setCookie} = useAuthCookies()

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
                let response:ResponseType = await APIFetch({url:`${serverUrl}/channels/create`, body:{userEmail:user.email, accessToken:cookies?.accessToken,channelName,channelAvatar:file,channelDescription},method:'POST'})
                if(!response.success) throwErr(response?.err)
                let updatedUser = JSON.stringify({...user,channels:response?.data.channels})
                setCookie('user',updatedUser,{path:'/',maxAge:2000})
                setCookie('channels',response?.data?.channels,{path:'/',maxAge:2000})
                navigate(`/chat?channel=${response?.data?.channel._id}`)
                console.log(`RESPONSE : `, response)
                console.log(`updatedUser : `, updatedUser)
            } catch (error) {
                console.log(`ERROR:`,error)
                return setServerResponse(error)
            }finally{
                setLoading(false)

            }
        }

        const handleImage = async(e:ChangeEvent<HTMLInputElement>)=>{
            if(e.target.files){
                let img = await handleUpload(e);
                return setChannelAvatar(img as string) 
            }
        }
    
    const handleRemoveImg = useCallback(
        ()=>{
            handleUpload()
        },[]
    )
    return (
        <div className='prompt-menu-component '>
            <Button onClick={()=>navigate(-1)} type='button' name="close">
                <img src={closeIco} alt="close icon" />
            </Button>
            <Button onClick={()=>navigate('/chat/manage')} type='button' name="back">
                <img src={backIco} alt="back icon" />
            </Button>
            <form action="">
                <FormInput textArea={{rows:"2",cols:"40"}} ref={nameRef} labelName='Channel Name:' value={channelName} onChange={(e)=>{setChannelName(e.target.value)}}  type='text' placeholder={`type in channel's name`} name="name"id="channel-name"/>
                
                <FormInput textArea={{rows:"3",cols:"40"}} ref={descriptionRef} labelName='Channel description:' value={channelDescription} onChange={(e)=>{setChannelDescription(e.target.value)}}  type='text' placeholder={`type in channel's description`} name="description"id="channel-description"/>
            
                <UploadInput removeImg={handleRemoveImg} value={channelAvatar} ref={avatarRef} labelName='Channel Avatar:' id="image-input" onChange={handleImage}/>
                <Button text='Create' name='submit-btn' onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default ChannelCreate