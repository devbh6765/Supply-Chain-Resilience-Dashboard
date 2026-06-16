// src/components/Sidebar.jsx
// Left navigation rail. Collapses to icon-only on small screens.

import React from 'react'

const NAV_ITEMS = [
  { id: 'overview',       label: 'Overview',       icon: '⬡' },
  { id: 'process-mining', label: 'Process Mining',  icon: '⟳' },
  { id: 'bottlenecks',    label: 'Bottlenecks',     icon: '⚡' },
  { id: 'suppliers',      label: 'Suppliers',       icon: '◈' },
  { id: 'alerts',         label: 'Alerts',          icon: '◉' },
]

export default function Sidebar({ current, onChange }) {
  return (
    <aside className="
      flex flex-col
      w-16 md:w-56
      bg-surface-800
      border-r border-surface-500/50
      h-screen sticky top-0
      shrink-0
      z-10
    ">
      {/* Logo / brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-surface-500/50">
        <span className="text-accent text-xl leading-none">⬡</span>
        <span className="hidden md:block text-sm font-semibold text-slate-200 leading-tight">
          Supply Chain<br />
          <span className="text-slate-400 font-normal">Resilience</span>
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-4 space-y-0.5 px-2">
        {NAV_ITEMS.map(item => {
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-left text-sm font-medium transition-all
                ${active
                  ? 'bg-accent-muted/40 text-accent border border-accent/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface-600/50'}
              `}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span className="hidden md:block">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer metadata */}
      <div className="hidden md:block px-4 py-4 border-t border-surface-500/50">
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Process Mining Research<br />
          v1.0 · FastAPI + Pandas
        </p>
      </div>
    </aside>
  )
}
