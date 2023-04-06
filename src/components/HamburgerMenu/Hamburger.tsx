import React, { useState } from 'react'
import { hamburgerIco } from '../../assets'
import './Hamburger.scss'
const Hamburger = () => {
   
    return (
    <div className='hamburger' >
        <button onClick={()=>{
            let div = document.getElementById('sideBar') as HTMLDivElement 
            let checked = div.ariaChecked
            if(checked==='true'){
                div.ariaChecked = "false"
            } else {
                div.ariaChecked = "true"
            }
        }}  className='hamburger-btn'><img src={hamburgerIco} alt="hamburgerIco" /></button>
    </div>  )
}

export default Hamburger