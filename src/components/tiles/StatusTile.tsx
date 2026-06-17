import { motion } from 'framer-motion'
import BentoTile from '../layout/BentoTile'

interface StatusTileProps {
  openToWork: boolean
}

export default function StatusTile({ openToWork }: StatusTileProps) {
  return (
    <BentoTile
      areaClass="tile-status"
      className="p-5 flex flex-col justify-center items-center text-center min-h-[110px]"
    >
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-emerald-400/30"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-sm font-semibold text-emerald-400">
          {openToWork ? 'Open to Work' : 'Not Looking'}
        </span>
      </div>
      <p className="mt-1.5 text-[11px] text-slate-600">Full-time · Canada</p>
    </BentoTile>
  )
}
