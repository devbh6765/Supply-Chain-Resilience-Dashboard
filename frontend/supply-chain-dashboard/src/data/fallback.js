// src/data/fallback.js
// Used when the FastAPI backend is unreachable.
// Mirrors the exact shape returned by each endpoint.

export const fallbackSummary = {
  total_orders: 30,
  completed_orders: 21,
  delayed_orders: 6,
  failed_orders: 3,
  avg_delay_hours: 14.3,
  completion_rate_pct: 70.0,
  delay_rate_pct: 20.0,
  failure_rate_pct: 10.0,
  most_used_supplier: 'Supplier_A',
  most_used_warehouse: 'Delhi_WH',
}

export const fallbackProcessFlow = {
  activity_sequence: [
    { activity: 'Order Created',         avg_duration_hours: 1.2,  count: 30 },
    { activity: 'Inventory Check',       avg_duration_hours: 3.8,  count: 30 },
    { activity: 'Supplier Confirmation', avg_duration_hours: 18.4, count: 30 },
    { activity: 'Packaging',             avg_duration_hours: 7.1,  count: 30 },
    { activity: 'Shipping',              avg_duration_hours: 31.5, count: 30 },
    { activity: 'Delivery',              avg_duration_hours: 4.2,  count: 30 },
  ],
  status_distribution: { Completed: 170, Delayed: 36, Failed: 18 },
}

export const fallbackBottlenecks = {
  avg_delay_by_activity: {
    'Shipping':              22.4,
    'Supplier Confirmation': 18.1,
    'Packaging':             6.3,
    'Delivery':              4.8,
    'Inventory Check':       3.1,
    'Order Created':         0.9,
  },
  top_bottleneck: { activity: 'Shipping', avg_delay_hours: 22.4 },
  failure_rate_by_activity_pct: {
    'Delivery':              18.3,
    'Supplier Confirmation': 14.2,
    'Inventory Check':       9.1,
    'Shipping':              6.7,
    'Packaging':             3.3,
    'Order Created':         0.0,
  },
  delay_severity_bands: {
    'Shipping':              'High',
    'Supplier Confirmation': 'High',
    'Packaging':             'Medium',
    'Delivery':              'Low',
    'Inventory Check':       'Low',
    'Order Created':         'Low',
  },
  warehouse_hotspots_total_delay_hours: {
    'Delhi_WH':     312.4,
    'Mumbai_WH':    248.1,
    'Bangalore_WH': 189.7,
  },
}

export const fallbackSuppliers = {
  per_supplier: {
    Supplier_A: { total_orders: 11, normal_orders: 8, delayed_orders: 2, failed_orders: 1,
      on_time_rate_pct: 72.7, delay_rate_pct: 18.2, failure_rate_pct: 9.1,
      avg_total_delay_hours: 11.2, max_total_delay_hours: 48.3, reliability_score: 80.2 },
    Supplier_B: { total_orders: 10, normal_orders: 6, delayed_orders: 3, failed_orders: 1,
      on_time_rate_pct: 60.0, delay_rate_pct: 30.0, failure_rate_pct: 10.0,
      avg_total_delay_hours: 19.7, max_total_delay_hours: 72.1, reliability_score: 68.4 },
    Supplier_C: { total_orders: 9, normal_orders: 7, delayed_orders: 1, failed_orders: 1,
      on_time_rate_pct: 77.8, delay_rate_pct: 11.1, failure_rate_pct: 11.1,
      avg_total_delay_hours: 8.4, max_total_delay_hours: 36.0, reliability_score: 78.9 },
  },
  ranking: [
    { rank: 1, supplier: 'Supplier_A', reliability_score: 80.2 },
    { rank: 2, supplier: 'Supplier_C', reliability_score: 78.9 },
    { rank: 3, supplier: 'Supplier_B', reliability_score: 68.4 },
  ],
  summary: {
    total_suppliers: 3,
    avg_reliability_score: 75.8,
    best_supplier: 'Supplier_A',
    worst_supplier: 'Supplier_B',
  },
}

export const fallbackAlerts = {
  risk_summary: {
    overall_health: 'WARNING',
    total_orders_analyzed: 30,
    failed_orders: 3,
    delayed_orders: 6,
    total_alerts_raised: 11,
    high_severity_alerts: 4,
    medium_severity_alerts: 4,
    low_severity_alerts: 3,
  },
  alert_counts: {
    CRITICAL_DELAY: 2,
    FAILED_ORDER: 3,
    LOW_INVENTORY: 2,
    HIGH_SUPPLIER_RISK: 1,
    BOTTLENECK_STEP: 3,
  },
  alerts: [
    { type: 'FAILED_ORDER',      severity: 'HIGH',   case_id: 'CASE_003', failed_at_activity: 'Supplier Confirmation', supplier: 'Supplier_B', message: 'Order CASE_003 failed at Supplier Confirmation step.', recommended_action: 'Review supplier contract and initiate replacement order.' },
    { type: 'FAILED_ORDER',      severity: 'HIGH',   case_id: 'CASE_017', failed_at_activity: 'Delivery',              supplier: 'Supplier_A', message: 'Order CASE_017 failed at Delivery step.',              recommended_action: 'Review supplier contract and initiate replacement order.' },
    { type: 'CRITICAL_DELAY',    severity: 'HIGH',   case_id: 'CASE_009', message: 'Order CASE_009 has accumulated 63.2 hours of delay.',  recommended_action: 'Escalate to logistics manager and check supplier status.' },
    { type: 'CRITICAL_DELAY',    severity: 'HIGH',   case_id: 'CASE_022', message: 'Order CASE_022 has accumulated 51.8 hours of delay.',  recommended_action: 'Escalate to logistics manager and check supplier status.' },
    { type: 'LOW_INVENTORY',     severity: 'MEDIUM', warehouse: 'Delhi_WH',     message: 'Inventory at Delhi_WH dropped to 28 units during Inventory Check.', recommended_action: 'Trigger replenishment order immediately.' },
    { type: 'LOW_INVENTORY',     severity: 'MEDIUM', warehouse: 'Mumbai_WH',    message: 'Inventory at Mumbai_WH dropped to 41 units during Packaging.',       recommended_action: 'Trigger replenishment order immediately.' },
    { type: 'HIGH_SUPPLIER_RISK',severity: 'MEDIUM', supplier: 'Supplier_B',    failure_rate_pct: 22.4, message: 'Supplier_B has a 22.4% failure rate.',         recommended_action: 'Audit supplier SLA and consider diversifying sourcing.' },
    { type: 'BOTTLENECK_STEP',   severity: 'LOW',    activity: 'Shipping',              avg_delay_hours: 22.4, message: 'Shipping averages 22.4 hrs of delay.',              recommended_action: 'Investigate process inefficiencies at this step.' },
    { type: 'BOTTLENECK_STEP',   severity: 'LOW',    activity: 'Supplier Confirmation', avg_delay_hours: 18.1, message: 'Supplier Confirmation averages 18.1 hrs of delay.', recommended_action: 'Investigate process inefficiencies at this step.' },
  ],
}
