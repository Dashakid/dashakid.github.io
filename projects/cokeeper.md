
---
layout: default
title: CoKeeper AI Architecture
---

[← Back to Portfolio](../index.html)

# 🤖 CoKeeper v5.1 — AI-Powered GL Categorization
### Automating General Ledger classification for accountants using specialized ML pipelines.

> **Impact:** Reduces manual categorization time by ~16×, turning 8 hours of manual entry into 30 minutes of high-level review.

---

## 🎯 The Problem
Accountants spend significant billable hours manually sorting hundreds of bank transactions. The patterns are repetitive, but the data is "dirty"—merchant strings are inconsistent, containing transaction IDs, locations, and cryptic abbreviations that standard rule-based systems fail to catch.

## 🚀 The Solution: Confidence-Tiered Automation
CoKeeper doesn't just categorize; it assesses its own certainty. By outputting predictions in three confidence tiers, it creates a clear, trustworthy workflow for the user.

| Tier | Confidence | Accuracy | Action |
|------|-----------|----------|--------|
| **🟢 GREEN** | ≥ 80% | **99.2%** | Auto-import — no review needed |
| **🟡 YELLOW** | 50–80% | **94.8%** | Quick spot-check |
| **🔴 RED** | < 50% | **56.3%** | Manual review required |

**Success Metric:** ~59% of all transactions land in the **GREEN** tier, ready for instant import.

---

## 🏗 System Architecture
The system is built as a modular, serverless pipeline deployed on **GCP Cloud Run**.



### 1. Vendor Intelligence (5-Level Cascade)
A custom feature engineering system that resolves messy bank descriptions into clean vendor identities:
* **Level 0:** Normalization (stripping prefixes, locations, and phone numbers).
* **Level 1-2:** Exact and Fuzzy matching (SequenceMatcher ≥ 0.75).
* **Level 3:** Universal merchant database & Keyword inference.

### 2. Dual-Model Routing
Instead of a single classifier, CoKeeper routes data through two specialized **CatBoost** models:
* **Matched Vendor Model:** Used when Vendor Intelligence recognizes the merchant (92.1% accuracy).
* **Unmatched Vendor Model:** Relies on raw text features for unknown merchants (73.7% accuracy).

**Combined Test Accuracy: 89.3%**

---

## 🛠 Technical Stack
* **ML / Data:** CatBoost, Scikit-learn, Pandas, NumPy.
* **Backend:** FastAPI (Python 3.12) with Pydantic validation.
* **Frontend:** Streamlit interactive dashboard.
* **Infrastructure:** Terraform, Docker, GCP Cloud Run, Cloud SQL (PostgreSQL).

---

## 📊 Feature Engineering Highlights
* **TF-IDF (1-2 grams):** Captures merchant names and memo patterns.
* **TF-IDF (3-5 char grams):** Robustness against typos and unique bank abbreviations.
* **Dimensionality Reduction:** SelectKBest (chi²) used to reduce 863 features down to the top 100 to prevent overfitting and ensure fast inference.

---

## 🎓 Key Learnings
* **Subpopulation Splitting:** Routing data into specialized models (Matched vs. Unmatched) significantly outperformed a single baseline model.
* **Human-in-the-loop:** Confidence tiers are more valuable to users than raw accuracy metrics because they define a clear business workflow.
* **Normalization is King:** Merchant name cleaning is the highest-leverage step in financial NLP.

---
[← Back to Portfolio](../index.html)
