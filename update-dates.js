const fs = require('fs');
const path = require('path');

const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
                'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const mtime = fs.statSync(file).mtime;
  const month = months[mtime.getMonth()];
  const year = mtime.getFullYear();
  const dateStr = `آخر تحديث: ${month} ${year}`;

  let content = fs.readFileSync(file, 'utf8');
  const updated = content.replace(/آخر تحديث[:\s]*[؀-ۿ]+ \d{4}/g, dateStr);

  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`✅ ${file} → ${dateStr}`);
  }
});

console.log('Done.');
