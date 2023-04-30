import React, { ChangeEvent, useState } from 'react'
import { mailIco, lockerIco } from '../../../assets'
import { useServerUrl, useSetLoading } from '../../../hooks/useAuthContext/useAuthContext'
import AuthSocialButtons from '../../AuthButtons/AuthSocialButtons'
import FormInput from '../../FormInput/FormInput'
import { initState } from '../../ProfileComponent/ProfileSettings/settingsReducer'
import { useResponseContext } from '../../ServerResponseFallback/ResponseContext'
import { validateInput, APIFetch, throwErr } from '../../utils'
import { useNavigate } from 'react-router-dom'
type PropsType = {
    redirectUrl?:string
    redirectType?:string
    type?:string
}
export default function SigninForm({redirectUrl,redirectType,type}:PropsType) {
    const [form,setForm] = useState(initState)


    const handleFormChange =(e:ChangeEvent<HTMLInputElement>)=>{
      setForm({...form,[e.target.name]:e.target.value})
    }

    const setLoading = useSetLoading()
    const serverUrl = useServerUrl()
    
    const {setServerResponse} = useResponseContext()
    const navigate=useNavigate()

    const EmailRef =React.createRef<HTMLLabelElement>()
    const PasswordRef =React.createRef<HTMLLabelElement>()

    const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, type:string)=>{
        e.preventDefault();

        try {
        setLoading(true)
        
        let search = new URLSearchParams(location.search)
        let {email,password} = form
        let params = {fields: {email,password},refs:{email:EmailRef,password:PasswordRef}}
        let isValidInput = await validateInput({fields: params.fields, refs: params.refs});
        if(!isValidInput.success) return 
        let controller = new AbortController() 
        let  signal = controller.signal;
        
        let response = await APIFetch({url:`${serverUrl}/auth/${type}`, method:'POST', body: {...params?.fields,loggedThrough:`INTERNAL`,signal}});
        console.log(`RESPONSE: `, response)
        if(!response?.success) {
        throwErr(response?.err)
        }
        
        if(!response?.data.accessToken) {
        throwErr({name:`SOMETHING WENT WRONG`, arguments: 'accessToken is undefined'})
        }
        if(redirectUrl){
        return navigate(`/auth/redirect/?type=${search.get('redirectType') ?? redirectType}&accessToken=${response?.data?.accessToken}&redirectUrl=${search.get('redirectUrl') ?? redirectUrl}`)
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

  return (
        <div className="input-wrapper">
            <form action="submit">
            <FormInput value={form.email} onChange={(e)=>handleFormChange(e)} labelName='email' name="email" id="emailInput" type="email" placeholder='Type in email...' ref={EmailRef} photo={mailIco} />
            <FormInput value={form.password} onChange={(e)=>handleFormChange(e)} name="password" labelName='Password' id="passwordInput" type="password" placeholder='Type in password...' ref={PasswordRef} photo={lockerIco} />
            <button className='submit-btn' onClick={(e)=>handleSubmit(e, 'signin')}>Signin</button>
            <AuthSocialButtons authType='signin' redirectUrl={redirectUrl} />
            </form>
         </div> 
        )
}
