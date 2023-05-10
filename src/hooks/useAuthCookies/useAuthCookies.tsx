
import React, { useContext } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { ChannelType, UserType } from '../../components/types'
import { useAuthStore } from '../../ZustandStore'
import { NavigateFunction } from 'react-router-dom'
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
const clearState =(replace:string, navigate?:NavigateFunction) => {
  const setUser = useAuthStore.getState().setUser
  console.log('CLEARNING STATE')
  setUser({userName:'',email:'',_id:'',channels:[]})
  removeCookie('accessToken', {path:'/'})
  removeCookie('refreshToken', {path:'/'})
  removeCookie('channels', {path:'/'})
  if(!replace){
    console.log(`not replacing`)
  }else if(navigate !== undefined){
    navigate(replace)
  } else if(replace && navigate===undefined)  {
      window.location.replace(replace)
  }
  window.localStorage.clear()
  removeCookie('user', {path:'/'})
}
  return {cookies,setCookie,removeCookie,clearState}
}

export default useAuthCookies