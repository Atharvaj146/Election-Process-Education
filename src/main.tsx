import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { GoogleAuthProvider } from './context/GoogleAuthContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleAuthProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </GoogleAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
