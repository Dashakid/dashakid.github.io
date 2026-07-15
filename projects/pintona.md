---
layout: default
title: Pintona — AI Wardrobe PWA
---

[← Back to Portfolio](../../index.html)

# 👕 Pintona — AI Wardrobe PWA
### A mobile-first, no-build Progressive Web App: snap your clothes, build outfits, get an honest AI style opinion.

> **Status:** Deployed, live product.
> **Core Mission:** Digital wardrobe + AI styling, shipped as a real installable app — not a demo.

---

## 🏗 Architecture
```

Browser (vanilla JS, ES modules, no build step)
├─ Firebase Auth ────────► Google sign-in
├─ Firestore ─────────────► wardrobe items, outfits, board, style profile
├─ Firebase Storage ──────► garment / reference photos
├─ fetch('/api/gemini') ──► Vercel serverless ──► Gemini 2.5 Flash (AI look feedback)
└─ fetch('/api/removebg') ► Vercel serverless ──► background removal

```
Both serverless routes verify a Firebase ID token before doing any work — no unauthenticated calls to either API.

---

## ⭐ Key Features

- **AI styling feedback** — Gemini 2.5 Flash rates outfits against a chosen "vibe" and the user's own style-reference photos.
- **Wardrobe management** — photo upload, client-side compression, auto-categorization, background removal.
- **Today tab** — AI picks an outfit of the day using the wardrobe, inspiration board, active vibe, and local weather (Open-Meteo, keyless).
- **i18n** — full English / Spanish / Vietnamese translation, switchable in-app.
- **PWA** — installable, offline-aware service worker, works as a real home-screen app on iOS and Android via "Add to Home Screen."

---

## 🛠 Tech Stack

- **Frontend:** Vanilla JS, ES modules, no bundler — zero build-step by design
- **Auth/Data:** Firebase Auth, Firestore, Storage
- **AI:** Gemini 2.5 Flash (styling feedback), background removal pipeline
- **Infra:** Vercel serverless functions (`/api/gemini`, `/api/removebg`), CSP/security headers
- **PWA:** Service worker (network-first HTML/JS, stale-while-revalidate for images/fonts), install manifest

---

## 🎓 Why No Build Step

A deliberate choice: zero tooling means zero drift between what's on disk and what runs. Any file can be opened and understood top to bottom without reverse-engineering a bundle, and deploys are just "copy the files." Bundling/TypeScript would be a deliberate future migration, not incremental drift.

---

[← Back to Portfolio](../../index.html)
