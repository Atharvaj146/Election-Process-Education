import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, CheckCircle2, Lightbulb, RotateCcw } from 'lucide-react'
import { timelineStages } from '@/data/timeline-stages'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const { language } = useLanguage()

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.5,
            },
          }
        )
      }

      const cards = gsap.utils.toArray('.timeline-card')
      cards.forEach((card: any, i) => {
        const isEven = i % 2 === 0
        gsap.fromTo(
          card,
          { 
            x: isEven ? 50 : -50, 
            opacity: 0,
            scale: 0.95
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      const icons = gsap.utils.toArray('.timeline-icon')
      icons.forEach((icon: any) => {
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -45 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: icon,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 px-4 max-w-6xl mx-auto"
      ref={containerRef}
    >
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4"
        >
          <Clock className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="font-outfit font-bold text-4xl sm:text-5xl mb-4">
          {language === 'en' ? 'Election ' : 'चुनाव '}<span className="text-gradient-saffron">{language === 'en' ? 'Timeline' : 'समयरेखा'}</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {language === 'en' 
            ? 'Follow the journey of an Indian election — from the initial announcement to the formation of the government. Scroll down to explore each stage.'
            : 'भारतीय चुनाव की यात्रा का अनुसरण करें — प्रारंभिक घोषणा से लेकर सरकार के गठन तक। प्रत्येक चरण का पता लगाने के लिए नीचे स्क्रॉल करें।'}
        </p>
        <p className="text-xs text-primary/70 mt-3 flex items-center justify-center gap-1 uppercase tracking-wider font-bold">
          <Lightbulb className="w-3 h-3" /> {language === 'en' ? 'Click any card to reveal a "Did You Know?" fact!' : 'किसी भी कार्ड पर क्लिक करें और "क्या आप जानते हैं?" तथ्य जानें!'}
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-border/30 transform md:-translate-x-1/2 rounded-full" />
        <div 
          ref={lineRef}
          className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary transform md:-translate-x-1/2 rounded-full origin-top" 
        />

        <div className="space-y-12">
          {timelineStages.map((stage, index) => {
            const isEven = index % 2 === 0
            const isFlipped = flippedCards.has(stage.id)
            const title = language === 'en' ? stage.title : stage.title_hi
            const duration = language === 'en' ? stage.duration : stage.duration_hi
            const description = language === 'en' ? stage.description : stage.description_hi
            const action = language === 'en' ? stage.action : stage.action_hi
            const trivia = language === 'en' ? stage.trivia : stage.trivia_hi

            return (
              <div key={stage.id} className="relative flex items-center md:justify-between flex-col md:flex-row">
                <div className="timeline-icon absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background bg-card z-10 flex items-center justify-center text-xl shadow-lg shadow-black/20">
                  {stage.icon}
                </div>

                <div className={`timeline-card w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:pr-12 md:text-right md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>
                  <div
                    className="relative cursor-pointer"
                    style={{ perspective: '1000px' }}
                    onClick={() => toggleFlip(stage.id)}
                  >
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div style={{ backfaceVisibility: 'hidden' }}>
                        <Card className="bg-card/50 backdrop-blur-sm border-border/40 hover-lift overflow-hidden">
                          <CardContent className="p-6">
                            <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                              <Badge variant="secondary" className={`bg-gradient-to-r ${stage.color} text-white border-0 text-[10px] uppercase`}>
                                {language === 'en' ? 'Stage' : 'चरण'} {stage.id}
                              </Badge>
                              <span className="text-[10px] font-bold text-muted-foreground bg-background/50 px-2 py-1 rounded-md uppercase tracking-tighter">
                                {duration}
                              </span>
                            </div>
                            
                            <h3 className="font-outfit font-bold text-2xl mb-2 text-foreground">
                              {title}
                            </h3>
                            
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                              {description}
                            </p>

                            <div className={`flex items-start gap-2 bg-background/50 p-3 rounded-lg border border-border/20 ${isEven ? 'md:flex-row-reverse text-right' : ''}`}>
                              <CheckCircle2 className={`w-5 h-5 shrink-0 ${isEven ? 'ml-2' : 'mr-2'} text-primary`} />
                              <p className="text-[11px] font-medium text-foreground">
                                <span className="opacity-70 block mb-1 uppercase tracking-widest text-[9px] font-bold">{language === 'en' ? 'Citizen Action:' : 'नागरिक कार्रवाई:'}</span>
                                {action}
                              </p>
                            </div>

                            <p className="text-[9px] text-muted-foreground/40 mt-3 flex items-center gap-1 justify-center uppercase tracking-tighter font-bold">
                              <RotateCcw className="w-2.5 h-2.5" /> {language === 'en' ? 'Tap to reveal trivia' : 'तथ्य जानने के लिए टैप करें'}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div
                        className="absolute inset-0"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <Card className={`h-full bg-gradient-to-br ${stage.color} border-0 shadow-xl overflow-hidden`}>
                          <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center text-white min-h-[200px]">
                            <Lightbulb className="w-8 h-8 mb-3 opacity-90" />
                            <Badge className="bg-white/20 text-white border-0 mb-3 backdrop-blur-sm text-[10px] uppercase">
                              {language === 'en' ? 'Did You Know?' : 'क्या आप जानते हैं?'}
                            </Badge>
                            <p className="text-sm sm:text-base leading-relaxed font-bold">
                              {trivia}
                            </p>
                            <p className="text-[9px] text-white/50 mt-4 flex items-center gap-1 uppercase tracking-tighter font-bold">
                              <RotateCcw className="w-2.5 h-2.5" /> {language === 'en' ? 'Tap to flip back' : 'वापस जाने के लिए टैप करें'}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
