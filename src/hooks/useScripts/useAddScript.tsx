

import React, { useEffect, useState } from 'react'
import { AddScriptType,addScript } from '../../scripts/scripts'

const useAddScript = ({...params}:PropsType) => {
    const [error,setError]=useState(false)
    let appendScript = async({...params}:PropsType)=>{
      try {
          console.log(`ADDING SCRIPT`)
          await addScript(params)
      } catch (err) {
        console.error(err)
        if(error.error == err.error) {
          return console.error('FAILED TO LOAD TWICE')
        }
        setError(err)
      }
    }
    useEffect(
        ()=>{
          appendScript(params)
        },[]
    
      )
        useEffect(
          ()=>{
            if(error){
              let handle = ()=>appendScript(params)              
              let timeout = setTimeout(handle,15000)
              return ()=>clearTimeout(timeout)
            }
          },[error]
        )
}

export default useAddScript