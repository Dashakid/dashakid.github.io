# Eco-Logistics Travel Friction Index System

## 🎯 Project Overview

A **production-grade API orchestration system** that aggregates real-time data from multiple third-party APIs to calculate a comprehensive "Travel Friction Index" for logistics operations. This project demonstrates advanced data engineering, multi-API integration, and data-driven decision making.

The system analyzes environmental, meteorological, and financial factors across global cities to assess operational viability and risk levels for eco-logistics deployments.

---

## 🏗️ Architecture

### Modular API Client Design
The system integrates four specialized API clients, each handling a specific domain:

| Client | API Source | Purpose |
|--------|-----------|---------|
| **Geocoder** | OpenMeteo Geocoding API | Convert city names to coordinates |
| **Weather** | OpenMeteo Weather API | Fetch real-time weather metrics (wind, precipitation, temperature) |
| **Aviation** | OpenSky Network API | Query real-time flight data within radius |
| **Finance** | Currency Exchange API | Retrieve exchange rates by country code |

### Master Orchestrator
The core `orchestrator.py` module acts as a conductor:
- **Sequentially calls all 4 APIs** based on a single city input
- **Merges heterogeneous data** into a unified dictionary structure
- **Flattens nested JSON** into Pandas DataFrames for analysis
- **Calculates friction metrics** based on composite environmental factors
- **Generates risk assessments** with classification (LOW/MEDIUM/HIGH/CRITICAL)

---

## ⭐ Key Features & Highlights

### 1. **Friction Index Calculation**
Custom algorithm that synthesizes:
- Weather intensity (wind speed, precipitation)
- Temperature variance impact
- Aviation throughput (flight density)
- Financial volatility (exchange rate fluctuations)

**Result:** Single 0-100 risk score enabling quick operational decisions

### 2. **Multi-City Comparison**
Analyze and compare travel conditions across multiple cities simultaneously:
- Side-by-side friction score comparison
- Relative risk assessment
- Exchange rate impact analysis
- Weather pattern correlation

### 3. **Interactive Data Analysis**
Jupyter notebooks with:
- **Real-time orchestration pipeline** execution
- **Multi-panel visualizations** (gauges, bar charts, pie charts)
- **Statistical summaries** with aggregated metrics
- **Data preview tables** for transparency

### 4. **Modular & Highly Reusable**
- **Error handling & fallback mechanisms** for API failures
- **Type hints & Pydantic models** for data validation
- **Timeout management** for reliable API calls
- **Extensible design** - easy to add new data sources

### 5. **Production-Ready Stack**
- **FastAPI** - High-performance async API framework
- **Pandas** - Powerful data manipulation and analysis
- **Plotly** - Interactive visualizations
- **Python-dotenv** - Secure credential management
- **Pydantic** - Data validation and schema management

---

## 📊 Data Pipeline

```
City Name Input
    ↓
[Geocoder] → Get Coordinates & Country Code
    ↓
[Weather] → Fetch Real-time Conditions
    ↓
[Aviation] → Query Active Flights
    ↓
[Finance] → Retrieve Exchange Rate
    ↓
[Merge] → Unified Data Dictionary
    ↓
[Flatten] → Pandas DataFrame
    ↓
[Calculate Friction Index] → Risk Score & Level
    ↓
[Visualization & Analytics] → Dashboards & Reports
```

---

## 🎓 Technical Highlights

### Error Resilience
- Graceful degradation when APIs are unavailable
- Mock data fallback for non-critical failures
- Detailed logging at each orchestration step

### Data Quality
- Structured data validation using Pydantic
- Type safety throughout the pipeline
- Automatic timezone handling for weather data

### Scalability Considerations
- Efficient DataFrame operations for batch processing
- Asynchronous-ready architecture with FastAPI
- Parameterized search radius for aviation queries

### User Experience
- Color-coded risk indicators (🟢 🟡 🟠 🔴)
- Intuitive progress indicators (✅ ❌ 🚀)
- Human-readable summary reports

---

## 💡 Use Cases

✈️ **Logistics Operations** - Assess delivery viability in target cities
💰 **Financial Planning** - Factor in currency volatility for international shipments
🌍 **Route Optimization** - Compare friction metrics across potential hubs
📈 **Risk Management** - Forecast operational challenges based on multi-factor analysis
🔍 **Competitive Intelligence** - Identify high-friction vs. low-friction markets

---

## 🚀 Quick Start

```bash
# Install dependencies
pip install -r Requirement.txt

# Run the analysis pipeline
python App/main.py

# Or launch interactive Jupyter analysis
jupyter notebook App/processing/analysis.ipynb
```

---

## 📁 Project Structure

```
Orchestrator/
├── App/
│   ├── app.py                 # FastAPI application
│   ├── main.py                # CLI entry point
│   ├── orchestrator.py         # Master orchestrator logic
│   ├── clients/                # API client modules
│   │   ├── geocoder.py        # OpenMeteo Geocoding
│   │   ├── weather.py         # OpenMeteo Weather
│   │   ├── aviation.py        # OpenSky Network
│   │   ├── finance.py         # Currency Exchange
│   │   └── *.ipynb            # Interactive API exploration
│   └── processing/
│       ├── analysis.ipynb     # Jupyter analytics pipeline
│       └── analytics.py       # Analysis functions
├── Requirement.txt            # Dependencies
└── run_streamlit.sh          # Streamlit dashboard launcher
```

---

## 🔑 Key Learnings & Skills Demonstrated

✅ **API Integration** - Managing multiple third-party APIs with different schemas
✅ **Data Engineering** - Flattening, transforming, and analyzing nested JSON structures
✅ **Software Architecture** - Modular design patterns and separation of concerns
✅ **Data Science** - Custom scoring algorithms and statistical analysis
✅ **DevOps Thinking** - Error handling, logging, and operational monitoring
✅ **Full-Stack Python** - FastAPI, Pandas, ETL pipelines, Jupyter workflows
✅ **Portfolio Communication** - Clear reporting and interactive visualizations

---

## 🎯 Why This Project Matters

This project moves **beyond simple API calls** to demonstrate:
- **Real-world complexity** (multiple data sources, validation, error handling)
- **Business value** (actionable risk scoring and comparative analysis)
- **Production readiness** (type safety, testing, documentation, logging)
- **Scalable thinking** (modular architecture for future expansion)

It's a **complete data product** - from raw API data to actionable intelligence.

---

*Last Updated: April 2026*
