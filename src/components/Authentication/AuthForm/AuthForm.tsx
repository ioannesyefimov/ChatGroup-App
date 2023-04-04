import React, { ReactPropTypes, useState } from 'react'
import FormInput from './FormInput'
import {lockerIco, mailIco, profileIco}   from '../../../assets/index' 
import './AuthForm.scss'
import { Link } from 'react-router-dom'
type AuthProps = {
  type: string
}

const AuthForm = ({type}:AuthProps) => {
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [userName,setUserName] = useState<string>('')

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>, setValue:React.Dispatch<React.SetStateAction<string>>) =>{
    if(e.target.value){
      setValue(e.target.value)
    }
  }

  const handleSubmit = (type)=>{

  }

 const EmailRef =React.createRef<HTMLInputElement>()
 const PasswordRef =React.createRef<HTMLInputElement>()
 const UserNameRef =React.createRef<HTMLInputElement>()

 let registerContent = (
  <div className='auth-form-component box-shadow--gray'>
      <>
      <h2>Register</h2>
        <FormInput value={userName} onChange={(e)=>handleOnChange(e,setUserName)}
        labelName='Username'
          name='username'
          id="usernameInput"
          type="text"
          placeholder='Type in your username...'
          fRef={UserNameRef}
          photo={profileIco} 
        />
      </>
      <FormInput value={email} onChange={(e)=>handleOnChange(e,setEmail)} labelName='email' name="Email" id="emailInput" type="email" placeholder='Type in email...' fRef={EmailRef} photo={mailIco} />
      <FormInput value={password} onChange={(e)=>handleOnChange(e,setPassword)} name="password" labelName='Password' id="passwordInput" type="password" placeholder='Type in password...' fRef={PasswordRef} photo={lockerIco} />
      <span  className='hint'>Already have an account? <Link to='/auth/signin'>Sing in</Link></span>
      <button onClick={(e)=>handleSubmit(e)}>Register</button>
      </div>
 )

 let signinContent = (
    <div className='auth-form-component box-shadow--gray'>
      <h2>Login</h2>
      <FormInput value={email} onChange={(e)=>handleOnChange(e,setEmail)} labelName='email' name="Email" id="emailInput" type="email" placeholder='Type in email...' fRef={EmailRef} photo={mailIco} />
      <FormInput value={password} onChange={(e)=>handleOnChange(e,setPassword)} name="password" labelName='Password' id="passwordInput" type="password" placeholder='Type in password...' fRef={PasswordRef} photo={lockerIco} />
       <span className='hint'>Don't have an account yet? <Link to='/auth/register'>Register</Link></span>
       <button onClick={(e)=>handleSubmit(e)}>Signin</button>
    </div>
 )

  return type === 'signin' ? signinContent : registerContent
}

export default AuthForm