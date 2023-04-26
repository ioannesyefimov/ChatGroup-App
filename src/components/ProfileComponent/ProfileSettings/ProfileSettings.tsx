import React, { useReducer, useRef } from 'react'
import { useUser } from '../../../hooks/useAuthContext/useAuthContext'
import User from '../../UserComponent/User'
import FormInput from '../../FormInput/FormInput'
import settingsReducer,{initState,ACTIONS} from './settingsReducer'
import Button from '../../Button/Button'
import { validateInput } from '../../utils'
import UploadInput from '../../UploadInput/UploadInput'
import { useUpload } from '../../../hooks'
import { sendIco,trashIco } from '../../../assets'
import './index.scss' 



const ProfileSettings = () => {
  const  [state,dispatch] = useReducer(settingsReducer,initState);
  const user = useUser()
  const {file,handleUpload}=useUpload()

  const userNameRef= useRef<HTMLLabelElement>()
  const passwordRef= useRef<HTMLLabelElement>()
  const emailRef= useRef<HTMLLabelElement>()
  const bioRef= useRef<HTMLLabelElement>()
  const avatarRef= useRef<HTMLLabelElement>()
  
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    console.log(`submitting`);
    
    e.preventDefault();
    let {bio,email,password,userName}=state
    if(!bio && !email && !password && !userName) return console.error(`inputs are empty`);
    

  }

  const handleAvatar = async(e:React.ChangeEvent)=>{
    let img= await handleUpload(e);
    return dispatch({type:ACTIONS.SET_PHOTO, payload:img as string})
  }

  let content = (
    <div className="profile-settings-component">
        <User user={user} location="profile"/>

        <form action="submit" onSubmit={(e)=>handleSubmit(e)}>
            <FormInput  labelName='username' ref={userNameRef} type='text' name='username' id='username-input' onChange={(e)=>dispatch({type:ACTIONS.SET_USERNAME,payload:e?.target?.value})} value={state.userName}/>

            <FormInput labelName='email'  ref={emailRef} type='text' name='email' id='email-input' onChange={(e)=>dispatch({type:ACTIONS.SET_EMAIL,payload:e?.target?.value})} value={state.email}/>
            
            <UploadInput value={state.photo} ref={avatarRef} labelName='Avatar'
             onChange={handleAvatar} removeImg={()=>handleUpload()} id='avatar' />
            
            <FormInput labelName='bio'  ref={bioRef} type='text' name='bio' id='bio-input' onChange={(e)=>dispatch({type:ACTIONS.SET_PASSWORD,payload:e?.target?.value})} value={state.password}/>
            
            <FormInput labelName='password'  ref={passwordRef} type='text' name='password' id='password-input' onChange={(e)=>dispatch({type:ACTIONS.SET_BIO,payload:e?.target?.value})} value={state.bio}/>
            
            <Button  name='submit-btn' img={sendIco}  type='submit' />
        </form>


    </div>
  )
  
    return content
}

export default ProfileSettings