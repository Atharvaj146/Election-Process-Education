import { Vote, Heart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerLinks = [
  { label: 'Election Commission of India', url: 'https://eci.gov.in' },
  { label: 'Voter Registration', url: 'https://voters.eci.gov.in' },
  { label: 'SVEEP', url: 'https://ecisveep.nic.in' },
  { label: 'Voter Helpline App', url: 'https://voters.eci.gov.in/download-app' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(27,100%,60%)] to-[hsl(51,100%,50%)] flex items-center justify-center">
                <Vote className="w-4 h-4 text-white" />
              </div>
              <span className="font-outfit font-bold text-lg">MatDaan Guide</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered election education platform helping every citizen understand
              and participate in Indian democracy.
            </p>
          </div>

          {/* Official Links */}
          <div className="space-y-3">
            <h3 className="font-outfit font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Official Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <h3 className="font-outfit font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Data Validation & Disclaimer
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              MatDaan Guide is an educational AI assistant. <strong className="text-foreground font-semibold">All information is strictly sourced and validated against official Election Commission of India (ECI) data.</strong>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always verify critical election details (dates, booth locations, registration status) on{' '}
              <a href="https://eci.gov.in" className="text-primary hover:underline">
                eci.gov.in
              </a>.
              This platform is non-partisan and does not endorse any political party
              or candidate.
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-white/5" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 MatDaan Guide. Built for Prompt Wars Hackathon.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Indian Democracy
          </p>
          <p className="text-muted-foreground/50">Built by Team MatDaan</p>
        </div>
      </div>
    </footer>
  )
}
