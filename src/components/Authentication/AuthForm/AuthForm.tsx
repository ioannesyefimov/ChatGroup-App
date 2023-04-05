import React, { ReactPropTypes, useState } from 'react'
import FormInput from './FormInput'
import {lockerIco, mailIco, profileIco}   from '../../../assets/index' 
import './AuthForm.scss'
import { Link, useNavigate } from 'react-router-dom'
import { APIFetch, throwErr, validateInput } from '../../utils'
import { useAuth } from '../../../hooks'
import useAuthCookies from '../../../hooks/useAuthCookies/useAuthCookies'
import AuthSocialButtons from '../../AuthButtons/AuthSocialButtons'
type AuthProps = {
  type: string
}

const AuthForm = ({type}:AuthProps) => {
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [userName,setUserName] = useState<string>('')

  const {setResponse,setLoading} = useAuth()
  const {setCookie} = useAuthCookies()

  const navigate = useNavigate()

  let URL = `http://localhost:5050/api/auth`

  const EmailRef =React.createRef<HTMLInputElement>()
  const PasswordRef =React.createRef<HTMLInputElement>()
  const UserNameRef =React.createRef<HTMLInputElement>()
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>, setValue:React.Dispatch<React.SetStateAction<string>>,type:string) =>{
      setValue(e.target.value)
      console.log(`value: ` , e.target.value)
      console.log(`type: ` , type)
  }

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, type:string)=>{
    e.preventDefault()

    try {
      setLoading(true)
      if(type){
        let isValidInput = await validateInput({fields: {email,password,userName}, refs: {email:EmailRef,password:PasswordRef,userName:UserNameRef}});
        if(!isValidInput.success) return 
        let controller = new AbortController() 
        let  signal = controller.signal;
        
        let response = await APIFetch({url:`${URL}/${type}`, method:'POST', body: {email,password,userName,loggedThrough:`INTERNAL`,signal}});
        console.log(`RESPONSE: `, response)
        if(!response?.success) {
          throwErr(response?.message)
        }
  
        if(response?.data?.accessToken){
          navigate(`/auth/redirect/?type=signin&loggedThrough=INTERNAL&accessToken=${response?.data?.accessToken}`)
        }
        
      }

    } catch (error:any) {
      setResponse(error)
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
      <AuthSocialButtons authType='signin' />
       <span className='hint'>Don't have an account yet? <Link to='/auth/register'>Register</Link></span>
    </div>
 )

  return type === 'signin' ? signinContent : registerContent
}

export default AuthForm