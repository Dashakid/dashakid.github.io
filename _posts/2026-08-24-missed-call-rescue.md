---
date: 2026-08-24 15:00:00 -0400
title: "Missed-Call Rescue: texting back before they call someone else"
short: Missed-Call Rescue
excerpt: >-
  A Twilio SaaS for solo-operator service businesses. An unanswered call gets a text back
  within seconds, a follow-up until the job is booked, and a Google review request once
  it's done.
topics: [auto]
status: Live · clients
live: true
specs:
  - [Text back, "<10s"]
  - [Webhooks, "3"]
  - [Pricing, Setup + monthly]
---

A Twilio-powered SaaS for solo-operator service businesses. When a call goes unanswered it texts the caller back within seconds, follows up until the job is booked, then automates the Google review request afterward. Sold on a setup fee plus monthly retainer.

## Call workflow

1. **Inbound call, no answer:** missed, busy or after-hours.
2. **Twilio status webhook:** fires on call completion with the disposition.
3. **Caller lookup:** CRM match, prior history, spam filter.
4. **Agent drafts the SMS:** context-aware, in the business's voice, under 10 seconds from the missed call.
5. **Follow-up sequence:** polite cadence until booked or opted out.
6. **Google review request:** sent automatically after the job closes, so reviews compound.

## Twilio endpoints

| Endpoint | Job |
|:--- | :--- |
| `POST /voice` | TwiML answer flow: ring, voicemail fallback, whisper. |
| `POST /status` | Status callback → disposition classifier → rescue trigger. |
| `POST /sms` | Two-way thread. Replies route back through the agent. |

## Prompt structure

The system prompt gives the agent the business, the caller's number, the call disposition and any CRM history, and asks for one SMS: warm, specific, under 240 characters, with one clear next step. It is told never to invent availability.

An example thread, with a made-up business:

> **Agent → caller:** Hi! You just called Meridian Dental. Sorry we missed you. Want me to grab you a cleaning slot this week? Reply with a day that works and I'll lock it in.
>
> **Caller:** thursday afternoon?
>
> **Agent → caller:** Thursday 2:40pm is open with Dr. Reyes. Should I book it under this number?
