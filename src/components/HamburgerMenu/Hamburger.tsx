import React, { ReactNode, useEffect, useState } from 'react'
import { hamburgerIco } from '../../assets'
import './Hamburger.scss'
import { ChildrenType } from '../types'
type PropsType = {
    children?: ReactNode
    type:string
}

const Hamburger = ({children,type}:PropsType) => {
    const [isToggled, setIsToggled] = useState<string>('')
   const toggle = ()=>{
    if(isToggled === 'toggled'){
        setIsToggled('untoggled')
    } else if(isToggled ==='untoggled' || !isToggled){
        setIsToggled('toggled')
    } 
   }
    let navBar = (
        <div className={`hamburger navbar ${isToggled}`} >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div className={`hamburger-children animate animate--fast animate--forwards  ${isToggled ==='toggled' ? 'appearFromTop':isToggled ==='untoggled'?'disappearToTop' : '' }`}>
            {children}
            </div> 
        </div>  
    ) 
    let channels = (
        <div className={`hamburger channels ${isToggled}`} >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div className={`hamburger-children animate  animate--fast animate--forwards ${isToggled ==='toggled' ? 'appearFromLeft':isToggled ==='untoggled'?'disappearToLeft' : '' }`}>
            {children}
            </div> 
        </div>
    )
    
    return  type === 'navbar' ? (navBar) : (channels)
    }
export default Hamburger