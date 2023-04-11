import React from 'react'
type ButtonProps= {
    text: string
    name: string
    img?: string
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
}
const Button = ({text,onClick,name,img}:ButtonProps) => {
  return (
    <button className={name} onClick={onClick}>{text ?? <img src={img} />}</button>
  )
}

export default Button