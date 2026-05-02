import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, TrendingUp, Users, MapPin, Map, X, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie, LineChart, Line } from 'recharts'
import { turnoutData, demographicData, stateParticipation, firstTimeVoters, genderGapData } from '@/data/election-stats'
import { stateMapData, regionColors, type StateData } from '@/data/state-map-data'
import { useLanguage } from '@/context/LanguageContext'

const COLORS = ['hsl(27, 100%, 60%)', 'hsl(145, 81%, 28%)', 'hsl(215, 51%, 42%)', 'hsl(263, 70%, 50%)', 'hsl(0, 84%, 60%)', 'hsl(51, 100%, 50%)']

const getTurnoutColor = (turnout: number) => {
  if (turnout >= 80) return 'bg-green-500'
  if (turnout >= 70) return 'bg-emerald-400'
  if (turnout >= 65) return 'bg-yellow-400'
  if (turnout >= 60) return 'bg-orange-400'
  return 'bg-red-400'
}

const getTurnoutBg = (turnout: number) => {
  if (turnout >= 80) return 'bg-green-500/20 border-green-500/40'
  if (turnout >= 70) return 'bg-emerald-400/20 border-emerald-400/40'
  if (turnout >= 65) return 'bg-yellow-400/20 border-yellow-400/40'
  if (turnout >= 60) return 'bg-orange-400/20 border-orange-400/40'
  return 'bg-red-400/20 border-red-400/40'
}

export default function StatsPage() {
  const { language } = useLanguage()
  const [selectedState, setSelectedState] = useState<StateData | null>(null)
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  const content = {
    en: {
      title: 'Democracy Stats',
      subtitle: 'Explore historical voter turnout, demographic trends, and participation data across the world\'s largest democracy.',
      mapTitle: 'Interactive State-by-State Turnout (2024)',
      mapDesc: 'Click or hover over a state tile to explore its voter turnout across elections.',
      seats: 'Seats',
      turnout: 'Turnout',
      trend: 'Trend',
      highest: 'Highest',
      lowest: 'Lowest',
      historicalTitle: 'Historical Voter Turnout (1951 - 2024)',
      historicalDesc: 'Overall percentage of eligible voters who cast their ballots in Lok Sabha elections.',
      demographicsTitle: 'Turnout by Age & Gender',
      demographicsDesc: 'Estimated participation percentages across demographics.',
      firstTimeTitle: 'First-Time Voters (18-19 Years)',
      firstTimeDesc: 'Growth of newly eligible young voters across general elections.',
      genderGapTitle: 'Closing the Gender Gap',
      genderGapDesc: 'Difference between Male and Female turnout percentages over time.',
    },
    hi: {
      title: 'लोकतंत्र के आंकड़े',
      subtitle: 'दुनिया के सबसे बड़े लोकतंत्र में ऐतिहासिक मतदाता मतदान, जनसांख्यिकीय रुझान और भागीदारी डेटा का अन्वेषण करें।',
      mapTitle: 'इंटरैक्टिव राज्य-दर-राज्य मतदान (2024)',
      mapDesc: 'चुनावों में मतदाता मतदान का पता लगाने के लिए किसी राज्य टाइल पर क्लिक करें या होवर करें।',
      seats: 'सीटें',
      turnout: 'मतदान',
      trend: 'रुझान',
      highest: 'उच्चतम',
      lowest: 'न्यूनतम',
      historicalTitle: 'ऐतिहासिक मतदाता मतदान (1951 - 2024)',
      historicalDesc: 'लोकसभा चुनावों में अपना वोट डालने वाले पात्र मतदाताओं का कुल प्रतिशत।',
      demographicsTitle: 'आयु और लिंग के अनुसार मतदान',
      demographicsDesc: 'जनसांख्यिकी में अनुमानित भागीदारी प्रतिशत।',
      firstTimeTitle: 'पहली बार मतदाता (18-19 वर्ष)',
      firstTimeDesc: 'आम चुनावों में नए पात्र युवा मतदाताओं की वृद्धि।',
      genderGapTitle: 'लिंग अंतर को कम करना',
      genderGapDesc: 'समय के साथ पुरुष और महिला मतदान प्रतिशत के बीच का अंतर।',
    }
  }[language]

  const keyStats = [
    { value: '67.4%', label: language === 'en' ? '2024 National Turnout' : '2024 राष्ट्रीय मतदान', icon: '🗳️', trend: '+1.7% vs 2019' },
    { value: '642M+', label: language === 'en' ? 'Votes Cast in 2024' : '2024 में डाले गए वोट', icon: '✅', trend: language === 'en' ? 'Largest ever' : 'अब तक का सबसे बड़ा' },
    { value: '10.5L+', label: language === 'en' ? 'Polling Stations' : 'मतदान केंद्र', icon: '🏛️', trend: language === 'en' ? 'Across India' : 'पूरे भारत में' },
    { value: '968M+', label: language === 'en' ? 'Eligible Voters' : 'पात्र मतदाता', icon: '🇮🇳', trend: language === 'en' ? 'World\'s largest' : 'दुनिया में सबसे बड़ा' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-20 px-4 max-w-7xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4"
        >
          <BarChart3 className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="font-outfit font-bold text-4xl sm:text-5xl mb-4">
          {content.title.split(' ')[0]} <span className="text-gradient-saffron">{content.title.split(' ')[1] || ''}</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {content.subtitle}
        </p>
      </div>

      {/* ========== KEY INSIGHT CARDS ========== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {keyStats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/40 p-4 text-center hover-lift">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-outfit font-bold text-2xl sm:text-3xl text-gradient-saffron">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-semibold">{stat.label}</div>
              <Badge variant="secondary" className="mt-2 text-[9px] font-normal">{stat.trend}</Badge>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ========== INTERACTIVE STATE MAP ========== */}
      <Card className="mb-6 bg-card/50 backdrop-blur-sm border-border/40 shadow-xl shadow-black/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            <CardTitle>{content.mapTitle}</CardTitle>
          </div>
          <CardDescription>
            {content.mapDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2 mb-6">
            {stateMapData.map((state) => (
              <motion.button
                key={state.abbr}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedState(selectedState?.abbr === state.abbr ? null : state)}
                onMouseEnter={() => setHoveredState(state.abbr)}
                onMouseLeave={() => setHoveredState(null)}
                className={`relative p-2 sm:p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  selectedState?.abbr === state.abbr
                    ? 'ring-2 ring-primary shadow-lg shadow-primary/20 border-primary'
                    : getTurnoutBg(state.turnout2024)
                }`}
              >
                <div className="font-outfit font-bold text-xs sm:text-sm">{state.abbr}</div>
                <div className="text-[9px] sm:text-[10px] text-muted-foreground">{state.turnout2024}%</div>

                <AnimatePresence>
                  {hoveredState === state.abbr && !selectedState && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 bg-card border border-border rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap pointer-events-none"
                    >
                      <p className="text-xs font-semibold">{state.name}</p>
                      <p className="text-[10px] text-muted-foreground">{state.seats} {content.seats} • {state.turnout2024}%</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground mb-4 justify-center uppercase tracking-widest">
            <span className="font-bold">{content.turnout}:</span>
            {[
              { label: '80%+', cls: 'bg-green-500' },
              { label: '70-79%', cls: 'bg-emerald-400' },
              { label: '65-69%', cls: 'bg-yellow-400' },
              { label: '60-64%', cls: 'bg-orange-400' },
              { label: '<60%', cls: 'bg-red-400' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <div className={`w-2.5 h-2.5 rounded-full ${l.cls}`} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Selected State Detail Panel */}
          <AnimatePresence>
            {selectedState && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-background/50 border border-border/40 rounded-xl p-5 mt-2">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-outfit font-bold text-xl flex items-center gap-2">
                        <MapPin className="w-5 h-5" style={{ color: regionColors[selectedState.region] }} />
                        {selectedState.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px]">{selectedState.seats} {content.seats}</Badge>
                        <Badge variant="outline" className="text-[10px] capitalize">{selectedState.region}</Badge>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedState(null)}
                      className="w-8 h-8 rounded-full bg-card border border-border/40 flex items-center justify-center hover:bg-destructive/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { year: '2014', turnout: selectedState.turnout2014 },
                      { year: '2019', turnout: selectedState.turnout2019 },
                      { year: '2024', turnout: selectedState.turnout2024 },
                    ].map((d) => (
                      <div key={d.year} className="text-center">
                        <p className="text-xs text-muted-foreground mb-2 font-bold">{d.year}</p>
                        <div className="h-24 bg-card rounded-lg border border-border/20 relative overflow-hidden flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${d.turnout}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`w-full rounded-t-md ${getTurnoutColor(d.turnout)}`}
                          />
                        </div>
                        <p className="font-outfit font-bold text-sm mt-1">{d.turnout}%</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/20 flex items-center justify-center gap-2">
                    <Info className="w-3.5 h-3.5 text-primary/60" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {selectedState.turnout2024 > selectedState.turnout2019 
                        ? `${content.trend}: ▲ +${(selectedState.turnout2024 - selectedState.turnout2019).toFixed(1)}% vs 2019`
                        : `${content.trend}: ▼ ${(selectedState.turnout2024 - selectedState.turnout2019).toFixed(1)}% vs 2019`}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Turnout Trend Chart */}
        <Card className="col-span-1 lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/40 shadow-xl shadow-black/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle>{content.historicalTitle}</CardTitle>
            </div>
            <CardDescription>{content.historicalDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={turnoutData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(27, 100%, 60%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(27, 100%, 60%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} domain={['dataMin - 5', 'dataMax + 5']} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', border: '1px solid hsl(var(--border)/0.5)' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px', fontSize: '10px', fontWeight: 'bold' }}
                    formatter={(value: any) => [`${value}%`, content.turnout]}
                  />
                  <Area type="monotone" dataKey="turnout" stroke="hsl(27, 100%, 60%)" strokeWidth={3} fillOpacity={1} fill="url(#colorTurnout)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Demographics Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-xl shadow-black/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              <CardTitle>{content.demographicsTitle}</CardTitle>
            </div>
            <CardDescription>{content.demographicsDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', border: '1px solid hsl(var(--border)/0.5)' }}
                    formatter={(value: any) => [`${value}%`, '']}
                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                  <Bar dataKey="male" name={language === 'en' ? 'Male' : 'पुरुष'} fill="hsl(215, 51%, 42%)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                  <Bar dataKey="female" name={language === 'en' ? 'Female' : 'महिला'} fill="hsl(145, 81%, 35%)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* State Participation */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-xl shadow-black/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-500" />
              <CardTitle>{language === 'en' ? 'Turnout Extremes (2024)' : 'मतदान चरम सीमा (2024)'}</CardTitle>
            </div>
            <CardDescription>{language === 'en' ? 'Comparing participation extremes across India.' : 'पूरे भारत में भागीदारी की चरम सीमाओं की तुलना।'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stateParticipation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                    label={({ name, value }) => `${name} (${value}%)`}
                    labelLine={false}
                  >
                    {stateParticipation.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', border: '1px solid hsl(var(--border)/0.5)' }}
                    formatter={(value: any) => [`${value}%`, content.turnout]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* First Time Voters */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-xl shadow-black/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <CardTitle>{content.firstTimeTitle}</CardTitle>
            </div>
            <CardDescription>{content.firstTimeDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={firstTimeVoters} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}M`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', border: '1px solid hsl(var(--border)/0.5)' }}
                    formatter={(value: any) => [`${value} Million`, language === 'en' ? 'First-Time Voters' : 'पहली बार मतदाता']}
                  />
                  <Line type="monotone" dataKey="count" stroke="hsl(27, 100%, 60%)" strokeWidth={3} dot={{ fill: 'hsl(27, 100%, 60%)', r: 4 }} activeDot={{ r: 6 }} animationDuration={1500} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gender Gap */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-xl shadow-black/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <CardTitle>{content.genderGapTitle}</CardTitle>
            </div>
            <CardDescription>{content.genderGapDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={genderGapData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(145, 81%, 35%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(145, 81%, 35%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', border: '1px solid hsl(var(--border)/0.5)' }}
                    formatter={(value: any) => [`${value}%`, language === 'en' ? 'Turnout Gap' : 'मतदान अंतर']}
                  />
                  <Area type="monotone" dataKey="gap" stroke="hsl(145, 81%, 35%)" strokeWidth={3} fillOpacity={1} fill="url(#colorGap)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </motion.div>
  )
}
