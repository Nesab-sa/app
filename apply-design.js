const fs = require('fs');

const pages = [
  'alrusum-albankiya','aqari-aadi','aqari-plus','asham-saudia',
  'hasibat-alumr','himaya-iddikhar','istiqtaa-naam-la','khayrat',
  'niqat-albay','nisbat-alistiqtaa','shakhsi-mukhtasar','shakhsi-plus',
  'shira-madyoniya','tahwil-altarikh','tahwil-alumla','tajiri-aadi',
  'tajiri-makro','index','disclaimer'
];

// New header CSS — maps to actual classes used in all subpages
const NEW_HEADER_CSS = `    /* === Header — Material Design 56px mobile / 64px tablet+ === */
    :root {
      --logo-size: 36px;
      --header-px: 16px;
      --header-py: 10px;
      --title-size: 16px;
      --subtitle-size: 12px;
    }

    /* .hdr = .page-header */
    .hdr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      direction: rtl;
      padding: var(--header-py) var(--header-px);
      min-height: calc(var(--logo-size) + var(--header-py) * 2);
      box-sizing: border-box;
      border-bottom: 1px solid var(--border2);
      position: relative;
      z-index: 1;
    }

    /* .logo-wrap = .hdr-brand */
    .logo-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-direction: row;
    }

    /* .subpage-logo = .hdr-logo */
    .subpage-logo {
      width: var(--logo-size);
      height: var(--logo-size);
      flex: 0 0 var(--logo-size);
      object-fit: contain;
    }

    /* .logo-txt = .hdr-text */
    .logo-txt {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* .logo-txt h1 = .hdr-title */
    .logo-txt h1 {
      font-size: var(--title-size);
      font-weight: 600;
      line-height: 1.2;
      margin: 0;
    }

    /* .logo-txt p = .hdr-subtitle */
    .logo-txt p {
      font-size: var(--subtitle-size);
      line-height: 1.2;
      margin: 0;
      opacity: 0.6;
    }

    @media (min-width: 768px) {
      :root {
        --logo-size: 40px;
        --header-px: 24px;
        --header-py: 12px;
        --title-size: 17px;
        --subtitle-size: 13px;
      }
    }

    @media (min-width: 1024px) {
      :root {
        --logo-size: 44px;
        --header-px: 32px;
        --header-py: 14px;
        --title-size: 18px;
        --subtitle-size: 13px;
      }
    }

    /* === Page Meta — bottom section === */
    body {
      display: flex;
      flex-direction: column;
    }
    .main { flex: 1; }

    .page-meta {
      border-top: 1px solid var(--border2);
      background: var(--card2);
      padding: 14px 20px;
      padding-bottom: calc(14px + env(safe-area-inset-bottom, 0px));
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      text-align: center;
      position: relative;
      z-index: 1;
    }
    .pm-url {
      font-size: 0.78rem;
      font-weight: 700;
      color: #c8c9ff;
      text-decoration: none;
      letter-spacing: 0.5px;
      display: block;
    }
    .pm-url:hover { color: #fff; }
    .page-meta-site {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .pm-row2 {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .pm-update {
      font-size: 0.72rem;
      font-weight: 600;
      color: #4ade80;
      white-space: nowrap;
    }
    .pm-icons {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pm-icons a {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s, transform 0.2s;
      flex-shrink: 0;
    }
    .pm-icons a:hover { opacity: 0.85; transform: scale(1.1); }
    .pm-email a {
      font-size: 0.7rem;
      color: var(--muted);
      text-decoration: none;
      transition: color 0.2s;
      letter-spacing: 0.3px;
    }
    .pm-email a:hover { color: #c8c9ff; }

    /* === Container responsive fix === */
    .main {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      box-sizing: border-box;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      .main {
        max-width: 860px !important;
        padding-left: 24px !important;
        padding-right: 24px !important;
      }
    }
    @media (min-width: 1024px) {
      .main {
        max-width: 960px !important;
        padding-left: 32px !important;
        padding-right: 32px !important;
      }
    }

    /* Overflow & accessibility */
    body { overflow-x: hidden; min-width: 320px; }
    table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    @media (max-width: 600px) {
      input, select, textarea { font-size: 16px !important; }
    }

    </style>`;

// New header CSS for index.html (different structure — no logo-wrap/logo-txt)
const INDEX_HEADER_VARS = `
    /* === Header variables === */
    :root {
      --logo-size: 36px;
      --header-px: 16px;
      --header-py: 10px;
    }
    @media (min-width: 768px) {
      :root { --logo-size: 40px; --header-px: 24px; --header-py: 12px; }
    }
    @media (min-width: 1024px) {
      :root { --logo-size: 44px; --header-px: 32px; --header-py: 14px; }
    }
`;

const PAGE_META_HTML = `  <div class="page-meta">
    <div class="page-meta-site">
      <a class="pm-url" href="https://www.nesab.sa" target="_blank" rel="noopener noreferrer">www.nesab.sa</a>
    </div>
    <div class="pm-row2">
      <span class="pm-update">آخر تحديث: مارس 2026</span>
      <div class="pm-icons">
        <a href="https://t.me/Nesab.sa" target="_blank" class="tg"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
        <a href="https://twitter.com/Banker_Vp" target="_blank" class="tw"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        <a href="https://wa.me/966500768074" target="_blank" class="wa"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
      </div>
    </div>
    <div class="pm-email"><a href="mailto:info@Nesab.sa">info@Nesab.sa</a></div>
  </div>`;

let totalUpdated = 0;
const report = [];

pages.forEach(name => {
  const file = `${name}.html`;
  if (!fs.existsSync(file)) { report.push(`  ⚠ SKIP (not found): ${file}`); return; }

  let h = fs.readFileSync(file, 'utf8');
  const original = h;
  const changes = [];

  // --- index.html: special handler (different header structure) ---
  if (name === 'index') {
    // Inject header variables before </style> if not already present
    if (!h.includes('/* === Header variables ===') && !h.includes('/* === Header — Material Design')) {
      h = h.replace('    </style>', INDEX_HEADER_VARS + '    </style>');
      changes.push('index: added header :root variables');
    } else {
      changes.push('index: header vars already present — skipped');
    }
    if (h !== original) {
      fs.writeFileSync(file, h, 'utf8');
      totalUpdated++;
      report.push(`  ✓ ${file}:\n     ${changes.join('\n     ')}`);
    } else {
      report.push(`  — no changes: ${file}`);
    }
    return;
  }

  // --- All other pages ---

  // 1. Replace header CSS block
  const CSS_START = h.includes('/* === Header Final Design === */')
    ? '/* === Header Final Design === */'
    : h.includes('/* === Header — Material Design')
    ? '/* === Header — Material Design'
    : '/* === Header v7: breakpoint-based';

  const CSS_END_MARKER = '</style>';
  const cssIdx = h.indexOf(CSS_START);
  if (cssIdx !== -1) {
    const styleEndIdx = h.indexOf(CSS_END_MARKER, cssIdx);
    if (styleEndIdx !== -1) {
      h = h.slice(0, cssIdx) + NEW_HEADER_CSS + h.slice(styleEndIdx + CSS_END_MARKER.length);
      changes.push('CSS: replaced header → Material Design');
    }
  } else {
    report.push(`  ⚠ CSS block not found: ${file}`);
  }

  // 2. Ensure dar-2.svg logo
  if (h.includes('assets-logo/dar-3.svg')) {
    h = h.replace(/assets-logo\/dar-3\.svg/g, 'assets-logo/dar-2.svg');
    changes.push('Logo: dar-3.svg → dar-2.svg');
  }
  if (h.includes('assets-logo/dar-1.svg')) {
    h = h.replace(/assets-logo\/dar-1\.svg/g, 'assets-logo/dar-2.svg');
    changes.push('Logo: dar-1.svg → dar-2.svg');
  }

  // 3. Upgrade logo-txt: wrap <p> in <h1>, add <p>نسب</p>
  h = h.replace(
    /(<div class="logo-txt">)\s*\n?\s*(<p>([^<]+)<\/p>)\s*\n?\s*(<\/div>)/g,
    (_, open, _ptag, title, close) =>
      `${open}\n          <h1>${title}</h1>\n          <p>نسب</p>\n        ${close}`
  );
  h = h.replace(
    /(<div class="logo-txt"><p>)([^<]+)(<\/p><\/div>)/g,
    (_, _pre, title) =>
      `<div class="logo-txt"><h1>${title}</h1><p>نسب</p></div>`
  );

  // 4. Remove hdr-meta from header
  if (h.includes('<div class="hdr-meta">')) {
    h = h.replace(/<div class="hdr-meta">[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n(\s*<div class="main">)/,
      '</div>\n$1');
    changes.push('HTML: removed hdr-meta');
  }

  // 5. Add page-meta HTML before disclaimer bar (if missing)
  if (!h.includes('class="page-meta"') && h.includes('class="nesab-disclaimer-bar"')) {
    h = h.replace(
      /(\s*<div class="nesab-disclaimer-bar">)/,
      `\n\n${PAGE_META_HTML}\n\n$1`
    );
    changes.push('HTML: added page-meta before disclaimer');
  }

  if (h !== original) {
    fs.writeFileSync(file, h, 'utf8');
    totalUpdated++;
    report.push(`  ✓ ${file}:\n     ${changes.join('\n     ')}`);
  } else {
    report.push(`  — no changes: ${file}`);
  }
});

console.log('\n========== APPLY DESIGN REPORT ==========\n');
report.forEach(r => console.log(r));
console.log(`\nTotal files updated: ${totalUpdated}/${pages.length}`);
