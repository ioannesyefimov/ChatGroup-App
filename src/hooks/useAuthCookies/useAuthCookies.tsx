
import React from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { ChannelType, UserType } from '../../components/types'


const useAuthCookies = () => {
  type CookiesType = {
    user: UserType
    accessToken:string,
    refreshToken:string
    channels: ChannelType | ChannelType[]
  }
  const [cookies,setCookie,removeCookie]= useCookies<'user'|'accessToken'|'refreshToken'|'channels', CookiesType
>(['user' ,'accessToken','refreshToken',"channels"])

  return {cookies,setCookie,removeCookie}
}

export default useAuthCookies