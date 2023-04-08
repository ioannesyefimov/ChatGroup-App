import React, { useState } from 'react'
import FormInput from '../../Authentication/AuthForm/FormInput'
import { searchIco } from '../../../assets'
import Channels from '../Channels/Channels'
import useSearchChannels from '../../../hooks/useSearchChannels'
import './ChannelsBar.scss'
import Hamburger from '../../HamburgerMenu/Hamburger'
import { useWindowSize } from '../../../hooks'
import AddButton from './AddButton'

const ChannelsBar = () => {
  const {search,hanldeSearchChange, filteredChannels} = useSearchChannels()
  const windowSize = useWindowSize()

  let content = (
     <Hamburger  type='channels'>
      <div className={`left-wrapper  `}  >
          <div className="left-wrapper-inner"  id="leftWrapperInner">
            <div className="flex flex--between">
            <span>Channels</span>
            <AddButton />
            </div>
            <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={hanldeSearchChange} value={search} />
            <Channels channels={filteredChannels} />
          </div>
      </div>
     </Hamburger>
  )
  
  return content
}

export default ChannelsBar