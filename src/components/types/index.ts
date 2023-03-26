export interface Message {
    profileLogo?: string
    userName: string
    date: string 
    message: string

}

export interface Channel {
    name:string
    messages: Message[] | Message
    id:string | number
}

export interface ProviderProps{
    children: React.ReactNode
}

export interface  ContextChat{
    channels?: Channel[] | Channel,

}
export interface ContextAuth {
    user: User,
    loading:boolean,
    cookies: string[]

}


export interface User {
    name:string
    email:string
    photo?:string
    id:string
}