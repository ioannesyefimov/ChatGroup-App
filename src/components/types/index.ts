export interface Message {
    profileLogo?: string
    userName: string
    date: string 
    message: string

}

export interface MessageType {
    message: Object | null
    success: boolean | null
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
    user: UserType,
    loading:boolean,
    cookies: string[]
    Message: MessageType

}

export interface LogType {
    userName: string | undefined 
    accessToken: string
    email: string
    password?: string
}

export interface UserType {
    userName:string
    email:string
    photo?:string
    id:string
    loggedThrough?: string
    bio?: string
}
export interface ChangesType {
    picture: unknown
    userName?:string
    email?:string
    photo?:string
    id?:string
    loggedThrough?: string
    bio?: string
}
export interface LoginType {
    userName:string 
    email:string
    id?:string
    loggedThrough?: string
    password?: string
}

export interface HandleFetchProps{
    data?: FormData,
    user: UserType | any,
    accessToken: string
    deletedThrough: string
  
  }