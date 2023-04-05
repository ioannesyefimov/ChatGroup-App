

import React, { useEffect } from 'react'
import { AddScriptType,addScript } from '../../scripts/scripts'

const useAddScript = ({...params}:PropsType) => {
    
    useEffect(
        ()=>{
          let appendScript = async({...params}:PropsType)=>{
            try {
                console.log(`ADDING SCRIPT`)
               return await addScript(params)
            } catch (error) {
              console.log(error)
            }
          }
    
          appendScript(params)
        },[]
    
      )
  
}

export default useAddScript