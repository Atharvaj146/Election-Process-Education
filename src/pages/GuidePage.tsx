import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, UserPlus, CreditCard, MonitorSmartphone, MapPin, ShieldCheck, Scale } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'

const InteractiveEVM = ({ language }: { language: string }) => {
  const [votedFor, setVotedFor] = useState<number | null>(null)
  
  const handleVote = (id: number) => {
    if (votedFor !== null) return
    setVotedFor(id)
    
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.connect(ctx.destination)
      osc.start()
      setTimeout(() => osc.stop(), 1500)
    } catch (e) { }

    setTimeout(() => setVotedFor(null), 5000)
  }

  const candidates = [
    { id: 1, name: language === 'en' ? 'Candidate A' : 'उम्मीदवार क', symbol: '🌟' },
    { id: 2, name: language === 'en' ? 'Candidate B' : 'उम्मीदवार ख', symbol: '🚀' },
    { id: 3, name: 'NOTA', symbol: '❌' },
  ]

  return (
    <div className="bg-[#E5E7EB] p-4 sm:p-6 rounded-xl border-4 border-[#9CA3AF] shadow-inner max-w-sm mx-auto relative overflow-hidden">
      <div className="absolute top-2 right-4 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        <span className="text-[10px] font-bold text-gray-600 uppercase">{language === 'en' ? 'Ready' : 'तैयार'}</span>
      </div>
      
      <div className="bg-[#F3F4F6] rounded border border-gray-300 p-2 mt-4 space-y-2">
        {candidates.map((c) => (
          <div key={c.id} className="flex items-center gap-3 bg-white p-2 rounded border border-gray-200">
            <div className="w-8 text-center font-bold text-gray-500 border-r pr-2">{c.id}</div>
            <div className="flex-1 font-semibold text-gray-800 text-xs sm:text-sm">{c.name}</div>
            <div className="w-8 text-center text-xl">{c.symbol}</div>
            <div className="w-12 flex justify-center">
              <div className={`w-3 h-3 rounded-full transition-colors ${votedFor === c.id ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-red-900/20'}`} />
            </div>
            <button 
              onClick={() => handleVote(c.id)}
              className={`w-10 h-6 rounded-full bg-blue-600 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all ${votedFor !== null ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}
              disabled={votedFor !== null}
            />
          </div>
        ))}
      </div>
      
      {votedFor !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mt-4 p-3 bg-green-100 border border-green-300 rounded text-center text-green-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
        >
          {language === 'en' ? 'Vote cast! Check the VVPAT.' : 'वोट डाला गया! VVPAT चेक करें।'}
        </motion.div>
      )}
    </div>
  )
}

export default function GuidePage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: 'Step-by-Step Voter Guide',
      subtitle: 'Everything you need to know to exercise your democratic right. Scroll down to see all the steps.',
      step1: 'Voter Registration',
      step1Desc: 'You must be registered in the electoral roll to cast your vote.',
      who: 'Who can register?',
      eligibility: ['Must be an Indian Citizen.', 'Must be 18 years of age on the qualifying date (usually Jan 1st).', 'Must be an ordinary resident of the polling area.'],
      formsTitle: 'Which form to use?',
      form6: 'For first-time voters',
      form8: 'For corrections or shifting',
      registerBtn: 'Register Online (voters.eci.gov.in)',
      step2: 'Valid ID Documents',
      step2Desc: 'What to bring to the polling booth on election day.',
      epicTip: 'The EPIC (Voter ID card) is the primary document, but you can vote even if you don\'t have it, provided your name is on the electoral roll.',
      altIds: 'Alternative Accepted IDs:',
      ids: ['Aadhaar Card', 'PAN Card', 'Driving License', 'Indian Passport', 'MGNREGA Job Card', 'Passbook with photo', 'Smart Card by RGI', 'Health Insurance Card'],
      step3: 'Finding Your Polling Booth',
      step3Desc: 'Locate exactly where you need to go to cast your vote.',
      boothTip: 'You can only vote at the specific polling booth assigned to your area. Before polling day, make sure you know exactly where it is.',
      checkOnline: 'Check Online',
      checkOnlineDesc: 'Visit the ECI Electoral Search portal and search by your EPIC number to find your part number and polling station.',
      app: 'Voter Helpline App',
      appDesc: 'Download the official app to search for your details and booth location directly on your phone.',
      slip: 'Voter Information Slip',
      slipDesc: 'Booth Level Officers (BLOs) distribute slips to your house a few days before the election containing your booth details.',
      step4: 'How to Vote (EVM & VVPAT)',
      step4Desc: 'The process inside the voting compartment. Try the simulator below!',
      evmSim: 'Interactive EVM Simulator',
      insideBooth: 'Inside the Booth:',
      votingSteps: [
        'The presiding officer will enable the ballot unit for you.',
        'Find the candidate of your choice and press the BLUE BUTTON next to their name and symbol.',
        'A red light will glow next to the button, and you will hear a long beep sound.',
        'Look at the VVPAT machine. A printed slip showing the candidate\'s serial number, name, and symbol will be visible through the glass for 7 seconds.',
        'The slip will automatically fall into the sealed drop box. Your vote is cast!'
      ],
      nota: 'What is NOTA? If you do not wish to vote for any candidate, you can press the last button on the EVM labeled "None of the Above" (NOTA).',
      step5: 'After Voting',
      step5Desc: 'What happens once you\'ve cast your vote.',
      ink: 'Indelible Ink',
      inkDesc: 'After voting, indelible ink is applied to your left index finger. This ink mark is virtually impossible to remove for 48-72 hours, preventing duplicate voting.',
      vvpat: 'VVPAT Verification',
      vvpatDesc: 'Before leaving the booth, verify your vote on the VVPAT slip displayed for 7 seconds. If it doesn\'t match your intended candidate, you can report it to the Presiding Officer.',
      results: 'Track Results',
      resultsDesc: 'On counting day, follow live results on the official ECI website, Voter Helpline App, or authorized news channels.',
      countingTip: 'Counting happens by constituency, and results are typically declared within 12-24 hours of counting day beginning.',
      step6: 'Know Your Rights',
      step6Desc: 'Every voter has legally protected rights at the polling booth.',
      rights: [
        { right: 'Vote in Secrecy', detail: 'No one — not even election officials — can see who you voted for.' },
        { right: 'No Photography', detail: 'Photography, videography, and mobile phones are prohibited inside the polling compartment.' },
        { right: 'Tendered Ballot', detail: 'If someone has already voted in your name, you can still cast a "Tendered Vote" using Form 49AA.' },
        { right: 'Assistance for Disabled', detail: 'Voters with disabilities or illiteracy can request a companion to help cast their vote.' },
        { right: 'Queue Protection', detail: 'If you are in the queue before closing time, you have the right to vote even if it\'s past the official end time.' },
        { right: 'File Complaints', detail: 'Any malpractice can be reported via the cVIGIL app, Voter Helpline 1950, or the Returning Officer.' },
      ],
      helpline: 'Voter Helpline: Call 1950 for any election-related grievances or assistance. It\'s toll-free and available 24/7 during election periods.'
    },
    hi: {
      title: 'चरण-दर-चरण मतदाता मार्गदर्शिका',
      subtitle: 'अपने लोकतांत्रिक अधिकार का प्रयोग करने के लिए आपको जो कुछ भी जानने की आवश्यकता है। सभी चरणों को देखने के लिए नीचे स्क्रॉल करें।',
      step1: 'मतदाता पंजीकरण',
      step1Desc: 'अपना वोट डालने के लिए आपको मतदाता सूची में पंजीकृत होना चाहिए।',
      who: 'कौन पंजीकरण कर सकता है?',
      eligibility: ['भारतीय नागरिक होना चाहिए।', 'निर्धारक तिथि (आमतौर पर 1 जनवरी) को 18 वर्ष की आयु होनी चाहिए।', 'मतदान क्षेत्र का सामान्य निवासी होना चाहिए।'],
      formsTitle: 'किस फॉर्म का उपयोग करें?',
      form6: 'पहली बार मतदाता बनने के लिए',
      form8: 'सुधार या स्थानांतरण के लिए',
      registerBtn: 'ऑनलाइन पंजीकरण करें (voters.eci.gov.in)',
      step2: 'वैध आईडी दस्तावेज',
      step2Desc: 'चुनाव के दिन मतदान केंद्र पर क्या लेकर आएं।',
      epicTip: 'EPIC (वोटर आईडी कार्ड) प्राथमिक दस्तावेज है, लेकिन यदि आपका नाम मतदाता सूची में है, तो आप इसके बिना भी वोट दे सकते हैं।',
      altIds: 'वैकल्पिक स्वीकृत आईडी:',
      ids: ['आधार कार्ड', 'पैन कार्ड', 'ड्राइविंग लाइसेंस', 'भारतीय पासपोर्ट', 'मनरेगा जॉब कार्ड', 'फोटो के साथ पासबुक', 'RGI द्वारा स्मार्ट कार्ड', 'स्वास्थ्य बीमा कार्ड'],
      step3: 'अपना मतदान केंद्र ढूँढना',
      step3Desc: 'ठीक वही स्थान खोजें जहाँ आपको अपना वोट डालने के लिए जाने की आवश्यकता है।',
      boothTip: 'आप केवल अपने क्षेत्र को आवंटित विशिष्ट मतदान केंद्र पर ही वोट दे सकते हैं। मतदान के दिन से पहले, सुनिश्चित करें कि आप जानते हैं कि यह कहाँ है।',
      checkOnline: 'ऑनलाइन जांचें',
      checkOnlineDesc: 'ECI इलेक्टोरल सर्च पोर्टल पर जाएं और अपने पार्ट नंबर और पोलिंग स्टेशन को खोजने के लिए अपने EPIC नंबर से सर्च करें।',
      app: 'वोटर हेल्पलाइन ऐप',
      appDesc: 'अपने विवरण और बूथ स्थान को सीधे अपने फोन पर खोजने के लिए आधिकारिक ऐप डाउनलोड करें।',
      slip: 'मतदाता सूचना पर्ची',
      slipDesc: 'बूथ स्तर के अधिकारी (BLO) चुनाव से कुछ दिन पहले आपके घर पर पर्चियां वितरित करते हैं जिसमें आपके बूथ का विवरण होता है।',
      step4: 'वोट कैसे डालें (EVM और VVPAT)',
      step4Desc: 'मतदान कक्ष के अंदर की प्रक्रिया। नीचे दिए गए सिम्युलेटर को आज़माएं!',
      evmSim: 'इंटरैक्टिव EVM सिम्युलेटर',
      insideBooth: 'बूथ के अंदर:',
      votingSteps: [
        'पीठासीन अधिकारी आपके लिए बैलेट यूनिट को सक्षम करेगा।',
        'अपनी पसंद का उम्मीदवार खोजें और उनके नाम और प्रतीक के बगल में स्थित नीला बटन दबाएं।',
        'बटन के बगल में एक लाल बत्ती जलेगी, और आपको एक लंबी बीप सुनाई देगी।',
        'VVPAT मशीन को देखें। उम्मीदवार का क्रम संख्या, नाम और प्रतीक दिखाने वाली एक मुद्रित पर्ची 7 सेकंड के लिए कांच के माध्यम से दिखाई देगी।',
        'पर्ची स्वचालित रूप से सीलबंद ड्रॉप बॉक्स में गिर जाएगी। आपका वोट डल गया!',
      ],
      nota: 'नोटा (NOTA) क्या है? यदि आप किसी भी उम्मीदवार को वोट नहीं देना चाहते हैं, तो आप EVM पर "उपरोक्त में से कोई नहीं" (NOTA) लेबल वाला अंतिम बटन दबा सकते हैं।',
      step5: 'मतदान के बाद',
      step5Desc: 'अपना वोट डालने के बाद क्या होता है।',
      ink: 'अमिट स्याही',
      inkDesc: 'मतदान के बाद, आपकी बाईं तर्जनी पर अमिट स्याही लगाई जाती है। यह स्याही का निशान 48-72 घंटों तक हटाना लगभग असंभव है, जिससे दोहरा मतदान रुकता है।',
      vvpat: 'VVPAT सत्यापन',
      vvpatDesc: 'बूथ छोड़ने से पहले, 7 सेकंड के लिए प्रदर्शित VVPAT पर्ची पर अपना वोट सत्यापित करें। यदि यह आपके इच्छित उम्मीदवार से मेल नहीं खाता है, तो आप पीठासीन अधिकारी को इसकी रिपोर्ट कर सकते हैं।',
      results: 'परिणामों को ट्रैक करें',
      resultsDesc: 'मतगणना के दिन, आधिकारिक ECI वेबसाइट, वोटर हेल्पलाइन ऐप या अधिकृत समाचार चैनलों पर लाइव परिणामों का पालन करें।',
      countingTip: 'मतगणना निर्वाचन क्षेत्र के अनुसार होती है, और परिणाम आमतौर पर मतगणना दिवस शुरू होने के 12-24 घंटों के भीतर घोषित किए जाते हैं।',
      step6: 'अपने अधिकारों को जानें',
      step6Desc: 'मतदान केंद्र पर प्रत्येक मतदाता के कानूनी रूप से संरक्षित अधिकार हैं।',
      rights: [
        { right: 'गुप्त मतदान', detail: 'कोई भी — यहाँ तक कि चुनाव अधिकारी भी — यह नहीं देख सकता कि आपने किसे वोट दिया।' },
        { right: 'कोई फोटोग्राफी नहीं', detail: 'मतदान कक्ष के अंदर फोटोग्राफी, वीडियोग्राफी और मोबाइल फोन प्रतिबंधित हैं।' },
        { right: 'निविदा मतपत्र (Tendered Ballot)', detail: 'यदि किसी ने आपके नाम पर पहले ही वोट दे दिया है, तो आप फॉर्म 49AA का उपयोग करके "निविदा वोट" डाल सकते हैं।' },
        { right: 'दिव्यांगों के लिए सहायता', detail: 'दिव्यांग या अशिक्षित मतदाता अपना वोट डालने में मदद के लिए एक साथी का अनुरोध कर सकते हैं।' },
        { right: 'कतार संरक्षण', detail: 'यदि आप समापन समय से पहले कतार में हैं, तो आपको आधिकारिक समय बीत जाने के बाद भी वोट देने का अधिकार है।' },
        { right: 'शिकायत दर्ज करें', detail: 'किसी भी कदाचार की रिपोर्ट cVIGIL ऐप, वोटर हेल्पलाइन 1950 या रिटर्निंग ऑफिसर के माध्यम से की जा सकती है।' },
      ],
      helpline: 'वोटर हेल्पलाइन: किसी भी चुनाव संबंधी शिकायत या सहायता के लिए 1950 पर कॉल करें। यह टोल-फ्री है और चुनाव अवधि के दौरान 24/7 उपलब्ध है।'
    }
  }[language]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-20 px-4 max-w-4xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4"
        >
          <BookOpen className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="font-outfit font-bold text-4xl sm:text-5xl mb-4">
          {content.title.split(' ').slice(0, -2).join(' ')} <span className="text-gradient-saffron">{content.title.split(' ').slice(-2).join(' ')}</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {content.subtitle}
        </p>
      </div>

      <div className="space-y-12">
        
        {/* STEP 1: Registration */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-lg shadow-black/5 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-green-400 to-emerald-500" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserPlus className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-[10px] uppercase font-bold py-1 px-3">{language === 'en' ? 'Step 1' : 'चरण 1'}</Badge>
              </div>
              <CardTitle className="text-3xl font-outfit mt-2">{content.step1}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {content.step1Desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground text-lg uppercase tracking-tight">{content.who}</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  {content.eligibility.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
              
              <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-2xl">
                <h3 className="font-bold text-secondary-foreground mb-3 text-sm uppercase tracking-widest">{content.formsTitle}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-xl border border-border/40 hover:border-primary/50 transition-colors">
                    <span className="font-bold text-xl block text-primary mb-1">Form 6</span>
                    <span className="text-xs text-muted-foreground">{content.form6}</span>
                  </div>
                  <div className="bg-background p-4 rounded-xl border border-border/40 hover:border-primary/50 transition-colors">
                    <span className="font-bold text-xl block text-primary mb-1">Form 8</span>
                    <span className="text-xs text-muted-foreground">{content.form8}</span>
                  </div>
                </div>
              </div>

              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 w-full">
                <Button size="lg" className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white font-bold text-base h-14 px-8 rounded-xl shadow-lg shadow-emerald-500/10">
                  {content.registerBtn}
                </Button>
              </a>
            </CardContent>
          </Card>
        </motion.div>

        {/* STEP 2: Documents */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-lg shadow-black/5 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-blue-400 to-cyan-500" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <CreditCard className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-blue-500 border-blue-500/30 bg-blue-500/5 text-[10px] uppercase font-bold py-1 px-3">{language === 'en' ? 'Step 2' : 'चरण 2'}</Badge>
              </div>
              <CardTitle className="text-3xl font-outfit mt-2">{content.step2}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {content.step2Desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <p className="font-medium text-foreground text-sm leading-relaxed italic">
                  💡 {content.epicTip}
                </p>
              </div>

              <h3 className="font-bold text-foreground text-lg mb-4 uppercase tracking-tight">{content.altIds}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.ids.map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-4 bg-background rounded-2xl border border-border/40 hover:bg-muted/30 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-sm font-bold">{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* STEP 3: Booth */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-lg shadow-black/5 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-purple-400 to-violet-500" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-purple-500 border-purple-500/30 bg-purple-500/5 text-[10px] uppercase font-bold py-1 px-3">{language === 'en' ? 'Step 3' : 'चरण 3'}</Badge>
              </div>
              <CardTitle className="text-3xl font-outfit mt-2">{content.step3}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {content.step3Desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-sm font-medium">
                {content.boothTip}
              </p>

              <div className="space-y-4">
                {[
                  { title: content.checkOnline, desc: content.checkOnlineDesc },
                  { title: content.app, desc: content.appDesc },
                  { title: content.slip, desc: content.slipDesc }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-background rounded-2xl border border-border/40 hover:border-purple-500/30 transition-all">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold text-lg">{i + 1}</div>
                    <div>
                      <h4 className="font-bold text-base mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* STEP 4: Voting */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-lg shadow-black/5 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-orange-400 to-amber-500" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <MonitorSmartphone className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/5 text-[10px] uppercase font-bold py-1 px-3">{language === 'en' ? 'Step 4' : 'चरण 4'}</Badge>
              </div>
              <CardTitle className="text-3xl font-outfit mt-2">{content.step4}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {content.step4Desc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-background/50 rounded-3xl mb-8 border border-border/40 p-4 sm:p-10 text-center">
                <h4 className="font-bold mb-6 text-muted-foreground tracking-widest uppercase text-[10px]">{content.evmSim}</h4>
                <InteractiveEVM language={language} />
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg uppercase tracking-tight">{content.insideBooth}</h3>
                <ol className="list-decimal pl-6 space-y-4 text-muted-foreground text-sm font-medium">
                  {content.votingSteps.map((step, i) => <li key={i} className="leading-relaxed">{step}</li>)}
                </ol>
              </div>

              <div className="mt-8 p-6 bg-orange-500/5 rounded-2xl border border-orange-500/20">
                <p className="text-sm font-medium">
                  {content.nota}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* STEP 5: After Voting */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-lg shadow-black/5 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-cyan-400 to-blue-500" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-cyan-500 border-cyan-500/30 bg-cyan-500/5 text-[10px] uppercase font-bold py-1 px-3">{language === 'en' ? 'Step 5' : 'चरण 5'}</Badge>
              </div>
              <CardTitle className="text-3xl font-outfit mt-2">{content.step5}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {content.step5Desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { title: content.ink, desc: content.inkDesc },
                  { title: content.vvpat, desc: content.vvpatDesc },
                  { title: content.results, desc: content.resultsDesc }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-background rounded-2xl border border-border/40 hover:border-cyan-500/30 transition-all">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-bold text-lg">{i + 1}</div>
                    <div>
                      <h4 className="font-bold text-base mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/20">
                <p className="text-sm font-bold text-foreground">
                  💡 {content.countingTip}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* STEP 6: Know Your Rights */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-lg shadow-black/5 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-red-400 to-pink-500" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                  <Scale className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-red-500 border-red-500/30 bg-red-500/5 text-[10px] uppercase font-bold py-1 px-3">{language === 'en' ? 'Step 6' : 'चरण 6'}</Badge>
              </div>
              <CardTitle className="text-3xl font-outfit mt-2">{content.step6}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {content.step6Desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.rights.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-background rounded-2xl border border-border/40 hover:bg-red-500/[0.02] hover:border-red-500/20 transition-all">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                    <div>
                      <span className="font-bold text-foreground block mb-1 text-sm">{item.right}</span>
                      <span className="text-xs text-muted-foreground leading-relaxed">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl shadow-xl shadow-red-500/5">
                <p className="text-sm font-bold text-foreground leading-relaxed">
                  📞 {content.helpline}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  )
}
