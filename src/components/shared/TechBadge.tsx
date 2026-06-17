interface TechBadgeProps {
  tech: string
  className?: string
}

export default function TechBadge({ tech, className = '' }: TechBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[#11ABB0]/10 text-[#11ABB0] border border-[#11ABB0]/20 ${className}`}
    >
      {tech}
    </span>
  )
}
