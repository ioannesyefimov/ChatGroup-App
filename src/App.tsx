import './App.scss'
import './components/Themes/Themes.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Authentication, ChannelCreate,NotFound,AuthForm, Dashboard, RedirectComponent} from './components'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Landing from './components/Landing/Landing'

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
       element: <Dashboard />,
       path: '/chat?/:channel',
  
      },
      {
       element: <ChannelCreate/>,
       path: '/channel/create',
  
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
        element: <AuthForm type="register" />,
        path:'register'
      },
      {
        element: <AuthForm type="signin" />,
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
