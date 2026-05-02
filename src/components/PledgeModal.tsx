import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2, Award, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import confetti from 'canvas-confetti'
import { toPng } from 'html-to-image'
import { toast } from 'sonner'

interface PledgeModalProps {
  open: boolean
  onClose: () => void
}

export default function PledgeModal({ open, onClose }: PledgeModalProps) {
  const [name, setName] = useState('')
  const [pledged, setPledged] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handlePledge = () => {
    if (!name.trim()) return
    setPledged(true)

    // Massive tri-color confetti burst 🇮🇳
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      // Saffron burst from the left
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF9933', '#FFC107', '#FF6F00'],
      })
      // Green burst from the right
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#138808', '#4CAF50', '#2E7D32'],
      })
      // Center white & blue burst
      confetti({
        particleCount: 2,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#FFFFFF', '#000080', '#1565C0'],
      })

      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const handleDownload = async () => {
    if (!cardRef.current) return
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 3 })
      const link = document.createElement('a')
      link.download = `matdaan-pledge-${name.trim().replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = dataUrl
      link.click()
      toast.success('Certificate downloaded!')
    } catch {
      toast.error('Could not download. Try again!')
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'I Pledge to Vote! 🇮🇳',
      text: `I, ${name}, have taken the Voter Pledge on MatDaan Guide! Every vote shapes India's future. Take your pledge too!`,
      url: window.location.origin,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
        toast.success('Copied to clipboard!')
      }
    } catch {
      // User cancelled share
    }
  }

  const handleClose = () => {
    setPledged(false)
    setName('')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-lg bg-card border border-border/40 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center hover:bg-destructive/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!pledged ? (
              /* --- INPUT VIEW --- */
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center mx-auto mb-5">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-outfit font-bold text-2xl mb-2">Take the Voter Pledge</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Commit to exercising your right to vote. Get a personalized digital certificate you can share!
                </p>
                <form
                  onSubmit={(e) => { e.preventDefault(); handlePledge(); }}
                  className="space-y-4"
                >
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name..."
                    className="text-center text-base py-6 rounded-xl border-border/50 focus-visible:ring-primary/50"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full bg-gradient-to-r from-[hsl(27,100%,60%)] to-[hsl(145,81%,35%)] text-white font-semibold py-6 text-base rounded-xl hover:shadow-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> I Pledge to Vote!
                  </Button>
                </form>
              </div>
            ) : (
              /* --- CERTIFICATE VIEW --- */
              <div className="p-6 space-y-5">
                {/* The actual downloadable card */}
                <div
                  ref={cardRef}
                  className="relative w-full aspect-[4/2.5] rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                  }}
                >
                  {/* Decorative tri-color border top */}
                  <div className="absolute top-0 left-0 right-0 h-2 flex">
                    <div className="flex-1 bg-[#FF9933]" />
                    <div className="flex-1 bg-white" />
                    <div className="flex-1 bg-[#138808]" />
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-500/10" />
                  <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-green-500/10" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="text-3xl mb-2">🇮🇳</div>
                    <p className="text-orange-400 text-[10px] uppercase tracking-[0.3em] font-semibold mb-1">
                      Certificate of Commitment
                    </p>
                    <h3 className="text-white font-outfit font-bold text-xl sm:text-2xl leading-tight mb-1">
                      I Pledge to Vote
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mb-3" />
                    <p className="text-blue-200/70 text-xs mb-1">This certifies that</p>
                    <p className="text-white font-outfit font-bold text-lg sm:text-xl italic">
                      {name}
                    </p>
                    <p className="text-blue-200/60 text-[10px] mt-2 max-w-[80%] leading-relaxed">
                      has pledged to exercise the fundamental right to vote and participate actively in India's democratic process.
                    </p>
                    <p className="text-blue-300/40 text-[9px] mt-3 font-semibold tracking-wider">
                      MatDaan Guide • मतदान गाइड
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-[hsl(27,100%,60%)] to-[hsl(51,100%,50%)] text-white font-semibold rounded-xl py-5"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 border-border/40 rounded-xl py-5"
                  >
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
