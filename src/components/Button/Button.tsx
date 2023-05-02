import React, { useEffect } from 'react'
type ButtonProps= {
    text?: string
    name: string
    img?: string
    isToggled?:boolean
    type?: "button" | "submit" | "reset" 
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void
}
const Button = ({text,onClick,name,img,isToggled,type='button'}:ButtonProps) => {
  let btnRef = React.createRef<HTMLButtonElement>()

  
  return (
    <button ref={btnRef}  className={name} type={type} onClick={onClick}>
      {text?   text : null }
      {img ? <img data-istoggled={isToggled} src={img} alt={`${name} image`}/> : null}
      </button>
  )
}

export default Button