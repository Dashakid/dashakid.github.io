---
date: 2026-08-24 14:00:00 -0400
title: "Cold email agent: outreach that stops when someone replies"
short: Cold email agent
excerpt: >-
  An autonomous agent on EC2 that sources leads, writes a personal opener for each one,
  sends on a warmed schedule and watches the inbox. A reply pauses the sequence and goes
  to a human.
topics: [auto]
status: Live · EC2
live: true
specs:
  - [Host, EC2]
  - [Stages, "5"]
  - [Close, Human]
---

An autonomous outreach agent running on EC2 that handles prospecting and email sequencing end to end: sourcing leads, personalizing openers, sending on a warmed schedule, and watching the inbox for replies.

## Agent loop

1. **Prospect sourcing:** list building and enrichment filters.
2. **Personalization:** opener drafted per lead from site and profile context.
3. **Sequencer:** warmed schedule, throttled sends, timezone-aware.
4. **Inbox watcher:** reply detection pauses the sequence instantly.
5. **Handoff:** interested replies surfaced for a human to close.

## Design notes

- **Autonomous:** runs unattended on EC2. Sourcing, sending and monitoring without a babysitter.
- **Deliverability:** warmup ramps and send throttles protect the domain before volume ever scales.
- **Stateful:** every lead tracked through the funnel. No double-sends, no dropped threads.
