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
import ErrorBoundary from './components/ErrorProvider/ErrorProvider'
import { ResponseContext } from './components/ServerResponseFallback/ResponseContext'



let router = createBrowserRouter([
  {
    element:<ServerResponseProvider/>,
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
        path: '/user/:userId'
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
           path: '/chat/:channel_id?/:manager?',
          },
          {
           // element: <ChannelManager/>,
           // path: '/chat/manage',
           // children: [
              //{
             //   path:'create',
           //     element: <ChannelCreate/>
              // },
              // {
                // path:'join/:search?',
                // element: <ChannelJoin/>
              // }
            // ]
       
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
            path:'register/:search?'
          },
          {
            element: <AuthForm redirectType='auth/user' type="signin" />,
            path:'signin/:search?'
    
          }
        ],
      },

    ]
  },
  {
    ErrorBoundary: <ErrorBoundary/> as any
  }  
 
])
function App() {
  
  
  return (
    <div className="App">
      <RouterProvider  router={router} />
    </div>
  )
}

export default App
