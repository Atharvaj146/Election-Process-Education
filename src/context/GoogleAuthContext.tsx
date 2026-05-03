import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface GoogleUser {
  name: string
  email: string
  picture: string
}

interface GoogleAuthContextType {
  user: GoogleUser | null
  isLoading: boolean
  signIn: () => void
  signOut: () => void
  renderButton: (parent: HTMLElement) => void
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined)

/**
 * Google Authentication Provider using Google Identity Services (GSI).
 * Handles Sign-In with Google via the One Tap and button flows.
 */
export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(() => {
    try {
      const saved = localStorage.getItem('matdaan_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Decodes a JWT token from Google and extracts user profile info.
   */
  const handleCredentialResponse = useCallback((response: any) => {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]))
      const userData: GoogleUser = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      }
      setUser(userData)
      localStorage.setItem('matdaan_user', JSON.stringify(userData))

      // Track sign-in event with Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'login', { method: 'Google' })
      }
    } catch (error) {
      console.error('Failed to decode Google credential:', error)
    }
  }, [])

  useEffect(() => {
    const initializeGSI = () => {
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
        if (clientId) {
          ;(window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            auto_select: false,
          })
          setIsLoading(false)
        } else {
          console.warn('Google Client ID missing. Please add VITE_GOOGLE_CLIENT_ID to your .env')
          setIsLoading(false)
        }
      } else if (isLoading) {
        const timer = setTimeout(initializeGSI, 1000)
        return () => clearTimeout(timer)
      }
    }
    initializeGSI()
  }, [handleCredentialResponse, isLoading])

  const signIn = useCallback(() => {
    if ((window as any).google?.accounts?.id && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      ;(window as any).google.accounts.id.prompt()
    } else {
      alert('Google Sign-In is not configured. Please add VITE_GOOGLE_CLIENT_ID to your .env file.')
    }
  }, [])

  const renderButton = useCallback((parent: HTMLElement) => {
    if ((window as any).google?.accounts?.id && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      ;(window as any).google.accounts.id.renderButton(parent, {
        theme: 'outline',
        size: 'medium',
        shape: 'pill',
        text: 'signin_with',
      })
    }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    localStorage.removeItem('matdaan_user')
    if ((window as any).google?.accounts?.id) {
      ;(window as any).google.accounts.id.disableAutoSelect()
    }
    // Track sign-out event
    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'logout')
    }
  }, [])

  return (
    <GoogleAuthContext.Provider value={{ user, isLoading, signIn, signOut, renderButton }}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext)
  if (!context) throw new Error('useGoogleAuth must be used within a GoogleAuthProvider')
  return context
}
