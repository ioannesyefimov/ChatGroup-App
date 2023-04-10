import React, { ChangeEvent } from 'react'
import { ActionFunction } from 'react-router-dom'
import './FormInput.scss'

interface FormProps {
    type:string,
    placeholder?:string,
    labelName?:string,
    name:string,
    id:string,
    photo?: string,
    onChange: (e:ChangeEvent<HTMLInputElement> ) => void 
    value:string
}

declare module 'react' {
  interface HTMLAttributes<T> {
      files?: File
  }
}
const FormInput =  React.forwardRef((props: FormProps,ref?: React.Ref<HTMLInputElement | HTMLLabelElement>) => (
  // const {name,placeholder, type} = props

  // const filesInput 
    // <input onChange={props.onChange} files={props.files} placeholder={props.placeholder} type={props.type}  ref={ref} name={props.name} id={props.name} aria-label={`${props.name} `} />
  

    <div className={`inner-wrapper ${props.name}`}>
      {props.labelName && (
        <label ref={ref} className='label-color' htmlFor={props.name}>
          {props.labelName}
        </label>
        )
      }
      <div className='form-wrapper'>
          <input onChange={props.onChange} value={props.value} placeholder={props.placeholder} type={props.type}   name={props.name} id={props.name} aria-label={`${props.name} `} />
        {props?.photo && (
            <img src={props.photo} alt="input-icon" />
        ) 
        }
      </div>

  </div>
  
))  
  
  

export default FormInput