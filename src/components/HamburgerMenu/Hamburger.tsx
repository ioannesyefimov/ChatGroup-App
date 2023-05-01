import React, { ReactNode, useEffect, useState } from 'react'
import { closeIco, hamburgerIco } from '../../assets'
import './Hamburger.scss'
import { ChildrenType } from '../types'
import { useWindowSize } from '../../hooks'
import { useLocation } from 'react-router-dom'
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
    const [isToggled, setIsToggled] = useState<'loaded'|'toggled'|'untoggled'|''>('loaded')
    const {width} = useWindowSize()
    let isShowed = width < 500 ? 'animate animate--fast animate--forwards' : ''

    let location = useLocation()

    let img = isToggled === 'untoggled' || isToggled==='loaded' ? hamburgerIco : closeIco
  
    let toggle = ()=>{
        if(isToggled === 'loaded'){
            setIsToggled('toggled')
        } else if(isToggled==='toggled') {
            setIsToggled('untoggled')
        } else if (isToggled==='untoggled'){
            setIsToggled('toggled')
        } 
    }
    useEffect(
        ()=>{
            if(location.pathname === '/chat' && isToggled!=='toggled'){
                setIsToggled('toggled')
            }else {
                setIsToggled('untoggled')

            }
        },[location.pathname]
    )
    let content = (
        <div className={`hamburger navbar `} data-istoggled={isToggled}  >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div data-istoggled={isToggled ?? 'untoggled'} className={`hamburger-children   ${isShowed}`}>
            {children}
            </div> 
        </div>  
    ) 

    let navBar = (
        <div className={`hamburger navbar `}  >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div data-istoggled={isToggled==='loaded' ? 'loaded-bar' : isToggled} className={`hamburger-children  ${isShowed}`}>
            {children}
            </div> 
        </div>  
    ) 
    let channels = (
        <div className='hamburger-outer'data-istoggled={isToggled}>
            <button onClick={toggle} className='hamburger-btn'>
            <img src={img} alt="hamburgerIco" />
                </button>
            <div className={`hamburger channels`} data-istoggled={isToggled} >
                
            <div   className={`hamburger-children  ${isShowed}`}>
                {children}
            </div> 
        </div>
        </div>
        
    )
    
    return  type === 'navbar' ? (navBar) : type ==='channels'? (channels) : content
    }
export default Hamburger