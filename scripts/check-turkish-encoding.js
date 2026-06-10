#!/usr/bin/env node
// Moono encoding guard: staged metin dosyalarında bozuk Türkçe karakter
// (mojibake / U+FFFD) tespit eder. Pre-commit hook'u tarafından çağrılır.
// Kullanım: node scripts/check-turkish-encoding.js --staged

const { execSync } = require('child_process');
const fs = require('fs');

const TEXT_EXTENSIONS = /\.(ts|tsx|js|jsx|json|md|sql|toml|txt|yml|yaml|html|css)$/i;

// UTF-8 Türkçe metnin Latin-1/Windows-1252 olarak yanlış okunmasında ortaya çıkan
// tipik ikililer + replacement character (U+FFFD).
const MOJIBAKE_PATTERNS = [
  /\uFFFD/,
  /\u00C3[\u0080-\u00BF\u00A7\u00B1\u00BC\u00BD\u00BE]/, // bozuk ç/ö/ü/â vb.
  /\u00C4[\u00B1\u00B0\u015E\u015F\u017D\u017E]/, // bozuk ı/İ/ş/Ş
  /\u00C5[\u0152\u0153\u017D\u017E\u015E\u015F]/, // bozuk ş/Ş (1252 yorumu)
  /\u00E2\u20AC[\u0153\u2122\u02DC"']/, // bozuk akıllı tırnak/kesme
];

const staged = process.argv.includes('--staged');
const fileList = execSync(
  staged ? 'git diff --cached --name-only --diff-filter=ACM -z' : 'git ls-files -z',
  { encoding: 'utf8' }
)
  .split('\0')
  .filter((f) => f && TEXT_EXTENSIONS.test(f));

const problems = [];

for (const file of fileList) {
  let content;
  try {
    content = staged
      ? execSync(`git show ":${file}"`, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })
      : fs.readFileSync(file, 'utf8');
  } catch {
    continue; // silinmiş/okunamayan dosyayı atla
  }

  const lines = content.split('\n');
  lines.forEach((line, i) => {
    for (const pattern of MOJIBAKE_PATTERNS) {
      if (pattern.test(line)) {
        problems.push(`${file}:${i + 1}: ${line.trim().slice(0, 80)}`);
        break;
      }
    }
  });
}

if (problems.length > 0) {
  console.error('✗ Bozuk Türkçe karakter (mojibake) şüphesi olan satırlar:\n');
  for (const p of problems.slice(0, 30)) console.error('  ' + p);
  if (problems.length > 30) console.error(`  ... ve ${problems.length - 30} satır daha`);
  console.error('\nDosya kodlamasını (UTF-8) kontrol edip tekrar dene.');
  process.exit(1);
}

process.exit(0);
