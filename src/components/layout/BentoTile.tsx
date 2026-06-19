import { motion } from 'framer-motion'
import { ReactNode, CSSProperties } from 'react'

interface BentoTileProps {
  children: ReactNode
  className?: string
  areaClass?: string
  style?: CSSProperties
  noHover?: boolean
  id?: string
}

export default function BentoTile({
  children,
  className = '',
  areaClass = '',
  style,
  noHover = false,
  id,
}: BentoTileProps) {
  return (
    <motion.div
      id={id}
      className={`rounded-2xl border border-white/[0.07] bg-[#111111] overflow-hidden ${areaClass} ${className}`}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={noHover ? {} : { y: -3, borderColor: 'rgba(17,171,176,0.28)' }}
    >
      {children}
    </motion.div>
  )
}
