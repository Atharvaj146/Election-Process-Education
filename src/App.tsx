import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const TimelinePage = lazy(() => import('./pages/TimelinePage'))
const ChatPage = lazy(() => import('./pages/ChatPage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const GuidePage = lazy(() => import('./pages/GuidePage'))
const StatsPage = lazy(() => import('./pages/StatsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  )
}

export default App
