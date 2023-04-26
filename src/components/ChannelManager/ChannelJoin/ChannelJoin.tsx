import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import './channelJoin.scss'
import FormInput from '../../FormInput/FormInput'
import { APIFetch, convertBase64, throwErr, validateInput } from '../../utils'
import { useAuth, useAuthCookies, useChat, useError } from '../../../hooks'
import AuthForm from '../../Authentication/AuthForm/AuthForm'
import { ChannelType, ResponseType } from '../../types'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../../DashBoard/ChannelsBar/SearchBar'
import Channels from '../../DashBoard/Channels/Channels'
import Button from '../../Button/Button'
import { joinIco } from '../../../assets'

const ChannelJoin = ()=>{
    const [searchedChannels,setSearchedChannels] = useState<ChannelType[] | null>(null)
    const {cookies} = useAuthCookies()
    const {channels,} = useChat()
   
    return (
        <div className='prompt-menu-component  box-shadow--gray'>
            <form>
                <SearchBar channels={channels} searchType='CHANNELS' setSearchedChannels={setSearchedChannels}/>
                <Channels  type="join" fallbackText={`Nothing  was found...`}  channels={searchedChannels ?? channels}/>
            </form>
        </div>
    )
}

export default ChannelJoin