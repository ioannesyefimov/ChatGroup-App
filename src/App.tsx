import './App.scss'
import './components/Themes/Themes.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Authentication, ChannelCreate,NotFound,AuthForm, Dashboard, RedirectComponent} from './components'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Landing from './components/Landing/Landing'
import ChatContainer from './components/DashBoard/ChatContainer'
import CurrentChannel from './components/DashBoard/CurrentChannel/CurrentChannel'

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
    element: <ProtectedRoute />,
    // path: '/chat/?:channel',
    children: [
      {
       element: <ChatContainer />,
       path: '/dashboard?/:channel',
       children: [
         {
          element: <ChannelCreate/>,
          path: 'channel/create',
     
         },
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
  }
])
function App() {



  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  )
}

export default App
