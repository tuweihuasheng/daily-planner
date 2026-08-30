<div align="center">

<img src="build/icon.png" width="96" alt="Daily Planner" />

# Daily Planner (每日规划)

**A clean Chinese-first desktop task manager: calendar + Eisenhower matrix + knowledge base — with your data staying 100% local.**

English · [简体中文](README.md)

[![Version](https://img.shields.io/badge/version-1.7.6-3b82f6.svg)](https://github.com/tuweihuasheng/daily-planner/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows-blue)](#)
[![Electron](https://img.shields.io/badge/Electron-22-47848f?logo=electron&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript&logoColor=white)](#)

[Download](#quick-start) · [Features](#features) · [Data-&-Privacy](#data--privacy) · [Build-from-Source](#build-from-source) · [FAQ](#faq)

</div>

---

## What Is This

**Daily Planner (每日规划)** is a desktop task manager built for Chinese-speaking users. It packs a calendar, todos, an Eisenhower-matrix analyzer, and a personal knowledge base into one lightweight window. No account required, no cloud sync — everything lives on your own machine.

For you if you want:

- 🗓️ A desktop calendar **with Lunar dates and Chinese public holidays** built in
- 🎯 The **Eisenhower matrix** (四象限) to sort out what actually matters
- 🔒 Privacy: tasks, memos, and knowledge-base images **never leave your computer**
- 🇨🇳 A UI that is **natively Chinese**, not machine-translated

## Screenshots

| Month view (Lunar + holidays + tasks) | Eisenhower matrix |
|:---:|:---:|
| <img src="docs/images/overview.png" alt="Month view with Lunar dates, holidays, and priority-colored tasks" width="480"> | <img src="docs/images/quadrant.png" alt="Four-quadrant task analysis" width="480"> |

| Dark mode |
|:---:|
| <img src="docs/images/dark.png" alt="Month view in dark mode" width="480"> |

## Features

### 🗓️ Calendar & Scheduling
- **Month / week views**, press `/` to search instantly
- **Lunar calendar** + **official Chinese public holidays** (bundled data, works offline)
- **Anniversary reminders**: solar and lunar birthdays / anniversaries
- **Recurring schedules**: weekly / monthly routines laid out automatically

### 🎯 Eisenhower-Matrix Tasks
- Every task is classed as **urgent-important / important / urgent / normal**, color-coded across the calendar
- Analysis dialog with completion stats per year / month / custom range; click a task to jump to its date
- **Tags**: preset + custom colored tags, drag to reorder; sort by priority / time / status

### 🔔 Smart Reminders

Tasks remind ahead by priority:

| Priority | Advance |
|----------|---------|
| High | 7 days |
| Medium | 5 days |
| Low | 3 days |

Anniversaries remind 3 days ahead.

### 📚 Knowledge Base & Memos
- Knowledge base with **image upload and zoomable viewer**; tasks can link to entries
- Memos with **full-text search**
- **Weekly / monthly / yearly summaries** with automatic completion stats

### 🎨 Desktop Experience
- **Dark mode** + 5 background themes
- System tray, frameless custom window
- **JSON / CSV import & export** (images bundled) — move machines without losing data

### ⌨️ Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Open search (in-app) |
| `Ctrl + Enter` | Add task (in input) |
| `Escape` | Close dialog/panel |
| `Ctrl + Shift + P` | Show/hide window (global) |
| `Ctrl + Shift + N` | Quick-add task (global) |
| `Ctrl + Shift + T` | Jump to today (global) |

## Quick Start

### Option 1: Download the Installer (recommended)

- [GitHub Releases](https://github.com/tuweihuasheng/daily-planner/releases)
- [Gitee Releases](https://gitee.com/europe-and-oceania/daily-planner/releases) (mainland China)

Grab `daily-planner-setup-<version>.exe` and install (Windows 10 / 64-bit+). The app self-updates when new versions ship.

### Option 2: Build from Source

Requires [Node.js](https://nodejs.org) 20+ and [pnpm](https://pnpm.io) 9+:

```bash
git clone https://github.com/tuweihuasheng/daily-planner.git
cd daily-planner
pnpm install
pnpm electron:dev    # dev mode
pnpm electron:build  # package the Windows installer into dist-electron/
```

## Data & Privacy

- Tasks, anniversaries, and recurring schedules live in the app's local storage; the knowledge base and memos are JSON files under your user data directory (`%APPDATA%\daily-planner`)
- **No accounts, no telemetry** — the app never sends your data anywhere
- Update checks only read release-version metadata
- To migrate: export JSON / ZIP in-app, import on the other machine (images included)

## Auto-Update

Updates are checked via [electron-updater](https://www.electron.build/auto-update) with dual sources (GitHub Releases + Gitee). Pushing a `v*` tag triggers GitHub Actions to build the installer and publish a Release (see [build-unsigned.yml](.github/workflows/build-unsigned.yml)). Installers are currently unsigned — if SmartScreen prompts on first run, choose "Run anyway".

## Build from Source

```bash
pnpm dev            # frontend only (browser preview)
pnpm electron:dev   # full Electron dev mode
pnpm build          # build the frontend
pnpm electron:build # package the installer
pnpm ts-check       # TypeScript type check
pnpm lint           # ESLint
```

Stack: Electron 22 · TypeScript 5.6 · Vite 7 · Tailwind CSS 3 · lunar-javascript

```
daily-planner/
├── electron/    main process (window, tray, updater, data files)
├── src/         renderer (single-page TypeScript app)
├── scripts/     helper scripts (README screenshots, platform integration)
└── docs/        README screenshots
```

## FAQ

**Q: Does my data go to the cloud?**
No. Everything stays on your machine; the app doesn't even have login.

**Q: How do I move to a new computer?**
Export (JSON / ZIP) on the old one, import on the new one — knowledge-base images included.

**Q: macOS / Linux?**
Only Windows installers are provided today; contributions for other platforms are welcome.

**Q: Will holiday data go stale?**
Official holiday data is bundled and the cache can refresh online; future years will be tracked.

**Q: Antivirus flags it / SmartScreen blocks it?**
The installer is unsigned (cost reasons for a personal project). Build from source if you prefer.

## Author

**严辉村高斯林** (Yanhui Village Gosling) · Product: 土味花生

## License

[MIT](LICENSE) © 严辉村高斯林 & daily-planner contributors
