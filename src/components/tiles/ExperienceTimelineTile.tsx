import { motion } from 'framer-motion'
import BentoTile from '../layout/BentoTile'
import { WorkEntry, EducationEntry } from '../../types/resume'

interface ExperienceTimelineTileProps {
  work: WorkEntry[]
  education: EducationEntry[]
}

const FEATURED_COMPANIES = ['Citibank N.A.', 'Optimal Satcom Inc', 'Nexus 8 International']

const SHORT_DESC: Record<string, string> = {
  'Citibank N.A.': 'Led Playwright automation → 60% less manual QA. Closed 62+ JIRAs across Angular & Spring Boot.',
  'Optimal Satcom Inc': "Migrated legacy SATCOM app to web. Reduced compiler warnings by 70%. Added ECM's third operation mode.",
  'Nexus 8 International': 'Built HIPAA-compliant components in ASP.NET Core & Blazor. Optimized image upload by 30%.',
}

export default function ExperienceTimelineTile({ work, education }: ExperienceTimelineTileProps) {
  const featured = work.filter(w => FEATURED_COMPANIES.includes(w.company))
  const latestEdu = education[0]

  return (
    <BentoTile areaClass="tile-timeline" className="p-6" noHover>
      <h2 className="text-base font-bold text-white mb-5">Experience</h2>

      <div className="relative">
        <div className="absolute left-[18px] top-3 bottom-6 w-px bg-white/[0.07]" />

        <div className="space-y-5">
          {featured.map((entry, i) => (
            <motion.div
              key={entry.company}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full bg-[#191919] border border-white/[0.08] overflow-hidden flex items-center justify-center">
                <img
                  src={`/${entry.logo}`}
                  alt={entry.company}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                    if (el.parentElement) {
                      el.parentElement.textContent = entry.company.slice(0, 2).toUpperCase()
                      el.parentElement.classList.add('text-[10px]', 'text-slate-400', 'font-bold')
                    }
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-white truncate">{entry.company}</h3>
                  <span className="text-[11px] text-slate-600 font-mono whitespace-nowrap flex-shrink-0">
                    {entry.roles[0]?.years}
                  </span>
                </div>
                <p className="text-xs text-[#11ABB0] font-medium mt-0.5">{entry.roles[0]?.title}</p>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {SHORT_DESC[entry.company] ?? ''}
                </p>
              </div>
            </motion.div>
          ))}

          {latestEdu && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: featured.length * 0.08 }}
              className="flex gap-4"
            >
              <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full bg-[#191919] border border-white/[0.08] overflow-hidden flex items-center justify-center">
                <img
                  src={`/${latestEdu.logo}`}
                  alt={latestEdu.school}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.opacity = '0'
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-white truncate">{latestEdu.school}</h3>
                  <span className="text-[11px] text-slate-600 font-mono whitespace-nowrap flex-shrink-0">
                    {latestEdu.graduated}
                  </span>
                </div>
                <p className="text-xs text-[#11ABB0] font-medium mt-0.5">{latestEdu.degree}</p>
                <p className="text-[11px] text-slate-600 mt-1">{latestEdu.description}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </BentoTile>
  )
}
