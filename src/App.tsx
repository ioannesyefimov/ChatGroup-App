import './App.scss'
import './components/Themes/Themes.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {ProtectedRoute,Landing,ChatContainer,ChannelManager,ChannelJoin,UserComponent, ServerResponseFallback, Authentication, ChannelCreate,NotFound,AuthForm, RedirectComponent, MemberInfo, SearchComponent, ChannelSearch, Profile, ProfileSettings, ServerResponseProvider} from './components'
import { useAuthCookies } from './hooks'
import { useLoading, useSetLoading, useSetUser, useUser } from './hooks/useAuthContext/useAuthContext'
import { useEffect } from 'react'
import { log } from 'console'
import { LoadingFallback } from './components/LoadingFallback/LoadingFallback'
import NavigationBar from './components/NavigationBar/NavigationBar'



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
                path:'join/:search?',
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
      console.log(`IS LOGGED`, isLogged);
      
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
