import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import './ChannelCreate.scss'
import FormInput from '../FormInput/FormInput'
import UploadInput from '../UploadInput/UploadInput'
import { APIFetch, convertBase64, throwErr, validateInput } from '../utils'
import Button from '../Button/Button'
import { useAuth, useAuthCookies, useError } from '../../hooks'
import AuthForm from '../Authentication/AuthForm/AuthForm'


const ChannelCreate = ()=>{
    const [channelName,setChannelName] = useState<string>('')
    const [channelDescription,setChannelDescription] = useState<string>('')
    const [channelAvatar,setChannelAvatar] = useState<string>('');

    const {setError} = useError()
    const {serverUrl,setLoading} = useAuth()
    const {cookies} = useAuthCookies()

    if(!cookies?.accessToken) return (
        <>
            <h2 style={{marginBottom:'1rem', color:'red'}}>You need to log in again: </h2>
            <AuthForm type='signin' redirectType='newAccessToken' redirectUrl='/channel/create'/>
        </>
    )
    

    const nameRef = useRef<null | HTMLInputElement>(null)
    const descriptionRef = useRef<null | HTMLInputElement>(null)
    const avatarRef = useRef<null | HTMLInputElement>(null)

    const handleSubmit = useCallback(
       async (e:React.MouseEvent)=>{
            e.preventDefault()
            try {
                setLoading(true)
                let isEmpty = await validateInput({fields:{channelName,channelAvatar,channelDescription},refs:{channelName:nameRef,channelAvatar:avatarRef,channelDescription:descriptionRef}})
                if(!isEmpty?.success){
                    throwErr(isEmpty?.errors)
                }
                // let uploadedPicture = await APIFetch({url:`${serverUrl}/upload/picture`, body:{image:channelAvatar,accessToken:cookies?.accessToken}})
                let response = await APIFetch({url:`${serverUrl}/channels/create`, body:{accessToken:cookies?.accessToken,channelName,channelAvatar,channelDescription}})
            } catch (error) {
                console.log(`ERROR:`,error)
                setError(error)
            }finally{
                setLoading(false)

            }
        },[]
    )



    const setter = (e:ChangeEvent<HTMLInputElement>, setState:React.Dispatch<React.SetStateAction<any>>) =>{
        setState(e?.currentTarget.value)
    }

    const handleImageUpload =  useCallback(
        async(e:React.ChangeEvent<HTMLInputElement>)=>{
            let file = e.currentTarget.files![0]
            if(!file) return console.log(`NOT FOUND FILES`)
            let converted = await convertBase64(file)
            if(!converted) return console.error(`ERROR:` , converted)
            if(typeof converted === 'string')setChannelAvatar(converted)
    },[])
    return (
        <div className='prompt-menu-component  box-shadow--gray'>
            <FormInput ref={nameRef} labelName='Channel Name:' value={channelName} onChange={(e)=>setter(e,setChannelName)}  type='text' placeholder={`type in channel's name`} name="name"id="channel-name"/>
               
            <FormInput ref={descriptionRef} labelName='Channel description:' value={channelName} onChange={(e)=>setter(e,setChannelDescription)}  type='text' placeholder={`type in channel's description`} name="description"id="channel-description"/>
           
            {/* <UploadInput  labelName='Channel Avatar:' id="image-input" setter={setSelectedFile} /> */}
            <UploadInput value={channelAvatar} ref={avatarRef} labelName='Channel Avatar:' id="image-input" onChange={handleImageUpload}/>
            <Button text='Create' className='submit-btn' onClick={(e)=>handleSubmit(e)} />
        </div>
    )
}

export default ChannelCreate