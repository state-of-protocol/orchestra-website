# Orchestra AI-Agent Tutorial — Laman Web

Laman web interaktif untuk tutorial pembinaan dan orkestrasi ejen AI autonomi merentas **Google Gemini**, **Anthropic Claude**, dan **DeepSeek**.

---

## 📁 Struktur Fail Lengkap

```
orchestra-website/
│
├── index.html                        # (660 baris) Halaman utama — semua komponen UI
│
├── css/
│   └── style.css                     # (1,218 baris) Gaya penuh dark/light theme, responsif
│
├── js/
│   └── script.js                     # (877 baris) 15 modul interaktif
│
├── shared/
│   └── cost-calculator.html          # (434 baris) Kalkulator token kendiri + carta perbandingan
│
├── images/                           # Direktori gambar (kosong — OG image guna SVG data URL)
│
├── README.md                         # Fail ini
├── STRUCTURE.md                      # Hierarki fail & organisasi projek
├── DESIGN.md                         # Prinsip UI/UX untuk semua platform
├── SKILL.md                          # Spesifikasi teknikal & keperluan sistem
├── CONTRIBUTING.md                   # Panduan menyumbang
```

---

## 🧩 Komponen Sistem

### Halaman Utama (`index.html`)

| Bahagian | Penerangan |
|----------|------------|
| **Header & Navigasi** | Navbar sticky dengan 6 pautan platform, theme toggle, GitHub button, mobile menu |
| **Hero Section** | Tajut, penerangan, CTA buttons, lencana, diagram orkestrasi visual (SVG + CSS) |
| **Platform Cards** | 3 kad (Google, Claude, DeepSeek) dengan ciri, model, dan butang platform |
| **Comparison Matrix** | Jadual perbandingan interaktif dengan 6 penapis (Semua, Google, Claude, DeepSeek, Kos, Ejen) |
| **Cost Calculator** | Kalkulator kos token masa nyata dengan slider, pratetap, cache toggle, paparan USD/MYR |
| **Streaming Demo** | Demo simulasi ejen berstrim untuk 3 platform, blok pemikiran, kos berjalan, kawalan mula/henti |
| **Learning Paths** | Tab 3 platform dengan kad Fasa 1→2→3 untuk setiap trek |
| **Architecture Diagram** | Nod interaktif dengan tooltip huraian seni bina |
| **Progress Tracker** | Senarai semak dengan localStorage, butang reset |
| **Footer** | 4 lajur (tentang, platform, dokumentasi, komuniti) |

### Gaya (`css/style.css`)

- **1,218 baris** CSS tulen (tiada framework)
- Tema gelap/cerah melalui CSS custom properties
- Responsif: 3 breakpoints (1024px, 768px, 480px)
- 15+ komponen: buttons, cards, tabs, forms, notifications, animations
- Platform colors: Google `#4285F4`, Claude `#D97706`, DeepSeek `#059669`

### Skrip (`js/script.js`)

| Modul | Fungsi |
|-------|--------|
| Konfigurasi & State | Harga API 6 model, warna platform, konfigurasi demo |
| Utiliti | `formatNumber()`, `formatCost()`, `formatCostMYR()`, `debounce()`, `copyToClipboard()` |
| Tema | Init/apply/toggle, localStorage, `prefers-color-scheme` listener |
| Navigasi | Platform switching, hash URL, highlight cards |
| Cost Calculator | Kiraan masa nyata, sync range↔number, pratetap, nota penjimatan DeepSeek |
| Comparison Matrix | Filter rows by tag, toggle active buttons |
| Streaming Demo | 3 set respons simulasi, animasi langkah, kos masa nyata, blok pemikiran |
| Thinking Blocks | Expand/collapse, keyboard support |
| Tabs | Tab switching dalam containers |
| Copy Buttons | Clipboard API + fallback, feedback visual |
| Progress Tracker | localStorage, checkbox → class toggling |
| Architecture Diagram | Tooltip pada hover nodes |

### Kalkulator Kendiri (`shared/cost-calculator.html`)

- Kalkulator token bebas (boleh buka terus dalam pelayar)
- **Carta bar perbandingan** menggunakan Canvas API — bandingkan kos semua 6 model
- Tema gelap/cerah dengan butang togol
- Cache toggle, pratetap Kecil/Sederhana/Besar

---

## 🔧 Pembaikan Sistem Dilakukan

| # | Isu | Fail | Status |
|---|-----|------|--------|
| 1 | Rujukan `#demo-prompt` tidak wujud dalam HTML — return `null` | `js/script.js:432` | ✅ Dibuang |
| 2 | Logik mati: `else if (modelKey === 'deepseek-v4')` tidak pernah tercapai kerana `startsWith('deepseek')` sudah menangkap. Notis diskaun 75% DeepSeek hilang. | `shared/cost-calculator.html:323` | ✅ Digabung dalam blok yang sama |
| 3 | OG image `images/og-image.png` dirujuk di meta tag tapi fail tiada | `index.html:25` | ✅ Digantikan SVG data URL |
| 4 | Pautan `ARCHITECTURE.md` dan `RULES.md` di footer menghala ke fail yang tidak wujud di repo | `index.html:626-627` | ✅ Ditukar ke `STRUCTURE.md` |
| 5 | Fail kosong `New Text Document.txt` tidak diperlukan | Akar projek | ✅ Dipadam |

---

## 🚀 Cara Penggunaan

Buka `index.html` dalam pelayar — **tiada server diperlukan**:

```
start index.html
```

Atau untuk kalkulator kendiri:

```
start shared\cost-calculator.html
```

---

## 🌐 Platform Disokong

| Platform | Model Utama | SDK |
|----------|-------------|-----|
| 🏛️ Google AI Studio | Gemini 3.5 Flash / Pro | `google-genai` |
| 🦉 Anthropic Claude | Claude Opus 4.7 / Sonnet 5 | `@anthropic-ai/sdk` + MCP |
| 🐉 DeepSeek | DeepSeek V4-Pro / R1 | `openai` (OpenAI-compatible) |

---

## 📄 Lesen

MIT License — dibina oleh komuniti [State of Protocol](https://github.com/state-of-protocol).
