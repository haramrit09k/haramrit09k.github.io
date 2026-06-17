import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BentoTile from '../layout/BentoTile'
import { Skill } from '../../types/resume'

const CATEGORIES = ['Backend & APIs', 'Frontend & UI', 'DevOps & Cloud', 'Testing & Automation'] as const
type Category = typeof CATEGORIES[number]

const CATEGORY_MAP: Record<Category, string[]> = {
  'Backend & APIs': ['Java', 'Spring Boot', 'Node.js', 'Oracle SQL', 'REST APIs', 'MongoDB', 'GraphQL', 'Python'],
  'Frontend & UI': ['Angular', 'React', 'Streamlit', 'Electron.js', 'Phaser.js'],
  'DevOps & Cloud': ['AWS', 'CI/CD (Jenkins & GitHub Actions)', 'Docker', 'Monitoring & Logging (Kibana)'],
  'Testing & Automation': ['Playwright', 'Test Automation', 'JUnit', 'Jest', 'Shell Scripting'],
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

interface SkillsTileProps {
  skills: Skill[]
}

export default function SkillsTile({ skills }: SkillsTileProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('Backend & APIs')

  const filteredSkills = skills.filter(s => CATEGORY_MAP[activeCategory].includes(s.name))

  return (
    <BentoTile areaClass="tile-skills" className="p-6" noHover>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-base font-bold text-white">Skills & Technologies</h2>
        {/* Desktop tabs */}
        <div className="hidden sm:flex gap-1.5 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#11ABB0] text-white shadow-[0_0_12px_rgba(17,171,176,0.3)]'
                  : 'bg-white/[0.04] text-slate-500 hover:bg-white/[0.08] hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Mobile dropdown */}
        <select
          className="sm:hidden bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-lg px-3 py-2 outline-none cursor-pointer"
          value={activeCategory}
          onChange={e => setActiveCategory(e.target.value as Category)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2.5"
        >
          {filteredSkills.map(skill => (
            <motion.div
              key={skill.name}
              variants={cardVariants}
              whileHover={{ scale: 1.06, borderColor: 'rgba(17,171,176,0.5)' }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] cursor-default group"
            >
              <img
                src={`/images/tech/${skill.image}`}
                alt={skill.name}
                className="w-9 h-9 object-contain"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.opacity = '0'
                }}
              />
              <span className="text-[11px] text-center text-slate-500 font-medium leading-tight group-hover:text-slate-300 transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </BentoTile>
  )
}
