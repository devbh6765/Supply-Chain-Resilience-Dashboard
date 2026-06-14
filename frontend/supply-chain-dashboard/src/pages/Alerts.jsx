import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { useFetch } from '../hooks/useFetch'
import { fallbackAlerts } from '../data/fallback'

import {
  LoadingCard,
  ErrorBanner,
  SectionHeading,
  StatCard,
  SeverityBadge,
  EmptyState
} from '../components/UI'

const PIE_COLORS = [
  '#ef4444',
  '#f59e0b',
  '#6366f1'
]

export default function Alerts() {

  const { data, loading, error } = useFetch(
    '/api/alerts',
    fallbackAlerts
  )

  if (loading) {
    return <LoadingCard rows={6} />
  }

  const alerts = data?.alerts || []

  const highCount = alerts.filter(
    a => a.severity === 'HIGH'
  ).length

  const mediumCount = alerts.filter(
    a => a.severity === 'MEDIUM'
  ).length

  const lowCount = alerts.filter(
    a => a.severity === 'LOW'
  ).length

  const pieData = [
    {
      name: 'HIGH',
      value: highCount
    },
    {
      name: 'MEDIUM',
      value: mediumCount
    },
    {
      name: 'LOW',
      value: lowCount
    }
  ].filter(item => item.value > 0)

  return (
    <div className="space-y-6">

      {error && (
        <ErrorBanner message={error} />
      )}

      <div>
        <h1 className="text-xl font-semibold text-slate-100 mb-1">
          Operational Alerts
        </h1>

        <p className="text-sm text-slate-400">
          Automatically generated risk alerts from supply-chain analysis.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <StatCard
          label="Total Alerts"
          value={alerts.length}
          accent
        />

        <StatCard
          label="High Severity"
          value={highCount}
        />

        <StatCard
          label="Medium Severity"
          value={mediumCount}
        />

      </div>

      {/* Severity Chart */}

      <div className="card">

        <SectionHeading>
          Severity Distribution
        </SectionHeading>

        <ResponsiveContainer
          width="100%"
          height={260}
        >

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
              label
            >

              {pieData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      PIE_COLORS[
                        index %
                        PIE_COLORS.length
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Alerts Feed */}

      <div className="card">

        <SectionHeading>
          Active Alerts
        </SectionHeading>

        <div className="space-y-3">

          {alerts.length === 0 ? (

            <EmptyState
              message="No active alerts."
            />

          ) : (

            alerts.map(
              (alert, index) => (

                <div
                  key={index}
                  className="border border-surface-500 rounded-lg p-4"
                >

                  <div className="mb-2">

                    <SeverityBadge
                      severity={
                        alert.severity
                      }
                    />

                  </div>

                  <p className="text-slate-300">

                    {alert.message}

                  </p>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>
  )
}