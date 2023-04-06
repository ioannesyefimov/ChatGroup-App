
import React from 'react'
import { useCookies } from 'react-cookie'
import { UserType } from '../../components/types'


const useAuthCookies = () => {
  const [cookies,setCookie,removeCookie]= useCookies(['user' ,'accessToken','refreshToken'])

  return {cookies,setCookie,removeCookie}
}

export default useAuthCookies