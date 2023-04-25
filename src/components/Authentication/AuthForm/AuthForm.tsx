import React, { ChangeEvent, ReactPropTypes, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import {lockerIco, mailIco, profileIco,authBg}   from '../../../assets/index' 
import './AuthForm.scss'
import { Link, useNavigate } from 'react-router-dom'
import { APIFetch, throwErr, validateInput } from '../../utils'
import { useAuth, useError } from '../../../hooks'
import useAuthCookies from '../../../hooks/useAuthCookies/useAuthCookies'
import AuthSocialButtons from '../../AuthButtons/AuthSocialButtons'
import Canvas from '../../CanvasBg/Canvas'
import { useServerUrl, useSetLoading } from '../../../hooks/useAuthContext/useAuthContext'
type AuthProps = {
  type: string
  redirectType: string
  redirectUrl?:string
}
const initState = {
  email:"",  
  password:"",  
  userName:"",  
}
const AuthForm = ({type,redirectType,redirectUrl}:AuthProps) => {
  const [form,setForm] = useState(initState)
  // const [email,setEmail] = useState<string>('')
  // const [password,setPassword] = useState<string>('')
  // const [userName,setUserName] = useState<string>('')

  const handleFormChange =(e:ChangeEvent<HTMLInputElement>)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const serverUrl = useServerUrl()
  const setLoading = useSetLoading()
  const {setServerResponse} = useError()

  const navigate = useNavigate()
  const EmailRef =React.createRef<HTMLLabelElement>()
  const PasswordRef =React.createRef<HTMLLabelElement>()
  const UserNameRef =React.createRef<HTMLLabelElement>()

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, type:string)=>{
    e.preventDefault();

    try {
      if(!type){
        return console.log(`TYPE IS MISSING`)
      }
      setLoading(true)
      let {email,userName,password} = form
      let params 
      if(type==='register'){
        params = {fields: {email,userName,password},refs:{email:EmailRef,password:PasswordRef,userName:UserNameRef}}
        type = 'auth/register'
      } else if (type==='signin'){
        params = {fields: {email,password},refs:{email:EmailRef,password:PasswordRef}}
        type = 'auth/signin'


      }
      if(!params) return
        let isValidInput = await validateInput({fields: params.fields, refs: params.refs});
        if(!isValidInput.success) return 
        let controller = new AbortController() 
        let  signal = controller.signal;
        
        let response = await APIFetch({url:`${serverUrl}/${type}`, method:'POST', body: {...params?.fields,loggedThrough:`INTERNAL`,signal}});
        console.log(`RESPONSE: `, response)
        if(!response?.success) {
          throwErr(response?.message)
        }
        
        if(!response?.data.accessToken) {
          throwErr({name:`SOMETHING WENT WRONG`, arguments: 'accessToken is undefined'})
        }
        if(redirectUrl){
          return navigate(`/auth/redirect/?type=${redirectType}&accessToken=${response?.data?.accessToken}&redirectUrl=${redirectUrl}`)
        }


        if(response?.data?.accessToken){
          navigate(`/auth/redirect/?type=${redirectType}&loggedThrough=INTERNAL&accessToken=${response?.data?.accessToken}`)
        }
        

    } catch (error:any) {
      setServerResponse(error)
    } finally{
      setLoading(false)
    }
    
  }

 let registerContent = (
  <div className='auth-form-component box-shadow--gray'>
      <h2>Register</h2>
      <div className="input-wrapper">
        <form action="submit">
        <FormInput value={form.userName} onChange={(e)=>handleFormChange(e)}
        labelName='Username'
          name='userName'
          id="usernameInput"
          type="text"
          placeholder='Type in your username...'
          ref={UserNameRef}
          photo={profileIco} 
        />
        <FormInput value={form.email} onChange={(e)=>handleFormChange(e)} labelName='email' name="email" id="emailInput" type="email" placeholder='Type in email...' ref={EmailRef} photo={mailIco} />
        <FormInput value={form.password} onChange={(e)=>handleFormChange(e)} name="password" labelName='Password' id="passwordInput" type="password" placeholder='Type in password...' ref={PasswordRef} photo={lockerIco} />
        <button className='submit-btn' onClick={(e)=>handleSubmit(e,'register')}>Register</button>
        <AuthSocialButtons authType='signin' />

        </form>
      </div>

        <span  className='hint'>Already have an account? <Link to='/auth/signin'>Sing in</Link></span>
      </div>
 )

 let signinContent = (
    <div className='auth-form-component box-shadow--gray'>
      <h2>Login</h2>
      <div className="input-wrapper">
        <form action="submit">
        <FormInput value={form.email} onChange={(e)=>handleFormChange(e)} labelName='email' name="email" id="emailInput" type="email" placeholder='Type in email...' ref={EmailRef} photo={mailIco} />
        <FormInput value={form.password} onChange={(e)=>handleFormChange(e)} name="password" labelName='Password' id="passwordInput" type="password" placeholder='Type in password...' ref={PasswordRef} photo={lockerIco} />
        <button className='submit-btn' onClick={(e)=>handleSubmit(e, 'signin')}>Signin</button>
        <AuthSocialButtons authType='signin' redirectUrl={redirectUrl} />
        </form>
         </div>
      {!redirectUrl && <span className='hint'>Don't have an account yet? <Link to='/auth/register'>Register</Link></span> }
       
    </div>
 )

  return (
    <>
    <Canvas bgUrl={authBg} />
    {type === 'signin' ? signinContent : registerContent}
    </>
  )
}

export default AuthForm