import React, { MouseEventHandler } from 'react'
type PropsType = {
    onClick: (event:React.MouseEvent<HTMLButtonElement>)=>void
    text:string
    className:string
}
const Button = ({onClick,text,className}:PropsType) => {
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}

export default Button