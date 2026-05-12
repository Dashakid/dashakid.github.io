---
layout: default
title: AI Stock Alert Bot
---

[← Back to Portfolio](../../index.html)

# 📈 AI Stock Alert Telegram Bot
### A fully automated stock screening system that scans the S&P 500 + Russell 2000 daily and delivers AI-powered alerts directly to Telegram.

> **Status:** Live in production.
> **Core Mission:** Eliminate manual stock screening by combining fundamental analysis, news sentiment, and AI summarization into a single structured daily alert.

---

## 🏗 System Architecture

The bot runs a full screening pipeline every weekday at 7:00 AM ET — before US markets open. It scans the full S&P 500 and Russell 2000 universe, filters for stocks that pass all required criteria, and pushes formatted alerts to subscribed Telegram chats automatically.

### The Screening Pipeline

1. **Universe Builder:** Pulls S&P 500 and Russell 2000 tickers, merges, deduplicates, and normalizes the full scan list.
2. **Fundamental Data:** Fetches revenue growth, gross margins, P/E, debt-to-equity, insider trades, and institutional holders via FMP API.
3. **News Ingestion:** Pulls recent news via Finnhub. Auto-falls back to FMP news if Finnhub fails — never silently skips.
4. **Screener:** Runs each ticker through all required pass/fail gates. Only stocks clearing every gate proceed.
5. **AI Summarization:** Passes passing tickers to Gemini for a short analyst-style summary. Falls back to static text if Gemini is unavailable.
6. **Alert Delivery:** Formats and sends structured Telegram alerts to all subscribed chats.
7. **Scheduler:** APScheduler runs the full pipeline Monday–Friday at 7:00 AM ET, coalesced, max 1 instance.

---

## 🎯 Screening Logic

A stock only passes if it clears **every** required gate — designed for high precision over high recall.

| Signal | Requirement | Source |
|:--- | :--- | :--- |
| **Revenue Growth** | ≥ 30% YoY | FMP Financials |
| **Consecutive Growth** | 2+ consecutive quarters | FMP Quarterly |
| **News Catalyst** | Required keyword in recent news | Finnhub / FMP News |
| **Margin Quality** | Stable or improving gross margin | FMP Key Metrics |

Additional context signals computed for each alert:

- P/E level and valuation flag
- Debt-to-equity ratio
- Institutional accumulation signal
- Insider buying / selling activity
- Competition risk mentions in news

---

## ⚙️ Logic Highlight: The Screener

```python
def passes_screening(ticker_data: dict) -> bool:
    """
    A stock passes only if ALL required signals are present.
    Designed for high precision over high recall.
    """
    revenue_growth = ticker_data["revenue_growth_yoy"]
    consecutive_quarters = ticker_data["consecutive_growth_quarters"]
    has_catalyst = ticker_data["news_catalyst_detected"]
    margin_ok = ticker_data["margin_stable_or_improving"]

    if revenue_growth < 0.30:
        return False
    if consecutive_quarters < 2:
        return False
    if not has_catalyst:
        return False
    if not margin_ok:
        return False

    return True
```

---

## 📬 Alert Output Format

Every Telegram alert includes:

- Stock header with ticker symbol
- ✅ **Pros** — positive signals detected
- ❌ **Cons** — risk flags identified
- 📋 **Binary checklist** — checkmark or cross per screening criterion
- ⚡ **AI summary** — Gemini-generated analyst paragraph
- Suggested next action (`/analyse TICKER`)

Users can also query any ticker directly in Telegram. If a ticker is detected in free text, the bot enriches the prompt with live market context before passing it to Gemini for real-time Q&A.

---

## 🛡 Resilience & Fallback Behavior

| Failure Scenario | Behavior |
|:--- | :--- |
| Finnhub news fails | Auto-switches to FMP news fallback, logs failure |
| Gemini summarization fails | Alert still sends with static fallback text |
| Per-ticker exception during scan | Logged and skipped — never crashes full scan |
| No subscribed chats | Daily scan safely skipped with warning log |
| Missing FMP key | Bot starts with limited capability, logs warning |

---

## 🛠 Tech Stack

- **Bot Framework:** python-telegram-bot.
- **AI Summarization:** Google Gemini API.
- **Market Data:** Financial Modeling Prep (FMP), Finnhub.
- **Scheduling:** APScheduler (America/New_York timezone, weekdays only).
- **Infrastructure:** Docker, python-dotenv, structured logging.

---

## 🚀 Commands

| Command | Function |
|:--- | :--- |
| `/start` | Subscribe current chat to daily alerts |
| `/stop` | Unsubscribe from daily alerts |
| `/analyse TICKER` | Full fundamental + news analysis for any ticker |
| `/technicals TICKER` | RSI, MACD, Bollinger Bands with plain-English interpretation |
| `/scan10` | Dry run — scans 10 tickers and returns matching alerts |
| Free text | AI-powered Q&A — detects tickers and enriches with live data |

---

[← Back to Portfolio](../../index.html)
