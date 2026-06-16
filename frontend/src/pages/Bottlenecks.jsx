import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { fallbackBottlenecks } from '../data/fallback'

import {
  LoadingCard,
  ErrorBanner,
  SectionHeading,
  StatCard,
  SeverityBadge
} from '../components/UI'

export default function Bottlenecks() {

  const { data, loading, error } = useFetch(
    '/api/bottlenecks',
    fallbackBottlenecks
  )

  if (loading) return <LoadingCard rows={6} />

  const { bottlenecks = [] } = data

  const totalBottlenecks = bottlenecks.length

  const highestSeverity =
    bottlenecks.some(b => b.severity === 'HIGH')
      ? 'HIGH'
      : bottlenecks.some(b => b.severity === 'MEDIUM')
        ? 'MEDIUM'
        : 'LOW'

  const worstBottleneck =
    bottlenecks.length > 0
      ? bottlenecks.reduce(
          (a, b) =>
            b.max_delay > a.max_delay ? b : a
        )
      : null

  return (
    <div className="space-y-6">

      {error && (
        <ErrorBanner message={error} />
      )}

      <div>
        <h1 className="text-xl font-semibold text-slate-100 mb-1">
          Bottleneck Analysis
        </h1>

        <p className="text-sm text-slate-400">
          Statistical anomaly detection using delay variation analysis.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <StatCard
          label="Total Bottlenecks"
          value={totalBottlenecks}
          sub="Activities flagged as anomalous"
          accent
        />

        <StatCard
          label="Highest Severity"
          value={highestSeverity}
          sub="Most critical anomaly level"
        />

        <StatCard
          label="Worst Activity"
          value={worstBottleneck?.activity ?? '—'}
          sub={
            worstBottleneck
              ? `${worstBottleneck.max_delay}h max delay`
              : 'No bottlenecks detected'
          }
        />

      </div>

      {/* Bottleneck Table */}

      <div className="card">

        <SectionHeading>
          Detected Bottlenecks
        </SectionHeading>

        <table className="table-base">

          <thead>
            <tr>
              <th>Activity</th>
              <th>Mean Delay</th>
              <th>Maximum Delay</th>
              <th>Severity</th>
              <th>Reason</th>
            </tr>
          </thead>

          <tbody>

            {bottlenecks.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-slate-400"
                >
                  No bottlenecks detected.
                </td>
              </tr>
            ) : (
              bottlenecks.map((item) => (
                <tr key={item.activity}>

                  <td className="font-medium text-slate-200">
                    {item.activity}
                  </td>

                  <td className="font-mono">
                    {item.mean_delay}h
                  </td>

                  <td className="font-mono">
                    {item.max_delay}h
                  </td>

                  <td>
                    <SeverityBadge
                      severity={item.severity}
                    />
                  </td>

                  <td className="text-slate-300">
                    {item.reason}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {/* Explanation */}

      <div className="card">

        <SectionHeading>
          Detection Method
        </SectionHeading>

        <div className="text-sm text-slate-300 space-y-2">

          <p>
            The system calculates the average delay and
            standard deviation for every activity in the
            process log.
          </p>

          <p>
            Activities whose delays significantly exceed
            their normal variation are flagged as
            bottlenecks.
          </p>

          <p>
            This approach identifies emerging disruptions
            rather than simply highlighting activities
            with the highest average delay.
          </p>

        </div>

      </div>

    </div>
  )
}