import {create} from 'zustand'
import { UserType } from '../components/types'

const useAuthStore = create<{
    user:UserType;
    setUser: (user:UserType)=>void;
    serverUrl:string
    Loading:boolean
    setLoading:(state:boolean)=>void;

}>((set)=> ({
    user: { userName: '', email: '', picture: '', _id: '', loggedThrough: '',channels:[] },
    Loading: false,
    setUser: (user) =>set({user}),
    setLoading: (state) => set({Loading: state}),
    serverUrl:import.meta.env.VITE_IP_ADDRESS ?  'https://192.168.1.102:5050/api' : 'https://localhost:5050/api'
}))

export default useAuthStore