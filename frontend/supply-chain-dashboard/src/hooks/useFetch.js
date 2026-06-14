// src/hooks/useFetch.js
// Generic data-fetching hook with loading, error, and fallback support.
// Usage:  const { data, loading, error } = useFetch('/api/summary', fallbackSummary)

import { useState, useEffect } from 'react'

export function useFetch(url, fallbackData = null) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    let cancelled = false   // prevent state update after unmount

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          // Use fallback data so the UI still renders something useful
          if (fallbackData) setData(fallbackData)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [url])   // re-fetch if URL changes

  return { data, loading, error }
}
