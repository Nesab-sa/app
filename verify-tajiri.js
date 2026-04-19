const fs = require('fs');
const h = fs.readFileSync('tajiri-makro.html', 'utf8');

const checks = [
  ['hdr-meta removed from header', !h.includes('<div class="hdr-meta">')],
  ['logo 40x40', h.includes('width: 40px !important') && h.includes('height: 40px !important')],
  ['logo-wrap flex row', h.includes('flex-direction: row !important')],
  ['page-meta exists', h.includes('class="page-meta"')],
  ['pm-url exists', h.includes('class="pm-url"')],
  ['pm-url links app.nesab.sa', h.includes('href="https://app.nesab.sa"')],
  ['body flex column or shell layout', h.includes('flex-direction: column') || h.includes('grid-template-rows:auto 1fr auto auto')],
  ['main flex:1 or equivalent', h.includes('flex: 1') || h.includes('grid-template-rows:auto 1fr auto auto')],
  ['safe-area-inset present', h.includes('safe-area-inset-bottom')],
  ['disclaimer exists', h.includes('nesab-disclaimer-bar')],
  ['page-meta before disclaimer', h.indexOf('<div class="page-meta"') !== -1 && h.indexOf('<div class="nesab-disclaimer-bar"') !== -1 && h.indexOf('<div class="page-meta"') < h.indexOf('<div class="nesab-disclaimer-bar"')],
  ['page-meta not fixed', !h.includes('page-meta{position:fixed') && !h.includes('.page-meta{position:fixed') && !h.includes('page-meta { position: fixed') && !h.includes('.page-meta { position: fixed')]
];

let passed = 0;
checks.forEach(([label, ok]) => {
  console.log((ok ? '✓' : '✗') + ' ' + label);
  if (ok) passed++;
});
console.log('\n' + passed + '/' + checks.length + ' checks passed');
