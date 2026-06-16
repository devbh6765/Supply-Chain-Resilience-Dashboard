# Supply Chain Resilience Dashboard — Frontend

React + Tailwind UI that connects to your FastAPI backend.

## Project Structure

```
supply-chain-dashboard/
├── index.html                  ← HTML entry point (loads fonts)
├── package.json                ← Dependencies
├── vite.config.js              ← Dev server + API proxy to :8000
├── tailwind.config.js          ← Custom color tokens (surface, accent, etc.)
├── postcss.config.js
└── src/
    ├── main.jsx                ← React root mount
    ├── App.jsx                 ← Layout shell + page routing
    ├── index.css               ← Tailwind + global component classes
    ├── data/
    │   └── fallback.js         ← Dummy data used when API is offline
    ├── hooks/
    │   └── useFetch.js         ← Generic fetch hook with loading/error/fallback
    ├── components/
    │   ├── Sidebar.jsx         ← Left nav rail (collapses on mobile)
    │   └── UI.jsx              ← StatCard, Skeleton, Badge, ProgressBar, etc.
    └── pages/
        ├── Overview.jsx        ← /summary  → KPI cards + donut chart
        ├── ProcessMining.jsx   ← /process-flow → pipeline + bar chart
        ├── Bottlenecks.jsx     ← /bottlenecks → delay analysis + radar
        ├── Suppliers.jsx       ← /suppliers → scorecard + drill-down
        └── Alerts.jsx          ← /alerts → filterable incident feed
```

## Quick Start

### 1. Install dependencies
```bash
cd supply-chain-dashboard
npm install
```

### 2. Start your FastAPI backend
Make sure your FastAPI app is running on **http://localhost:8000**.
The Vite dev server proxies `/api/*` → `localhost:8000/*` automatically.

```bash
# In your backend directory
uvicorn main:app --reload
```

### 3. Start the frontend
```bash
npm run dev
# Opens at http://localhost:5173
```

## API Endpoints Expected

| Frontend Page   | Calls            |
|-----------------|------------------|
| Overview        | `GET /summary`        |
| Process Mining  | `GET /process-flow`   |
| Bottlenecks     | `GET /bottlenecks`    |
| Suppliers       | `GET /suppliers`      |
| Alerts          | `GET /alerts`         |

If any endpoint is unreachable, the page gracefully falls back to
sample data (defined in `src/data/fallback.js`) and shows a banner.

## Build for Production
```bash
npm run build
# Output in dist/
```
