import { useResumeData } from './hooks/useResumeData'
import BentoGrid from './components/layout/BentoGrid'

export default function App() {
  const { data, loading, error } = useResumeData()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#11ABB0] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-slate-500 text-sm">
        Failed to load portfolio data.
      </div>
    )
  }

  return <BentoGrid data={data} />
}
