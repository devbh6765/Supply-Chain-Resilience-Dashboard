// src/components/UI.jsx
// Reusable primitive components used across all pages.

import React from 'react'

// ── Loading skeleton ──────────────────────────────────────────────────────────
export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-surface-500/50 rounded-lg ${className}`} />
  )
}

// ── Full-page / card loading state ────────────────────────────────────────────
export function LoadingCard({ rows = 4 }) {
  return (
    <div className="card space-y-3">
      <Skeleton className="h-4 w-32" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full" />
      ))}
    </div>
  )
}

// ── Error/fallback banner ──────────────────────────────────────────────────────
export function ErrorBanner({ message }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-900/30 border border-amber-700/40 text-amber-400 text-sm">
      <span className="text-base">⚠</span>
      <span>Backend unavailable — showing sample data. ({message})</span>
    </div>
  )
}

// ── KPI stat card ─────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, accent = false }) {
  return (
    <div className={`card flex flex-col gap-1 ${accent ? 'border-accent/40 bg-accent-muted/20' : ''}`}>
      <p className="card-title mb-0">{label}</p>
      <p className={`stat-value ${accent ? 'text-accent' : ''}`}>{value}</p>
      {sub && <p className="stat-label">{sub}</p>}
    </div>
  )
}

// ── Section heading inside a page ─────────────────────────────────────────────
export function SectionHeading({ children }) {
  return (
    <h2 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
      <span className="block w-1 h-4 bg-accent rounded-full" />
      {children}
    </h2>
  )
}

// ── Severity badge ─────────────────────────────────────────────────────────────
export function SeverityBadge({ severity }) {
  const map = {
    HIGH:       'badge-danger',
    MEDIUM:     'badge-warn',
    LOW:        'badge-info',
    Completed:  'badge-ok',
    Delayed:    'badge-warn',
    Failed:     'badge-danger',
    GOOD:       'badge-ok',
    WARNING:    'badge-warn',
    CRITICAL:   'badge-danger',
  }
  return <span className={`badge ${map[severity] ?? 'badge-neutral'}`}>{severity}</span>
}

// ── Simple horizontal progress bar ────────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = 'bg-accent' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="h-1.5 w-full bg-surface-500 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
export function EmptyState({ message = 'No data available.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-2">
      <span className="text-4xl">◫</span>
      <p className="text-sm">{message}</p>
    </div>
  )
}
