import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AuthProvider} from './components/index'
import ErrorBoundary, { ErrorFallBack } from './ErrorBoundary/ErrorBoundary'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary   fallback={<ErrorFallBack/>} >
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
