import { useState } from 'react'
import './App.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Authentication, NotFound,AuthForm, Dashboard} from './components'
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
    // path: '/',
    children: [
      {
       element: <Dashboard />,
       path: '/dashboard'

      }
    ]
  },
  {
    element: <Authentication />,
    path: '/auth',
    children: [
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
