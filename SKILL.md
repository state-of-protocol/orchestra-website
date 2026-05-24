# 🛠️ SKILL.md — Orchestra AI‑Agent Tutorial

**Master Tech Stack & Environment Specification**  
_Last updated: May 2026_

Dokumen ini mentakrifkan **semua keperluan teknikal** yang diperlukan untuk mengikuti tutorial dalam repositori ini.  
Ia merangkumi tiga platform ejen utama (Google AI Studio, Anthropic Claude, DeepSeek) serta alat sokongan yang digunakan secara bersama.

---

## 📊 Ringkasan Keperluan Mengikut Platform

| Komponen               | 🏛️ Google AI Studio          | 🦉 Anthropic Claude                 | 🐉 DeepSeek                     |
|------------------------|------------------------------|--------------------------------------|----------------------------------|
| **Bahasa Pengaturcaraan** | Python 3.11+ / Node.js 22+ | TypeScript 5.x / Python 3.10+       | Python 3.10+                    |
| **Core SDK**           | `google-genai` (V2)         | `@anthropic-ai/sdk` + `@modelcontextprotocol/sdk` | `openai` (klien serasi OpenAI) |
| **Protokol Khas**      | Antigravity Managed Agents API | Model Context Protocol (MCP)        | OpenAI‑compatible REST API      |
| **Runtime Tambahan**   | Cloud Functions / Cloud Run | Node.js / Python MCP Server          | Docker + vLLM / Ollama / SGLang |
| **Pangkalan Data**     | Firestore / BigQuery        | PostgreSQL / SQLite (melalui MCP)    | Redis (untuk cache memori)      |
| **Alatan CLI**         | `agy` (Antigravity CLI)     | `claude` (Claude Code CLI)           | `ollama`, `docker-compose`      |

---

## 📦 Keperluan Asas (Semua Platform)

Alat ini diperlukan untuk **semua** trek pembelajaran:

| Alat | Versi Minimum | Tujuan |
|------|---------------|--------|
| **Git** | 2.40+ | Klon repositori dan kawalan versi |
| **Docker** | 24.0+ | Menjalankan pelayan MCP tempatan, Redis, vLLM |
| **Node.js** (pilihan) | 22 LTS | Untuk tutorial TypeScript/JavaScript |
| **Python** (pilihan) | 3.10+ | Untuk tutorial Python |
| **curl / httpie** | – | Ujian API manual |

> 💡 **Nota:** Tidak perlu memasang ketiga‑tiga bahasa. Pilih trek yang anda ingin pelajari dan pasang runtime yang sepadan.

---

## 🏛️ 1. Google AI Studio – Spesifikasi Teknikal

### 1.1 Core SDK & Libraries

```bash
# Python (disyorkan untuk Antigravity Managed Agents)
pip install google-genai

# Node.js
npm install @google/genai
```

**Versi minimum SDK:** `google-genai >= 2.0.0` (V2 SDK dengan sokongan Managed Agent dan Antigravity API).

### 1.2 Runtime & Environment

- **Python 3.11+** atau **Node.js 22+**
- **Google Cloud CLI** (`gcloud`) – pilihan, hanya jika menggunakan Cloud Functions / Cloud Run.

### 1.3 Optional Tools

| Alat | Tujuan |
|------|--------|
| **Antigravity CLI (`agy`)** | Eksport projek dari AI Studio ke persekitaran tempatan; ujian sandbox setempat. |
| **Google Cloud CLI** | Deployment ke Cloud Run / Cloud Functions untuk webhook agent. |
| **Firebase CLI** | Jika menggunakan Firestore sebagai pangkalan data ejen. |

```bash
# Pasang Antigravity CLI (preview, Mei 2026)
npm install -g @google/antigravity-cli
# atau:
curl -fsSL https://antigravity.google.com/install.sh | bash
```

### 1.4 Key Services & Protocols

- **Gemini API** (melalui `@google/genai` SDK)
- **Antigravity Interactions API** – untuk Managed Agents di dalam Linux sandbox
- **Google Workspace Extensions** – untuk akses Gmail, Docs, Sheets secara native
- **Context Caching API** – wajib untuk permintaan >100k token (menjimatkan ~80% kos)

---

## 🦉 2. Anthropic Claude – Spesifikasi Teknikal

### 2.1 Core SDK & Libraries

```bash
# TypeScript / Node.js (disyorkan untuk MCP)
npm install @anthropic-ai/sdk @modelcontextprotocol/sdk

# Python
pip install anthropic mcp
```

**Versi minimum SDK:**
- `@anthropic-ai/sdk >= 0.50.0` (dengan sokongan Adaptive Thinking)
- `@modelcontextprotocol/sdk >= 1.0.0` (MCP spesifikasi terkini)

### 2.2 Runtime & Environment

- **TypeScript 5.x** + **Node.js 18+** (disyorkan kerana ekosistem MCP TypeScript sangat matang)
- **Python 3.10+** (alternatif)

### 2.3 Optional Tools

| Alat | Tujuan |
|------|--------|
| **Claude Code CLI** | Ejen autonomi di terminal dengan kawalan kebenaran penuh. |
| **LangGraph / CrewAI** | Untuk orkestrasi multi‑ejen yang kompleks (di luar skop tutorial asas). |
| **PostgreSQL / SQLite** | Pangkalan data yang didedahkan melalui MCP Server. |

```bash
# Pasang Claude Code (preview)
npm install -g @anthropic-ai/claude-code
claude login
```

### 2.4 Key Services & Protocols

- **MCP (Model Context Protocol)** – protokol JSON‑RPC 2.0 untuk menyambungkan Claude ke alatan tempatan.
- **Claude API** – dengan parameter `thinking` dan `budget_tokens` untuk mod penalaran lanjutan.
- **SSE (Server‑Sent Events)** – untuk komunikasi dua hala antara Claude dan MCP Server.

---

## 🐉 3. DeepSeek – Spesifikasi Teknikal

### 3.1 Core SDK & Libraries

DeepSeek menyediakan endpoint **serasi OpenAI**. Gunakan perpustakaan standard OpenAI:

```bash
pip install openai redis llama-index
```

**Versi minimum:** `openai >= 1.50.0` (menyokong parameter tambahan untuk Chain‑of‑Thought).

### 3.2 Runtime & Environment

- **Python 3.10+**
- **Docker** – untuk menjalankan Redis dan (pilihan) model tempatan melalui vLLM/Ollama.

### 3.3 Optional Tools

| Alat | Tujuan |
|------|--------|
| **Ollama** | Menjalankan model DeepSeek‑R1 secara tempatan (CPU/GPU). |
| **vLLM / SGLang** | Pelayan inferens berprestasi tinggi untuk deployment skala besar. |
| **Redis** | Cache memori luaran untuk sistem Engram Memory. |
| **LlamaIndex** | Rangka kerja RAG dan penindeksan pengetahuan (sesuai untuk V4‑Pro). |

```bash
# Pasang Ollama + model DeepSeek‑R1 (8B atau 70B)
ollama pull deepseek-r1:70b

# Pasang vLLM (untuk GPU)
pip install vllm
```

### 3.4 Key Services & Protocols

- **DeepSeek API** – endpoint `https://api.deepseek.com/v1` (100% serasi OpenAI).
- **Chain‑of‑Thought Parser** – wajib diimplementasikan untuk mengurus tag `<think>…</think>` dalam output model R1.
- **Prompt Compression** – teknik mampatan prompt untuk mengurangkan kos token input.
- **Engram Conditional Memory** – struktur memori berasaskan hash untuk konteks panjang (1M token).

---

## 🔧 Alatan Pembangunan & Debugging (Shared)

| Alat | Tujuan | Platform |
|------|--------|----------|
| **Postman / Bruno** | Ujian API manual | Semua |
| **Langfuse / LangSmith** | Tracing dan observability ejen | Semua |
| **Jupyter Notebook** | Eksperimen interaktif dengan Python | Google, DeepSeek |
| **VS Code + Copilot** | IDE dengan bantuan AI untuk penulisan kod | Semua |
| **GitHub Actions** | CI/CD untuk ujian boilerplate | Semua |

---

## 🔑 Cara Mendapatkan API Keys

### Google AI Studio
1. Layari [Google AI Studio](https://aistudio.google.com/apikey)
2. Klik "Get API Key"
3. Percuma – 1,500 permintaan/hari

### Anthropic Claude
1. Layari [Anthropic Console](https://console.anthropic.com/)
2. Daftar dan pilih pelan (bayar‑per‑penggunaan)
3. Jana API key

### DeepSeek
1. Layari [DeepSeek Platform](https://platform.deepseek.com/)
2. Daftar – kredit percuma untuk pengguna baharu
3. Jana API key (format: `sk-your-key`)

> ⚠️ **Simpan semua API key dalam pembolehubah persekitaran (`export API_KEY=...`) – jangan sesekali commit ke repositori!**

---

## ✅ Semakan Persediaan

Selepas memasang keperluan di atas, sahkan persediaan anda:

```bash
# Semak Python
python --version   # ≥ 3.10

# Semak Node.js
node --version     # ≥ 18

# Semak Docker
docker --version   # ≥ 24.0

# Semak SDK Google (Python)
python -c "import google.genai; print('OK')"

# Semak SDK Anthropic (Node.js)
node -e "require('@anthropic-ai/sdk'); console.log('OK')"

# Semak OpenAI client (untuk DeepSeek)
python -c "import openai; print('OK')"
```

Jika semua arahan di atas mengembalikan `OK`, anda sudah bersedia untuk memulakan tutorial!

---