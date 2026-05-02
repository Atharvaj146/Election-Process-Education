import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 px-4 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
        className="text-8xl sm:text-9xl font-outfit font-extrabold text-gradient-saffron mb-4"
      >
        404
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="font-outfit font-bold text-2xl sm:text-3xl mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          Looks like this constituency doesn't exist! Let's get you back to the democratic process.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-[hsl(27,100%,60%)] to-[hsl(51,100%,50%)] text-white font-semibold px-8 rounded-xl">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-border/40 px-8 rounded-xl" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
        </div>
      </motion.div>

      {/* Fun decorative element */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-sm text-muted-foreground/50"
      >
        🗳️ Every vote counts — but this URL doesn't!
      </motion.p>
    </motion.div>
  )
}
