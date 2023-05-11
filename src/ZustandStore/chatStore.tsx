import {create} from 'zustand'
import { ChannelType, MessageType } from '../components/types'
const useChatStore = create<{
    // fetchChannels: (user:UserType)=>Promise<void>
    channels:ChannelType[] | null;
    search: string;
    searchedChannels:ChannelType[] | null
    currentChannel: ChannelType | null
    currentChannelMessages: MessageType[] |null
    setCurrentChannel: (channel:ChannelType|null)=>void
    setChannels: (channels:ChannelType[])=>void;
    setSearchedChannels:(channels:ChannelType[] | null)=>void
    setSearch:(search:string)=>void;
    setCurrentChannelMessages: (messages:MessageType[])=>any
    deleteCurrentChannelMessage : (message_id:string)=>void
}>((set,get)=> ({
    channels:null,
    currentChannel:null,
    currentChannelMessages:null,
    search:'',
    searchedChannels:null,
    setSearchedChannels: (searchedChannels:ChannelType[] | null)=>set({searchedChannels}),
    setSearch: (search)=>set({search}),
    setCurrentChannel: (currentChannel:ChannelType | null)=>set({currentChannel}),
    setChannels: (channels) =>set({channels}),
    setCurrentChannelMessages: (messages:MessageType[])=>{
           
        return set((state:any)=>({currentChannel:{...state.currentChannel,messages}}))
    },
    deleteCurrentChannelMessage : (message_id:string)=>{
        console.log(`message_id`,message_id)
        return set((state:any)=>({currentChannel:{...state.currentChannel,messages: state.currentChannel.messages?.filter((msg:MessageType)=>msg._id !== message_id)}}))
    }
     
}))

export default useChatStore

