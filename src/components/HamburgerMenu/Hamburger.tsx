import React, { ReactNode, useEffect, useState } from 'react'
import { hamburgerIco } from '../../assets'
import './Hamburger.scss'
import { ChildrenType } from '../types'
type PropsType = {
    children?: ReactNode
    type:string
}

declare module 'react' {
    interface HTMLAttributes<T> {
        isToggled?: string|boolean
    }
}

const Hamburger = ({children,type}:PropsType) => {
    const [isToggled, setIsToggled] = useState<boolean|undefined>(undefined)

    let toggle = ()=>{
        if(isToggled === undefined){
            setIsToggled(true)
        } else {
            setIsToggled(prev=>!prev)
        }
    }
    let content = (
        <div className={`hamburger navbar `} data-istoggled={isToggled ?? 'untoggled'}  >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div data-istoggled={isToggled ?? 'untoggled'} className={`hamburger-children  ${isToggled !== undefined ? " animate animate--fast animate--forwards" : 'hidden'}  ${isToggled ? 'appearFromTop' : 'disappearToTop'}`}>
            {children}
            </div> 
        </div>  
    ) 

    let navBar = (
        <div className={`hamburger navbar `} data-istoggled={isToggled ?? 'untoggled'}  >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div data-istoggled={isToggled ?? 'untoggled'} className={`hamburger-children  ${isToggled !== undefined ? " animate animate--fast animate--forwards" : 'hidden'}  ${isToggled ? 'appearFromTop' : 'disappearToTop'}`}>
            {children}
            </div> 
        </div>  
    ) 
    let channels = (
        <div className={`hamburger channels`} data-istoggled={isToggled ?? 'untoggled'} >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div className={`hamburger-children ${isToggled !== undefined ? 'animate  animate--fast animate--forwards' : 'hidden'} ${isToggled  ? 'appearFromLeft' : 'disappearToLeft'}`}>
                {children}
            </div> 
        </div>
    )
    
    return  type === 'navbar' ? (navBar) : type ==='channels'? (channels) : content
    }
export default Hamburger