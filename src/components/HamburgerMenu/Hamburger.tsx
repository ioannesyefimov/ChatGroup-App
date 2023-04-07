import React, { ReactNode, useEffect, useState } from 'react'
import { hamburgerIco } from '../../assets'
import './Hamburger.scss'
import { ChildrenType } from '../types'
type PropsType = {
    children?: ReactNode
}

const Hamburger = ({children}:PropsType) => {
    const [isToggled, setIsToggled] = useState<string>('')
   const toggle = ()=>{
    if(isToggled === 'toggled'){
        setIsToggled('untoggled')
    } else if(isToggled ==='untoggled' || !isToggled){
        setIsToggled('toggled')
    } 
   }
    let content = (
        <div className={`hamburger ${isToggled}`} >
            <button onClick={toggle} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div className={`hamburger-children animate animate--fast  ${isToggled ==='toggled' ? 'appearFromTop':isToggled ==='untoggled'?'disappearToTop' : '' }`}>
            {children}
            </div> 
        </div>  
    ) 
    
    return  content
    }
export default Hamburger