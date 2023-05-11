import {create} from 'zustand'
import { ChannelType, MessageType } from '../components/types'
const useChatStore = create<{
    // fetchChannels: (user:UserType)=>Promise<void>
    channels:ChannelType[] | null;
    searchedChannels:ChannelType[] | null
    currentChannel: ChannelType | null
    setCurrentChannel: (channel:ChannelType|null)=>void
    setChannels: (channels:ChannelType[])=>void;
    setSearchedChannels:(channels:ChannelType[] | null)=>void
    addCurrentChannelMessage: (message:MessageType)=>any
    deleteCurrentChannelMessage : (message_id:string)=>void
}>((set,get)=> ({
    channels:null,
    currentChannel:null,
    searchedChannels:null,
    setSearchedChannels: (searchedChannels:ChannelType[] | null)=>set({searchedChannels}),
    setCurrentChannel: (currentChannel:ChannelType | null)=>set({currentChannel}),
    setChannels: (channels) =>set({channels}),
    addCurrentChannelMessage: (message:MessageType)=>{
        return set((state:any)=>({currentChannel:{...state.currentChannel,messages:[...state.currentChannel.messages, message]}}))
    },
    deleteCurrentChannelMessage : (message_id:string)=>{
        console.log(`message_id`,message_id)
        return set((state:any)=>({currentChannel:{...state.currentChannel,messages: state.currentChannel.messages?.filter((msg:MessageType)=>msg._id !== message_id)}}))
    }
     
}))

export default useChatStore

