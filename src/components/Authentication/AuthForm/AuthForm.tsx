import React, { ReactPropTypes } from 'react'
import FormInput from './FormInput'
import {lockerIco, mailIco, profileIco}   from '../../../assets/index' 
import './AuthForm.scss'
import { Link } from 'react-router-dom'
type AuthProps = {
  type: string
}

const AuthForm = ({type}:AuthProps) => {

 const EmailRef =React.createRef<HTMLInputElement>()
 const PasswordRef =React.createRef<HTMLInputElement>()
 const UserNameRef =React.createRef<HTMLInputElement>()

  return (
    <div className='auth-form-component box-shadow--gray'>
      {type === 'register' ? (
        <>
        <h2>Register</h2>
        <FormInput
          name='username'
          id="usernameInput"
          type="text"
          placeholder='Type in your username...'
          fRef={UserNameRef}
          photo={profileIco} 
        />
        </>
      ) : (
        <h2>Login</h2>
      )}

      <FormInput name="email" id="emailInput" type="email" placeholder='Type in email...' fRef={EmailRef} photo={mailIco} />
      <FormInput name="password" id="passwordInput" type="password" placeholder='Type in password...' fRef={PasswordRef} photo={lockerIco} />
        {type === 'register' ? (
          <span  className='hint'>Already have an account? <Link to='/auth/signin'>Sing in</Link></span>
        ) : (
          <span className='hint'>Don't have an account yet? <Link to='/auth/register'>Register</Link></span>
        )}
    </div>
  )
}

export default AuthForm