import React, { ChangeEvent, ReactNode, useEffect } from 'react'
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
    children?:ReactNode
}

declare module 'react' {
  interface HTMLAttributes<T> {
      files?: File
  }
}
const FormInput =  React.forwardRef((props: FormProps,ref?: React.Ref<HTMLLabelElement | undefined>) => {
  const {name,labelName,onChange ,value,placeholder, type,photo,children} = props


  return (
    <div className={`inner-wrapper ${props.name}`}>
      {labelName && (
        <label ref={ref} className='label-color' htmlFor={name}>
          {labelName}
        </label>
        )
      }
      <div className='form-wrapper'>
          <input onChange={onChange} value={value} placeholder={placeholder} type={type}   name={name} id={name} aria-label={`${name} `} />
        {photo && (
            <img src={photo} alt="input-icon" />
        ) 
        }
      </div>
        {children ?? null
        }
  </div>
  
  )
})
  
  

export default FormInput