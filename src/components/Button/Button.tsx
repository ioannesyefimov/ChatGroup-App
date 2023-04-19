import React, { useEffect } from 'react'
type ButtonProps= {
    text?: string
    name: string
    img?: string
    type?: "button" | "submit" | "reset" 
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
}
const Button = ({text,onClick,name,img,type='button'}:ButtonProps) => {
  let btnRef = React.createRef<HTMLButtonElement>()

  
  return (
    <button ref={btnRef}  className={name} type={type} onClick={onClick}>{text?   text : <img src={img} alt={`${name} image`}/>}</button>
  )
}

export default Button