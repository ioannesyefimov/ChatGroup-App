import { ReactElement } from "react"

export type MessageType =  {
    profileImg?: string
    userName: string
    date: string 
    message: string

}

export type ResponseType  = {
    message?: Object | null
    success: boolean | null
    data?: any
}

export type Member = UserType

export type ChannelType = {
    channelName:string
    messages: MessageType[] 
    members: Member[]| Member
    _id?:string | number
    channelAvatar:string 
    channelDescription?: string
}

export type ProviderProps = {
    children: React.ReactNode
}



export type ChildrenType = {
    children?: ReactElement 
}

export type LogType  = {
    userName: string | undefined 
    accessToken: string
    email: string
    password?: string
}

export type UserType = {
    userName:string
    email:string
    picture?:string
    id:string
    loggedThrough?: string
    channels:ChannelType[]
    bio?: string
}
export type ChangesType =  {
    picture: unknown
    userName?:string
    email?:string
    photo?:string
    id?:string
    loggedThrough?: string
    bio?: string
}
export type LoginType  = {
    userName:string 
    email:string
    id?:string
    loggedThrough?: string
    password?: string
}

export type HandleFetchProps = {
    data?: FormData,
    user: UserType | any,
    accessToken: string
    deletedThrough: string
  
  }