import React, { ChangeEvent } from 'react'
import { ActionFunction } from 'react-router-dom'
import './FormInput.scss'

interface FormProps {
    type:string,
    placeholder:string,
    labelName?:string,
    name:string,
    id:string,
    photo: string,
    fRef?: React.Ref<HTMLInputElement>
    onChange: (e:ChangeEvent<HTMLInputElement> ) => void 
    value:string
}
const FormInput =  React.forwardRef((props: FormProps) => (
  // const {name,placeholder, type} = props

    <div className="inner-wrapper">
      {props.labelName ? (
        <label className='label-color' htmlFor={props.name}>
          {props.labelName}
        </label>

      ) : (
        null
      )}
      <div className='form-wrapper'>
        <input onChange={props.onChange} value={props.value} placeholder={props.placeholder} type={props.type}  ref={props.fRef ? props.fRef : null} name={props.name} id={props.name} aria-label={`${props.name} `} />
        {props?.photo ? (
            <img src={props.photo} alt="input-icon" />
        ) : (
            null
        )}
      </div>

  </div>
  
))  
  
  

export default FormInput