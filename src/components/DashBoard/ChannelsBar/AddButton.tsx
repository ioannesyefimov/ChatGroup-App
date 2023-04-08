import React, { ChangeEvent, useState } from 'react'
import FormInput from '../../Authentication/AuthForm/FormInput'
import PromptMenu from '../../PromptMenu/PromptMenu'
import { useNavigate } from 'react-router-dom'


const AddButton = () => {
    const navigate = useNavigate()
    return (
        <>
            <button onClick={()=>navigate('/channel/create')} className='add-btn'></button>
        </>
  )
}

export default AddButton