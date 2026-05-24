# 🎨 DESIGN.md — Prinsip UI/UX Orchestra AI‑Agent Tutorial

**Reka Bentuk Pengalaman Pengguna untuk Platform Ejen Autonomi**  
_Versi 1.0 · Mei 2026_

Dokumen ini mentakrifkan falsafah, prinsip, dan corak reka bentuk antara muka pengguna bagi ketiga‑tiga platform ejen yang diajar di dalam repositori ini. Ia bertujuan menjadi rujukan tunggal untuk pereka UI/UX dan pembangun yang membina aplikasi agen, sama ada untuk mengikuti tutorial atau mencipta penyelesaian mereka sendiri.

---

## 📖 Isi Kandungan

- [1. Falsafah Reka Bentuk](#1-falsafah-reka-bentuk)
- [2. Prinsip Reka Bentuk Sejagat](#2-prinsip-reka-bentuk-sejagat)
- [3. Corak UI/UX Khusus Platform](#3-corak-uiux-khusus-platform)
  - [3.1 Google AI Studio – *The Seamless Automator*](#31-google-ai-studio--the-seamless-automator)
  - [3.2 Anthropic Claude – *The Precision Coder*](#32-anthropic-claude--the-precision-coder)
  - [3.3 DeepSeek – *The Efficiency King*](#33-deepseek--the-efficiency-king)
- [4. Perpustakaan Komponen UI](#4-perpustakaan-komponen-ui)
- [5. Reka Bentuk Laman Web Tutorial](#5-reka-bentuk-laman-web-tutorial)
- [6. Aliran Kerja Pengguna (User Flow)](#6-aliran-kerja-pengguna-user-flow)
- [7. Responsif & Kebolehcapaian](#7-responsif--kebolehcapaian)
- [8. Keantarabangsaan (i18n)](#8-keantarabangsaan-i18n)

---

## 1. Falsafah Reka Bentuk

Setiap platform ejen AI mempunyai **DNA seni bina** yang berbeza. UI/UX tidak boleh bersifat “satu saiz muat semua”. Sebaliknya, antara muka mesti menghormati dan menonjolkan kekuatan asli platform:

- 🏛️ **Google AI Studio** → Ketelusan & automasi tanpa kusut (*frictionless automation*).
- 🦉 **Anthropic Claude** → Kejelasan & kawalan penuh ke atas proses pemikiran ejen.
- 🐉 **DeepSeek** → Kecekapan & kesedaran kos yang telus.

**Prinsip teras kami:**  
> *“UI bukan sekadar pembalut untuk API; ia adalah tingkap kepada minda ejen. Pengguna mesti memahami **apa** yang ejen lakukan, **mengapa** ia melakukannya, dan **berapa** kosnya.”*

---

## 2. Prinsip Reka Bentuk Sejagat

Prinsip ini terpakai pada **semua** platform dan komponen UI yang dibangunkan dalam ekosistem tutorial ini:

| Prinsip | Penerangan |
|--------|-------------|
| **Ketelusan Proses** | Setiap tindakan ejen (tool call, thinking, carian) mesti dipaparkan secara langsung kepada pengguna, bukan di sebalik “loading spinner”. |
| **Maklum Balas Segera** | Gunakan penstriman (*streaming*) token demi token. Jangan tunggu respons lengkap. Pengguna perlu melihat ejen “berfikir”. |
| **Hierarki Visual** | Proses pemikiran (CoT) → Tindakan (tool call) → Output akhir. Lapisan ini mesti dibezakan secara visual dengan warna, inden, atau ikon. |
| **Kawalan Pengguna** | Pengguna boleh menjeda, membatalkan, atau mengubah hala ejen pada bila‑bila masa. Ejen bukan kotak hitam. |
| **Kesedaran Kos** | Paparkan anggaran token dan kos dalam mata wang sebenar (RM / USD) secara masa nyata semasa ejen beroperasi. |
| **Aksesibiliti** | Semua komponen menyokong navigasi papan kekunci, pembaca skrin, dan kontras warna WCAG 2.2 AA. |
| **Responsif** | UI berfungsi dari skrin mudah alih (375px) hingga paparan desktop lebar (1440px+). |

---

## 3. Corak UI/UX Khusus Platform

### 3.1 Google AI Studio – *The Seamless Automator*

**Falsafah:** Ejen beroperasi dalam persekitaran terurus (Linux sandbox). Pengguna tidak perlu melihat butiran infrastruktur — hanya input dan output. UI mesti terasa ringan dan “ajaib”.

#### 3.1.1 Streaming UI Masa Nyata
- Antara muka sembang dengan **penstriman token** yang sangat laju (sub-100ms latency).
- Gunakan **efek “typewriter”** tetapi dengan kelajuan boleh laras.
- **Tiada penimbalan** — setiap token dipaparkan sebaik diterima daripada API Gemini.

#### 3.1.2 Kawalan Input Multimodal
- **Zon lepas** (*drop zone*) untuk fail besar: video (MP4 sehingga 1 jam), PDF (2,000+ halaman), imej, audio.
- Pratonton fail sebelum hantar — pengguna boleh memangkas atau menanda bahagian spesifik.
- **Bar kemajuan** untuk muat naik fail besar ke Google Cloud Storage (dengan indikator pemprosesan).

#### 3.1.3 Indikator Persekitaran Sandbox
- Ikon status kecil: `🟢 Sandbox ready` / `🟡 Provisioning` / `🔴 Terminated`.
- Butang “Lihat Fail Sandbox” — membuka file explorer ringkas dalam modal untuk melihat fail yang dijana oleh ejen (CSV, PNG, dsb.).
- Riwayat persekitaran — pengguna boleh menyambung semula sandbox terdahulu.

#### 3.1.4 Integrasi Google Workspace
- Butang “Sambung ke Gmail / Sheets” dengan OAuth flow yang lancar.
- UI untuk memilih dokumen atau helaian terus dari pemilih fail Google Drive.

---

### 3.2 Anthropic Claude – *The Precision Coder*

**Falsafah:** Claude direka untuk kejituan dan koordinasi. UI mesti mendedahkan sepenuhnya proses pemikiran dan tindakan sub‑ejen. Antara muka dwi‑panel adalah wajib.

#### 3.2.1 Antara Muka Dwi‑Panel (Split‑Screen)
- **Panel Kiri:** Ruang sembang dengan input pengguna dan respons ejen.
- **Panel Kanan:** “Artifacts Workspace” — memaparkan kod, dokumen, atau visualisasi yang dihasilkan oleh Claude secara langsung.
- Kedua‑dua panel boleh diskrol secara bebas.
- Pengguna boleh mengubah saiz panel (seret pembahagi).

#### 3.2.2 Thinking Process Toggle
- Setiap respons mengandungi bahagian `<thinking>` yang boleh **dikembangkan/disembunyikan**.
- Ikon “🧠” di sebelah kiri mesej — klik untuk melihat rantaian pemikiran penuh.
- Thinking process dipaparkan dalam **fon monospace** dengan latar belakang kelabu gelap yang berbeza.
- **Penapis tahap pemikiran:** Pengguna boleh menetapkan hanya mahu lihat ringkasan pemikiran atau pemikiran penuh.

#### 3.2.3 Visualisasi Pasukan Dev (Multi‑Agent)
- Apabila ejen koordinator (Claude Opus) membahagikan tugas, UI memaparkan **carta alir mini**:
  - `Koordinator` → `Coder (Sonnet)` + `Reviewer (Sonnet)`
- Setiap sub‑ejen mempunyai kad status: `🔄 Sedang berjalan`, `✅ Selesai`, `❌ Gagal`.
- Pengguna boleh klik pada kad sub‑ejen untuk melihat output dan log mereka.

#### 3.2.4 Kawalan MCP (Model Context Protocol)
- Panel “Sambungan MCP” di bahagian bawah kiri — menunjukkan pelayan MCP yang disambungkan:
  - `filesystem` (✅), `postgres-db` (✅), `web-search` (🔌 terputus).
- Butang “Tambah Pelayan MCP” dengan wizard konfigurasi `mcp-config.json` secara visual.

---

### 3.3 DeepSeek – *The Efficiency King*

**Falsafah:** Kecekapan kos adalah ciri utama. UI mesti menjadikan penjimatan token dan kerumitan MoE sebagai kelebihan yang boleh dilihat dan difahami.

#### 3.3.1 Widget Pengesan Kos & Token Masa Nyata
- Bar status tetap di bahagian atas atau bawah:
  - `📊 Token: 12,450 / 1,000,000 | 💰 Anggaran Kos: RM 0.03 (USD 0.006)`
- Kemas kini **setiap saat** semasa ejen memproses.
- **Penunjuk penjimatan:** “Anda menjimatkan 85% berbanding GPT-5 untuk beban kerja yang sama” (hijau).
- Graf penggunaan token dari semasa ke semasa (opsional, dalam panel sisi).

#### 3.3.2 Persembahan Output Dua Peringkat
- **Peringkat 1: Kotak “Jalan Fikiran”** — dipaparkan di atas jawapan utama, boleh diruntuhkan.
  - Berlabel “🧠 Rantaian Pemikiran (R1)” dengan sempadan bertitik.
  - Mengandungi teks di antara tag `<think>…</think>`.
- **Peringkat 2: Jawapan Utama** — dipaparkan di bawah, bersih dan terus kepada tindakan.

#### 3.3.3 Visualisasi MoE (Mixture‑of‑Experts)
- Panel opsional untuk pengguna teknikal: menunjukkan **pakar mana** yang diaktifkan semasa pemprosesan.
  - `Pakar aktif: #12, #47, #89, #134, #256, #301` (dari 384).
- Representasi visual ringkas: grid 16×24 dengan petak yang menyala.

#### 3.3.4 Mod Penjimatan Kuasa
- Butang togol: `🪫 Mod Jimat Kos` — menghadkan jumlah token pemikiran atau menukar ke model lebih kecil (V4‑Flash) secara automatik.
- Dialog pengesahan dengan anggaran penjimatan sebelum diaktifkan.

---

## 4. Perpustakaan Komponen UI

Untuk membina antara muka yang konsisten, kami mengesyorkan komponen‑komponen berikut (boleh diguna semula merentas platform):

| Komponen | Kegunaan | Platform |
|----------|----------|----------|
| `ChatStream` | Sembang penstriman dengan sokongan Markdown, blok kod (syntax highlighting), dan imej. | Semua |
| `ThinkingBlock` | Bahagian boleh kembang yang memaparkan pemikiran ejen (teks monospace). | Claude, DeepSeek |
| `ArtifactPanel` | Panel sisi untuk memaparkan kod/dokumen yang dijana ejen. | Claude |
| `SandboxStatus` | Penunjuk status persekitaran terurus (Google Antigravity). | Google |
| `CostCounter` | Widget terapung yang memaparkan penggunaan token dan kos dalam masa nyata. | DeepSeek, semua |
| `MultiAgentFlow` | Carta alir visual untuk orkestrasi multi‑ejen. | Claude |
| `FileDropZone` | Zon lepas untuk fail multimodal besar. | Google |
| `MCPConnectionList` | Senarai pelayan MCP yang disambungkan dengan status. | Claude |
| `MoEVisualizer` | Visualisasi grid pakar yang diaktifkan. | DeepSeek (opsional) |
| `APIKeyGate` | Dialog pengesahan API key sebelum menggunakan mana‑mana ejen. | Semua |

> Semua komponen dibina dengan **Web Components** atau rangka kerja neutral (React/Vue) untuk memudahkan penggunaan dalam tutorial yang berbeza.

---

## 5. Reka Bentuk Laman Web Tutorial

Laman web utama `orchestra-ai-agent.edu.my` (atau GitHub Pages) dibina mengikut prinsip berikut:

### 5.1 Navigasi Tiga Lorong
- **Navbar Utama:** `Laman Utama | Google AI | Claude | DeepSeek | Perbandingan | Komuniti`
- Setiap lorong (“akademi”) mempunyai **warna tema tersendiri** untuk pembezaan segera:
  - Google AI Studio: `#4285F4` (Google Blue)
  - Anthropic Claude: `#D97706` (Amber/Orange)
  - DeepSeek: `#059669` (Emerald Green)

### 5.2 Halaman Perbandingan Interaktif
- Matriks perbandingan dengan penapis: pengguna boleh memilih keutamaan (kos, kelajuan, ketepatan) dan UI akan menyerlahkan platform yang paling sesuai.
- **Kalkulator Kos Token** — interaktif, membolehkan pengguna memasukkan anggaran token dan melihat perbandingan harga ketiga‑tiga platform dalam RM dan USD.

### 5.3 Halaman Tutorial (Struktur)
- Susun atur dua lajur:
  - **Lajur Kiri (25%):** Jadual kandungan, penunjuk kemajuan pelajaran.
  - **Lajur Kanan (75%):** Kandungan tutorial dengan blok kod interaktif (boleh salin), tangkapan skrin, dan output contoh.

### 5.4 Tema Gelap/Cerah
- Sokongan `prefers-color-scheme` automatik, dengan togol manual di penjuru kanan atas.
- Tema cerah: latar putih, teks hitam, aksen warna platform.
- Tema gelap: latar `#0D1117`, teks `#E6EDF3`, aksen dikekalkan.

---

## 6. Aliran Kerja Pengguna (User Flow)

### 6.1 Aliran Pengguna Baru
1. **Laman Utama** → Pilih platform berdasarkan cadangan (soal selidik pantas: “Apa yang anda mahu bina?”).
2. **Halaman Platform** → Baca pengenalan, lihat demo video 2 minit.
3. **Pra‑keperluan** → Dapatkan API key melalui panduan bergambar.
4. **Quick Start** → Jalankan kod pertama (copy‑paste), lihat output.
5. **Fasa 1** → Tutorial asas.
6. **Fasa 2 & 3** → Tutorial lanjutan dengan projek hands‑on.

### 6.2 Aliran Interaksi Ejen (Semua Platform)
1. **Input Pengguna** → Medan sembang atau muat naik fail.
2. **Pemprosesan** → Penstriman token + paparan status (tool call / thinking).
3. **Output** → Jawapan + Artifak (jika ada).
4. **Semakan Kos** → Widget kos dikemas kini.
5. **Maklum Balas** → Butang 👍👎 untuk menilai kualiti respons (disimpan secara pilihan).

---

## 7. Responsif & Kebolehcapaian

- **Mudah Alih:** Antara muka dwi‑panel (Claude) bertukar kepada mod tab pada skrin <768px. Panel Artifacts menjadi lapisan bawah yang boleh ditarik ke atas.
- **Pembaca Skrin:** Semua mesej ejen mempunyai atribut `aria-label` yang membezakan “pemikiran”, “tindakan”, dan “output”. Kawasan penstriman menggunakan `aria-live="polite"`.
- **Kontras:** Semua teks memenuhi nisbah kontras 4.5:1 (WCAG AA). Tema gelap diuji dengan alat penyemak kontras.
- **Navigasi Papan Kekunci:** Semua komponen interaktif boleh dicapai dengan `Tab`, diaktifkan dengan `Enter`/`Space`, dan mempunyai gelang fokus yang jelas.

---

## 8. Keantarabangsaan (i18n)

Memandangkan sasaran pelajar termasuk Malaysia, Indonesia, dan antarabangsa:

- Semua label UI menyokong **Bahasa Melayu** dan **Bahasa Inggeris** secara dwibahasa.
- Format nombor dan mata wang mengikut locale: `RM 0.03` untuk BM, `$0.006` untuk EN.
- Tarikh dalam format `24 Mei 2026` (BM) / `May 24, 2026` (EN).
- Pemilihan bahasa melalui pengepala `Accept-Language` atau pemilih bahasa di penjuru atas.

---

## 📖 Seterusnya

- Lihat `ARCHITECTURE.md` dalam setiap folder platform untuk memahami aliran data yang menyokong UI ini.
- Untuk panduan langkah demi langkah pembangunan, rujuk `USER_FLOW.md`.

---

_Dokumen ini diselenggara oleh komuniti State of Protocol.  
Sumbangan untuk menambah baik komponen UI dialu‑alukan — sila lihat [CONTRIBUTING.md](../.github/CONTRIBUTING.md)._