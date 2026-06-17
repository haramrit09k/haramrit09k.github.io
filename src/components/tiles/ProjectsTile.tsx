import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BentoTile from '../layout/BentoTile'
import TechBadge from '../shared/TechBadge'
import { Project } from '../../types/resume'

const FEATURED_TITLES = ['Dist-ML', 'Hippra', 'SpaceTerra', 'wha2do']

const ENRICHMENT: Record<string, { techStack: string[]; metric: string }> = {
  'Dist-ML': {
    techStack: ['Electron.js', 'Python', 'React'],
    metric: '🏆 1st runner-up · Annual Project Competition',
  },
  'Hippra': {
    techStack: ['ASP.NET Core', 'Blazor', 'SQL'],
    metric: '🏥 HIPAA-compliant · Live production app',
  },
  'SpaceTerra': {
    techStack: ['Phaser.js', 'Node.js', 'MongoDB'],
    metric: '🎮 Most played game @ Teknack',
  },
  'wha2do': {
    techStack: ['React Native', 'Firebase'],
    metric: '📱 Live on Google Play Store',
  },
}

interface ProjectsTileProps {
  projects: Project[]
}

export default function ProjectsTile({ projects }: ProjectsTileProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const featured = projects.filter(p => FEATURED_TITLES.includes(p.title))

  return (
    <BentoTile areaClass="tile-projects" className="p-6" noHover>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-white">Projects</h2>
        <a
          href="https://github.com/haramrit09k"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-600 hover:text-[#11ABB0] transition-colors"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {featured.map((project, i) => {
          const enrichment = ENRICHMENT[project.title]
          const isHovered = hoveredIdx === i

          return (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] block"
              style={{ aspectRatio: '16/9' }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ borderColor: 'rgba(17,171,176,0.4)' }}
            >
              {/* BG image */}
              <img
                src={`/images/portfolio/${project.image}`}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ opacity: isHovered ? 0.15 : 0.55, transition: 'opacity 0.25s ease' }}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.opacity = '0.05'
                }}
              />

              {/* Default label */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.25s ease' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-3"
                style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.2s ease' }}
              >
                <p className="text-sm font-semibold text-white">{project.title}</p>
              </div>

              {/* Hover overlay */}
              <AnimatePresence>
                {isHovered && enrichment && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col justify-end p-3 bg-[#0A0A0A]/85"
                  >
                    <p className="text-sm font-bold text-white mb-1">{project.title}</p>
                    <p className="text-[11px] text-[#11ABB0] mb-2">{enrichment.metric}</p>
                    <div className="flex flex-wrap gap-1">
                      {enrichment.techStack.map(t => (
                        <TechBadge key={t} tech={t} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          )
        })}
      </div>
    </BentoTile>
  )
}
