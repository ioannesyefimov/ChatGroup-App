import React from 'react'
import { searchIco } from '../../assets'
import Channels from '../DashBoard/Channels/Channels'
import FormInput from '../FormInput/FormInput'
import { useChat, useSearch } from '../../hooks'

const ChannelSearch = () => {
    const {channels} = useChat()
    const {search,handleSearchChange} = useSearch()
  return (
    <div className='channel-search-component'>
         <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={handleSearchChange} value={search} />
        <Channels fallbackText={`Not found`} type='search' channels={ channels  } />
    </div>
  )
}

export default ChannelSearch