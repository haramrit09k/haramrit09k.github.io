import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpNumberProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function CountUpNumber({
  target,
  duration = 1400,
  suffix = '',
  prefix = '',
  className = '',
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  )
}
