# Supply Chain Resilience Dashboard

A full-stack supply chain analytics dashboard built with React, Vite, FastAPI, and Pandas.

## Live Demo

Frontend: https://supply-chain-resilience-dashboard.vercel.app/

Backend API: https://supply-chain-resilience-dashboard.onrender.com

## Features
* Fleet-level supply chain KPIs
* Order completion, delay, and failure metrics
* Supplier and warehouse analytics
* Interactive visualizations
* FastAPI backend with Pandas-based processing
* Responsive React frontend

## Tech Stack

### Frontend

* React
* Vite
* Recharts
* Tailwind CSS

### Backend

* FastAPI
* Pandas
* NumPy

## Local Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### GET /summary

Returns aggregated supply chain metrics used by the dashboard.

## Deployment

Frontend deployed on Vercel.

Backend deployed on Render.
