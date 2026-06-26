# AI-Driven Supply Chain Resilience & Process Mining Platform

An AI-driven decision-support platform that leverages Process Mining, Supply Chain Analytics, and Operational Intelligence to improve supply chain resilience through real-time monitoring, bottleneck detection, supplier analytics, and predictive risk assessment.

## Overview
Modern supply chains generate massive volumes of operational data, yet organizations often struggle to identify bottlenecks, monitor supplier performance, and proactively respond to disruptions.

This project aims to bridge that gap by integrating Process Mining, Supply Chain Analytics, and AI-driven Operational Intelligence into a unified dashboard. The platform enables organizations to monitor operational performance, identify process inefficiencies, detect supply chain risks, and support better decision-making.

## Problem Statement

Modern supply chains operate through highly interconnected networks of suppliers, warehouses, transportation systems, and fulfillment centers. As these networks become more complex, even minor disruptions can quickly propagate across the supply chain, leading to delays, increased operational costs, inventory shortages, and reduced customer satisfaction.
Although organizations generate vast amounts of operational data through ERP systems, logistics platforms, and process execution logs, many still rely on static reports, manually monitored KPIs, and reactive decision-making. This limits process-level visibility, making it difficult to identify where disruptions originate and how they propagate across operations.
To address this challenge, there is a need for a unified decision-support system that combines process mining, supplier analytics, bottleneck detection, and operational monitoring. Such a platform can provide actionable insights into supply chain performance, enabling organizations to proactively identify emerging risks, improve operational visibility, and strengthen overall supply chain resilience.


## Live Demo

Frontend: https://supply-chain-resilience-dashboard.vercel.app/

Backend API: https://supply-chain-resilience-dashboard.onrender.com

## Current Features
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
##Architecture

Operational Data
        │
        ▼
 Event Logs
        │
        ▼
 Data Processing (FastAPI + Pandas)
        │
        ▼
 Analytics Engine
        │
        ▼
 Interactive Dashboard
        │
        ▼
 Decision Support
 
 ## Current Status

✅ Dashboard Prototype

✅ Analytics Modules

✅ Backend APIs

🚧 Industrial Validation

🚧 AI Prediction Modules

🚧 Explainable AI

🚧 Confidence-Aware Risk Assessment

## Future Roadmap

- Industrial Validation
- Company Feedback Integration
- Predictive Process Monitoring
- Confidence-Aware Risk Assessment
- Explainable AI
- Research Publication

## API Endpoints

### GET /summary

Returns aggregated supply chain metrics used by the dashboard.

## Deployment

Frontend deployed on Vercel.

Backend deployed on Render.
