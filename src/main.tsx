import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AuthProvider} from './components/index'
import { initAuthContextState } from './components/Authentication/Provider/AuthProvider'
import ErrorBoundary, { ErrorFallBack } from './ErrorBoundary/ErrorBoundary'
import './index.scss'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary   fallback={<ErrorFallBack/>} >
      <CookiesProvider>
        <AuthProvider user={initAuthContextState?.user} loading={initAuthContextState.loading} response={initAuthContextState?.response}  >
          <App />
        </AuthProvider>
      </CookiesProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
