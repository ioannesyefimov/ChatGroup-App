import React from 'react'
import { searchIco } from '../../assets'
import Channels from '../DashBoard/Channels/Channels'
import FormInput from '../FormInput/FormInput'
import { useSearch } from '../../hooks'
import { useChatStore } from '../../ZustandStore'

const ChannelSearch = () => {
    const channels = useChatStore(S=>S.channels)
    const {search,handleSearchChange} = useSearch()
  return (
    <div className='channel-search-component'>
         <FormInput name='search' id="searchInput" placeholder='Search' photo={searchIco} type='text' onChange={handleSearchChange} value={search} />
        <Channels fallbackText={`Not found`} type='search' channels={ channels! ?? [] } />
    </div>
  )
}

export default ChannelSearch