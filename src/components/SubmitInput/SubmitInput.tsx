import { type } from "os"
import React, { Dispatch, SetStateAction, useState } from "react"
import { sendIco } from "../../assets"
import Button from "../Button/Button"
import { APIFetch, throwErr } from "../utils"
import { useAuth, useError } from "../../hooks"
import { ChannelType, SubmitInputType } from "../types"
interface PropsType extends SubmitInputType {
  placeholder?: string
  name?: string
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<any> | undefined, 
    value: any, 
    setValue: Dispatch<SetStateAction<any>>, 
    propsValue: any, 
    setPropsValue: Dispatch<SetStateAction<any>>
    ) => Promise<void>
}
const SubmitInput = ({propsValue,setPropsValue,handleClick, name,placeholder}:PropsType) => {
    const [value,setValue] = useState('')


  
    return (
      <div className={`inner-wrapper ${name}`}>
        <div className='form-wrapper'>
            <input onChange={(e)=>{if(e.target){setValue(e?.target?.value)}}} value={value} placeholder={placeholder}  name={name} id={name} aria-label={`${name} `} />
        </div>
        <Button type='button' onClick={(e)=>handleClick(e,value,setValue,propsValue,setPropsValue)} onKeyDown={(e) => {if(e.key==='Enter'){handleClick(e,value,setValue,propsValue,setPropsValue)}}} img={sendIco} name='submit-btn' text={''} />

    </div>
    
    )
  }
    
    
  
  export default SubmitInput