// src/pages/Suppliers.jsx
// Supplier analysis page driven directly by /suppliers backend endpoint.

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import { useFetch } from '../hooks/useFetch'
import { fallbackSuppliers } from '../data/fallback'

import {
  LoadingCard,
  ErrorBanner,
  SectionHeading,
  StatCard,
  SeverityBadge,
} from '../components/UI'

const RISK_COLORS = {
  HIGH: '#ef4444',
  MEDIUM: '#f59e0b',
  LOW: '#22c55e',
}

export default function Suppliers() {

  const { data, loading, error } = useFetch(
  'https://supply-chain-resilience-dashboard.onrender.com/suppliers',
    fallbackSuppliers
  )

  if (loading) {
    return <LoadingCard rows={6} />
  }

  const suppliers = data?.suppliers ?? []

  const highestRisk =
    suppliers.find(s => s.risk_level === 'HIGH') ??
    suppliers.find(s => s.risk_level === 'MEDIUM') ??
    suppliers[0]

  const mostOrders =
    [...suppliers].sort(
      (a, b) => b.orders_handled - a.orders_handled
    )[0]

  const highestDelay =
    [...suppliers].sort(
      (a, b) => b.average_delay - a.average_delay
    )[0]

  const highestFailure =
    [...suppliers].sort(
      (a, b) => b.failure_rate - a.failure_rate
    )[0]

  const chartData = suppliers.map(s => ({
    supplier: s.supplier,
    averageDelay: s.average_delay,
    risk: s.risk_level,
  }))

  return (
    <div className="space-y-6">

      {error && (
        <ErrorBanner message={error} />
      )}

      <div>
        <h1 className="text-xl font-semibold text-slate-100 mb-1">
          Supplier Analysis
        </h1>

        <p className="text-sm text-slate-400">
          Supplier risk assessment based on delays and failures.
        </p>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          label="Highest Risk Supplier"
          value={highestRisk?.supplier ?? '—'}
          sub={highestRisk?.risk_level ?? '—'}
          accent
        />

        <StatCard
          label="Most Orders Handled"
          value={mostOrders?.supplier ?? '—'}
          sub={`${mostOrders?.orders_handled ?? 0} orders`}
        />

        <StatCard
          label="Highest Avg Delay"
          value={highestDelay?.supplier ?? '—'}
          sub={`${highestDelay?.average_delay ?? 0} h`}
        />

        <StatCard
          label="Highest Failure Rate"
          value={highestFailure?.supplier ?? '—'}
          sub={`${highestFailure?.failure_rate ?? 0}%`}
        />

      </div>

      {/* DELAY CHART */}

      <div className="card">

        <SectionHeading>
          Average Delay by Supplier
        </SectionHeading>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2a3a52"
              vertical={false}
            />

            <XAxis
              dataKey="supplier"
              stroke="#475569"
              tick={{
                fill: '#94a3b8',
                fontSize: 11,
              }}
            />

            <YAxis
              unit="h"
              stroke="#475569"
              tick={{
                fill: '#94a3b8',
                fontSize: 11,
              }}
            />

            <Tooltip
              contentStyle={{
                background: '#1a2235',
                border: '1px solid #2a3a52',
                borderRadius: 8,
              }}
            />

            <Bar
              dataKey="averageDelay"
              name="Average Delay (hours)"
              radius={[4, 4, 0, 0]}
            >

              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={RISK_COLORS[entry.risk]}
                />
              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* SUPPLIER TABLE */}

      <div className="card">

        <SectionHeading>
          Supplier Risk Assessment
        </SectionHeading>

        <table className="table-base">

          <thead>
            <tr>
              <th>Supplier</th>
              <th>Orders Handled</th>
              <th>Average Delay</th>
              <th>Failure Rate</th>
              <th>Risk Level</th>
            </tr>
          </thead>

          <tbody>

            {suppliers.map((supplier) => (

              <tr key={supplier.supplier}>

                <td className="font-medium text-slate-200">
                  {supplier.supplier}
                </td>

                <td className="font-mono">
                  {supplier.orders_handled}
                </td>

                <td className="font-mono">
                  {supplier.average_delay} h
                </td>

                <td className="font-mono">
                  {supplier.failure_rate}%
                </td>

                <td>
                  <SeverityBadge
                    severity={supplier.risk_level}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}