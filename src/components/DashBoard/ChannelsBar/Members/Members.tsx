import React from 'react'
import { UserType } from '../../../types'
import User from '../../../UserComponent/User'

export default function Members({members}:{members?:UserType[]}) {
  let content = <>
    {
        members?.length ? (
            members?.filter(member=>member.member !== null).map(user=>{
                return (<User key={user.member?._id} user={user.member} location=""/>)  

            })
        ) : (
            <span>There is no members...</span>
        )

        }
  </>
    return content
    
}
