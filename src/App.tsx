import './App.scss'
import './components/Themes/Themes.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Authentication, ChannelCreate,NotFound,AuthForm, Dashboard, RedirectComponent, MemberInfo, SearchComponent, ChannelSearch} from './components'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Landing from './components/Landing/Landing'
import ChatContainer from './components/DashBoard/ChatContainer'
import CurrentChannel from './components/DashBoard/CurrentChannel/CurrentChannel'
import ChannelManager from './components/ChannelManager/ChannelManager'
import ChannelJoin from './components/ChannelManager/ChannelJoin'
import UserComponent from './components/UserComponent/UserComponent'
import { useAuth, useAuthCookies, useError, useOnlineStatus } from './hooks'
import { useEffect } from 'react'
import { throwErr } from './components/utils'




let router = createBrowserRouter([

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
        path:'user/:search',
        element:<MemberInfo/>
      },
      {
        element: <ChannelSearch/>,
        path: 'channel?/:search'
      },
    ]

  },
  {
    element: <UserComponent />,
    path: '/user/:search?'
  },
  {
    element: <ProtectedRoute />,
    path:'/chat',
    children: [
      {

       element: <ChatContainer  />,
       path: ':channel?',
      },
      {
        element: <ChannelManager/>,
        path: 'manage',
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
    path: '/auth',
    children: [
      {
        element: <RedirectComponent />,
        path: 'redirect?/:params'
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
  
  
])
function App() {
 
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  )
}

export default App
