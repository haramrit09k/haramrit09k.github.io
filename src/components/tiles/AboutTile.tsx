import BentoTile from '../layout/BentoTile'
import { MainData } from '../../types/resume'

interface AboutTileProps {
  main: MainData
}

const FALLBACK_BIO =
  'Senior Engineer at Citi building automation and tooling for 500+ dev teams. AWS-certified. Strong in Java, Spring Boot, Angular, and making code that actually lasts.'

export default function AboutTile({ main }: AboutTileProps) {
  return (
    <BentoTile areaClass="tile-about" className="p-5">
      <div className="flex flex-col items-center text-center gap-3 h-full justify-center">
        <div className="relative">
          <img
            src={`/images/${main.image}`}
            alt={main.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white/10 hover:border-[#11ABB0]/60 transition-colors duration-300"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(main.name)}&background=11ABB0&color=fff&size=80`
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#111111] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">{main.name.split(' ')[0]}</h3>
          <p className="text-[11px] text-[#11ABB0] font-medium mt-0.5">{main.occupation}</p>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed max-w-[180px]">
          {main.shortBio ?? FALLBACK_BIO}
        </p>
      </div>
    </BentoTile>
  )
}
