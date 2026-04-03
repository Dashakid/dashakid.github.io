---
layout: default
title: AI Trading Bot Architecture
---

[← Back to Portfolio](../index.html)

# 📈 Autonomous AI Trading Bot
### A multi-agent system powered by Claude 3.5, LangGraph, and Alpaca.

> **Status:** Phase 10 — 14-day paper trading validation. 
> **Core Mission:** Execute high-probability trades with "Defense in Depth" safety protocols.

---

## 🏗 System Architecture
The bot operates as a stateful graph where each node is a specialized agent. This ensures that market data, sentiment, and risk are analyzed in a strict, logical sequence.



### The LangGraph Pipeline
1. **Scanner:** Ranks top tickers (AAPL, NVDA, etc.) via Claude based on momentum and volatility.
2. **Market Data:** Fetches OHLCV data and computes technical indicators (**RSI, MACD, Bollinger Bands**).
3. **Research:** Aggregates news sentiment and fundamental analysis.
4. **Strategy:** Claude synthesizes data into a concrete signal (Entry, SL, TP).
5. **Risk Gate:** A 6-layer validation check (Circuit Breaker, Position Limits, R:R Ratio).
6. **Human Gate:** Terminal-based approval interrupt for final execution authority.
7. **Executor:** Automated order submission to **Alpaca API**.
8. **Journal:** Post-trade analysis saved to **PostgreSQL** for continuous learning.

---

## 🛡 "Defense in Depth" Safety System
This bot is designed with the philosophy that **capital preservation is more important than profit.**

| Layer | Component | Function |
|:--- | :--- | :--- |
| **Layer 1** | **Redis Circuit Breaker** | Hard-stop on all trading if daily loss hits **$150**. |
| **Layer 2** | **Paper Guard** | Hard-coded code block that prevents live execution unless two separate flags are met. |
| **Layer 3** | **Risk Gate** | Validates Risk/Reward is **≥ 2.0** and position size is capped at **$500**. |
| **Layer 4** | **Human-in-the-Loop** | Requires manual approval in the terminal before any order hits the broker. |

---

## 📊 Backtesting & Performance
The system includes a dedicated backtesting engine (`scripts/backtest.py`) that replicates live signal logic without LLM costs.
* **Strategy:** Long-only momentum.
* **Risk Management:** 3% Stop Loss / 6% Take Profit.
* **Performance Tracking:** Automated calculation of Sharpe Ratio, Profit Factor, and Max Drawdown via the **Journal Agent**.

---

## 🛠 Tech Stack
* **Orchestration:** LangGraph, LangChain.
* **AI:** Claude 3.5 (Anthropic).
* **Brokerage:** Alpaca Markets (REST API).
* **Data:** yfinance, Pandas, NumPy, TA-Lib.
* **Infrastructure:** Docker, PostgreSQL, Redis.
* **Observability:** LangSmith (tracing), Discord Webhooks (alerts).

---

## 🚀 Graduation Criteria (Paper → Live)
To move from paper trading to live capital, the bot must satisfy 8 strict criteria:
1. Zero unhandled exceptions over 14 days.
2. At least 20 full cycles completed.
3. Safety block rate remains below 30%.
4. 100% adherence to the $500 position limit.

---
[← Back to Portfolio](../index.html)
