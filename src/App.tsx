import { useEffect, useState } from 'react'
import './App.scss'
import './components/Themes/Themes.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Authentication, NotFound,AuthForm, Dashboard, RedirectComponent} from './components'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Landing from './components/Landing/Landing'
import { AddScriptType,addScript } from './scripts/scripts'
import { useAddScript } from './hooks'

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

      }
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
