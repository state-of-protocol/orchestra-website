# 🤝 CONTRIBUTING.md — Panduan Menyumbang

**Orchestra AI‑Agent Tutorial**  
_Versi 1.0 · Mei 2026_

Terima kasih kerana berminat untuk menyumbang kepada projek **Orchestra AI‑Agent Tutorial**! Dokumen ini mengandungi garis panduan dan proses yang perlu diikuti untuk memastikan sumbangan anda dapat disemak dan digabungkan dengan lancar.

---

## 📖 Isi Kandungan

- [1. Kod Tingkah Laku](#1-kod-tingkah-laku)
- [2. Cara Anda Boleh Membantu](#2-cara-anda-boleh-membantu)
- [3. Melaporkan Pepijat](#3-melaporkan-pepijat)
- [4. Mencadangkan Ciri Baharu](#4-mencadangkan-ciri-baharu)
- [5. Persediaan Persekitaran Pembangunan](#5-persediaan-persekitaran-pembangunan)
- [6. Aliran Kerja Git & Pengurusan Cawangan](#6-aliran-kerja-git--pengurusan-cawangan)
- [7. Konvensyen Mesej Komit](#7-konvensyen-mesej-komit)
- [8. Proses Pull Request](#8-proses-pull-request)
- [9. Piawaian Pengekodan](#9-piawaian-pengekodan)
- [10. Penulisan Dokumentasi](#10-penulisan-dokumentasi)
- [11. Ujian](#11-ujian)
- [12. Sumbangan Terjemahan](#12-sumbangan-terjemahan)
- [13. Lesen](#13-lesen)

---

## 1. Kod Tingkah Laku

Projek ini mengamalkan **Kod Tingkah Laku Komuniti Sumber Terbuka**. Dengan menyertai, anda bersetuju untuk:

- Bersikap hormat dan inklusif terhadap semua penyumbang.
- Memberi maklum balas yang membina, bukan kritikan yang menjatuhkan.
- Mengutamakan kepentingan komuniti dan projek.
- Tidak menggunakan bahasa atau imej yang bersifat mengancam, menghina, atau diskriminasi.

Pelanggaran kod tingkah laku boleh mengakibatkan tindakan oleh penyelenggara, termasuk penolakan sumbangan atau larangan sementara/kekal. Sila laporkan sebarang tingkah laku yang tidak wajar kepada pasukan penyelenggara.

---

## 2. Cara Anda Boleh Membantu

Kami mengalu‑alukan pelbagai bentuk sumbangan:

- 🐛 **Melaporkan pepijat** dalam kod boilerplate, dokumentasi, atau laman web.
- 💡 **Mencadangkan ciri baharu** atau penambahbaikan tutorial.
- 📝 **Menulis atau menambah baik dokumentasi** (termasuk 7‑fail spesifikasi).
- 🌐 **Menterjemah** kandungan ke bahasa lain (Bahasa Melayu, 中文, 日本語, Español).
- 🧪 **Menambah contoh kod** atau projek sampel untuk mana‑mana platform.
- 🎨 **Menambah baik UI/UX** laman web tutorial (`website/`).
- ⭐ **Berkongsi projek** dengan komuniti dan memberi maklum balas.

---

## 3. Melaporkan Pepijat

Jika anda menemui pepijat, sila buka **Issue** di GitHub dengan maklumat berikut:

- **Tajuk isu:** Ringkas dan deskriptif (contoh: “Ralat import google-genai dalam boilerplate/agent.py”).
- **Deskripsi:** Langkah‑langkah untuk menghasilkan semula pepijat.
- **Jangkaan vs Realiti:** Apa yang sepatutnya berlaku dan apa yang sebenarnya berlaku.
- **Persekitaran:** Sistem operasi, versi Python/Node.js, versi SDK.
- **Log ralat:** Lampirkan mesej ralat penuh (jika ada).
- **Tangkapan skrin:** Jika berkaitan UI.

Gunakan templat isu yang disediakan (`ISSUE_TEMPLATE/bug_report.md`) untuk memudahkan proses.

---

## 4. Mencadangkan Ciri Baharu

Untuk cadangan ciri:

1. Semak **isu sedia ada** dan papan projek untuk memastikan cadangan anda belum wujud.
2. Buka isu baharu dengan label `enhancement`.
3. Jelaskan:
   - Masalah yang diselesaikan oleh ciri ini.
   - Bagaimana ciri ini sepatutnya berfungsi.
   - Platform yang terlibat (Google, Claude, DeepSeek, atau semua).
   - Alternatif yang telah anda pertimbangkan.

Penyelenggara akan membincangkan kesesuaian ciri sebelum sebarang kerja pembangunan dimulakan.

---

## 5. Persediaan Persekitaran Pembangunan

### 5.1 Klon Repositori

```bash
git clone https://github.com/state-of-protocol/AI-Orchestration-Tutorial.git
cd AI-Orchestration-Tutorial
```

### 5.2 Pasang Keperluan Asas

Ikut panduan dalam [SKILL.md](./SKILL.md) untuk memasang runtime dan SDK yang diperlukan mengikut platform yang ingin anda usahakan.

**Minimum:**
- Git 2.40+
- Python 3.10+ atau Node.js 18+
- Docker 24.0+ (jika mengusahakan MCP atau DeepSeek)

### 5.3 Sediakan API Keys (Jika Perlu)

Untuk menguji kod boilerplate yang memanggil API sebenar, salin fail `.env.example` kepada `.env` dan isikan kunci API anda. **Jangan commit fail `.env`!**

### 5.4 Pasang Alatan Linting

Projek ini menggunakan alat linting berikut:

**Python:**
```bash
pip install black ruff
```

**TypeScript/Node.js:**
```bash
npm install eslint prettier --save-dev
```

---

## 6. Aliran Kerja Git & Pengurusan Cawangan

Kami menggunakan model **GitHub Flow** yang dipermudahkan:

1. **Fork** repositori ini ke akaun GitHub anda.
2. **Klon** fork anda secara setempat.
3. Cipta **cawangan baharu** dari `main` untuk setiap sumbangan:
   ```bash
   git checkout -b feature/nama-ciri
   # atau
   git checkout -b fix/deskripsi-pepijat
   ```
4. Buat perubahan dan komit secara atomik (satu komit = satu perubahan logik).
5. Tolak cawangan ke fork anda dan buka Pull Request ke `main`.

**Peraturan cawangan:**
- `main` — kod stabil, sedia untuk pengguna.
- Cawangan kerja: `feature/*`, `fix/*`, `docs/*`, `translate/*`.

---

## 7. Konvensyen Mesej Komit

Gunakan format **Conventional Commits**:

```
<type>(<scope>): <description>
```

**Jenis (`type`):**
- `feat` – ciri baharu
- `fix` – pembaikan pepijat
- `docs` – perubahan dokumentasi
- `style` – pemformatan, titik koma, dsb. (tiada perubahan logik)
- `refactor` – penyusunan semula kod tanpa menambah ciri atau membetulkan pepijat
- `test` – menambah atau membaiki ujian
- `chore` – tugas rutin (kemas kini kebergantungan, dll.)

**Skop (`scope`):** Platform atau komponen (contoh: `google`, `claude`, `deepseek`, `website`, `shared`).

**Contoh:**
```
feat(google): tambah contoh Managed Agent dengan Antigravity
fix(claude): betulkan konfigurasi MCP untuk laluan fail Windows
docs(shared): kemas kini harga API dalam kalkulator kos
```

---

## 8. Proses Pull Request

1. Pastikan cawangan anda adalah **terkini** dengan `main`:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. Tolak cawangan ke fork anda:
   ```bash
   git push origin feature/nama-ciri
   ```
3. Buka Pull Request (PR) di GitHub:
   - **Tajuk:** Ringkas dan deskriptif (mengikut konvensyen komit).
   - **Deskripsi:** Terangkan apa yang diubah, mengapa, dan sebarang nota untuk penyemak.
   - **Pautkan isu:** Gunakan kata kunci `Closes #123` jika PR ini menyelesaikan isu.
4. PR akan melalui **semakan automatik** (CI) untuk linting dan ujian (jika ada).
5. Penyelenggara akan menyemak PR anda. Bersedia untuk membuat pindaan berdasarkan maklum balas.
6. Setelah diluluskan, PR akan digabungkan oleh penyelenggara.

**Senarai semak sebelum membuka PR:**
- [ ] Kod mengikut piawaian pengekodan projek (lihat [Seksyen 9](#9-piawaian-pengekodan)).
- [ ] Dokumentasi dikemas kini jika perlu (fail spesifikasi, README, komen kod).
- [ ] Ujian diluluskan secara setempat (jika berkaitan).
- [ ] Tiada API key atau rahsia dalam kod.
- [ ] Perubahan tidak melanggar [RULES.md](./RULES.md).

---

## 9. Piawaian Pengekodan

### 9.1 Python (Google AI Studio & DeepSeek)

- Ikut **PEP 8**. Gunakan `black` untuk pemformatan automatik.
- Gunakan **type hints** pada semua fungsi awam.
- Gunakan `pathlib` untuk laluan fail, bukan rentetan mentah.
- Docstring mengikut **Google Style** atau **NumPy Style**.

```python
# ✅ Baik
from pathlib import Path

def load_config(config_path: Path) -> dict:
    """Membaca fail konfigurasi daripada laluan."""
    return json.loads(config_path.read_text())
```

### 9.2 TypeScript (Anthropic Claude)

- Gunakan **TypeScript**, bukan JavaScript biasa.
- Ikut konfigurasi **ESLint + Prettier** yang disediakan dalam `boilerplate/`.
- Gunakan `zod` untuk pengesahan skema data.

```typescript
// ✅ Baik
import { z } from 'zod';

const ConfigSchema = z.object({
  apiKey: z.string(),
  model: z.enum(['claude-sonnet-5', 'claude-opus-4']),
});
```

### 9.3 Semua Bahasa

- **Jangan commit kod yang dikomen** (commented-out code) ke `main`.
- **Gunakan komen `TODO` dan `FIXME`** dengan tarikh dan nama jika perlu menangguhkan sesuatu.
- **Elakkan fail besar** yang tidak berkaitan (contoh: `node_modules`, `__pycache__`).

---

## 10. Penulisan Dokumentasi

Projek ini menggunakan **rangka kerja 7‑fail** yang seragam untuk setiap platform. Jika sumbangan anda melibatkan dokumentasi:

- Pastikan format mengikut templat sedia ada dalam setiap akademi.
- Gunakan **Bahasa Melayu** untuk kandungan utama; terjemahan Bahasa Inggeris dialu‑alukan sebagai lapisan tambahan.
- Dokumen spesifikasi (`SKILL.md`, `DESIGN.md`, dll.) mesti dikemas kini jika perubahan menjejaskan kandungannya.
- Gunakan pautan relatif (`./`, `../`) untuk navigasi antara fail.

---

## 11. Ujian

Pada masa ini, projek menggunakan ujian automatik terhad. Sumbangan yang menambah ujian sangat dialu‑alukan:

- **Python:** Gunakan `pytest`.
- **TypeScript:** Gunakan `jest` atau `vitest`.
- Letakkan fail ujian dalam folder `tests/` di dalam akademi yang berkaitan.
- Pastikan ujian tidak memerlukan API key sebenar (gunakan mock jika perlu).

GitHub Actions akan menjalankan ujian secara automatik pada setiap PR. Sila pastikan ujian lulus sebelum meminta semakan.

---

## 12. Sumbangan Terjemahan

Kami sedang membina versi pelbagai bahasa untuk meluaskan capaian tutorial ini. Untuk menyumbang terjemahan:

1. Pilih bahasa sasaran dan buka isu `translation` untuk menyelaraskan usaha.
2. Cipta folder `i18n/<kod-bahasa>/` (contoh: `i18n/ms/`, `i18n/zh/`).
3. Salin struktur fail asal dan terjemahkan kandungan (bukan kod).
4. Pastikan istilah teknikal (API, SDK, dll.) kekal dalam Bahasa Inggeris.
5. Buka PR dengan label `translation`.

Bahasa yang sedang dicari:
- 🇲🇾 Bahasa Melayu (penambahbaikan)
- 🇨🇳 中文
- 🇯🇵 日本語
- 🇪🇸 Español

---

## 13. Lesen

Dengan menyumbang kepada projek ini, anda bersetuju bahawa sumbangan anda akan dilesenkan di bawah [Lesen MIT](./LICENSE) yang sama dengan projek ini.

---

## ❓ Ada Soalan?

Jika anda mempunyai soalan yang tidak dijawab di sini:

- Buka [GitHub Discussion](https://github.com/state-of-protocol/AI-Orchestration-Tutorial/discussions)
- Sertai [Discord](https://discord.gg/example)
- Hubungi penyelenggara melalui isu GitHub

---

_Kami menghargai setiap sumbangan — besar atau kecil. Terima kasih kerana membantu menjadikan Orchestra AI‑Agent Tutorial sebagai sumber pembelajaran AI terbaik di Asia Tenggara! 🎻_
```