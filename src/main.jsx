import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegLoginProvider from './context/regLoginContext.jsx'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <RegLoginProvider>
      <App />
      </RegLoginProvider>
    </CookiesProvider>
  </StrictMode>,
)
