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
import { backIco, closeIco, joinIco } from '../../../assets'
import { useUser } from '../../../hooks/useAuthContext/useAuthContext'
import { useChatStore } from '../../../ZustandStore'

const ChannelJoin = ()=>{
    const channels = useChatStore( s=>s.channels)
    const setSearchedChannels = useChatStore( s=>s.setSearchedChannels)
    const searchedChannels = useChatStore( s=>s.searchedChannels)
    let navigate = useNavigate()
    return (
        <div className='prompt-menu-component  box-shadow--gray'>
            <Button onClick={()=>navigate('/chat')} type='button' name="close">
                <img src={closeIco} alt="close icon" />
            </Button>
            <Button onClick={()=>navigate("/chat/manage")} type='button' name="back">
                <img src={backIco} alt="back icon" />
            </Button>
            <form>
                <SearchBar   channels={channels} searchType='CHANNELS' fetchParams={{
                    isFetch:true,
                    url:'channels',
                    swrKey:'/api/channels'
                }} setSearchedChannels={setSearchedChannels}/>
                <Channels  type="join" fallbackText={`Nothing  was found...`}  channels={searchedChannels!}/>
            </form>
        </div>
    )
}

export default ChannelJoin