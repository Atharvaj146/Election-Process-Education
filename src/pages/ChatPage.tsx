import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MapPin, 
  Download, 
  ExternalLink, 
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { geminiApi } from '@/lib/gemini'
import { useLanguage } from '@/context/LanguageContext'
import { deriveActions, type ChatAction } from '@/lib/chat-utils'
import ReactMarkdown from 'react-markdown'

type Message = {
  role: 'user' | 'assistant'
  content: string
  actions?: ChatAction[]
}

const iconMap = {
  map: MapPin,
  download: Download,
  link: ExternalLink
}

export default function ChatPage() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])

  // Initialize and handle language changes for the first message
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 0 || (prev.length === 1 && prev[0].role === 'assistant')) {
        return [{
          role: 'assistant',
          content: language === 'en' 
            ? "Namaste! I'm your MatDaan AI Guide powered by Gemini 2.5 Flash. How can I help you participate in India's democracy today?"
            : "नमस्ते! मैं जेमिनी 2.5 फ्लैश द्वारा संचालित आपका मतदान AI गाइड हूँ। आज मैं भारत के लोकतंत्र में भाग लेने में आपकी कैसे मदद कर सकता हूँ?"
        }]
      }
      return prev
    })
     
  }, [language])

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSend = async (textOverride?: string) => {
    const userMessage = textOverride || input.trim()
    if (!userMessage || isLoading) return

    if (!textOverride) setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))

      // Inject language instruction for the model
      const localizedPrompt = language === 'hi' 
        ? `${userMessage} (Please respond in Hindi only)` 
        : userMessage;

      const response = await geminiApi.sendChatMessage(localizedPrompt, history)
      
      const actions = deriveActions(response, language)

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        actions: actions.length > 0 ? actions : undefined
      }])
    } catch (error: any) {
      console.error('Chat Error:', error)
      const errorMessage = error?.message || "Unknown error occurred";
      toast.error(`${language === 'en' ? "AI Error:" : "AI त्रुटि:"} ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleActionClick = (action: ChatAction) => {
    window.open(action.url, '_blank')
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: language === 'en' 
          ? "Namaste! I'm your MatDaan AI Guide powered by Gemini 2.5 Flash. How can I help you participate in India's democracy today?"
          : "नमस्ते! मैं जेमिनी 2.5 फ्लैश द्वारा संचालित आपका मतदान AI गाइड हूँ। आज मैं भारत के लोकतंत्र में भाग लेने में आपकी कैसे मदद कर सकता हूँ?"
      }
    ])
    toast.success(language === 'en' ? 'Chat history cleared' : 'चैट इतिहास साफ किया गया')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 pb-4 px-4 max-w-4xl mx-auto h-screen flex flex-col"
    >
      <div className="text-center mb-6 shrink-0 pt-4">
        <Badge variant="outline" className="mb-3 text-emerald-500 border-emerald-500/30 bg-emerald-500/5 font-bold uppercase tracking-widest text-[10px]">
          <Sparkles className="w-3 h-3 mr-1" /> {t('chat.poweredBy')}
        </Badge>
        <h1 className="font-outfit font-bold text-3xl sm:text-4xl">
          {language === 'en' ? 'MatDaan' : 'मतदान'} <span className="text-gradient-saffron">{language === 'en' ? 'Assistant' : 'सहायक'}</span>
        </h1>
      </div>

      <div className="flex-1 min-h-0 bg-card/30 backdrop-blur-md rounded-3xl border border-border/40 shadow-2xl flex flex-col overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
          <Button variant="ghost" size="icon" onClick={clearChat} className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 scrollbar-hide"
        >
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${
                  msg.role === 'assistant' 
                    ? 'bg-gradient-to-br from-primary to-primary-foreground' 
                    : 'bg-muted border border-border'
                }`}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5" />}
                </div>
                
                <div className="space-y-2">
                  <div className={`rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm transition-all duration-300 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground font-bold'
                      : 'bg-muted/50 border border-border/40 chat-markdown font-medium'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-border/50">
                        <ReactMarkdown>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}

                    {msg.actions && msg.actions.length > 0 && (
                      <div className="px-5 pb-5 pt-3 flex flex-wrap gap-2 border-t border-border/10 bg-muted/5 mt-3 rounded-b-2xl -mx-5 -mb-4">
                        {msg.actions.map((action, i) => {
                          const Icon = iconMap[action.icon]
                          return (
                            <Button
                              key={i}
                              variant="ghost"
                              size="sm"
                              onClick={() => handleActionClick(action)}
                              className="text-[10px] rounded-xl border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 gap-2 h-9 bg-background/50 font-bold uppercase tracking-tighter"
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {action.label}
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center animate-pulse shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-muted/50 border border-border/40 rounded-2xl px-5 py-4 flex gap-1 items-center h-12">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 bg-background/50 border-t border-border/40 shrink-0">
          <div className="max-w-3xl mx-auto">
            
            {/* Suggested Prompt Chips */}
            {messages.length <= 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {[
                  language === 'en' ? 'Am I eligible to vote?' : 'क्या मैं वोट देने के योग्य हूँ?',
                  language === 'en' ? 'What is a VVPAT machine?' : 'VVPAT मशीन क्या है?',
                  language === 'en' ? 'How to register online?' : 'ऑनलाइन रजिस्टर कैसे करें?'
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    disabled={isLoading}
                    className="text-xs font-medium px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}

            <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chat.placeholder')}
              className="bg-background border-border/60 rounded-xl py-7 px-5 focus-visible:ring-primary/20 text-base font-medium"
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSend()} 
              disabled={isLoading || !input.trim()}
              className="h-[60px] w-[60px] rounded-xl shrink-0 bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <Send className="w-6 h-6" />
            </Button>
            </div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest font-bold opacity-40">
            {language === 'en' 
              ? 'AI can make mistakes. Verify critical info with official ECI sources.' 
              : 'AI गलतियाँ कर सकता है। आधिकारिक ECI स्रोतों से महत्वपूर्ण जानकारी सत्यापित करें।'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
