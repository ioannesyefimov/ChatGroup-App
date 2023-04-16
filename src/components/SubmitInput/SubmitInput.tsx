import { type } from "os"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { sendIco } from "../../assets"
import Button from "../Button/Button"
import { APIFetch, throwErr } from "../utils"
import { useAuth, useError } from "../../hooks"
import { ChannelType, SubmitInputType } from "../types"
import { HandleClickType } from "../DashBoard/CurrentChannel/CurrentChannel"
interface PropsType extends SubmitInputType {
  placeholder?: string
  name?: string
  handleClick: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<any> |
     MouseEvent  | KeyboardEvent | undefined, 
     value: any,
      setValue: Dispatch<SetStateAction<any>>, 
      propsValue: any, 
      setPropsVal3ue: Dispatch<SetStateAction<any>>) => Promise<void>
}
const SubmitInput = ({propsValue,setPropsValue,handleClick, name,placeholder}:PropsType) => {
    const [value,setValue] = useState('')

    let onKeyDown=(e:KeyboardEvent) => {
      if(e.key==='Enter'){
        console.log(`value:`, value);
        console.log(`propsValue:`, propsValue);
        
        handleClick(e,value,setValue,propsValue,setPropsValue)
      }
      
        }
    useEffect(
      ()=>{
        
       window.addEventListener('keydown',onKeyDown);                                                       
          return ()=> window.removeEventListener('keydown', onKeyDown)
      },[value]
    )
  
    return (
      <div className={`inner-wrapper ${name}`}>
        <div className='form-wrapper'>
            <input onChange={(e)=>setValue(e?.target?.value)} value={value} placeholder={placeholder}  name={name} id={name} aria-label={`${name} `} />
        </div>
        <Button type='button' onClick={(e)=>handleClick(e,value,setValue,propsValue,setPropsValue)} img={sendIco} name='submit-btn' text={''} />

    </div>
    
    )
  }
    
    
  
  export default SubmitInput