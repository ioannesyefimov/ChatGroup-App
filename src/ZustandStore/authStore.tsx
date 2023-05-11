import {create} from 'zustand'
import { UserType } from '../components/types'

const useAuthStore = create<{
    user:UserType;
    serverResponse:any;
    setServerResponse:(serverResponse:any)=>void;
    setUser: (user:UserType)=>any;
    serverUrl:string
    loading:boolean
    setLoading:(state:boolean)=>void;
}>((set)=> ({
    user: { userName: '', email: '', picture: '', _id: '', loggedThrough: '',channels:[] },
    loading: false,
    serverResponse:null,
    setServerResponse:(serverResponse:any)=>set({serverResponse}),
    setUser: (user:UserType) =>set({user}),
    setLoading: (state:boolean) => set({loading: state}),
    serverUrl:import.meta.env.VITE_IP_ADDRESS ?  'https://192.168.1.102:5050/api' : 'https://localhost:5050/api',
}))

export default useAuthStore