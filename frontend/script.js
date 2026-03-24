/* =========================================================
   Surya-Sanchay – script.js  (v2)
   Features: Tab navigation, countdown, dark mode,
   modals, toasts, PDF download, i18n (EN / HI / MR)
   ========================================================= */

'use strict';

/* ═══════════════════════════════════════════════
   1. I18N ENGINE
═══════════════════════════════════════════════ */
let currentLang = localStorage.getItem('suryaSanchay-lang') || 'en';

function t(key) {
  const langData = window.TRANSLATIONS[currentLang] || window.TRANSLATIONS['en'];
  return langData[key] || window.TRANSLATIONS['en'][key] || key;
}

function applyTranslations() {
  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) {
      // For SVG text elements
      if (el.tagName === 'text') {
        el.textContent = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  // Update lang label in toggle button
  const langLabel = document.getElementById('langLabel');
  if (langLabel) langLabel.textContent = t('header.lang');

  // Update lang option active states
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === currentLang);
  });

  // Update html lang attribute for accessibility
  document.documentElement.lang = currentLang;

  // Translate modal content that's set dynamically
  const cancelPumpEl = document.getElementById('cancelPump');
  if (cancelPumpEl) cancelPumpEl.textContent = t('modal.pump.cancel');
  const confirmPumpEl = document.getElementById('confirmPump');
  if (confirmPumpEl) confirmPumpEl.textContent = t('modal.pump.confirm');
}

/* ═══════════════════════════════════════════════
   2. LANGUAGE DROPDOWN
═══════════════════════════════════════════════ */
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const langDropdownWrap = document.getElementById('langDropdownWrap');

if (langToggle && langDropdown) {
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
    langToggle.setAttribute('aria-expanded', langDropdown.classList.contains('open'));
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const newLang = opt.dataset.lang;
      if (newLang === currentLang) {
        langDropdown.classList.remove('open');
        return;
      }
      currentLang = newLang;
      localStorage.setItem('suryaSanchay-lang', currentLang);
      langDropdown.classList.remove('open');
      applyTranslations();

      const langNames = { en: 'English', hi: 'हिंदी (Hindi)', mr: 'मराठी (Marathi)' };
      showToast(`🌐 ${langNames[currentLang]}`, 'teal');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!langDropdownWrap.contains(e.target)) {
      langDropdown.classList.remove('open');
    }
  });
}

// Apply saved language on load
applyTranslations();

/* ═══════════════════════════════════════════════
   3. TAB NAVIGATION
═══════════════════════════════════════════════ */
const tabBtns     = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(tabId) {
  tabBtns.forEach(btn => btn.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));
  const activeBtn     = document.getElementById('tab-' + tabId);
  const activeContent = document.getElementById('content-' + tabId);
  if (activeBtn) activeBtn.classList.add('active');
  if (activeContent) activeContent.classList.add('active');
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

/* ═══════════════════════════════════════════════
   4. DARK MODE
═══════════════════════════════════════════════ */
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

if (localStorage.getItem('suryaSanchay-darkMode') === 'dark') body.classList.add('dark');

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('suryaSanchay-darkMode', body.classList.contains('dark') ? 'dark' : 'light');
  });
}

/* ═══════════════════════════════════════════════
   5. GOLDEN HOUR COUNTDOWN
═══════════════════════════════════════════════ */
const countdownEl = document.getElementById('countdownTimer');
let countdownSeconds = 2 * 3600 + 45 * 60;

function formatCountdown(secs) {
  return `${String(Math.floor(secs / 3600)).padStart(2,'0')}:${String(Math.floor((secs % 3600) / 60)).padStart(2,'0')}:${String(secs % 60).padStart(2,'0')}`;
}

if (countdownEl) {
  countdownEl.textContent = formatCountdown(countdownSeconds);
  const interval = setInterval(() => {
    if (countdownSeconds > 0) {
      countdownSeconds--;
      countdownEl.textContent = formatCountdown(countdownSeconds);
    } else {
      clearInterval(interval);
      countdownEl.textContent = 'ACTIVE';
      countdownEl.style.color = 'var(--green)';
    }
  }, 1000);
}

/* ═══════════════════════════════════════════════
   6. NOTIFICATION PANEL
═══════════════════════════════════════════════ */
const notifBtn   = document.getElementById('notifBtn');
const notifPanel = document.getElementById('notifPanel');
const closeNotif = document.getElementById('closeNotif');

if (notifBtn && notifPanel) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('open');
  });
  closeNotif.addEventListener('click', () => notifPanel.classList.remove('open'));
  document.addEventListener('click', (e) => {
    if (!notifPanel.contains(e.target) && e.target !== notifBtn) {
      notifPanel.classList.remove('open');
    }
  });
}

/* ═══════════════════════════════════════════════
   7. PUMP MODAL
═══════════════════════════════════════════════ */
const startPumpBtn   = document.getElementById('startPumpBtn');
const pumpModal      = document.getElementById('pumpModal');
const closePumpModal = document.getElementById('closePumpModal');
const cancelPump     = document.getElementById('cancelPump');
const confirmPump    = document.getElementById('confirmPump');

function openModal(el) { el.classList.add('open'); body.style.overflow = 'hidden'; }
function closeModal(el){ el.classList.remove('open'); body.style.overflow = ''; }

if (startPumpBtn) startPumpBtn.addEventListener('click', () => openModal(pumpModal));
if (closePumpModal) closePumpModal.addEventListener('click', () => closeModal(pumpModal));
if (cancelPump)     cancelPump.addEventListener('click', () => closeModal(pumpModal));
if (pumpModal) pumpModal.addEventListener('click', e => { if (e.target === pumpModal) closeModal(pumpModal); });

if (confirmPump) {
  confirmPump.addEventListener('click', () => {
    closeModal(pumpModal);
    showToast(t('toast.pump'), 'green');
    if (startPumpBtn) {
      startPumpBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg><span data-i18n="pump.stop">■ Stop Pump</span>`;
      startPumpBtn.style.background = 'linear-gradient(135deg, #B71C1C, #E53935)';
      applyTranslations();
    }
  });
}

/* ═══════════════════════════════════════════════
   8. SCHEDULE MODAL
═══════════════════════════════════════════════ */
const scheduleBtn = document.getElementById('scheduleBtn');

function buildScheduleModal() {
  const rows = [
    { key: 'modal.sched.sunrise', time: '6:15 AM' },
    { key: 'modal.sched.pump1',   time: '7:00 – 10:00 AM' },
    { key: 'modal.sched.golden',  time: '11:00 AM – 2:00 PM' },
    { key: 'modal.sched.pump2',   time: '2:30 – 5:00 PM' },
    { key: 'modal.sched.battery', time: '5:00 – 7:00 PM' },
  ];

  const rowsHTML = rows.map(r => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
      <span style="font-weight:600;">${t(r.key)}</span>
      <span style="color:var(--yellow-dark);font-weight:700;">${r.time}</span>
    </div>`).join('');

  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>${t('modal.sched.title')}</h3>
        <button class="close-btn">&times;</button>
      </div>
      <div class="modal-body"><div style="display:flex;flex-direction:column;gap:0;">${rowsHTML}</div></div>
      <div class="modal-footer">
        <button class="action-btn secondary" style="flex:1">${t('modal.close')}</button>
      </div>
    </div>`;

  document.body.appendChild(modal);
  body.style.overflow = 'hidden';

  modal.querySelector('.close-btn').addEventListener('click', () => { modal.remove(); body.style.overflow = ''; });
  modal.querySelector('.modal-footer button').addEventListener('click', () => { modal.remove(); body.style.overflow = ''; });
  modal.addEventListener('click', e => { if (e.target === modal) { modal.remove(); body.style.overflow = ''; } });
}

if (scheduleBtn) scheduleBtn.addEventListener('click', buildScheduleModal);

/* ═══════════════════════════════════════════════
   9. PDF REPORT DOWNLOAD
═══════════════════════════════════════════════ */

// Dashboard "Download Report" button → energy report in current language
const reportBtn = document.getElementById('reportBtn');
if (reportBtn) {
  reportBtn.addEventListener('click', () => {
    showToast(t('toast.report'), 'teal');
    setTimeout(() => {
      if (typeof generatePDFReport === 'function') {
        generatePDFReport('energy', currentLang);
      }
    }, 500);
  });
}

// Reports tab individual download buttons
document.querySelectorAll('.report-dl-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const reportType = btn.dataset.report;
    showToast(t('toast.report'), 'teal');
    setTimeout(() => {
      if (typeof generatePDFReport === 'function') {
        generatePDFReport(reportType, currentLang);
      }
    }, 400);
  });
});

// Reports tab "Generate New" button → shows a mini modal to pick report type + download
const generateReportBtn = document.getElementById('generateReportBtn');
if (generateReportBtn) {
  generateReportBtn.addEventListener('click', () => {
    showGenerateModal();
  });
}

function showGenerateModal() {
  const typeOptions = [
    ['energy', t('reports.r1.title')],
    ['water',  t('reports.r2.title')],
    ['grid',   t('reports.r3.title')],
  ];

  const langOptions = [
    ['en', '🇬🇧 English'],
    ['hi', '🇮🇳 हिंदी'],
    ['mr', '🌺 मराठी'],
  ];

  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.innerHTML = `
    <div class="modal" style="width:440px;">
      <div class="modal-header">
        <h3>📄 ${t('reports.new').replace('+ ', '')}</h3>
        <button class="close-btn">&times;</button>
      </div>
      <div class="modal-body" style="gap:16px;">
        <div>
          <label style="font-size:0.82rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:8px;">Report Type</label>
          <select id="genReportType" style="width:100%;padding:10px 14px;border:1.5px solid var(--border);border-radius:8px;font-family:Inter,sans-serif;font-size:0.9rem;background:var(--bg);color:var(--text-primary);cursor:pointer;">
            ${typeOptions.map(([v,l]) => `<option value="${v}" ${v === 'energy' ? 'selected' : ''}>${l}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:0.82rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:8px;">Language / भाषा / भाषा</label>
          <div style="display:flex;gap:8px;">
            ${langOptions.map(([v,l]) => `<button class="gen-lang-btn action-btn secondary" data-lang="${v}" style="flex:1;padding:10px 6px;font-size:0.82rem;${v === currentLang ? 'border-color:var(--yellow);color:var(--yellow-dark);font-weight:700;' : ''}">${l}</button>`).join('')}
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="action-btn secondary" id="cancelGen" style="flex:1">${t('modal.pump.cancel')}</button>
        <button class="action-btn primary" id="confirmGen" style="flex:1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          ${t('reports.download')}
        </button>
      </div>
    </div>`;

  document.body.appendChild(modal);
  body.style.overflow = 'hidden';

  let selectedGenLang = currentLang;

  // Lang button toggling
  modal.querySelectorAll('.gen-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedGenLang = btn.dataset.lang;
      modal.querySelectorAll('.gen-lang-btn').forEach(b => {
        b.style.borderColor = '';
        b.style.color = '';
        b.style.fontWeight = '';
      });
      btn.style.borderColor = 'var(--yellow)';
      btn.style.color = 'var(--yellow-dark)';
      btn.style.fontWeight = '700';
    });
  });

  const closeGen = () => { modal.remove(); body.style.overflow = ''; };

  modal.querySelector('.close-btn').addEventListener('click', closeGen);
  document.getElementById('cancelGen').addEventListener('click', closeGen);
  modal.addEventListener('click', e => { if (e.target === modal) closeGen(); });

  document.getElementById('confirmGen').addEventListener('click', () => {
    const reportType = document.getElementById('genReportType').value;
    closeGen();
    showToast(t('toast.report'), 'teal');
    setTimeout(() => {
      if (typeof generatePDFReport === 'function') {
        generatePDFReport(reportType, selectedGenLang);
      }
    }, 400);
  });
}

/* ═══════════════════════════════════════════════
   10. TOAST
═══════════════════════════════════════════════ */
function showToast(message, type = 'green') {
  const existing = document.querySelectorAll('.ss-toast');
  existing.forEach(t => t.remove());

  const colorMap = {
    green: 'linear-gradient(135deg,#2E7D32,#34A853)',
    red:   'linear-gradient(135deg,#B71C1C,#E53935)',
    yellow:'linear-gradient(135deg,#E6A300,#FFB800)',
    teal:  'linear-gradient(135deg,#004D40,#00897B)',
  };

  const toast = document.createElement('div');
  toast.className = 'ss-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '14px 20px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'white',
    zIndex: '9999',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    background: colorMap[type] || colorMap.green,
    animation: 'ssSlideIn 0.35s ease, ssFadeOut 0.35s ease 2.6s forwards',
    maxWidth: '320px',
    lineHeight: '1.5',
  });

  if (!document.getElementById('ssToastStyle')) {
    const style = document.createElement('style');
    style.id = 'ssToastStyle';
    style.textContent = `
      @keyframes ssSlideIn  { from { transform:translateX(120%); opacity:0; } to { transform:translateX(0); opacity:1; } }
      @keyframes ssFadeOut  { from { opacity:1; } to { opacity:0; transform:translateY(8px); } }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

/* ═══════════════════════════════════════════════
   11. CLEAR NOTIFICATIONS
═══════════════════════════════════════════════ */
const clearBtn  = document.querySelector('.clear-btn');
const notifList = document.getElementById('notifList');

if (clearBtn && notifList) {
  clearBtn.addEventListener('click', () => {
    notifList.style.transition = 'opacity 0.4s ease';
    notifList.style.opacity = '0';
    setTimeout(() => {
      notifList.innerHTML = `
        <div style="text-align:center;padding:2rem;color:var(--text-muted);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto;display:block;margin-bottom:12px;opacity:0.4"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          <p style="font-size:0.85rem;" data-i18n="notif.empty">${t('notif.empty')}</p>
        </div>`;
      notifList.style.opacity = '1';
      const badge = document.querySelector('.notif-badge');
      if (badge) badge.style.display = 'none';
    }, 400);
    showToast(t('toast.cleared'), 'teal');
  });
}

/* ═══════════════════════════════════════════════
   12. METRIC CARD HOVER
═══════════════════════════════════════════════ */
document.querySelectorAll('.metric-card').forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-4px)'; });
  card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)'; });
});

/* ═══════════════════════════════════════════════
   13. DEV CONSOLE BRANDING
═══════════════════════════════════════════════ */
console.log('%cSurya-Sanchay 🌞 Smart Solar Management v2', 'color:#FFB800;font-size:14px;font-weight:bold;');
console.log('%c🌐 Multi-language: EN | HI | MR  |  📄 PDF Reports  |  🌙 Dark Mode', 'color:#34A853;font-size:11px;');
