import React, { ReactPropTypes, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import {lockerIco, mailIco, profileIco}   from '../../../assets/index' 
import './AuthForm.scss'
import { Link, useNavigate } from 'react-router-dom'
import { APIFetch, throwErr, validateInput } from '../../utils'
import { useAuth, useError } from '../../../hooks'
import useAuthCookies from '../../../hooks/useAuthCookies/useAuthCookies'
import AuthSocialButtons from '../../AuthButtons/AuthSocialButtons'
type AuthProps = {
  type: string
  redirectType: string
  redirectUrl?:string
}

const AuthForm = ({type,redirectType,redirectUrl}:AuthProps) => {
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [userName,setUserName] = useState<string>('')

  const {setResponse,setLoading} = useAuth()
  const {setCookie} = useAuthCookies()
  const {setError} = useError()

  const navigate = useNavigate()

  let URL = `http://localhost:5050/api/auth`

  const EmailRef =React.createRef<HTMLInputElement>()
  const PasswordRef =React.createRef<HTMLInputElement>()
  const UserNameRef =React.createRef<HTMLInputElement>()
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>, setValue:React.Dispatch<React.SetStateAction<string>>,type:string) =>{
      setValue(e.target.value)
    }

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, type:string)=>{
    e.preventDefault()

    try {
      if(!type){
        return console.log(`TYPE IS MISSING`)
      }
      setLoading(true)
      let params 
      if(type==='register'){
        params = {fields: {email,userName,password},refs:{email:EmailRef,password:PasswordRef,userName:UserNameRef}}
      } else if (type==='signin'){
        params = {fields: {email,password},refs:{email:EmailRef,password:PasswordRef}}

      }
      if(!params) return
        let isValidInput = await validateInput({fields: params.fields, refs: params.refs});
        if(!isValidInput.success) return 
        let controller = new AbortController() 
        let  signal = controller.signal;
        
        let response = await APIFetch({url:`${URL}/${type}`, method:'POST', body: {...params?.fields,loggedThrough:`INTERNAL`,signal}});
        console.log(`RESPONSE: `, response)
        if(!response?.success) {
          throwErr(response?.message)
        }
        
        if(!response?.data?.accessToken) throwErr({name:`SOMETHING WENT WRONG`, arguments: 'accessToken is undefined'})
        if(redirectUrl){
          return navigate(`/auth/redirect/?type=${redirectType}&accessToken=${response?.data?.accessToken}&redirectUrl=${redirectUrl}`)
        }


        if(response?.data?.accessToken){
          navigate(`/auth/redirect/?type=${redirectType}&loggedThrough=INTERNAL&accessToken=${response?.data?.accessToken}`)
        }
        

    } catch (error:any) {
      setError(error)
    } finally{
      setLoading(false)
    }
    
  }

  

 let registerContent = (
  <div className='auth-form-component box-shadow--gray'>
      <h2>Register</h2>
      <div className="input-wrapper">
        <FormInput value={userName} onChange={(e)=>handleOnChange(e,setUserName,'userName')}
        labelName='Username'
          name='username'
          id="usernameInput"
          type="text"
          placeholder='Type in your username...'
          ref={UserNameRef}
          photo={profileIco} 
        />
        <FormInput value={email} onChange={(e)=>handleOnChange(e,setEmail,'email')} labelName='email' name="Email" id="emailInput" type="email" placeholder='Type in email...' ref={EmailRef} photo={mailIco} />
        <FormInput value={password} onChange={(e)=>handleOnChange(e,setPassword,'password')} name="password" labelName='Password' id="passwordInput" type="password" placeholder='Type in password...' ref={PasswordRef} photo={lockerIco} />
      </div>
        <button className='submit-btn' onClick={(e)=>handleSubmit(e,'register')}>Register</button>
        <AuthSocialButtons authType='signin' />

        <span  className='hint'>Already have an account? <Link to='/auth/signin'>Sing in</Link></span>
      </div>
 )

 let signinContent = (
    <div className='auth-form-component box-shadow--gray'>
      <h2>Login</h2>
      <div className="input-wrapper">
        <FormInput value={email} onChange={(e)=>handleOnChange(e,setEmail,'email')} labelName='email' name="Email" id="emailInput" type="email" placeholder='Type in email...' ref={EmailRef} photo={mailIco} />
        <FormInput value={password} onChange={(e)=>handleOnChange(e,setPassword,'password')} name="password" labelName='Password' id="passwordInput" type="password" placeholder='Type in password...' ref={PasswordRef} photo={lockerIco} />
      </div>
       <button className='submit-btn' onClick={(e)=>handleSubmit(e, 'signin')}>Signin</button>
      <AuthSocialButtons authType='signin' redirectUrl={redirectUrl} />
      {!redirectUrl && <span className='hint'>Don't have an account yet? <Link to='/auth/register'>Register</Link></span> }
       
    </div>
 )

  return type === 'signin' ? signinContent : registerContent
}

export default AuthForm