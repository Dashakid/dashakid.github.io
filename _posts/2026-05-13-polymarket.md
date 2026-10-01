---
title: "Kakashi postmortem: the strategy worked, the exchange didn't"
short: Kakashi
excerpt: >-
  A Polymarket copy-trader on EC2 that mirrors high-conviction positions from top wallets.
  Paper trading validated it. Then an exchange-side CLOB order version mismatch rejected
  every live order.
topics: [trading]
status: Paper-validated
specs:
  - [Signal, ≥10% 7d vol]
  - [Host, EC2]
  - [Status, Paper]
---

A Polymarket copy-trading bot deployed to EC2. It tracks top wallets and mirrors high-conviction positions through a risk-gate stack.

## Copy-trade flow

1. **Top-wallet tracker:** Polymarket leaderboard and position ingest.
2. **Conviction filter:** signal only when a bet is at least 10% of that wallet's 7-day volume.
3. **Risk gate stack:** confidence thresholds, exposure caps.
4. **CLOB execution:** order placement against Polymarket's book.

## Postmortem

| | |
|:--- | :--- |
| **Validated** | Paper trading confirmed the copy-strategy edge end to end on EC2. |
| **Blocked** | An exchange-side CLOB order version mismatch rejected live orders. A bug on their end, not the strategy's. |
| **Status** | Infrastructure intact and redeployable. Live trading waits on the exchange fix. |

---

## From the original write-up (May 2026)

<!-- This section is the May 2026 write-up, kept as published apart from its "live since April" status line. Trim it if parts no longer apply. -->

A multi-signal prediction market system with wallet intelligence and risk-gated CLOB execution. The core mission: identify mispriced prediction markets and execute with confidence-weighted position sizing and hard risk controls.

### The signal pipeline

1. **Market inputs:** ingests Kraken OHLCV, Polymarket order books, top-wallet on-chain activity, and macro/event context in real time via WebSocket.
2. **Feature layer:** engineers signals: Bollinger Bands, RSI, momentum, token normalization, wallet conviction ranking, volatility, and edge calculations.
3. **Decision layer:** routes signals across concurrent strategies (directional, market-making, wallet-following, arbitrage, event forecasting).
4. **Risk gate stack:** validates confidence threshold, edge minimum, exposure cap, and position guards before any order is approved.
5. **Executor (CLOB):** creates, routes, and posts orders with stateful retries and fill handling.
6. **Operator feedback:** Discord alerts, process monitor, trade logs, win/loss dashboards, and analytics state via PostgreSQL.

### Risk gate stack

Every order passes through a multi-layer gate before execution. If any layer fails, the order is blocked and logged. The system never silently skips a check.

| Layer | Component | Function |
|:--- | :--- | :--- |
| **Layer 1** | **Confidence threshold** | Blocks any signal below 60% model confidence. |
| **Layer 2** | **Edge minimum** | Requires at least 3% edge over market implied probability. |
| **Layer 3** | **Exposure cap** | Hard cap on total portfolio exposure. No exceptions. |
| **Layer 4** | **Deduplication guard** | Prevents double-entry on the same market across strategies. |
| **Layer 5** | **Inventory guard** | Tracks open positions and blocks conflicting directional exposure. |
| **Layer 6** | **Timeout exit** | Forces position closure if hold time exceeds configured maximum. |

### Logic highlight: confidence-weighted sizing

Position size scales with signal confidence and edge. High-conviction signals get larger allocation; weak signals get minimum size or are blocked entirely.

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

### Tech stack

- **Execution:** Polymarket CLOB API, Kraken WebSocket API.
- **Orchestration:** Python asyncio, multi-strategy concurrent runners.
- **State management:** Redis (real-time order book, deduplication), PostgreSQL (trade logs, analytics).
- **Risk controls:** custom risk gate engine with 6 validation layers.
- **Infrastructure:** Docker, environment-based config, unless-stopped restart policy.
- **Observability:** Discord webhooks (live alerts), structured logging, win/loss dashboards.
