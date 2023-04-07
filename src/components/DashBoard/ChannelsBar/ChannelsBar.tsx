import React, { useState } from 'react'
import FormInput from '../../Authentication/AuthForm/FormInput'
import { searchIco } from '../../../assets'
import Channels from '../Channels/Channels'
import useSearchChannels from '../../../hooks/useSearchChannels'
import './ChannelsBar.scss'
import Hamburger from '../../HamburgerMenu/Hamburger'
import { useWindowSize } from '../../../hooks'

const ChannelsBar = () => {
  const {search,hanldeSearchChange, filteredChannels} = useSearchChannels()
  const [isToggled,setIsToggled] = useState(false)
  const windowSize = useWindowSize()

  let content = (
    <div className="left-wrapper" id="sideBar" aria-checked={false}>
      <button onClick={()=>{setIsToggled(prev=>!prev)}} className='menu-btn'></button>
      {isToggled && (
        <div className="left-wrapper-inner" id="leftWrapperInner">
          <div className="flex flex--between">
          <span>Channels</span>
          <button className='add-btn'></button>
          </div>
          <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={hanldeSearchChange} value={search} />
          <Channels channels={filteredChannels} />
        </div>

      )}
    </div>
  )
  
  return content
    
}

export default ChannelsBar