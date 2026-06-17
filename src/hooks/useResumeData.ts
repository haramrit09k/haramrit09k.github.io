import { useState, useEffect } from 'react'
import type { AppResumeData } from '../types/resume'

interface UseResumeDataResult {
  data: AppResumeData | null
  loading: boolean
  error: string | null
}

export function useResumeData(): UseResumeDataResult {
  const [data, setData] = useState<AppResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/resumeData.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<AppResumeData>
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        setError((err as Error).message)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
