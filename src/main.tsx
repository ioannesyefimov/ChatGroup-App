import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AuthProvider, SocketProvider} from './components/index'
import { initAuthContextState } from './components/Authentication/Provider/AuthProvider'
import ErrorBoundary, { ErrorFallBack, ResponseFallback } from './components/ErrorProvider/ErrorProvider'
import './index.scss'
import { CookiesProvider } from 'react-cookie'
import OnlineStatusProvider from './components/CheckConnectionContext/Provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <OnlineStatusProvider>
    <ErrorBoundary   Fallback={()=>ErrorFallBack()}  >
        <CookiesProvider>
          <ResponseFallback >
            <AuthProvider >
              <App />
            </AuthProvider>
          </ResponseFallback>
        </CookiesProvider>
    </ErrorBoundary>
    </OnlineStatusProvider>
  </React.StrictMode>,
)
