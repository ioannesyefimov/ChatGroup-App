import React from 'react'
import { UserType } from '../../../types'
import User from '../../../UserComponent/User'

export default function Members({members}:{members?:UserType[]}) {
  let content = <>
    {
        members?.length ? (
            members?.map(member=>{
                
                return (<User key={member.member?._id} user={member.member} location=""/>)  
            })
        ) : (
            <span>There is no members...</span>
        )

        }
  </>
    return content
    
}
