// src/App.jsx
// Root component. Manages which page is active and renders the layout shell.

import React, { useState } from 'react'
import Sidebar      from './components/Sidebar'
import Overview     from './pages/Overview'
import ProcessMining from './pages/ProcessMining'
import Bottlenecks  from './pages/Bottlenecks'
import Suppliers    from './pages/Suppliers'
import Alerts       from './pages/Alerts'

const PAGES = {
  'overview':       <Overview />,
  'process-mining': <ProcessMining />,
  'bottlenecks':    <Bottlenecks />,
  'suppliers':      <Suppliers />,
  'alerts':         <Alerts />,
}

const PAGE_LABELS = {
  'overview':       'Overview',
  'process-mining': 'Process Mining',
  'bottlenecks':    'Bottlenecks',
  'suppliers':      'Suppliers',
  'alerts':         'Alerts',
}

export default function App() {
  const [activePage, setActivePage] = useState('overview')

  return (
    <div className="flex min-h-screen bg-surface-900 text-slate-200">
      {/* Sidebar */}
      <Sidebar current={activePage} onChange={setActivePage} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-surface-900/80 backdrop-blur border-b border-surface-500/40">
          <h1 className="text-sm font-semibold text-slate-200">
            {PAGE_LABELS[activePage]}
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-ok inline-block animate-pulse" />
            Live · FastAPI backend
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {PAGES[activePage]}
        </main>
      </div>
    </div>
  )
}
