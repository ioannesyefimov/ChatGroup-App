import React from 'react'
import './FormInput.scss'

interface FormProps {
    type:string,
    placeholder:string,
    name:string,
    id:string,
    photo: string,
    fRef?: React.Ref<HTMLInputElement>
}
const FormInput =  React.forwardRef((props: FormProps) => (
  // const {name,placeholder, type} = props

    <div className="inner-wrapper">
        <label className='label-color' htmlFor={props.name}>
          {props.name}
        </label>
      <div className='form-wrapper'>
        <input placeholder={props.placeholder} type={props.type}  ref={props.fRef ? props.fRef : null} name={props.name} id={props.name} aria-label={`${props.name} `} />
        {props?.photo ? (
            <img src={props.photo} alt="input-icon" />
        ) : (
            null
        )}
      </div>

  </div>
  
))  
  
  

export default FormInput