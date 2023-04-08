import React, { ChangeEvent, useState } from 'react'
import './ChannelCreate.scss'
import FormInput from '../Authentication/AuthForm/FormInput'
import UploadInput from '../UploadInput/UploadInput'
const ChannelCreate = ()=>{
    const [channelName,setChannelName] = useState<string>('')
    const [channelDescription,setChannelDescription] = useState<string>('')
    const [selectedFile,setSelectedFile] = useState<File>()

    const setter = (e:ChangeEvent<HTMLInputElement>, setState:React.Dispatch<React.SetStateAction<any>>) =>{
        setState(e?.currentTarget.value)
    }

    return (
        <div className='prompt-menu-component'>
            <FormInput onChange={(e)=>setter(e,setChannelName)} value={channelName} type='text' placeholder={`type in channel's name`} name="name"id="channel-name"/>
            <FormInput onChange={(e)=>setter(e,setSelectedFile)} value={channelName} type='file' placeholder={`select channels image`} name="image"id="channel-image"/>
            <FormInput onChange={(e)=>setter(e,setChannelDescription)} value={channelName} type='text' placeholder={`type in channel's description`} name="description"id="channel-description"/>
        </div>
    )
}

export default ChannelCreate