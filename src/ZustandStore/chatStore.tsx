import {create} from 'zustand'
import { ChannelType, UserType } from '../components/types'
import { useCallback } from 'react';
import { useAuthCookies } from '../hooks';
import { APIFetch, throwErr } from '../components/utils';
import useAuthStore from './authStore';

const useChatStore = create<{
    // fetchChannels: (user:UserType)=>Promise<void>
    channels:ChannelType[];
    currentChannel: ChannelType | null
    setCurrentChannel: (channel:ChannelType)=>void
    setChannels: (channels:ChannelType[])=>void;
    search: string;
    setSearchedChannels:(channels:ChannelType[])=>void
    searchedChannels:ChannelType[] | null
    setSearch:(search:string)=>void;
}>((set)=> ({
    channels:[],
    currentChannel:null,
    search:'',
    searchedChannels:null,
    setSearchedChannels: (channels:ChannelType[])=>set({searchedChannels:channels}),
    setSearch: (search)=>set({search}),
    setCurrentChannel: (channel:ChannelType)=>set({currentChannel:channel}),
    setChannels: (channels) =>set({channels}),
     
}))

export default useChatStore

