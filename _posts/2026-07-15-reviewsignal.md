---
title: "ReviewSignal: reading reviews in two languages"
short: ReviewSignal
excerpt: >-
  Reviews from Amazon, Shopify, Trustpilot or MercadoLibre become one report: sentiment,
  the top recurring complaints and praise, and 3 to 5 quantified recommendations.
  Fixed scope, fixed price.
topics: [ml]
status: 5–7 day delivery
specs:
  - [Delivery, 5–7 days]
  - [Languages, EN / ES]
  - [Recs, 3–5]
---

A dual-notebook system that turns raw customer reviews into decision-ready intelligence reports, in English and Spanish.

> **How it's sold:** fixed scope, fixed price, 5–7 day delivery, delivered as a shareable HTML report. A productized service, not an open-ended engagement.
> **Core mission:** Turn bulk product/service reviews into sentiment breakdowns, recurring complaint/praise themes, and concrete recommendations, without a human reading every review by hand.

## Pipeline overview

Both language versions follow the same 7-step pipeline:

1. **Load & normalize:** ingest reviews (Amazon, Shopify, Trustpilot, MercadoLibre, a Kaggle dataset or a custom CSV), map columns to a platform-agnostic schema.
2. **Sentiment labeling:** star ratings as ground truth; sentiment model scores as a continuous signal.
3. **Sentiment by product:** surfaces which products/SKUs carry the most negativity.
4. **Sentiment over time:** tracks whether sentiment is trending up, down, or spiking.
5. **Topic modeling:** NMF extracts the top recurring complaint and praise themes.
6. **Recommendations:** quantifies each complaint theme and ties it to affected SKUs. Themes are ranked by frequency × sentiment severity, not raw counts.
7. **Export:** Markdown summary + supporting CSVs + a standalone HTML report.

## English vs. Spanish

| Aspect | English | Spanish |
|:--- | :--- | :--- |
| **Sentiment model** | VADER (lexicon-based) | nlptown/bert-base-multilingual-uncased-sentiment (neural) |
| **Why** | Fast, no model download | Native Spanish grammar/accent handling, context-aware |
| **Stop words** | English-optimized | Spanish-optimized |

## Logic highlight: topic extraction

```python
vectorizer = TfidfVectorizer(stop_words=STOP_WORDS, ngram_range=(1, 2), max_df=0.95)
X = vectorizer.fit_transform(review_texts)

nmf = NMF(n_components=N_TOPICS, random_state=42, max_iter=500)
W = nmf.fit_transform(X)
H = nmf.components_

for topic_idx, topic in enumerate(H):
    top_words = [feature_names[i] for i in topic.argsort()[-8:][::-1]]
    # -> recurring theme, ranked by share of negative/positive reviews
```

## Outputs

- `reviewsignal_report.md`: sentiment mix, top 5 complaint themes, top 5 praised features, ranked recommendations
- `reviewsignal_report.html`: standalone report with embedded charts
- `top_complaints.csv` / `top_praise.csv` / `recommendations.csv`: structured tables per theme

## Tech stack

- **NLP:** VADER, Hugging Face Transformers (multilingual BERT), scikit-learn (TF-IDF, NMF)
- **Data:** Pandas, NumPy, kagglehub for dataset ingestion
- **Reporting:** Matplotlib, Seaborn, Jupyter/nbformat

## Real-world note

Topic modeling needs volume to find genuine recurring patterns. The pipeline is built for bulk datasets (hundreds to tens of thousands of reviews), the scale a DTC/e-commerce brand generates on Amazon, Shopify, or Trustpilot. For a business with a handful of reviews, reading them directly beats statistical topic modeling. The tool is built for the scale where that stops being true.
