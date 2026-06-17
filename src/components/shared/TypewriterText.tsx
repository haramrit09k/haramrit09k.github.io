import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  strings: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export default function TypewriterText({
  strings,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 2200,
  className = '',
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = strings[currentIndex] ?? ''

    if (!isDeleting && displayText.length < current.length) {
      const t = setTimeout(
        () => setDisplayText(current.slice(0, displayText.length + 1)),
        typingSpeed
      )
      return () => clearTimeout(t)
    }

    if (!isDeleting && displayText.length === current.length && current.length > 0) {
      const t = setTimeout(() => setIsDeleting(true), pauseDuration)
      return () => clearTimeout(t)
    }

    if (isDeleting && displayText.length > 0) {
      const t = setTimeout(
        () => setDisplayText(displayText.slice(0, -1)),
        deletingSpeed
      )
      return () => clearTimeout(t)
    }

    if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setCurrentIndex((currentIndex + 1) % strings.length)
    }
  }, [displayText, isDeleting, currentIndex, strings, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {displayText}
      <span
        className="inline-block w-[2px] h-[1em] bg-[#11ABB0] align-middle ml-[2px] animate-pulse"
        aria-hidden="true"
      />
    </span>
  )
}
