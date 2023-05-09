import {create} from 'zustand'
import { UserType } from '../components/types'
import { useCookies } from 'react-cookie'
import { NavigateFunction } from 'react-router-dom'
import { initAuthContextState } from '../components/Authentication/Provider/AuthProvider'




const useAuthStore = create<{
    user:UserType;
    setUser: (user:UserType)=>void;
    serverUrl:string
    loading:boolean
    setLoading:(state:boolean)=>void;
}>((set)=> ({
    user: { userName: '', email: '', picture: '', _id: '', loggedThrough: '',channels:[] },
    loading: false,
    setUser: (user:UserType) =>set({user}),
    setLoading: (state:boolean) => set({loading: state}),
    serverUrl:import.meta.env.VITE_IP_ADDRESS ?  'https://192.168.1.102:5050/api' : 'https://localhost:5050/api',
}))

export default useAuthStore