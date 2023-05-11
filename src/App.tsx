import './App.scss'
import './components/Themes/Themes.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {ProtectedRoute,Landing,ChatContainer,UserComponent, Authentication,NotFound,AuthForm, RedirectComponent, MemberInfo, SearchComponent, ChannelSearch, Profile, ProfileSettings, ServerResponseFallback} from './components'
import ErrorBoundary from './components/ErrorProvider/ErrorProvider'



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
