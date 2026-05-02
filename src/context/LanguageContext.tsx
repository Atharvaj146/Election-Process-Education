import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.timeline': 'Timeline',
    'nav.guide': 'Guide',
    'nav.quiz': 'Quiz',
    'nav.stats': 'Stats',
    'nav.askAI': 'Ask AI',
    'hero.title': 'Every Vote Shapes the Future',
    'hero.subtitle': 'Empowering Indian citizens with grounded, verified information for the world\'s largest democratic exercise.',
    'hero.cta.start': 'Start Your Journey',
    'hero.cta.chat': 'Talk to MatDaan AI',
    'chat.title': 'MatDaan Assistant',
    'chat.placeholder': 'Ask a question about the election process...',
    'chat.poweredBy': 'Powered by Gemini 2.5 Flash',
  },
  hi: {
    'nav.home': 'मुख्य',
    'nav.timeline': 'समयरेखा',
    'nav.guide': 'मार्गदर्शिका',
    'nav.quiz': 'प्रश्नोत्तरी',
    'nav.stats': 'आंकड़े',
    'nav.askAI': 'AI से पूछें',
    'hero.title': 'हर वोट भविष्य संवारता है',
    'hero.subtitle': 'दुनिया के सबसे बड़े लोकतांत्रिक अभ्यास के लिए भारतीय नागरिकों को सटीक और सत्यापित जानकारी के साथ सशक्त बनाना।',
    'hero.cta.start': 'अपनी यात्रा शुरू करें',
    'hero.cta.chat': 'AI से बात करें',
    'chat.title': 'मतदान सहायक',
    'chat.placeholder': 'चुनाव प्रक्रिया के बारे में प्रश्न पूछें...',
    'chat.poweredBy': 'Gemini 2.5 Flash द्वारा संचालित',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
