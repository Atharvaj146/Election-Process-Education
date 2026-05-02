import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  Clock,
  MessageSquare,
  BookOpen,
  Trophy,
  BarChart3,
  ArrowRight,
  Sparkles,
  Megaphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PledgeModal from '@/components/PledgeModal'
import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const [pledgeOpen, setPledgeOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const { language, t } = useLanguage()

  const features = [
    {
      icon: Clock,
      title: language === 'en' ? 'Election Timeline' : 'चुनाव समयरेखा',
      description: language === 'en' ? 'Interactive visual journey through every stage of the Indian election process.' : 'भारतीय चुनाव प्रक्रिया के हर चरण की इंटरैक्टिव दृश्य यात्रा।',
      path: '/timeline',
      color: 'from-orange-500 to-amber-500',
      badge: language === 'en' ? 'Interactive' : 'इंटरैक्टिव',
    },
    {
      icon: BookOpen,
      title: language === 'en' ? 'Voter Guide' : 'मतदाता मार्गदर्शिका',
      description: language === 'en' ? 'Step-by-step guidance for registration, ID requirements, and Election Day.' : 'पंजीकरण, आईडी आवश्यकताओं और मतदान दिवस के लिए चरण-दर-चरण मार्गदर्शन।',
      path: '/guide',
      color: 'from-green-500 to-emerald-500',
      badge: language === 'en' ? 'Essential' : 'आवश्यक',
    },
    {
      icon: MessageSquare,
      title: language === 'en' ? 'AI Assistant' : 'AI सहायक',
      description: language === 'en' ? 'Ask anything about Indian elections. Get instant, verified answers from AI.' : 'भारतीय चुनावों के बारे में कुछ भी पूछें। AI से त्वरित, सत्यापित उत्तर प्राप्त करें।',
      path: '/chat',
      color: 'from-purple-500 to-violet-500',
      badge: language === 'en' ? 'AI Powered' : 'AI द्वारा संचालित',
    },
    {
      icon: Trophy,
      title: language === 'en' ? 'Readiness Quiz' : 'तत्परता प्रश्नोत्तरी',
      description: language === 'en' ? 'Test your election knowledge. Earn badges and become a Democracy Champion!' : 'अपने चुनाव ज्ञान का परीक्षण करें। बैज अर्जित करें और लोकतंत्र चैंपियन बनें!',
      path: '/quiz',
      color: 'from-yellow-500 to-orange-500',
      badge: language === 'en' ? 'Gamified' : 'गेमिफाइड',
    },
    {
      icon: BarChart3,
      title: language === 'en' ? 'Democracy Stats' : 'लोकतंत्र के आंकड़े',
      description: language === 'en' ? 'Explore voter turnout trends, demographics, and participation data.' : 'मतदाता मतदान रुझान, जनसांख्यिकी और भागीदारी डेटा का अन्वेषण करें।',
      path: '/stats',
      color: 'from-blue-500 to-cyan-500',
      badge: language === 'en' ? 'Visual' : 'दृश्य',
    },
  ]

  const stats = [
    { value: '968M+', label: language === 'en' ? 'Eligible Voters' : 'पात्र मतदाता' },
    { value: '10.5L+', label: language === 'en' ? 'Polling Stations' : 'मतदान केंद्र' },
    { value: '543', label: language === 'en' ? 'Lok Sabha Seats' : 'लोकसभा सीटें' },
    { value: '28+8', label: language === 'en' ? 'States & UTs' : 'राज्य और केंद्र शासित प्रदेश' },
  ]

  const tickerMessages = [
    language === 'en' ? 'Latest: National Voter Service Portal (NVSP) now has faster registration.' : 'नवीनतम: राष्ट्रीय मतदाता सेवा पोर्टल (NVSP) पर अब पंजीकरण तेज़ हो गया है।',
    language === 'en' ? 'Update: New ECI guidelines for Model Code of Conduct (MCC) issued.' : 'अपडेट: चुनाव आचार संहिता (MCC) के लिए नए ECI दिशानिर्देश जारी।',
    language === 'en' ? 'Tip: Check your name in the electoral roll before voting day.' : 'टिप: मतदान के दिन से पहले मतदाता सूची में अपना नाम जांचें।',
  ]

  const [tickerIndex, setTickerIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerMessages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [tickerMessages.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.8,
        ease: 'power2.out',
      })

      gsap.from('.feature-card', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        delay: 1.2,
        ease: 'power2.out',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={heroRef}
    >
      {/* ====== LIVE NEWS TICKER ====== */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-primary/10 backdrop-blur-md border-b border-primary/20 py-1.5 px-4 overflow-hidden h-9 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center">
          <Badge className="mr-4 bg-primary text-primary-foreground gap-1.5 px-2 py-0 h-6 shrink-0">
            <Megaphone className="w-3 h-3" /> {language === 'en' ? 'LIVE' : 'लाइव'}
          </Badge>
          <div className="flex-1 overflow-hidden relative h-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={tickerIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] sm:text-xs font-medium text-foreground absolute inset-0 flex items-center whitespace-nowrap"
              >
                {tickerMessages[tickerIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ====== HERO — Full screen, minimal, premium ====== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/[0.03] rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-8 text-primary border-primary/20 backdrop-blur-sm text-xs tracking-wide">
              <Sparkles className="w-3 h-3 mr-1.5" /> {language === 'en' ? 'AI-Powered Election Education' : 'AI-संचालित चुनाव शिक्षा'}
            </Badge>
          </motion.div>

          <h1
            ref={titleRef}
            className="font-outfit font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.95] mb-8 tracking-tight"
          >
            {language === 'en' ? (
              <>
                <span className="text-foreground">Democracy</span>
                <br />
                <span className="text-gradient-saffron">Starts With You</span>
              </>
            ) : (
              <>
                <span className="text-foreground">लोकतंत्र</span>
                <br />
                <span className="text-gradient-saffron">आपसे शुरू होता है</span>
              </>
            )}
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/timeline">
              <Button size="lg" className="bg-gradient-to-r from-[hsl(27,100%,60%)] to-[hsl(51,100%,50%)] text-white font-semibold px-8 py-6 text-base rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all">
                {t('hero.cta.start')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" variant="outline" className="border-border/40 bg-background/50 backdrop-blur-sm px-8 py-6 text-base rounded-xl hover:bg-accent/50 transition-colors">
                <MessageSquare className="w-4 h-4 mr-2" /> {t('hero.cta.chat')}
              </Button>
            </Link>
          </motion.div>

          <div className="mt-14 grid grid-cols-4 gap-3 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item text-center">
                <div className="font-outfit font-bold text-xl sm:text-2xl text-gradient-saffron">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl mb-3">
              {language === 'en' ? 'Everything You Need to ' : 'सब कुछ जो आपको '}<span className="text-gradient-saffron">{language === 'en' ? 'Know' : 'जानना चाहिए'}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {language === 'en' 
                ? 'From registration to results — explore every aspect of Indian elections through interactive features.'
                : 'पंजीकरण से लेकर परिणाम तक — इंटरैक्टिव सुविधाओं के माध्यम से भारतीय चुनावों के हर पहलू का अन्वेषण करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <Link key={feature.path} to={feature.path}>
                <Card className="feature-card group bg-card/50 backdrop-blur-sm border-border/40 hover-lift cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {feature.badge}
                    </Badge>
                    <h3 className="font-outfit font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pledge to Vote CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-[hsl(27,100%,60%,0.1)] to-[hsl(145,81%,28%,0.1)] border-primary/20 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 flex">
              <div className="flex-1 bg-[#FF9933]" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-[#138808]" />
            </div>
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="text-4xl mb-4">🇮🇳</div>
              <h2 className="font-outfit font-bold text-2xl sm:text-3xl mb-3">
                {language === 'en' ? 'Take the ' : 'लेवे '}<span className="text-gradient-saffron">{language === 'en' ? 'Voter Pledge' : 'मतदाता शपथ'}</span>
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                {language === 'en'
                  ? 'Commit to exercising your fundamental right. Get a personalized digital certificate you can download and share on social media!'
                  : 'अपने मौलिक अधिकार का प्रयोग करने की प्रतिज्ञा करें। एक व्यक्तिगत डिजिटल प्रमाणपत्र प्राप्त करें जिसे आप डाउनलोड कर सकते हैं और सोशल मीडिया पर साझा कर सकते हैं!'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  onClick={() => setPledgeOpen(true)}
                  className="bg-gradient-to-r from-[hsl(27,100%,60%)] to-[hsl(145,81%,35%)] text-white font-semibold px-8 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
                >
                  <Sparkles className="w-4 h-4 mr-2" /> {language === 'en' ? 'Take the Pledge' : 'शपथ लें'}
                </Button>
                <Link to="/quiz">
                  <Button size="lg" variant="outline" className="border-border/40 px-8 rounded-xl">
                    <Trophy className="w-4 h-4 mr-2" /> {language === 'en' ? 'Take the Quiz' : 'प्रश्नोत्तरी लें'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <PledgeModal open={pledgeOpen} onClose={() => setPledgeOpen(false)} />
    </motion.div>
  )
}
