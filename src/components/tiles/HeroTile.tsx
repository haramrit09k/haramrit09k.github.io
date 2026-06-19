import { MainData } from '../../types/resume'
import BentoTile from '../layout/BentoTile'
import TypewriterText from '../shared/TypewriterText'
import SocialLinks from '../shared/SocialLinks'

interface HeroTileProps {
  main: MainData
}

const DEFAULT_TAGLINES = [
  'I build backend systems at scale.',
  'I cut manual testing by 60%.',
  'I make dev teams ship faster.',
  'I close 62+ JIRAs and sleep well.',
]

export default function HeroTile({ main }: HeroTileProps) {
  const taglines = main.taglines ?? DEFAULT_TAGLINES
  const nameParts = main.name.split(' ')
  const firstName = nameParts.slice(0, 2).join(' ')
  const lastName = nameParts.slice(2).join(' ')

  return (
    <BentoTile
      areaClass="tile-hero"
      className="p-7 flex flex-col justify-between min-h-[260px]"
      style={{
        background:
          'radial-gradient(ellipse at top left, rgba(17,171,176,0.08) 0%, #111111 60%)',
      }}
      noHover
    >
      {/* Employer badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#11ABB0]" />
        <span className="text-xs font-semibold text-[#11ABB0] uppercase tracking-widest">
          {main.employer}
        </span>
      </div>

      {/* Name */}
      <div className="flex-1">
        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white leading-[1.05] tracking-tight">
          {firstName}
          <br />
          <span className="text-[#11ABB0]">{lastName}</span>
        </h1>
        <p className="mt-2 text-base sm:text-lg text-slate-400 font-medium">
          {main.occupation}
        </p>
      </div>

      {/* Typewriter */}
      <div className="py-4 min-h-[2.5rem]">
        <TypewriterText
          strings={taglines}
          className="text-sm sm:text-base text-slate-300 font-medium"
        />
      </div>

      {/* CTAs + socials */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
        <div className="flex gap-3 flex-wrap">
          <a
            href={main.resumedownload}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#11ABB0] text-white text-sm font-semibold hover:bg-[#0d8a8e] transition-colors duration-200"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl border border-[#11ABB0]/40 text-[#11ABB0] text-sm font-semibold hover:bg-[#11ABB0]/10 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get In Touch
          </a>
        </div>
        <SocialLinks social={main.social} className="sm:ml-1" />
      </div>
    </BentoTile>
  )
}
