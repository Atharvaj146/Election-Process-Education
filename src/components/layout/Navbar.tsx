import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Vote, Moon, Sun, Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { useGoogleAuth } from '@/context/GoogleAuthContext'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const location = useLocation()
  const { language, setLanguage, t } = useLanguage()
  const { user, signIn, signOut, isLoading } = useGoogleAuth()

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.timeline'), path: '/timeline' },
    { label: t('nav.guide'), path: '/guide' },
    { label: t('nav.quiz'), path: '/quiz' },
    { label: t('nav.stats'), path: '/stats' },
    { label: t('nav.askAI'), path: '/chat' },
  ]

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(27,100%,60%)] to-[hsl(51,100%,50%)] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-lg leading-tight text-foreground transition-colors">
                MatDaan
              </span>
              <span className="text-[10px] text-muted-foreground leading-none -mt-0.5">
                मतदान गाइड
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              aria-label={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
              className="gap-2 rounded-full border border-border/40 px-3 hover:bg-primary/10 hover:text-primary transition-all"
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs font-bold font-outfit uppercase">{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="rounded-full h-9 w-9"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-border/40 ml-1">
                <Avatar className="h-8 w-8 border border-border/40 shadow-sm">
                  <AvatarImage src={user.picture} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="h-8 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  {t('auth.signOut')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signIn}
                  disabled={isLoading}
                  className="rounded-full border-primary/30 text-primary hover:bg-primary/5 px-4 font-bold text-xs uppercase tracking-wider h-9"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : <Vote className="w-4 h-4 mr-2" />}
                  {t('auth.signIn')}
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileOpen}
              className="md:hidden rounded-full h-9 w-9"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass border-t border-border/40 px-4 py-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
              )}
            >
              {link.label}
            </Link>
          ))}
          
          {!user && (
            <div className="pt-4 border-t border-border/40 mt-4">
              <Button
                onClick={signIn}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs"
              >
                {t('auth.signIn')}
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  )
}
