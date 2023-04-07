import React, { ReactNode, useEffect, useState } from 'react'
import { hamburgerIco } from '../../assets'
import './Hamburger.scss'
import { ChildrenType } from '../types'
type PropsType = {
    children?: ReactNode
    id: string
    width: number
}

const Hamburger = ({children,id,width}:PropsType) => {
    const [isToggled, setIsToggled] = useState<boolean>(true)
   
    let hamburgerToggled = (
        <div className='hamburger toggled' >
            <button onClick={()=>setIsToggled(prev=>!prev)} className='hamburger-btn'>
                <img src={hamburgerIco} alt="hamburgerIco" />
            </button>
            <div className="hamburger-children">
            {children}
            </div> 
        </div>  
    )

    let hamburgerNotToggled = (
        <div className='hamburger not-toggled ' >
        <button onClick={()=>setIsToggled(prev=>!prev)} className='hamburger-btn'>
          <img src={hamburgerIco} alt="hamburgerIco" />
         </button>
         </div>
    )
    

    return  width < 500 ? (
        isToggled ? hamburgerToggled : hamburgerNotToggled
    ) : (
         width >= 500 ? ( children ) : null
    )
}

export default Hamburger