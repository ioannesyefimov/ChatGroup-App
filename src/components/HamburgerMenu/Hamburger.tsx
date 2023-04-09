import React, { ReactNode, useEffect, useState } from 'react'
import { hamburgerIco } from '../../assets'
import './Hamburger.scss'
import { ChildrenType } from '../types'
type PropsType = {
    children?: ReactNode
    type:string
    animation? : string | string[]
}

declare module 'react' {
    interface HTMLAttributes<T> {
        istoggled?: string|boolean
    }
}

const Hamburger = ({children,type}:PropsType) => {
    const [isToggled, setIsToggled] = useState<string|boolean>('hidden')

    let toggle = ()=>{
        if(isToggled === 'hidden' || isToggled==='untoggled'){
            setIsToggled('toggled')
        } else if(isToggled==='toggled') {
            setIsToggled('untoggled')
        }
    }
    let content = (
        <div className={`hamburger navbar `} data-istoggled={isToggled}  >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div data-istoggled={isToggled ?? 'untoggled'} className={`hamburger-children   animate animate--fast animate--forwards }`}>
            {children}
            </div> 
        </div>  
    ) 

    let navBar = (
        <div className={`hamburger navbar `} data-istoggled={isToggled}  >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div data-istoggled={isToggled} className={`hamburger-children  animate animate--fast animate--forwards    `}>
            {children}
            </div> 
        </div>  
    ) 
    let channels = (
        <div className={`hamburger channels`} data-istoggled={isToggled} >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div data-istoggled={isToggled}  className={`hamburger-children  animate animate--fast animate--forwards"    `}>
                {children}
            </div> 
        </div>
    )
    
    return  type === 'navbar' ? (navBar) : type ==='channels'? (channels) : content
    }
export default Hamburger