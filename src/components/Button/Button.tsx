import React from 'react'
type ButtonProps= {
    text: string
    name: string
    img?: string
    type?: "button" | "submit" | "reset" 
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
    onKeyDown?: (e:React.KeyboardEvent<any>)=> void
}
const Button = ({text,onClick,name,img,type='button',onKeyDown}:ButtonProps) => {
  return (
    <button onKeyDown={onKeyDown} className={name} type={type} onClick={onClick}>{text ? text : <img src={img} alt={`${name} image`}/>}</button>
  )
}

export default Button