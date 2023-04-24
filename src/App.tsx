import './App.scss'
import './components/Themes/Themes.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {ProtectedRoute,Landing,ChatContainer,ChannelManager,ChannelJoin,UserComponent, ServerResponseFallback, Authentication, ChannelCreate,NotFound,AuthForm, RedirectComponent, MemberInfo, SearchComponent, ChannelSearch} from './components'



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
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  )
}

export default App
