import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSearchChannels from '../../../hooks/useSearchChannels'
import { Channel } from '../../types'

const CurrentChannel:React.FC = ({...props}) => {
  const location = useLocation()
  const [currentChannel,setCurrentChannel] =useState<Channel>()
  const {filteredChannels} = useSearchChannels()
  useEffect(()=>{
    console.log(location.hash)
    let filterCurrent = filteredChannels.filter(channel => channel?.name?.toLocaleLowerCase().includes(location?.pathname))
    if(filterCurrent){
      setCurrentChannel(filterCurrent[0])
    }
    console.log(filterCurrent)
  },[location.pathname])
  return (
    <div className="main-wrapper">
      <h2>{currentChannel?.name}</h2>
      </div>
    )
}

export default CurrentChannel