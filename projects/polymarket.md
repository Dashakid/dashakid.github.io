---
layout: default
title: Polymarket Multi-Strategy Trading Bot
---

[← Back to Portfolio](../../index.html)

# 🎯 Polymarket Multi-Strategy Trading Bot
### A fully automated prediction market system with multi-signal ingestion, wallet intelligence, and risk-gated CLOB execution.

> **Status:** Live in production since April 2026.
> **Core Mission:** Identify mispriced prediction markets and execute with confidence-weighted position sizing and hard risk controls.

---

## 🏗 System Architecture

The bot runs a full signal pipeline — from raw market data ingestion to trade execution — across multiple concurrent strategies. Each strategy evaluates independently, and a central risk gate decides whether to execute, reduce size, or block entirely.

### The Signal Pipeline

1. **Market Inputs:** Ingests Kraken OHLCV, Polymarket order books, top-wallet on-chain activity, and macro/event context in real time via WebSocket.
2. **Feature Layer:** Engineers signals — Bollinger Bands, RSI, momentum, token normalization, wallet conviction ranking, volatility, and edge calculations.
3. **Decision Layer:** Routes signals across five concurrent strategies (directional, market-making, wallet-following, arbitrage, event forecasting).
4. **Risk Gate Stack:** Validates confidence threshold, edge minimum, exposure cap, and position guards before any order is approved.
5. **Executor (CLOB):** Creates, routes, and posts orders with stateful retries and fill handling.
6. **Operator Feedback:** Discord alerts, process monitor, trade logs, win/loss dashboards, and analytics state via PostgreSQL.

---

## 🛡 Risk Gate Stack

Every order passes through a multi-layer gate before execution. If any layer fails, the order is blocked and logged — the system never silently skips a check.

| Layer | Component | Function |
|:--- | :--- | :--- |
| **Layer 1** | **Confidence Threshold** | Blocks any signal below 60% model confidence. |
| **Layer 2** | **Edge Minimum** | Requires at least 3% edge over market implied probability. |
| **Layer 3** | **Exposure Cap** | Hard cap on total portfolio exposure — no exceptions. |
| **Layer 4** | **Deduplication Guard** | Prevents double-entry on the same market across strategies. |
| **Layer 5** | **Inventory Guard** | Tracks open positions and blocks conflicting directional exposure. |
| **Layer 6** | **Timeout Exit** | Forces position closure if hold time exceeds configured maximum. |

---

## 📊 Strategy Types

| Strategy | Signal Source | Edge Type |
|:--- | :--- | :--- |
| **Directional Bot** | Kraken OHLCV + technicals | Price momentum |
| **Wallet Following** | Top-wallet on-chain activity | Conviction consensus |
| **Market Making** | Polymarket order book depth | Spread capture |
| **Arbitrage** | Cross-market pricing discrepancy | Mispricing |
| **Event Forecasting** | Macro context + news | Probabilistic edge |

---

## ⚙️ Logic Highlight: Confidence-Weighted Sizing

Position size scales with signal confidence and edge — high-conviction signals get larger allocation, weak signals get minimum size or are blocked entirely.

```python
def calculate_position_size(confidence: float, edge: float, portfolio: dict) -> float:
    """
    Scales position size based on signal quality.
    Never exceeds portfolio exposure cap regardless of confidence.
    """
    base_size = portfolio["base_position_size"]
    max_size = portfolio["max_position_size"]

    quality_multiplier = (confidence - 0.60) * edge * 10
    raw_size = base_size * (1 + quality_multiplier)

    return min(raw_size, max_size)
```

---

## 🛠 Tech Stack

- **Execution:** Polymarket CLOB API, Kraken WebSocket API.
- **Orchestration:** Python asyncio, multi-strategy concurrent runners.
- **State Management:** Redis (real-time order book, deduplication), PostgreSQL (trade logs, analytics).
- **Risk Controls:** Custom risk gate engine with 6 validation layers.
- **Infrastructure:** Docker, environment-based config, unless-stopped restart policy.
- **Observability:** Discord webhooks (live alerts), structured logging, win/loss dashboards.

---

## 🚀 Production Notes

- Runs continuously — resilient error handling ensures per-strategy exceptions never crash the main loop.
- Stateful retries on CLOB execution handle partial fills and network drops gracefully.
- All trade activity logged to PostgreSQL for post-session analysis and strategy tuning.
- Discord pings on every execution, block, and system health event.

---

[← Back to Portfolio](../../index.html)
