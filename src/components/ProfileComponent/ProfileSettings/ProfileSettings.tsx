import React, { useEffect, useReducer, useRef } from 'react'
import { useServerUrl, useSetLoading, useUser } from '../../../hooks/useAuthContext/useAuthContext'
import User from '../../UserComponent/User'
import FormInput from '../../FormInput/FormInput'
import settingsReducer,{initState,ACTIONS} from './settingsReducer'
import Button from '../../Button/Button'
import { APIFetch, Errors, isObj, isTrue, throwErr, validateInput } from '../../utils'
import UploadInput from '../../UploadInput/UploadInput'
import { useAuth, useResponseContext, useUpload } from '../../../hooks'
import { sendIco,trashIco } from '../../../assets'
import './index.scss' 
import useAuthCookies, { useCookiesData, useSetCookies } from '../../../hooks/useAuthCookies/useAuthCookies'
import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../../Authentication/AuthForm/AuthForm'
import PromptLogin from '../../PromptLogin/PromptLogin'



const ProfileSettings = () => {

  const [state,dispatch] = useReducer(settingsReducer,initState);
  const {setServerResponse} = useResponseContext()
  const {file,handleUpload}=useUpload()
  const {cookies} = useAuthCookies()
  const {user,clearState} = useAuth()
  const navigate =useNavigate()
  const setLoading = useSetLoading()
  const serverUrl = useServerUrl()

  const userNameRef= useRef<HTMLLabelElement>()
  const passwordRef= useRef<HTMLLabelElement>()
  const emailRef= useRef<HTMLLabelElement>()
  const bioRef= useRef<HTMLLabelElement>()
  const avatarRef= useRef<HTMLLabelElement>()
  if(!isTrue(cookies?.accessToken).is) {
    // clearState('/auth/signin?redirect=/profile/settings&type=newAccessToken&redirectType=auth/user',navigate)
    return <PromptLogin redirect='/profile/settings' redirectType='auth/user'/>
  }
  
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); 
    console.log(`submitting`);
    console.log(`state:`, state);
    
    try {
      setLoading(true)
 
      let {bio,email,password,userName,picture}=state
      if(!bio && !email && !password && !userName && !picture)throwErr({name:Errors.MISSING_ARGUMENTS});

      let response = await APIFetch({url:`${serverUrl}/change`,method:'POST',body:
        {
          accessToken:cookies.accessToken,
          updatedParams:state
        }
     })
     console.log(`RESPONSE`, response);
     

     if(response?.succeess) throwErr(response?.err)
     if(response?.data?.accessToken){
      // clearState(,navigate)
      navigate(`/auth/redirect?type=auth/user&accessToken=${response.data.accessToken}&redirectUrl=/profile`)
     }
    } catch (error) {
      setServerResponse(error)
    } finally{
      setLoading(false)
    }

  }

  const handleAvatar = async(e?:React.ChangeEvent<HTMLInputElement>)=>{
    let img= await handleUpload(e);
    return dispatch({type:ACTIONS.SET_PICTURE, payload:img as string})
  }

  let content = (
    <div  className="profile-settings-component" >
          <User user={user} location="profile"/>

        <form action="submit" onSubmit={(e)=>handleSubmit(e)}>
            <FormInput  labelName='username' ref={userNameRef} type='text' name='username' id='username-input' onChange={(e)=>dispatch({type:ACTIONS.SET_USERNAME,payload:e?.target?.value})} value={state.userName}/>

            <FormInput labelName='email'  ref={emailRef} type='text' name='email' id='email-input' onChange={(e)=>dispatch({type:ACTIONS.SET_EMAIL,payload:e?.target?.value})} value={state.email}/>
            
            
            <FormInput labelName='bio'  ref={bioRef} type='text' name='bio' id='bio-input' onChange={(e)=>dispatch({type:ACTIONS.SET_BIO,payload:e?.target?.value})} value={state.bio}/>
            
            <FormInput labelName='password'  ref={passwordRef} type='text' name='password' id='password-input' onChange={(e)=>dispatch({type:ACTIONS.SET_PASSWORD,payload:e?.target?.value})} value={state.password}/>
            
            <UploadInput value={state.picture} ref={avatarRef} labelName='Avatar'
             onChange={handleAvatar} removeImg={()=>handleAvatar()} id='avatar' />
            <Button  name='submit-btn' text='submit'  type='submit' />
        </form>


    </div>
  )
  
    return content
}

export default ProfileSettings