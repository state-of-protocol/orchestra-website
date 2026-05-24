/**
 * Orchestra AI-Agent Tutorial
 * Main Application Script
 * Version: 1.0.0 — May 2026
 * 
 * Mencakupi:
 * - Navigasi & tema
 * - Matriks perbandingan interaktif
 * - Kalkulator kos token masa nyata
 * - Demo penstriman ejen
 * - Pengurusan UI komponen (ThinkingBlock, CostCounter, Tab, dll.)
 */

/* ============================================================
 * 1. KONFIGURASI GLOBAL & KEADAAN APLIKASI
 * ============================================================ */

const APP_CONFIG = {
  // Harga API terkini (Mei 2026) per 1 juta token
  pricing: {
    google: {
      name: 'Google Gemini 3.5 Flash',
      input: 0.15,
      output: 0.60,
      cacheHit: 0.0375,
      contextWindow: 1_000_000,
    },
    googlePro: {
      name: 'Google Gemini 3.5 Pro',
      input: 1.25,
      output: 5.00,
      cacheHit: 0.3125,
      contextWindow: 1_000_000,
    },
    claudeSonnet: {
      name: 'Claude Sonnet 5',
      input: 3.00,
      output: 15.00,
      cacheHit: 0.30,
      contextWindow: 1_000_000,
    },
    claudeOpus: {
      name: 'Claude Opus 4.7',
      input: 15.00,
      output: 75.00,
      cacheHit: 1.50,
      contextWindow: 1_000_000,
    },
    deepseek: {
      name: 'DeepSeek V4-Pro',
      input: 0.015,
      output: 0.87,
      cacheHit: 0.0036,
      contextWindow: 1_000_000,
      discount: 0.75,
      discountNote: 'Potongan kekal 75% berkuat kuasa selepas 31 Mei 2026',
    },
    deepseekR1: {
      name: 'DeepSeek R1',
      input: 0.55,
      output: 2.19,
      cacheHit: 0.14,
      contextWindow: 1_000_000,
    },
  },

  // Pemetaan warna tema untuk setiap platform
  platformColors: {
    google: { primary: '#4285F4', light: '#E8F0FE', dark: '#1A237E' },
    claude: { primary: '#D97706', light: '#FEF3C7', dark: '#78350F' },
    deepseek: { primary: '#059669', light: '#ECFDF5', dark: '#064E3B' },
  },

  // Konfigurasi demo penstriman
  streamingDemo: {
    speed: 30, // ms per aksara
    maxSteps: 8,
  },
};

// Keadaan aplikasi global
const AppState = {
  currentPlatform: null, // 'google' | 'claude' | 'deepseek' | null
  theme: 'dark', // 'dark' | 'light'
  costCalculator: {
    platform: 'deepseek',
    inputTokens: 10000,
    outputTokens: 2000,
    cacheHit: false,
  },
  streamingActive: false,
  streamingAbortController: null,
};

/* ============================================================
 * 2. FUNGSI UTILITI
 * ============================================================ */

/**
 * Format nombor dengan pemisah ribuan.
 * @param {number} num - Nombor untuk diformat
 * @returns {string} Nombor yang telah diformat
 */
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

/**
 * Format mata wang untuk paparan.
 * @param {number} amount - Jumlah dalam USD
 * @returns {string} Rentetan mata wang yang diformat
 */
function formatCost(amount) {
  if (amount < 0.01) {
    return `$${amount.toFixed(5)}`;
  }
  return `$${amount.toFixed(2)}`;
}

/**
 * Format mata wang dalam Ringgit Malaysia (anggaran 1 USD = 4.70 MYR).
 * @param {number} amountUSD - Jumlah dalam USD
 * @returns {string} Rentetan mata wang yang diformat
 */
function formatCostMYR(amountUSD) {
  const myr = amountUSD * 4.7;
  if (myr < 0.01) {
    return `RM ${myr.toFixed(4)}`;
  }
  return `RM ${myr.toFixed(2)}`;
}

/**
 * Debaun (debounce) fungsi untuk mengelakkan panggilan berlebihan.
 * @param {Function} func - Fungsi untuk didebaun
 * @param {number} wait - Masa menunggu dalam ms
 * @returns {Function} Fungsi yang telah didebaun
 */
function debounce(func, wait = 250) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Salin teks ke papan keratan.
 * @param {string} text - Teks untuk disalin
 * @returns {Promise<boolean>} Kejayaan salinan
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback untuk pelayar lama
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
}

/* ============================================================
 * 3. PENGURUSAN TEMA
 * ============================================================ */

function initTheme() {
  const savedTheme = localStorage.getItem('orchestra-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  // Pemantau perubahan tema sistem
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('orchestra-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  AppState.theme = theme;
  localStorage.setItem('orchestra-theme', theme);

  // Kemas kini butang togol tema jika wujud
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-pressed', theme === 'dark');
    toggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Tukar ke tema cerah' : 'Tukar ke tema gelap');
  }
}

function toggleTheme() {
  const newTheme = AppState.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

/* ============================================================
 * 4. NAVIGASI & PLATFORM SWITCHER
 * ============================================================ */

function initNavigation() {
  const navLinks = document.querySelectorAll('[data-platform]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = link.getAttribute('data-platform');
      switchPlatform(platform);
    });
  });

  // Serlahkan pautan aktif berdasarkan hash URL
  const hash = window.location.hash.replace('#', '');
  if (hash && ['google', 'claude', 'deepseek'].includes(hash)) {
    switchPlatform(hash, false);
  }
}

function switchPlatform(platform, updateURL = true) {
  AppState.currentPlatform = platform;

  // Kemas kini hash URL
  if (updateURL) {
    window.location.hash = platform;
  }

  // Kemas kini kelas aktif pada navigasi
  document.querySelectorAll('[data-platform]').forEach((link) => {
    const isActive = link.getAttribute('data-platform') === platform;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  // Serlahkan kad platform dalam matriks perbandingan
  document.querySelectorAll('.platform-card').forEach((card) => {
    const cardPlatform = card.getAttribute('data-platform');
    card.classList.toggle('highlighted', cardPlatform === platform);
  });

  // Tatal ke bahagian platform yang berkaitan
  const targetSection = document.getElementById(`${platform}-section`);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Acara tersuai untuk komponen lain yang mendengar
  document.dispatchEvent(new CustomEvent('platformChanged', { detail: { platform } }));
}

/* ============================================================
 * 5. KALKULATOR KOS TOKEN
 * ============================================================ */

function initCostCalculator() {
  const calculator = document.getElementById('cost-calculator');
  if (!calculator) return;

  const elements = {
    platformSelect: document.getElementById('calc-platform'),
    inputTokens: document.getElementById('calc-input-tokens'),
    outputTokens: document.getElementById('calc-output-tokens'),
    cacheToggle: document.getElementById('calc-cache-toggle'),
    resultUSD: document.getElementById('calc-result-usd'),
    resultMYR: document.getElementById('calc-result-myr'),
    savingsNote: document.getElementById('calc-savings-note'),
    inputRange: document.getElementById('calc-input-range'),
    outputRange: document.getElementById('calc-output-range'),
  };

  // Fungsi untuk mengemas kini kalkulator
  const updateCalculator = () => {
    const platform = elements.platformSelect?.value || 'deepseek';
    const inputTokens = parseInt(elements.inputTokens?.value || 10000, 10);
    const outputTokens = parseInt(elements.outputTokens?.value || 2000, 10);
    const useCache = elements.cacheToggle?.checked || false;

    const pricing = APP_CONFIG.pricing[platform];
    if (!pricing) return;

    // Kira kos
    const inputRate = useCache ? (pricing.cacheHit || pricing.input * 0.25) : pricing.input;
    const inputCost = (inputTokens / 1_000_000) * inputRate;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;
    const totalCost = inputCost + outputCost;

    // Kemas kini UI
    if (elements.resultUSD) {
      elements.resultUSD.textContent = formatCost(totalCost);
    }
    if (elements.resultMYR) {
      elements.resultMYR.textContent = formatCostMYR(totalCost);
    }

    // Nota penjimatan untuk DeepSeek
    if (elements.savingsNote) {
      if (platform === 'deepseek' || platform === 'deepseekR1') {
        const otherCost = (inputTokens / 1_000_000) * 3.0 + (outputTokens / 1_000_000) * 15.0; // Claude Sonnet
        const savings = otherCost > 0 ? ((otherCost - totalCost) / otherCost * 100).toFixed(0) : 0;
        elements.savingsNote.innerHTML = `
          <span class="savings-highlight">💰 Anda menjimatkan ~${savings}%</span> berbanding alternatif Barat untuk beban kerja yang sama.
        `;
        elements.savingsNote.style.display = 'block';
      } else if (platform === 'deepseek' && pricing.discount) {
        elements.savingsNote.innerHTML = `
          <span class="savings-highlight">🎉 Diskaun kekal ${pricing.discount * 100}%</span> — ${pricing.discountNote || ''}
        `;
        elements.savingsNote.style.display = 'block';
      } else {
        elements.savingsNote.style.display = 'none';
      }
    }

    // Kemas kini keadaan
    AppState.costCalculator = { platform, inputTokens, outputTokens, cacheHit: useCache };

    // Selaraskan input nombor dengan julat
    if (elements.inputRange && elements.inputTokens) {
      elements.inputRange.value = inputTokens;
      elements.inputTokens.value = inputTokens;
    }
    if (elements.outputRange && elements.outputTokens) {
      elements.outputRange.value = outputTokens;
      elements.outputTokens.value = outputTokens;
    }
  };

  // Pendengar acara
  const debouncedUpdate = debounce(updateCalculator, 200);

  elements.platformSelect?.addEventListener('change', updateCalculator);
  elements.inputTokens?.addEventListener('input', debouncedUpdate);
  elements.outputTokens?.addEventListener('input', debouncedUpdate);
  elements.cacheToggle?.addEventListener('change', updateCalculator);

  // Selaraskan julat dengan input nombor
  elements.inputRange?.addEventListener('input', function () {
    if (elements.inputTokens) elements.inputTokens.value = this.value;
    debouncedUpdate();
  });
  elements.outputRange?.addEventListener('input', function () {
    if (elements.outputTokens) elements.outputTokens.value = this.value;
    debouncedUpdate();
  });

  // Selaraskan input nombor dengan julat
  elements.inputTokens?.addEventListener('change', function () {
    if (elements.inputRange) elements.inputRange.value = this.value;
  });
  elements.outputTokens?.addEventListener('change', function () {
    if (elements.outputRange) elements.outputRange.value = this.value;
  });

  // Butang pratetap
  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = parseInt(btn.getAttribute('data-input'), 10);
      const output = parseInt(btn.getAttribute('data-output'), 10);
      if (elements.inputTokens) elements.inputTokens.value = input;
      if (elements.outputTokens) elements.outputTokens.value = output;
      if (elements.inputRange) elements.inputRange.value = input;
      if (elements.outputRange) elements.outputRange.value = output;
      updateCalculator();
    });
  });

  // Pengiraan awal
  updateCalculator();
}

/* ============================================================
 * 6. MATRIKS PERBANDINGAN INTERAKTIF
 * ============================================================ */

function initComparisonMatrix() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.comparison-row');

  if (!filterButtons.length || !rows.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Kemas kini butang aktif
      filterButtons.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn);
      });

      // Tapis baris
      rows.forEach((row) => {
        if (filter === 'all') {
          row.style.display = '';
        } else {
          const matches = row.getAttribute('data-tags')?.includes(filter);
          row.style.display = matches ? '' : 'none';
        }
      });
    });
  });

  // Butang "Tunjukkan Semua"
  const showAllBtn = document.querySelector('[data-filter="all"]');
  if (showAllBtn) {
    showAllBtn.classList.add('active');
    showAllBtn.setAttribute('aria-pressed', 'true');
  }
}

/* ============================================================
 * 7. DEMO PENSTRIMAN EJEN
 * ============================================================ */

function initStreamingDemo() {
  const demoContainer = document.getElementById('streaming-demo');
  if (!demoContainer) return;

  const elements = {
    output: document.getElementById('demo-output'),
    startBtn: document.getElementById('demo-start'),
    stopBtn: document.getElementById('demo-stop'),
    platformSelect: document.getElementById('demo-platform'),
    thinkingBlock: document.getElementById('demo-thinking'),
    costCounter: document.getElementById('demo-cost'),
    stepIndicator: document.getElementById('demo-steps'),
  };

  // Senarai respons demo untuk setiap platform
  const demoResponses = {
    google: {
      thinking: null,
      steps: [
        'Memproses permintaan...',
        'Menganalisis input multimodal...',
        'Menjalankan kod dalam sandbox Antigravity...',
        'Sandbox siap. Memuatkan pakej Python...',
        'Memproses data CSV...',
        'Menjana visualisasi...',
        'Carta siap. Menyimpan ke fail output.',
        '✅ Analisis selesai! Carta disimpan sebagai `chart.png`. Klik untuk memuat turun.',
      ],
    },
    claude: {
      thinking: 'Mari saya fikirkan langkah demi langkah. Pertama, saya perlu memahami struktur kod yang akan diubah. Saya akan memeriksa kebergantungan antara modul...',
      steps: [
        '🦉 Coordinator (Opus): Merangka pelan kerja...',
        '📋 Pelan: 1) Analisis kebergantungan, 2) Tulis semula middleware, 3) Kemas kini ujian.',
        '🔧 Coder (Sonnet): Membaca fail berkaitan melalui MCP...',
        '🔧 Coder (Sonnet): Menulis perubahan pada `auth.py`...',
        '🔍 Reviewer (Sonnet): Menyemak perubahan...',
        '🔍 Reviewer (Sonnet): Menjalankan ujian unit...',
        '✅ Reviewer: Semua ujian lulus. Perubahan diluluskan.',
        '🦉 Coordinator: Menggabungkan perubahan. Ringkasan siap.',
      ],
    },
    deepseek: {
      thinking: 'Baik, mari saya analisis soalan ini secara mendalam. Saya akan memecahkan masalah kepada komponen yang lebih kecil dan memproses setiap satu...',
      steps: [
        '🐉 DeepSeek V4-Pro: Mengaktifkan 6/384 pakar MoE...',
        '🧠 R1 Chain-of-Thought diaktifkan...',
        '📊 Memproses 1 juta token konteks...',
        '🔍 Mencari pola dalam data...',
        '💡 Menemui 3 kebergantungan kitaran.',
        '📝 Menjana laporan terperinci...',
        '💰 Kos setakat ini: $0.004 (RM 0.02)',
        '✅ Analisis selesai. 3 kebergantungan kitaran ditemui.',
      ],
    },
  };

  let currentStep = 0;
  let streamingTimeout = null;

  function resetDemo() {
    currentStep = 0;
    AppState.streamingActive = false;
    if (elements.output) elements.output.innerHTML = '';
    if (elements.thinkingBlock) {
      elements.thinkingBlock.innerHTML = '';
      elements.thinkingBlock.style.display = 'none';
    }
    if (elements.costCounter) elements.costCounter.textContent = '💰 Kos: $0.00';
    if (elements.stepIndicator) elements.stepIndicator.textContent = '';
    if (elements.startBtn) elements.startBtn.disabled = false;
    if (elements.stopBtn) elements.stopBtn.disabled = true;
  }

  async function streamStep(platform, steps, thinking, totalSteps) {
    if (!AppState.streamingActive || currentStep >= totalSteps) {
      // Selesai
      AppState.streamingActive = false;
      if (elements.startBtn) elements.startBtn.disabled = false;
      if (elements.stopBtn) elements.stopBtn.disabled = true;
      return;
    }

    const step = steps[currentStep];
    if (elements.output) {
      const stepElement = document.createElement('div');
      stepElement.className = 'stream-step';
      stepElement.textContent = step;
      stepElement.style.opacity = '0';
      stepElement.style.transform = 'translateY(10px)';
      elements.output.appendChild(stepElement);

      // Animasi kemunculan
      requestAnimationFrame(() => {
        stepElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        stepElement.style.opacity = '1';
        stepElement.style.transform = 'translateY(0)';
      });
    }

    // Kemas kini penunjuk langkah
    if (elements.stepIndicator) {
      elements.stepIndicator.textContent = `Langkah ${currentStep + 1}/${totalSteps}`;
    }

    // Kemas kini kos demo (simulasi)
    if (elements.costCounter) {
      const estimatedCost = ((currentStep + 1) / totalSteps * 0.01).toFixed(4);
      elements.costCounter.textContent = `💰 Anggaran Kos: $${estimatedCost}`;
    }

    // Paparkan pemikiran untuk Claude & DeepSeek pada langkah pertama
    if (currentStep === 0 && thinking && elements.thinkingBlock) {
      elements.thinkingBlock.style.display = 'block';
      elements.thinkingBlock.innerHTML = `<strong>🧠 Proses Pemikiran:</strong><br><span class="thinking-text">${thinking}</span>`;
    }

    currentStep++;

    // Jadualkan langkah seterusnya
    const delay = APP_CONFIG.streamingDemo.speed * step.length;
    streamingTimeout = setTimeout(() => {
      streamStep(platform, steps, thinking, totalSteps);
    }, Math.min(delay, 2000)); // Had maksimum 2 saat
  }

  function startDemo() {
    const platform = elements.platformSelect?.value || 'google';
    const demoData = demoResponses[platform];
    if (!demoData) return;

    resetDemo();
    AppState.streamingActive = true;

    if (elements.startBtn) elements.startBtn.disabled = true;
    if (elements.stopBtn) elements.stopBtn.disabled = false;

    const steps = demoData.steps;
    const thinking = demoData.thinking;

    streamStep(platform, steps, thinking, steps.length);
  }

  function stopDemo() {
    AppState.streamingActive = false;
    if (streamingTimeout) {
      clearTimeout(streamingTimeout);
      streamingTimeout = null;
    }
    if (elements.startBtn) elements.startBtn.disabled = false;
    if (elements.stopBtn) elements.stopBtn.disabled = true;

    if (elements.output) {
      const stopMsg = document.createElement('div');
      stopMsg.className = 'stream-step stream-stopped';
      stopMsg.textContent = '⏹️ Demonstrasi dihentikan.';
      elements.output.appendChild(stopMsg);
    }
  }

  // Pendengar acara
  elements.startBtn?.addEventListener('click', startDemo);
  elements.stopBtn?.addEventListener('click', stopDemo);

  // Tukar platform dalam demo
  elements.platformSelect?.addEventListener('change', () => {
    resetDemo();
    // Kemas kini warna demo mengikut platform
    const platform = elements.platformSelect.value;
    const colors = APP_CONFIG.platformColors[platform];
    if (colors && demoContainer) {
      demoContainer.style.borderColor = colors.primary;
    }
  });
}

/* ============================================================
 * 8. KOMPONEN THINKING BLOCK (BOLEH KEMBANG)
 * ============================================================ */

function initThinkingBlocks() {
  document.querySelectorAll('.thinking-block').forEach((block) => {
    const header = block.querySelector('.thinking-header');
    const content = block.querySelector('.thinking-content');

    if (header && content) {
      // Sediakan keadaan awal
      const isExpanded = block.getAttribute('data-expanded') === 'true';
      content.style.display = isExpanded ? 'block' : 'none';
      header.setAttribute('aria-expanded', isExpanded);

      header.addEventListener('click', () => {
        const expanded = header.getAttribute('aria-expanded') === 'true';
        content.style.display = expanded ? 'none' : 'block';
        header.setAttribute('aria-expanded', !expanded);
        block.setAttribute('data-expanded', !expanded);
      });

      // Sokongan papan kekunci
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    }
  });
}

/* ============================================================
 * 9. PENGURUSAN TAB
 * ============================================================ */

function initTabs() {
  document.querySelectorAll('.tab-container').forEach((container) => {
    const tabs = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        // Nyahaktifkan semua tab dan panel dalam bekas ini
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach((p) => {
          p.classList.remove('active');
        });

        // Aktifkan yang dipilih
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const targetPanel = container.querySelector(`#${target}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });

    // Aktifkan tab pertama secara lalai
    if (tabs.length > 0) {
      tabs[0].click();
    }
  });
}

/* ============================================================
 * 10. BUTANG SALIN KOD
 * ============================================================ */

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const target = targetId ? document.getElementById(targetId) : btn.closest('pre')?.querySelector('code');

      if (target) {
        const text = target.textContent || '';
        const success = await copyToClipboard(text);

        // Maklum balas visual
        const originalText = btn.textContent;
        btn.textContent = success ? '✅ Disalin!' : '❌ Gagal';
        btn.classList.add(success ? 'copy-success' : 'copy-error');

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copy-success', 'copy-error');
        }, 2000);
      }
    });
  });
}

/* ============================================================
 * 11. PENUNJUK KEMAJUAN TUTORIAL
 * ============================================================ */

function initProgressTracker() {
  const tracker = document.getElementById('progress-tracker');
  if (!tracker) return;

  const steps = tracker.querySelectorAll('.progress-step');
  const savedProgress = JSON.parse(localStorage.getItem('orchestra-progress') || '{}');

  // Pulihkan kemajuan yang disimpan
  steps.forEach((step) => {
    const stepId = step.getAttribute('data-step');
    if (savedProgress[stepId]) {
      step.classList.add('completed');
    }
  });

  // Pendengar untuk menanda langkah sebagai selesai
  steps.forEach((step) => {
    const checkbox = step.querySelector('.step-checkbox');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        const stepId = step.getAttribute('data-step');
        if (checkbox.checked) {
          step.classList.add('completed');
          savedProgress[stepId] = true;
        } else {
          step.classList.remove('completed');
          delete savedProgress[stepId];
        }
        localStorage.setItem('orchestra-progress', JSON.stringify(savedProgress));
      });
    }
  });
}

/* ============================================================
 * 12. PENGENDALIAN PETA INTERAKTIF (ARCHITECTURE DIAGRAM)
 * ============================================================ */

function initArchitectureDiagram() {
  const diagram = document.getElementById('architecture-diagram');
  if (!diagram) return;

  const nodes = diagram.querySelectorAll('.arch-node');
  const tooltip = document.getElementById('arch-tooltip');

  nodes.forEach((node) => {
    node.addEventListener('mouseenter', (e) => {
      const description = node.getAttribute('data-description');
      if (tooltip && description) {
        tooltip.textContent = description;
        tooltip.style.display = 'block';
        const rect = node.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
      }
      node.classList.add('node-hover');
    });

    node.addEventListener('mouseleave', () => {
      if (tooltip) {
        tooltip.style.display = 'none';
      }
      node.classList.remove('node-hover');
    });
  });
}

/* ============================================================
 * 13. PENGURUSAN NOTIFIKASI
 * ============================================================ */

function showNotification(message, type = 'info', duration = 3000) {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.setAttribute('role', 'alert');
  notification.innerHTML = `
    <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span class="notification-message">${message}</span>
    <button class="notification-close" aria-label="Tutup">&times;</button>
  `;

  container.appendChild(notification);

  // Animasi kemunculan
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  });

  // Butang tutup
  notification.querySelector('.notification-close').addEventListener('click', () => {
    removeNotification(notification);
  });

  // Auto-buang selepas tempoh
  setTimeout(() => {
    removeNotification(notification);
  }, duration);
}

function removeNotification(notification) {
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

/* ============================================================
 * 14. INISIALISASI UTAMA
 * ============================================================ */

function init() {
  // Inisialisasi semua komponen
  initTheme();
  initNavigation();
  initCostCalculator();
  initComparisonMatrix();
  initStreamingDemo();
  initThinkingBlocks();
  initTabs();
  initCopyButtons();
  initProgressTracker();
  initArchitectureDiagram();
  Playground.init();

  // Pendengar acara global
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // Sokongan navigasi papan kekunci untuk komponen interaktif
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Tutup sebarang modal atau tooltip
      const tooltip = document.getElementById('arch-tooltip');
      if (tooltip) tooltip.style.display = 'none';
    }
  });

  // Log permulaan
  console.log('🎻 Orchestra AI-Agent Tutorial — dimuatkan.');
  console.log(`   Platform sedia: Google AI Studio | Anthropic Claude | DeepSeek`);
  console.log(`   Tema: ${AppState.theme}`);
  console.log(`   Harga terkini: Mei 2026`);
}

// Mula apabila DOM sedia
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ============================================================
 * 15. VIBE CODE PLAYGROUND
 * ============================================================ */

const Playground = {
  elements: {},
  mode: 'cloud',
  exampleCode: {
    gemini: `# Google Gemini Managed Agent
from google import genai

client = genai.Client()
interaction = client.interactions.create(
    agent="antigravity-preview-05-2026",
    input="Analisis fail CSV ini dan berikan ringkasan.",
    environment="remote",
    files=[{"uri": "gs://bucket/data.csv"}]
)
print(interaction.output_text)`,
    claude: `// Anthropic Claude Multi-Agent
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const msg = await anthropic.messages.create({
    model: "claude-sonnet-5-20260501",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Refaktor fungsi auth ke JWT" }]
});
console.log(msg.content[0].text);`,
    deepseek: `# DeepSeek R1 Chain-of-Thought
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://api.deepseek.com/v1"
)
response = client.chat.completions.create(
    model="deepseek-r1",
    messages=[{"role": "user", "content": "Selesaikan masalah matematik ini..."}]
)
print(response.choices[0].message.content)`
  },

  simulateAgent(code, platform) {
    const steps = [
      { type: 'thinking', text: '🧠 Menganalisis kod...' },
      { type: 'tool-call', text: '🔧 Menyediakan persekitaran (sandbox/MCP)...' },
      { type: 'tool-call', text: '📂 Membaca fail berkaitan...' },
      { type: 'thinking', text: '🔄 Memproses logik ejen...' },
      { type: 'tool-call', text: '⚙️ Menjalankan function call...' },
      { type: 'success', text: '✅ Ejen selesai. Output: ' + (platform === 'deepseek' ? '<think>Ini contoh output simulasi.</think> Hasil simulasi berjaya.' : 'Hasil simulasi berjaya.') }
    ];
    return steps;
  },

  async callRealAPI(platform, apiKey, code) {
    const endpoints = {
      gemini: {
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
        body: { contents: [{ parts: [{ text: code }] }] }
      },
      claude: {
        url: 'https://api.anthropic.com/v1/messages',
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2026-05-01', 'Content-Type': 'application/json' },
        body: { model: 'claude-sonnet-5-20260501', max_tokens: 1024, messages: [{ role: 'user', content: code }] }
      },
      deepseek: {
        url: 'https://api.deepseek.com/v1/chat/completions',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: { model: 'deepseek-v4-pro', messages: [{ role: 'user', content: code }] }
      }
    };

    const config = endpoints[platform];
    try {
      const response = await fetch(config.url, {
        method: 'POST',
        headers: config.headers || { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.body)
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      let output = '';
      if (platform === 'gemini') output = data.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);
      else if (platform === 'claude') output = data.content?.[0]?.text || JSON.stringify(data);
      else if (platform === 'deepseek') output = data.choices?.[0]?.message?.content || JSON.stringify(data);
      return { success: true, output };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async run() {
    const code = this.elements.editor.value.trim();
    if (!code) return;

    this.elements.output.innerHTML = '';
    this.elements.status.textContent = 'Running...';
    this.elements.runBtn.disabled = true;

    if (this.mode === 'local') {
      const platform = this.elements.platformSelect?.value || 'gemini';
      const steps = this.simulateAgent(code, platform);
      for (const step of steps) {
        await new Promise(r => setTimeout(r, 600));
        this.appendOutput(step.type, step.text);
      }
      this.elements.status.textContent = 'Simulasi selesai';
    } else {
      const platform = this.elements.platformSelect.value;
      const apiKey = document.getElementById('pg-api-key').value.trim();
      if (!apiKey) {
        this.appendOutput('error', '❌ Sila masukkan API key.');
        this.elements.runBtn.disabled = false;
        return;
      }
      localStorage.setItem('pg-api-key', btoa(apiKey));
      this.appendOutput('thinking', '☁️ Menghantar kod ke ' + platform + '...');
      const result = await this.callRealAPI(platform, apiKey, code);
      if (result.success) {
        this.appendOutput('success', result.output);
        this.elements.status.textContent = 'Selesai';
      } else {
        this.appendOutput('error', '❌ Ralat API: ' + result.error);
        this.appendOutput('thinking', '💡 Petua: API Claude/DeepSeek mungkin memerlukan backend proxy kerana CORS. Untuk demo sepenuhnya dalam browser, gunakan Local mode.');
        this.elements.status.textContent = 'Gagal';
      }
    }
    this.elements.runBtn.disabled = false;
  },

  appendOutput(type, text) {
    const div = document.createElement('div');
    div.className = `step ${type}`;
    div.textContent = text;
    this.elements.output.appendChild(div);
    this.elements.output.scrollTop = this.elements.output.scrollHeight;
  },

  switchMode(mode) {
    this.mode = mode;
    document.querySelectorAll('.pg-mode-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.getElementById('pg-cloud-config').style.display = mode === 'cloud' ? 'block' : 'none';
  },

  loadExample(platform) {
    this.elements.editor.value = this.exampleCode[platform];
  },

  init() {
    this.elements = {
      editor: document.getElementById('pg-editor'),
      output: document.getElementById('pg-output'),
      runBtn: document.getElementById('pg-run-btn'),
      status: document.getElementById('pg-status'),
      cost: document.getElementById('pg-cost'),
      platformSelect: document.getElementById('pg-platform')
    };

    if (!this.elements.editor) return;

    this.elements.editor.value = this.exampleCode.gemini;

    document.querySelectorAll('.pg-mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
    });

    this.elements.platformSelect?.addEventListener('change', (e) => {
      this.loadExample(e.target.value);
    });

    this.elements.runBtn.addEventListener('click', () => this.run());

    document.getElementById('pg-reset-btn')?.addEventListener('click', () => {
      this.loadExample(this.elements.platformSelect?.value || 'gemini');
      this.elements.output.innerHTML = '<div class="pg-welcome">Sedia.</div>';
    });

    document.getElementById('pg-clear-output')?.addEventListener('click', () => {
      this.elements.output.innerHTML = '';
    });

    const savedKey = localStorage.getItem('pg-api-key');
    if (savedKey) {
      document.getElementById('pg-api-key').value = atob(savedKey);
    }
  }
};

/* ============================================================
 * 16. EKSPORT UNTUK KEGUNAAN MODUL LUAR
 * ============================================================ */

// Jika menggunakan sistem modul ES
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    APP_CONFIG,
    AppState,
    formatNumber,
    formatCost,
    formatCostMYR,
    copyToClipboard,
    applyTheme,
    toggleTheme,
    switchPlatform,
    showNotification,
  };
}
