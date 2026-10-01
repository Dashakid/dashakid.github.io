---
title: "Stock trading bot: momentum rotation with a crash guard"
short: Stock trading bot
excerpt: >-
  An ML momentum-rotation strategy on the Nasdaq-100: 126-day lookback, monthly rebalance.
  CatBoost scores the universe. A crash guard and a sector cap keep the book honest when
  the regime turns.
topics: [trading, ml]
status: Live · Alpaca paper · Apr 2026
live: true
specs:
  - [Universe, NDX-100]
  - [Lookback, 126d]
  - [Rebalance, Monthly]
---

An ML momentum-rotation strategy trading the Nasdaq-100, live on Alpaca paper trading since April 2026.

## Strategy flow

1. **Alpaca WebSocket:** Nasdaq-100 quotes and daily bars, auto-reconnect with backoff.
2. **Redis cache + Postgres:** hot tick fan-out, 126 days of price history.
3. **CatBoost momentum scorer:** ranks the universe on 126-day lookback features.
4. **Monthly rebalance planner:** target weights, turnover-aware rotation.
5. **Risk gates → Alpaca paper:** crash guard, sector cap, idempotent orders, full audit trail.

## Risk rules

| Rule | What it does |
|:--- | :--- |
| **Crash guard** | Regime filter. When the index breaks trend, the book rotates to cash instead of chasing momentum down. |
| **Sector cap** | Concentration ceiling so a hot sector can't own the whole portfolio. |
| **Paper first** | Live on Alpaca paper since April 2026. The real execution path, zero live capital until the track record earns it. |
| **Monthly cadence** | Rebalance is scheduled, not reactive. No intraday overtrading. |

## Tech stack

CatBoost, FastAPI, Redis, PostgreSQL, Alpaca WebSocket.

---

## From the original write-up (April 2026)

<!-- This section is the April 2026 write-up, kept as published. It describes a LangGraph + Claude architecture; trim or delete it if it no longer applies. -->

> **Status at the time:** Phase 10, 14-day paper trading validation.
> **Core mission:** Execute high-probability trades with "Defense in Depth" safety protocols.

The bot operated as a stateful graph where each node is a specialized agent, so market data, sentiment, and risk are analyzed in a strict, logical sequence.

### The LangGraph pipeline

1. **Scanner:** ranks top tickers (AAPL, NVDA, etc.) via Claude based on momentum and volatility.
2. **Market data:** fetches OHLCV data and computes technical indicators (**RSI, MACD, Bollinger Bands**).
3. **Research:** aggregates news sentiment and fundamental analysis.
4. **Strategy:** Claude synthesizes data into a concrete signal (entry, SL, TP).
5. **Risk gate:** a 6-layer validation check (circuit breaker, position limits, R:R ratio).
6. **Human gate:** terminal-based approval interrupt for final execution authority.
7. **Executor:** automated order submission to the **Alpaca API**.
8. **Journal:** post-trade analysis saved to **PostgreSQL** for continuous learning.

### "Defense in depth" safety system

Capital preservation is more important than profit.

| Layer | Component | Function |
|:--- | :--- | :--- |
| **Layer 1** | **Redis circuit breaker** | Hard-stop on all trading if daily loss hits **$150**. |
| **Layer 2** | **Paper guard** | Hard-coded block that prevents live execution unless two separate flags are met. |
| **Layer 3** | **Risk gate** | Validates risk/reward is **≥ 2.0** and position size is capped at **$500**. |
| **Layer 4** | **Human-in-the-loop** | Requires manual approval in the terminal before any order hits the broker. |

### Backtesting

A dedicated backtesting engine (`scripts/backtest.py`) replicates live signal logic without LLM costs: long-only momentum, 3% stop loss / 6% take profit, with Sharpe ratio, profit factor and max drawdown tracked by the journal agent.

### Graduation criteria (paper → live)

1. Zero unhandled exceptions over 14 days.
2. At least 20 full cycles completed.
3. Safety block rate remains below 30%.
4. 100% adherence to the $500 position limit.
