import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { fallbackProcessFlow } from '../data/fallback'

import {
  LoadingCard,
  ErrorBanner,
  SectionHeading,
  StatCard
} from '../components/UI'

export default function ProcessMining() {

  const { data, loading, error } = useFetch(
    '/api/process-flow',
    fallbackProcessFlow
  )

  if (loading) return <LoadingCard rows={6} />

  const {
    most_common_flow = [],
    occurrences = 0,
    total_variants = 0,
    variant_counts = [],
    transition_times = []
  } = data

  const slowestTransition =
    transition_times.length > 0
      ? transition_times.reduce(
          (a, b) =>
            b.avg_hours > a.avg_hours ? b : a
        )
      : null

  return (
    <div className="space-y-6">

      {error && (
        <ErrorBanner message={error} />
      )}

      <div>
        <h1 className="text-xl font-semibold text-slate-100 mb-1">
          Process Mining
        </h1>

        <p className="text-sm text-slate-400">
          Process discovery and transition analysis from event logs.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <StatCard
          label="Orders Following Main Variant"
          value={occurrences}
          sub="Most common process path"
          accent
        />

        <StatCard
          label="Total Variants"
          value={total_variants}
          sub="Unique process flows discovered"
        />

        <StatCard
          label="Slowest Transition"
          value={
            slowestTransition
              ? `${slowestTransition.avg_hours}h`
              : '—'
          }
          sub={
            slowestTransition
              ? `${slowestTransition.from} → ${slowestTransition.to}`
              : 'No data'
          }
        />

      </div>

      {/* Process Flow */}

      <div className="card">

        <SectionHeading>
          Most Common Process Flow
        </SectionHeading>

        <div className="flex flex-col gap-3">

          {most_common_flow.map((activity, index) => (

            <div
              key={index}
              className="flex flex-col items-center"
            >

              <div className="px-4 py-2 rounded-lg bg-slate-800 text-slate-100">
                {activity}
              </div>

              {index < most_common_flow.length - 1 && (
                <div className="text-slate-500 text-xl">
                  ↓
                </div>
              )}

            </div>

          ))}

        </div>

      </div>

      {/* Transition Times */}

      <div className="card">

        <SectionHeading>
          Average Transition Times
        </SectionHeading>

        <table className="table-base">

          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Average Hours</th>
            </tr>
          </thead>

          <tbody>

            {transition_times.map((item, index) => (

              <tr key={index}>

                <td>{item.from}</td>

                <td>{item.to}</td>

                <td className="font-mono">
                  {item.avg_hours} h
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Variant Analysis */}

      <div className="card">

        <SectionHeading>
          Variant Analysis
        </SectionHeading>

        <table className="table-base">

          <thead>
            <tr>
              <th>Variant</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>

            {variant_counts.map((variant, index) => (

              <tr key={index}>

                <td>
                  {variant.variant}
                </td>

                <td className="font-mono">
                  {variant.count}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}