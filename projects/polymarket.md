<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Polymarket Bot | Gian-Carlo Javier</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #ff479c;
            --secondary: #9d50bb;
            --bg: #0b0f1a;
            --card-bg: rgba(30, 41, 59, 0.5);
            --text: #f8fafc;
            --text-dim: #94a3b8;
            --glow: 0 0 15px rgba(255, 71, 156, 0.4);
        }
 
        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 0;
            background-image: radial-gradient(circle at 50% -20%, #1e293b 0%, #0b0f1a 80%);
        }
 
        .page-wrap { max-width: 860px; margin: 0 auto; padding: 3rem 2rem 6rem; }
 
        .back-link {
            display: inline-block;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            color: var(--text-dim);
            text-decoration: none;
            margin-bottom: 2.5rem;
            transition: color 0.2s;
        }
        .back-link:hover { color: var(--primary); }
 
        .author {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 0.75rem;
        }
 
        h1 {
            font-size: 2.4rem;
            font-weight: 800;
            margin: 0 0 1rem;
            line-height: 1.2;
            letter-spacing: -0.5px;
        }
 
        .subtitle {
            color: var(--text-dim);
            font-size: 1.05rem;
            line-height: 1.7;
            margin-bottom: 2rem;
        }
 
        .impact-box {
            background: rgba(255, 71, 156, 0.07);
            border: 1px solid rgba(255, 71, 156, 0.25);
            border-radius: 14px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 3rem;
            font-size: 0.95rem;
            color: var(--text-dim);
            line-height: 1.6;
        }
        .impact-box strong { color: var(--text); }
 
        .live-badge {
            display: inline-block;
            background: rgba(34, 197, 94, 0.1);
            color: #22c55e;
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 20px;
            padding: 3px 12px;
            font-size: 0.7rem;
            font-family: 'JetBrains Mono', monospace;
            letter-spacing: 1px;
            margin-left: 12px;
            vertical-align: middle;
        }
        .live-badge::before {
            content: "● ";
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
 
        h2 {
            font-size: 1.3rem;
            font-weight: 700;
            margin: 3rem 0 1rem;
            color: var(--text);
            display: flex;
            align-items: center;
            gap: 10px;
        }
 
        p { color: var(--text-dim); line-height: 1.75; font-size: 0.97rem; }
 
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0 2rem;
            font-size: 0.9rem;
        }
        th {
            background: rgba(30, 41, 59, 0.8);
            color: var(--text-dim);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid #334155;
        }
        td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #1e293b;
            color: var(--text-dim);
        }
        tr:hover td { background: rgba(30, 41, 59, 0.4); }
 
        .code-block {
            background: #0d1117;
            border: 1px solid #21262d;
            border-radius: 12px;
            padding: 1.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
        }
        .code-block pre {
            margin: 0;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.82rem;
            line-height: 1.7;
            color: #e6edf3;
        }
        .kw { color: #ff7b72; }
        .fn { color: #d2a8ff; }
        .str { color: #a5d6ff; }
        .cm { color: #8b949e; font-style: italic; }
        .num { color: #79c0ff; }
 
        .tag-group { display: flex; flex-wrap: wrap; gap: 8px; margin: 1rem 0 2rem; }
        .tag {
            background: rgba(157, 80, 187, 0.1);
            color: var(--secondary);
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.72rem;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid rgba(157, 80, 187, 0.2);
        }
 
        .section-divider {
            border: none;
            border-top: 1px solid #1e293b;
            margin: 3rem 0;
        }
 
        ul { color: var(--text-dim); line-height: 1.9; font-size: 0.97rem; padding-left: 1.4rem; }
        ul li { margin-bottom: 0.3rem; }
 
        .arch-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0 2rem;
        }
        .arch-card {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 1.2rem;
        }
        .arch-card-title {
            font-size: 0.75rem;
            font-family: 'JetBrains Mono', monospace;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.6rem;
        }
        .arch-card ul {
            margin: 0;
            padding-left: 1.2rem;
            font-size: 0.85rem;
        }
 
        .comment-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            color: var(--text-dim);
            letter-spacing: 1px;
            opacity: 0.6;
            margin-top: 0.5rem;
        }
    </style>
</head>
<body>
<div class="page-wrap">
 
    <a href="../../index.html" class="back-link">← Back to Portfolio</a>
 
    <div class="author">Gian-Carlo Javier</div>
    <h1>🎯 Polymarket Trading Bot <span class="live-badge">LIVE</span></h1>
    <p class="subtitle">
        A multi-strategy prediction market automation system that ingests real-time data from Kraken and Polymarket, ranks conviction signals from top wallets, and executes trades through a risk-gated CLOB execution layer.
    </p>
 
    <div class="impact-box">
        <strong>Impact:</strong> Fully automated prediction market execution — from raw signal ingestion to order posting — with hard risk controls at every layer. No manual intervention required during operation. Built to run continuously with resilient error handling and live Discord monitoring.
    </div>
 
    <div class="tag-group">
        <span class="tag">PYTHON</span>
        <span class="tag">WEBSOCKET</span>
        <span class="tag">REDIS</span>
        <span class="tag">POSTGRESQL</span>
        <span class="tag">DOCKER</span>
        <span class="tag">CLOB</span>
        <span class="tag">CATBOOST</span>
        <span class="tag">DISCORD ALERTS</span>
    </div>
 
    <h2>🎯 The Problem</h2>
    <p>
        Prediction markets like Polymarket move fast. By the time a human identifies an arbitrage or mispriced market, top-wallet traders have already moved the odds. To compete, you need a system that processes signals in real time, evaluates conviction across multiple strategies simultaneously, and executes with risk controls that prevent runaway exposure.
    </p>
 
    <h2>🚀 The Solution: Multi-Strategy Signal Pipeline</h2>
    <p>
        The bot runs a full signal pipeline — from raw market data ingestion to trade execution — across multiple concurrent strategies. Each strategy evaluates independently, and a central risk gate decides whether to execute, reduce size, or block the order entirely.
    </p>
 
    <hr class="section-divider">
 
    <h2>🏗 System Architecture</h2>
 
    <div class="arch-grid">
        <div class="arch-card">
            <div class="arch-card-title">Market Inputs</div>
            <ul>
                <li>Kraken OHLCV</li>
                <li>Polymarket order books</li>
                <li>Top-wallet activity</li>
                <li>Macro & event context</li>
            </ul>
        </div>
        <div class="arch-card">
            <div class="arch-card-title">Feature Layer</div>
            <ul>
                <li>Bollinger bands, RSI, momentum</li>
                <li>Token & market normalization</li>
                <li>Wallet ranking & conviction</li>
                <li>Volatility & edge calculations</li>
            </ul>
        </div>
        <div class="arch-card">
            <div class="arch-card-title">Decision Layer</div>
            <ul>
                <li>Confidence scoring</li>
                <li>Directional bots</li>
                <li>Wallet-following consensus</li>
                <li>Arbitrage & event forecasting</li>
            </ul>
        </div>
        <div class="arch-card">
            <div class="arch-card-title">Risk Gate Stack</div>
            <ul>
                <li>Confidence & edge thresholds</li>
                <li>Exposure caps & deduplication</li>
                <li>Stops, targets, timeout exits</li>
                <li>Inventory & position guards</li>
            </ul>
        </div>
        <div class="arch-card">
            <div class="arch-card-title">Execution (CLOB)</div>
            <ul>
                <li>Order creation & routing</li>
                <li>Post & stateful retries</li>
                <li>Fill handling</li>
            </ul>
        </div>
        <div class="arch-card">
            <div class="arch-card-title">Operator Feedback</div>
            <ul>
                <li>Discord alerts</li>
                <li>Process monitor</li>
                <li>Trade logs & dashboards</li>
                <li>Win/loss metrics</li>
            </ul>
        </div>
    </div>
 
    <hr class="section-divider">
 
    <h2>⚙️ Logic Highlight: The Risk Gate</h2>
    <p>
        Every order passes through a multi-layer risk gate before execution. If any condition fails, the order is blocked and logged — the system never silently skips a check.
    </p>
 
    <div class="code-block">
        <pre><span class="kw">def</span> <span class="fn">risk_gate</span>(signal: <span class="fn">dict</span>, portfolio: <span class="fn">dict</span>) -> <span class="fn">dict</span>:
    <span class="cm">"""
    Central risk gate — called before every order.
    Returns approved order or rejection with reason.
    """</span>
    confidence = signal[<span class="str">"confidence"</span>]
    edge = signal[<span class="str">"edge"</span>]
    exposure = portfolio[<span class="str">"current_exposure"</span>]
    max_exposure = portfolio[<span class="str">"max_exposure_cap"</span>]
 
    <span class="kw">if</span> confidence < <span class="num">0.60</span>:
        <span class="kw">return</span> {<span class="str">"approved"</span>: <span class="num">False</span>, <span class="str">"reason"</span>: <span class="str">"LOW_CONFIDENCE"</span>}
 
    <span class="kw">if</span> edge < <span class="num">0.03</span>:
        <span class="kw">return</span> {<span class="str">"approved"</span>: <span class="num">False</span>, <span class="str">"reason"</span>: <span class="str">"INSUFFICIENT_EDGE"</span>}
 
    <span class="kw">if</span> exposure >= max_exposure:
        <span class="kw">return</span> {<span class="str">"approved"</span>: <span class="num">False</span>, <span class="str">"reason"</span>: <span class="str">"EXPOSURE_CAP_REACHED"</span>}
 
    size = <span class="fn">calculate_position_size</span>(confidence, edge, portfolio)
    <span class="kw">return</span> {<span class="str">"approved"</span>: <span class="num">True</span>, <span class="str">"size"</span>: size}</pre>
    </div>
    <div class="comment-label">// risk_gate.py — Pre-execution safety layer</div>
 
    <hr class="section-divider">
 
    <h2>📊 Strategy Types</h2>
 
    <table>
        <thead>
            <tr>
                <th>Strategy</th>
                <th>Signal Source</th>
                <th>Edge Type</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Directional Bot</td><td>Kraken OHLCV + technicals</td><td>Price momentum</td></tr>
            <tr><td>Wallet Following</td><td>Top-wallet on-chain activity</td><td>Conviction consensus</td></tr>
            <tr><td>Market Making</td><td>Polymarket order book depth</td><td>Spread capture</td></tr>
            <tr><td>Arbitrage</td><td>Cross-market pricing discrepancy</td><td>Mispricing</td></tr>
            <tr><td>Event Forecasting</td><td>Macro context + news</td><td>Probabilistic edge</td></tr>
        </tbody>
    </table>
 
    <hr class="section-divider">
 
    <h2>🚢 Deployment & Monitoring</h2>
    <ul>
        <li>Dockerized — fully containerized, single-command deploy</li>
        <li>PostgreSQL — persistent trade logs, position state, and win/loss metrics</li>
        <li>Redis — real-time order book state and signal deduplication</li>
        <li>Discord alerts — live trade notifications and system health pings</li>
        <li>Resilient error handling — per-strategy exceptions never crash the main loop</li>
        <li>Stateful retries on CLOB execution — handles partial fills and network drops</li>
    </ul>
 
</div>
</body>
</html>
 
