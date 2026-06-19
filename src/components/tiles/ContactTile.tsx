import BentoTile from '../layout/BentoTile'
import { MainData } from '../../types/resume'

interface ContactTileProps {
  main: MainData
}

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function ContactTile({ main }: ContactTileProps) {
  const calendlyUrl = main.calendlyUrl ?? 'https://calendly.com/haramrit09k'
  const linkedIn = main.social.find(s => s.name === 'linkedin')?.url ?? '#'

  return (
    <BentoTile areaClass="tile-contact" className="p-6" id="contact" noHover>
      <h2 className="text-base font-bold text-white mb-2">Let's Talk</h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-lg">
        {main.contactmessage}
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#11ABB0] text-white text-sm font-semibold hover:bg-[#0d8a8e] transition-colors duration-200"
        >
          <CalendarIcon />
          Schedule a Chat
        </a>
        <a
          href={`mailto:${main.email}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm font-semibold hover:border-[#11ABB0]/40 hover:text-[#11ABB0] transition-all duration-200"
        >
          <EmailIcon />
          {main.email}
        </a>
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm font-semibold hover:border-[#11ABB0]/40 hover:text-[#11ABB0] transition-all duration-200"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      </div>
    </BentoTile>
  )
}
