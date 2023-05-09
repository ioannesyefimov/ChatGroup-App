import {create} from 'zustand'
import { ChannelType, MessageType, UserType } from '../components/types'
import { useCallback } from 'react';
import { useAuthCookies } from '../hooks';
import { APIFetch, throwErr } from '../components/utils';
import useAuthStore from './authStore';

const useChatStore = create<{
    // fetchChannels: (user:UserType)=>Promise<void>
    channels:ChannelType[] | null;
    search: string;
    searchedChannels:ChannelType[] | null
    currentChannel: ChannelType | null
    currentChannelMessages: MessageType[] |null
    setCurrentChannel: (channel:ChannelType|null)=>void
    setChannels: (channels:ChannelType[])=>void;
    setSearchedChannels:(channels:ChannelType[])=>void
    setSearch:(search:string)=>void;
    setCurrentChannelMessages: (messages:MessageType[])=>any
    deleteCurrentChannelMessage : (message_id:string)=>void
}>((set,get)=> ({
    channels:null,
    currentChannel:null,
    currentChannelMessages:null,
    search:'',
    searchedChannels:null,
    setSearchedChannels: (searchedChannels:ChannelType[])=>set({searchedChannels}),
    setSearch: (search)=>set({search}),
    setCurrentChannel: (currentChannel:ChannelType | null)=>set({currentChannel}),
    setChannels: (channels) =>set({channels}),
    setCurrentChannelMessages: (messages:MessageType[])=>{
        console.log(`messages`,messages);
           
        return set((state:any)=>({currentChannelMessages:messages}))
    },
    deleteCurrentChannelMessage : (message_id:string)=>{
        console.log(`message_id`,message_id)
        return set(state=>({currentChannelMessages: state.currentChannelMessages?.filter(msg=>msg._id !== message_id)}))
    }
     
}))

export default useChatStore

