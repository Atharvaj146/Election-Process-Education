import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, CheckCircle2, XCircle, ArrowRight, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { quizData } from '../data/quiz-questions'
import confetti from 'canvas-confetti'
import { toPng } from 'html-to-image'
import { useLanguage } from '@/context/LanguageContext'

export default function QuizPage() {
  const [sessionQuestions, setSessionQuestions] = useState<typeof quizData>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const initializeQuiz = () => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random())
    setSessionQuestions(shuffled.slice(0, 5))
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setShowResults(false)
  }

  useEffect(() => {
    initializeQuiz()
  }, [])

  const handleSelect = (value: string) => {
    if (!isAnswered) {
      setSelectedAnswer(parseInt(value))
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    setIsAnswered(true)
    if (selectedAnswer === sessionQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < sessionQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
      setTimeout(() => {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
      }, 300)
    }
  }

  const handleRestart = () => {
    initializeQuiz()
  }

  const handleDownloadBadge = async () => {
    if (!badgeRef.current) return
    try {
      const dataUrl = await toPng(badgeRef.current, { pixelRatio: 3 })
      const link = document.createElement('a')
      link.download = `matdaan-quiz-badge-${language}.png`
      link.href = dataUrl
      link.click()
      toast.success(language === 'en' ? 'Badge downloaded!' : 'बैज डाउनलोड हो गया!')
    } catch {
      toast.error(language === 'en' ? 'Failed to generate badge' : 'बैज जेनरेट करने में विफल')
    }
  }

  const handleShare = async () => {
    const shareText = language === 'en' 
      ? `I just scored ${score}/${sessionQuestions.length} on the MatDaan Guide Voter Readiness Quiz! 🗳️ Test your Indian Election knowledge too! #MatDaanGuide #Elections`
      : `मैंने मतदान गाइड क्विज़ में ${score}/${sessionQuestions.length} स्कोर किया! 🗳️ आप भी अपना चुनाव ज्ञान परखें! #MatDaanGuide #Elections`
    const url = window.location.origin
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'en' ? 'MatDaan Guide Quiz' : 'मतदान गाइड क्विज़',
          text: shareText,
          url: url,
        })
        toast.success(language === 'en' ? "Thanks for sharing!" : "साझा करने के लिए धन्यवाद!")
      } catch (err) { }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${url}`)
        toast.success(language === 'en' ? "Score copied to clipboard!" : "स्कोर क्लिपबोर्ड पर कॉपी हो गया!")
      } catch (err) {
        toast.error(language === 'en' ? "Failed to copy. Try again!" : "कॉपी करने में विफल। पुनः प्रयास करें!")
      }
    }
  }

  if (sessionQuestions.length === 0) return null

  const q = sessionQuestions[currentQuestion]
  const progress = ((currentQuestion) / sessionQuestions.length) * 100

  const questionText = language === 'en' ? q.question : q.question_hi
  const optionsList = language === 'en' ? q.options : q.options_hi
  const explanationText = language === 'en' ? q.explanation : q.explanation_hi

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-20 px-4 max-w-3xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col"
    >
      <div className="text-center mb-10 shrink-0">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4"
        >
          <Trophy className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="font-outfit font-bold text-4xl sm:text-5xl mb-4">
          {language === 'en' ? 'Voter Readiness ' : 'मतदाता तत्परता '}<span className="text-gradient-saffron">{language === 'en' ? 'Quiz' : 'प्रश्नोत्तरी'}</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          {language === 'en' ? 'Test your knowledge and become a Democracy Champion!' : 'अपना ज्ञान परखें और लोकतंत्र के प्रहरी बनें!'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-muted-foreground mb-3">
                <span>{language === 'en' ? `Question ${currentQuestion + 1} of ${sessionQuestions.length}` : `प्रश्न ${currentQuestion + 1} / ${sessionQuestions.length}`}</span>
                <span>{language === 'en' ? 'Score' : 'स्कोर'}: {score}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="bg-card/50 backdrop-blur-md border-border/40 shadow-xl shadow-black/5 flex-1">
              <CardContent className="p-6 sm:p-10 flex flex-col h-full">
                <h2 className="text-2xl font-semibold mb-8 leading-snug tracking-tight">
                  {questionText}
                </h2>

                <RadioGroup 
                  onValueChange={handleSelect} 
                  value={selectedAnswer !== null ? selectedAnswer.toString() : ''}
                  className="space-y-3 mb-10 flex-1"
                >
                  {optionsList.map((option, idx) => {
                    let optionState = "default"
                    if (isAnswered) {
                      if (idx === q.correct) optionState = "correct"
                      else if (idx === selectedAnswer) optionState = "incorrect"
                      else optionState = "disabled"
                    }

                    return (
                      <div key={idx}>
                        <RadioGroupItem 
                          value={idx.toString()} 
                          id={`option-${idx}`} 
                          className="peer sr-only"
                          disabled={isAnswered}
                        />
                        <Label
                          htmlFor={`option-${idx}`}
                          className={`
                            flex items-center p-5 w-full rounded-2xl border text-left cursor-pointer transition-all text-sm font-bold
                            ${optionState === 'default' && selectedAnswer === idx ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : ''}
                            ${optionState === 'default' && selectedAnswer !== idx ? 'border-border/60 hover:bg-muted/30 hover:border-border' : ''}
                            ${optionState === 'correct' ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400' : ''}
                            ${optionState === 'incorrect' ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400 opacity-70' : ''}
                            ${optionState === 'disabled' ? 'border-border/40 opacity-50 cursor-default' : ''}
                          `}
                        >
                          <div className="flex-1">{option}</div>
                          {optionState === 'correct' && <CheckCircle2 className="w-5 h-5 text-green-500 ml-2 shrink-0" />}
                          {optionState === 'incorrect' && <XCircle className="w-5 h-5 text-red-500 ml-2 shrink-0" />}
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-8 p-5 rounded-2xl bg-primary/10 border border-primary/20"
                    >
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-bold uppercase tracking-widest text-[10px] block mb-2 opacity-70">{language === 'en' ? 'Explanation' : 'व्याख्या'}:</span> 
                        {explanationText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-6 border-t border-border/40 flex justify-end mt-auto">
                  {!isAnswered ? (
                    <Button 
                      onClick={handleSubmit} 
                      disabled={selectedAnswer === null}
                      className="w-full sm:w-auto px-10 h-12 rounded-xl font-bold uppercase tracking-widest text-xs"
                    >
                      {language === 'en' ? 'Submit Answer' : 'उत्तर सबमिट करें'}
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNext} 
                      className="w-full sm:w-auto px-10 h-12 rounded-xl font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white"
                    >
                      {currentQuestion < sessionQuestions.length - 1 
                        ? (language === 'en' ? 'Next Question' : 'अगला प्रश्न') 
                        : (language === 'en' ? 'View Results' : 'परिणाम देखें')} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <Card className="w-full bg-card/50 backdrop-blur-md border-border/40 shadow-xl overflow-hidden relative rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-transparent" />
              <CardContent className="p-8 sm:p-12 relative z-10">

                <div className="w-full max-w-sm mx-auto mb-10">
                  <div
                    ref={badgeRef}
                    className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/20"
                    style={{
                      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    }}
                  >
                  <div className="absolute top-0 left-0 right-0 h-2 flex">
                    <div className="flex-1 bg-[#FF9933]" />
                    <div className="flex-1 bg-white" />
                    <div className="flex-1 bg-[#138808]" />
                  </div>
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-orange-500/10 blur-2xl" />
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-green-500/10 blur-2xl" />

                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
                    <p className="text-orange-400 text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
                      {language === 'en' ? 'Voter Readiness' : 'मतदाता तत्परता'}
                    </p>
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-orange-500/30">
                      <span className="text-4xl font-black text-white">{score}/{sessionQuestions.length}</span>
                    </div>
                    <h3 className="text-white font-outfit font-bold text-2xl leading-tight mb-2">
                      {score === sessionQuestions.length 
                        ? (language === 'en' ? '🏆 Democracy Champion' : '🏆 लोकतंत्र के प्रहरी') 
                        : score >= 4 
                        ? (language === 'en' ? '🌟 Election Expert' : '🌟 चुनाव विशेषज्ञ') 
                        : score >= 3 
                        ? (language === 'en' ? '✅ Informed Voter' : '✅ जागरूक मतदाता') 
                        : (language === 'en' ? '📚 Rising Citizen' : '📚 उभरते नागरिक')}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full my-3" />
                    <p className="text-blue-200/60 text-xs max-w-[85%] leading-relaxed font-medium">
                      {score === sessionQuestions.length
                        ? (language === 'en' ? 'You know the Indian election process perfectly!' : 'आप भारतीय चुनाव प्रक्रिया को पूरी तरह जानते हैं!')
                        : (language === 'en' ? 'Keep learning to become a Democracy Champion!' : 'लोकतंत्र के प्रहरी बनने के लिए सीखते रहें!')}
                    </p>
                    <p className="text-blue-300/30 text-[9px] mt-6 font-bold tracking-[0.3em] uppercase">
                      MatDaan Guide • मतदान गाइड
                    </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl font-outfit font-bold mb-4 tracking-tight">
                  {score === sessionQuestions.length 
                    ? (language === 'en' ? "Perfect Score!" : "परफेक्ट स्कोर!") 
                    : score >= 3 
                    ? (language === 'en' ? "Great Job!" : "शानदार!") 
                    : (language === 'en' ? "Good Try!" : "अच्छा प्रयास!")}
                </h2>
                
                <p className="text-muted-foreground mb-10 text-lg">
                  {score === sessionQuestions.length 
                    ? (language === 'en' ? "You are a true Democracy Champion! You know the election process perfectly." : "आप सच्चे लोकतंत्र के प्रहरी हैं! आप चुनाव प्रक्रिया को पूरी तरह जानते हैं।")
                    : (language === 'en' ? "You've learned something new today about the democratic process." : "आज आपने लोकतांत्रिक प्रक्रिया के बारे में कुछ नया सीखा है।")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleRestart} variant="outline" className="px-10 h-12 rounded-xl font-bold uppercase tracking-widest text-xs">
                    {language === 'en' ? 'Try Again' : 'पुनः प्रयास करें'}
                  </Button>
                  <Button onClick={handleDownloadBadge} className="px-10 h-12 rounded-xl font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90">
                    <Download className="w-4 h-4 mr-2" /> {language === 'en' ? 'Download Badge' : 'बैज डाउनलोड करें'}
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="px-10 h-12 rounded-xl font-bold uppercase tracking-widest text-xs">
                    {language === 'en' ? 'Share Score' : 'स्कोर साझा करें'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
