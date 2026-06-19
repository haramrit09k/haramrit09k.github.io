import { motion } from 'framer-motion'
import BentoTile from '../layout/BentoTile'
import { Address } from '../../types/resume'

interface LocationTileProps {
  address: Address
}

export default function LocationTile({ address }: LocationTileProps) {
  return (
    <BentoTile
      areaClass="tile-location"
      className="p-5 flex flex-col justify-center items-center text-center min-h-[110px]"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-2xl mb-2 select-none"
      >
        📍
      </motion.div>
      <p className="text-sm font-bold text-white">{address.city}</p>
      <p className="text-[11px] text-slate-600 mt-0.5">{address.state} · Canada</p>
    </BentoTile>
  )
}
