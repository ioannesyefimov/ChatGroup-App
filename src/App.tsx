import './App.scss'
import './components/Themes/Themes.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {ProtectedRoute,Landing,ChatContainer,ChannelManager,ChannelJoin,UserComponent, ServerResponseFallback, Authentication, ChannelCreate,NotFound,AuthForm, RedirectComponent, MemberInfo, SearchComponent, ChannelSearch, Profile, ProfileSettings} from './components'
import { useAuthCookies } from './hooks'
import { useSetLoading, useSetUser, useUser } from './hooks/useAuthContext/useAuthContext'
import { useEffect } from 'react'
import { log } from 'console'



let router = createBrowserRouter([
  {
    element:<ServerResponseFallback/>,
    children:[
      {
        element: <NotFound />,
        path: '*'
      },
      {
        element: <Landing />,
        path: '/'
      },
      {
        element:<SearchComponent/>,
        path: '/search',
        children:[
          {
            path:'user/:search?',
            element:<MemberInfo/>
          },
          {
            element: <ChannelSearch/>,
            path: 'channel/:search?'
          },
        ]
    
      },
      {
        element: <UserComponent />,
        path: '/user/:search?'
      },
      {
        element: <ProtectedRoute />,
        path:'',
        children: [
          {
            element:<Profile/>,
            path:'/profile'
          },
          {
            element: <ProfileSettings/>,
            path:'/profile/settings'
          },
          {
    
           element: <ChatContainer  />,
           path: '/chat/:channel?',
          },
          {
            element: <ChannelManager/>,
            path: '/chat/manage',
            children: [
              {
                path:'create',
                element: <ChannelCreate/>
              },
              {
                path:'join',
                element: <ChannelJoin/>
              }
            ]
       
           },
        ]
      },
      {
        element: <Authentication />,
        path: '/auth/',
        children: [
          {
            element: <RedirectComponent />,
            path: 'redirect/:params?'
          },
          {
            element: <AuthForm redirectType='auth/user' type="register" />,
            path:'register'
          },
          {
            element: <AuthForm redirectType='auth/user' type="signin" />,
            path:'signin'
    
          }
        ],
      },

    ]
  },
  
  
])
function App() {
  const {cookies} = useAuthCookies()
  const setUser = useSetUser()
  const setLoading = useSetLoading()
  useEffect(
    ()=>{
      console.log(`APP RENDER`);
      
      let isLogged = cookies?.user
      if(isLogged){
        setUser(isLogged)
      }
      setLoading(false)
    },[cookies?.user]
  )
  
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  )
}

export default App
