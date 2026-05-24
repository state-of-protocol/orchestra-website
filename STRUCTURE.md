# 📁 STRUCTURE.md — Hierarki Fail & Organisasi Projek

**Panduan Struktur Repositori Orchestra AI‑Agent Tutorial**  
_Versi 1.0 · Mei 2026_

Dokumen ini menjelaskan susun atur fail dan folder dalam repositori. Struktur ini direka untuk menyokong tiga "Akademi" bebas (Google AI Studio, Anthropic Claude, DeepSeek) sambil mengekalkan konsistensi melalui rangka kerja 7‑fail yang seragam di peringkat akar.

---

## 📖 Isi Kandungan

- [1. Gambaran Keseluruhan](#1-gambaran-keseluruhan)
- [2. Struktur Direktori Akar](#2-struktur-direktori-akar)
- [3. Penjelasan Setiap Direktori & Fail](#3-penjelasan-setiap-direktori--fail)
  - [3.1 Fail Akar (Master Specification)](#31-fail-akar-master-specification)
  - [3.2 `google-ai-studio/` – Akademi Google](#32-google-ai-studio--akademi-google)
  - [3.3 `anthropic-claude/` – Akademi Claude](#33-anthropic-claude--akademi-claude)
  - [3.4 `deepseek/` – Akademi DeepSeek](#34-deepseek--akademi-deepseek)
  - [3.5 `website/` – Laman Web Tutorial](#35-website--laman-web-tutorial)
  - [3.6 `shared/` – Sumber Bersama](#36-shared--sumber-bersama)
  - [3.7 `.github/` – Konfigurasi Komuniti](#37-github--konfigurasi-komuniti)
- [4. Konvensyen Penamaan](#4-konvensyen-penamaan)
- [5. Amalan Terbaik](#5-amalan-terbaik)

---

## 1. Gambaran Keseluruhan

Repositori menggunakan struktur modular di mana setiap platform AI mempunyai subdirektori sendiri yang mengandungi **7 dokumen spesifikasi khusus platform** dan folder `boilerplate/` dengan kod permulaan. Di peringkat akar, **dokumen spesifikasi induk** (`SKILL.md`, `DESIGN.md`, ...) bertindak sebagai rujukan payung yang menggabungkan maklumat ketiga‑tiga platform. Laman web tutorial interaktif ditempatkan di dalam folder `website/`, manakala sumber yang dikongsi (seperti panduan perbandingan) berada dalam `shared/`.

**Falsafah Reka Bentuk:**  
Pemisahan fizikal ini membolehkan pelajar mempelajari satu platform tanpa perlu memahami platform lain. Ia juga memudahkan penyelenggaraan kerana setiap akademi boleh dikemas kini secara bebas.

---

## 2. Struktur Direktori Akar

```
AI-Orchestration-Tutorial/
│
├── README.md                          # Halaman utama projek
├── LICENSE                            # Lesen MIT
├── SKILL.md                           # Spesifikasi teknikal induk (semua platform)
├── DESIGN.md                          # Prinsip UI/UX induk (semua platform)
├── STRUCTURE.md                       # Fail ini – penerangan hierarki projek
├── ARCHITECTURE.md                    # Seni bina & aliran data induk
├── API_SPEC.md                        # Spesifikasi API induk
├── RULES.md                           # Piawaian pengekodan & kekangan induk
├── USER_FLOW.md                       # Aliran pembelajaran induk
│
├── google-ai-studio/                  # 🏛️ Akademi 1: Google AI Studio
│   ├── SKILL.md
│   ├── DESIGN.md
│   ├── STRUCTURE.md
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   ├── RULES.md
│   ├── USER_FLOW.md
│   └── boilerplate/
│       ├── agent.py
│       ├── webhook/
│       │   └── main.py
│       ├── skills/
│       │   └── workspace-analyst.md
│       ├── screenshot-analyzer/       # Gemini UI Lab (aplikasi contoh)
│       │   ├── analyzer.py
│       │   ├── requirements.txt
│       │   └── sample_screenshots/
│       └── .antigravity/
│           └── sandbox.yaml
│
├── anthropic-claude/                  # 🦉 Akademi 2: Anthropic Claude
│   ├── SKILL.md
│   ├── DESIGN.md
│   ├── STRUCTURE.md
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   ├── RULES.md
│   ├── USER_FLOW.md
│   └── boilerplate/
│       ├── multi-agent/
│       │   ├── coordinator.ts
│       │   ├── coder.ts
│       │   ├── reviewer.ts
│       │   └── index.ts
│       ├── mcp/
│       │   ├── filesystem-server/
│       │   │   ├── package.json
│       │   │   ├── tsconfig.json
│       │   │   └── src/
│       │   │       └── index.ts
│       │   └── database-server/
│       │       ├── package.json
│       │       └── src/
│       │           └── index.ts
│       ├── claude-code/
│       │   └── .clauderc
│       └── mcp-config.example.json
│
├── deepseek/                          # 🐉 Akademi 3: DeepSeek
│   ├── SKILL.md
│   ├── DESIGN.md
│   ├── STRUCTURE.md
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   ├── RULES.md
│   ├── USER_FLOW.md
│   └── boilerplate/
│       ├── cot-agent.py
│       ├── engram-memory.py
│       ├── docker-compose.yml
│       └── config/
│           └── deepseek.env.example
│
├── website/                           # 🌐 Laman web tutorial interaktif
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── cost-calculator.html
│
├── shared/                            # 🔧 Sumber dikongsi
│   ├── comparison/
│   │   ├── decision-guide.md
│   │   └── pricing-2026.csv
│   └── images/
│       ├── google-demo.png
│       ├── claude-artifacts.png
│       └── deepseek-cost.png
│
└── .github/                           # Konfigurasi GitHub
    ├── workflows/
    │   └── ci.yml
    ├── CONTRIBUTING.md
    ├── PULL_REQUEST_TEMPLATE.md
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        └── feature_request.md
```

---

## 3. Penjelasan Setiap Direktori & Fail

### 3.1 Fail Akar (Master Specification)

| Fail | Penerangan |
|------|------------|
| `README.md` | Halaman utama projek — pengenalan, matriks perbandingan, panduan mula pantas, struktur projek. |
| `LICENSE` | Lesen MIT. |
| `SKILL.md` | **Induk** spesifikasi teknikal yang menggabungkan keperluan semua platform (SDK, runtime, alat). |
| `DESIGN.md` | **Induk** prinsip UI/UX untuk semua platform dan laman web tutorial. |
| `STRUCTURE.md` | Fail ini — penerangan hierarki projek secara menyeluruh. |
| `ARCHITECTURE.md` | **Induk** seni bina logik dan aliran data setiap platform (sandbox, MCP, MoE/Engram). |
| `API_SPEC.md` | **Induk** spesifikasi endpoint, skema permintaan/respons, dan pengesahan untuk ketiga‑tiga API. |
| `RULES.md` | **Induk** piawaian pengekodan, kekangan keselamatan, dan larangan mutlak untuk semua platform. |
| `USER_FLOW.md` | **Induk** panduan pembelajaran berperingkat (Fasa 1–3) untuk setiap trek platform. |

> Setiap akademi mempunyai salinan dokumen‑dokumen ini yang **diubah suai khusus** untuk platform tersebut. Versi akar bertindak sebagai gambaran keseluruhan dan rujukan silang.

---

### 3.2 `google-ai-studio/` – Akademi Google

**Tujuan:** Tutorial untuk platform Google AI Studio, memfokuskan kepada Managed Agents, Antigravity sandbox, dan integrasi Google Workspace.

| Fail/Direktori | Penerangan |
|----------------|------------|
| **7 fail spesifikasi** (`SKILL.md`, dll.) | Versi khusus Google platform — lihat [Fail Akar](#31-fail-akar-master-specification) untuk peranan setiap fail. |
| `boilerplate/agent.py` | Ejen terurus lengkap: satu panggilan API menyediakan ejen dalam sandbox Linux. |
| `boilerplate/webhook/main.py` | Ejen webhook untuk Cloud Functions (pola *stateless agent*). |
| `boilerplate/skills/workspace-analyst.md` | Fail kemahiran `AGENTS.md` untuk analis Google Workspace tersuai. |
| `boilerplate/screenshot-analyzer/` | Aplikasi contoh **Gemini UI Lab** — analisis tangkapan skrin multimodal. |
| `boilerplate/.antigravity/sandbox.yaml` | Konfigurasi deklaratif persekitaran sandbox (pakej, had sumber). |

---

### 3.3 `anthropic-claude/` – Akademi Claude

**Tujuan:** Tutorial untuk Anthropic Claude, menekankan ketepatan, kawalan melalui MCP, dan orkestrasi multi‑ejen.

| Fail/Direktori | Penerangan |
|----------------|------------|
| **7 fail spesifikasi** | Versi khusus Claude. |
| `boilerplate/multi-agent/` | Implementasi pasukan pembangun: Koordinator (Opus), Coder (Sonnet), Reviewer (Sonnet). |
| `boilerplate/mcp/` | Pelayan MCP contoh: `filesystem-server` (fail tempatan) dan `database-server` (PostgreSQL). |
| `boilerplate/claude-code/.clauderc` | Konfigurasi untuk mod ejen autonomi terminal (Claude Code). |
| `boilerplate/mcp-config.example.json` | Templat konfigurasi MCP yang perlu disalin dan diedit dengan laluan/kredensial sebenar. |

---

### 3.4 `deepseek/` – Akademi DeepSeek

**Tujuan:** Tutorial untuk platform DeepSeek, memfokuskan kepada kecekapan kos, penakulan mendalam (R1), dan pemprosesan berskala besar.

| Fail/Direktori | Penerangan |
|----------------|------------|
| **7 fail spesifikasi** | Versi khusus DeepSeek. |
| `boilerplate/cot-agent.py` | Ejen Chain‑of‑Thought menggunakan model R1 dengan penghurai tag `<think>`. |
| `boilerplate/engram-memory.py` | Lapisan memori Engram berasaskan Redis untuk konteks panjang. |
| `boilerplate/docker-compose.yml` | Konfigurasi Docker untuk Redis dan (pilihan) vLLM/Ollama. |
| `boilerplate/config/deepseek.env.example` | Templat pembolehubah persekitaran (API key, URL endpoint). |

---

### 3.5 `website/` – Laman Web Tutorial

| Fail | Penerangan |
|------|------------|
| `index.html` | Halaman utama laman web — hero, kad platform, matriks perbandingan, kalkulator, demo penstriman, laluan pembelajaran, rajah seni bina, penjejak kemajuan. |
| `css/style.css` | Gaya penuh (tema gelap/cerah, responsif, komponen tersuai). |
| `js/script.js` | Semua fungsi interaktif — navigasi, tema, kalkulator kos, demo penstriman, blok pemikiran, tab, salin kod, penjejak kemajuan, rajah. |
| `cost-calculator.html` | Kalkulator kos token kendiri yang boleh dibuka terus dalam pelayar. |

---

### 3.6 `shared/` – Sumber Bersama

| Fail/Direktori | Penerangan |
|----------------|------------|
| `comparison/decision-guide.md` | Panduan pemilihan platform berdasarkan keperluan projek. |
| `comparison/pricing-2026.csv` | Data harga API terkini (Mei 2026) untuk rujukan programatik. |
| `images/` | Tangkapan skrin UI dan rajah seni bina yang digunakan dalam README dan dokumen spesifikasi. |

---

### 3.7 `.github/` – Konfigurasi Komuniti

| Fail/Direktori | Penerangan |
|----------------|------------|
| `workflows/ci.yml` | GitHub Actions untuk menguji kod boilerplate (linting, semakan kebergantungan). |
| `CONTRIBUTING.md` | Panduan lengkap untuk penyumbang. |
| `PULL_REQUEST_TEMPLATE.md` | Templat untuk huraian Pull Request. |
| `ISSUE_TEMPLATE/bug_report.md` | Templat laporan pepijat. |
| `ISSUE_TEMPLATE/feature_request.md` | Templat permintaan ciri baharu. |

---

## 4. Konvensyen Penamaan

- **Direktori:** `kebab-case` (contoh: `google-ai-studio`, `cost-calculator`, `screenshot-analyzer`).
- **Fail Markdown:** `UPPERCASE.md` untuk dokumen spesifikasi utama (`SKILL.md`, `DESIGN.md`, dll.), `lowercase.md` untuk fail sokongan.
- **Fail Python/TypeScript:** `snake_case.py` atau `kebab-case.ts` mengikut kebiasaan bahasa.
- **Fail konfigurasi:** `.example` suffix untuk templat yang perlu disalin sebelum digunakan (contoh: `mcp-config.example.json`, `deepseek.env.example`).
- **Imej:** `platform-deskripsi.format` (contoh: `google-demo.png`).

---

## 5. Amalan Terbaik

1. **Jangan commit rahsia:** API key, token, dan kredensial **tidak boleh** dimasukkan ke dalam repositori. Gunakan `.env.example` dan senaraikan `.env` dalam `.gitignore`.
2. **Gunakan `.gitignore`:** Setiap subdirektori yang menjana fail binaan atau kebergantungan (contoh: `node_modules/`, `__pycache__/`, `*.pyc`) mesti mempunyai `.gitignore` yang sesuai.
3. **Dokumentasi dalam direktori:** Folder `boilerplate/` utama dan sub‑projek (seperti `screenshot-analyzer/`) mengandungi fail `README.md` ringkas yang menerangkan cara menjalankan kod.
4. **Konsisten merentas akademi:** Walaupun setiap akademi bebas, struktur 7‑fail dan penamaan folder `boilerplate/` diseragamkan untuk memudahkan penyelenggaraan dan perbandingan.
5. **Fail akar adalah sumber kebenaran:** Sebarang perubahan pada falsafah, seni bina, atau peraturan sejagat mesti dikemas kini dalam dokumen induk di akar terlebih dahulu, kemudian disebarkan ke salinan khusus platform jika perlu.

---

## 📖 Seterusnya

- Kembali ke [README.md](./README.md) untuk panduan mula pantas.
- Lihat `ARCHITECTURE.md` di akar atau dalam setiap akademi untuk memahami aliran data.
- Untuk panduan langkah demi langkah, rujuk `USER_FLOW.md`.

---

_Dokumen ini diselenggara oleh komuniti State of Protocol.  
Sumbangan untuk menambah baik struktur dialu‑alukan — sila lihat [CONTRIBUTING.md](./.github/CONTRIBUTING.md)._
```