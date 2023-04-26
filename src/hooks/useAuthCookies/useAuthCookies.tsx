
import React, { useContext } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { ChannelType, UserType } from '../../components/types'
export type CookiesType = {
  user: UserType
  accessToken:string,
  refreshToken:string
  channels:  ChannelType[]
}

export const useCookiesData = ()=>useAuthCookies().cookies
export const useSetCookies = ()=>useAuthCookies().setCookie
export const useRemoveCookies = ()=>useAuthCookies().removeCookie

const useAuthCookies = () => {

  const [cookies,setCookie,removeCookie]= useCookies<'user'|'accessToken'|'refreshToken'|'channels', CookiesType
>(['user' ,'accessToken','refreshToken',"channels"])

  return {cookies,setCookie,removeCookie}
}

export default useAuthCookies