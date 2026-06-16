// src/pages/Overview.jsx
// Pulls /summary and shows fleet-level KPIs + status distribution donut.

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useFetch } from '../hooks/useFetch'
import { fallbackSummary } from '../data/fallback'
import { StatCard, LoadingCard, ErrorBanner, SectionHeading } from '../components/UI'

const PIE_COLORS = { Completed: '#10b981', Delayed: '#f59e0b', Failed: '#ef4444' }

export default function Overview() {
  const { data, loading, error } = useFetch(
  'https://supply-chain-resilience-dashboard.onrender.com/summary',
  fallbackSummary
)

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} rows={2} />)}
    </div>
  )

  const pieData = [
    { name: 'Completed', value: data.completed_orders },
    { name: 'Delayed',   value: data.delayed_orders },
    { name: 'Failed',    value: data.failed_orders },
  ]

  return (
    <div className="space-y-6">
      {error && <ErrorBanner message={error} />}

      <div>
        <h1 className="text-xl font-semibold text-slate-100 mb-1">Fleet Overview</h1>
        <p className="text-sm text-slate-400">Aggregated health metrics across all tracked orders.</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Orders"      value={data.total_orders}        accent />
        <StatCard label="Completed"         value={data.completed_orders}    sub={`${data.completion_rate_pct}% on-time`} />
        <StatCard label="Delayed"           value={data.delayed_orders}      sub={`${data.delay_rate_pct}% of orders`} />
        <StatCard label="Failed"            value={data.failed_orders}       sub={`${data.failure_rate_pct}% of orders`} />
        <StatCard label="Avg Delay (hrs)"   value={data.avg_delay_hours}     sub="across delayed orders" />
        <StatCard label="Top Supplier"      value={data.top_supplier}  />
        <StatCard label="Top Warehouse"     value={data.top_warehouse} />
      </div>

      {/* Status distribution donut */}
      <div className="card">
        <SectionHeading>Order Status Distribution</SectionHeading>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%" cy="50%"
              innerRadius={70} outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {pieData.map(entry => (
                <Cell key={entry.name} fill={PIE_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#1a2235', border: '1px solid #2a3a52', borderRadius: 8 }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={v => <span className="text-slate-300 text-xs">{v}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
