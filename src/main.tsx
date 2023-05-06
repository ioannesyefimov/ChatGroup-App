import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AuthProvider, ServerResponseProvider} from './components/index'
import { initAuthContextState } from './components/Authentication/Provider/AuthProvider'
import ErrorBoundary, { ErrorFallBack } from './components/ErrorProvider/ErrorProvider'
import './index.scss'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary >
        <CookiesProvider>
        <AuthProvider >
          {/* <ServerResponseProvider> */}
            <App />
         {/* </ServerResponseProvider> */}
        </AuthProvider>
        </CookiesProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
