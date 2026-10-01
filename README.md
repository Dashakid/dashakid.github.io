# 👋 I'm Gian-Carlo Javier
### AI Automation Engineer & Junior Data Scientist 
**Building intelligent systems that turn manual chaos into automated workflows.**

---

### 🛠 My Tech Stack
* **Languages:** Python (Advanced), SQL (PostgreSQL), JavaScript
* **AI/ML:** CatBoost, Scikit-Learn, XGBoost, Naive Bayes
* **Backend:** FastAPI, Docker, Asyncio, RESTful APIs
* **UI/UX:** Streamlit (Custom interactive dashboards)

---

### 🚀 Featured Projects

#### 🧠 [AI System Orchestrator](https://github.com/Dashakid/portfolio)
* **The Goal:** Centralizing control for multi-model AI workflows and agent management.
* **Tech:** Python, FastAPI, Asyncio, Redis/PostgreSQL.

#### 🤖 [CoKeeper AI](https://github.com/Dashakid/portfolio/tree/main/CoKeeper)
* **The Problem:** Manual, repetitive accounting data entry.
* **The Solution:** 4-layer ML architecture to automate data categorization for QuickBooks/Xero.
* **Tech:** Python, CatBoost, FastAPI, Docker.

#### 📈 [Crypto Trading Bot](https://github.com/Dashakid/portfolio/tree/main/trading-bot)
* **The Solution:** Backend execution engine with PostgreSQL for real-time trade tracking.
* **Tech:** Python, PostgreSQL, FastAPI.

---

### 📫 Connect with Me
* **Portfolio:** [dashakid.github.io](https://dashakid.github.io/)
* **LinkedIn:** [linkedin.com/in/giancarlojavier](https://linkedin.com/in/giancarlojavier)
* **Location:** Remote 💻

---

## Updating the site

GitHub Pages builds the site from the files below on every push. No HTML editing needed.

| To do this | Edit this |
|---|---|
| Add a project or post | Add one file to `_posts/` (template below) |
| Add a line to the "Latest" feed | Add an entry at the top of `_data/updates.yml` |
| Change the "Now" line | `_data/now.yml` |
| Links, analytics, newsletter | `_config.yml` |

New posts show up automatically in the build log list, the project carousel, the RSS feed (`/feed.xml`) and get their own page at `/projects/<name>`.

### New post template

Save as `_posts/YYYY-MM-DD-short-name.md` (the date in the file name is the publish date; the page lives at `/projects/short-name`):

```markdown
---
title: "Headline for the post"
short: Project name            # used on the carousel card and next/previous links
excerpt: >-
  One or two sentences. Shown in the list, the RSS feed and link previews.
topics: [auto]                 # any of: trading, ml, auto, web
status: Live                   # small label, e.g. "In build", "Paper-validated"
live: true                     # optional: shows the status in the accent color
image: /assets/name.jpg        # optional screenshot (put the file in assets/)
video: /assets/name.mp4        # optional 10-second clip (muted, loops)
link: https://example.com      # optional link to the live product
specs:                         # optional, three facts for the card
  - [Label, Value]
  - [Label, Value]
  - [Label, Value]
---

Write the post in Markdown here.
```

Screenshots: export at about 1600px wide as JPEG. Clips: keep them short and under ~3 MB (`ffmpeg -i in.mov -t 10 -vf scale=1280:-2 -an -crf 28 out.mp4`).

### Preview locally (optional)

```bash
gem install jekyll -v 3.10.0 jekyll-feed
jekyll serve   # then open http://localhost:4000
```
