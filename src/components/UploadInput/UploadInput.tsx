import { ChangeEvent, FormEvent, MouseEventHandler, ReactEventHandler, ReactNode, useState } from "react"
import { useAuth, useAuthCookies, useError } from "../../hooks"
import { convertBase64 } from "../utils/index"
import { APIFetch } from "../utils"
import { Errors } from "../utils"
import { ChannelType } from "../types"

type PropsType ={
    channel: Partial<ChannelType>
    labelName?:string
    url:string
}

const UploadInput = ({channel,labelName,url}:PropsType) => {
    const [Response, setResponse] = useState('')
    const [selectedFile, setSelectedFile] = useState<File>()

    const {user} = useAuth()
    const {setError} = useError()
 
    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files){
            setSelectedFile(e.target.files[0])
        }
        console.log(e.target.files)
    }

   const submitPhoto = async (e:FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(!selectedFile) return console.log(`NOT SELECTED FILE`)
    // const file = event.target.files[0]
    const base64 = await convertBase64(selectedFile)

        // 👇 Uploading the file using the fetch API to the server
     const response = await APIFetch({url:`http://localhost:5050/api/upload`,method:'POST', body: {image: base64}}) 


      if(!response.success){
          setError(response?.message)
          return
      }
        console.log(response?.data)
        const response2 = await APIFetch({url:`${url}`,method:'PUT',body:{email:user?.email,channelName: channel?.name} })
       

        if(!response2.success){
            setError(response2?.message)
            return
        }
        console.log(`UPLOADED PICTURE`)
        
      };
      
    

  return (
    <>
   
    <label className='file-input' htmlFor="file-upload ">
        {labelName ?? ''}
        <input accept='image/*'  type="file" onChange={handleFileChange} name="photo" id="file-upload" />
    </label>
    <button onSubmit={(e)=>submitPhoto(e)} type="submit">submit</button>
    </>
    )
}

export default UploadInput