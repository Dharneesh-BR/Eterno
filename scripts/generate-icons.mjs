// Generates PWA icons (192x192, 512x512) from a source logo using Sharp
// Usage:
//   node scripts/generate-icons.mjs --input "src/assets/Logo.png"
// If --input is omitted, will try common defaults.

import fs from 'node:fs';
import path from 'node:path';

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) {
      out.input = args[i + 1];
      i++;
    }
  }
  return out;
}

function resolveDefaultInput() {
  const candidates = [
    'src/assets/Logo.png',
    'public/icons/Logo icon.png',
    'public/icons/svasam logo.png',
    'public/icons/svasam logo copy.png',
    'src/assets/svasam logo copy.png',
  ];
  for (const rel of candidates) {
    const abs = path.resolve(rel);
    if (fs.existsSync(abs)) return abs;
  }
  return null;
}

async function main() {
  const { input } = parseArgs();
  const srcPath = input ? path.resolve(input) : resolveDefaultInput();

  if (!srcPath || !fs.existsSync(srcPath)) {
    console.error('[generate-icons] Source logo not found. Provide one with --input <path-to-logo.png>');
    process.exit(1);
  }

  let sharp;
  try {
    // dynamic import so script can show a clear message if sharp is missing
    sharp = (await import('sharp')).default;
  } catch (e) {
    console.error('[generate-icons] Sharp is not installed. Run: npm i -D sharp');
    process.exit(1);
  }

  const outDir = path.resolve('public/icons');
  await ensureDir(outDir);

  const targets = [
    { size: 192, name: 'icon-192x192.png' },
    { size: 512, name: 'icon-512x512.png' },
  ];

  for (const t of targets) {
    const outPath = path.join(outDir, t.name);
    await sharp(srcPath)
      .resize(t.size, t.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outPath);
    console.log(`[generate-icons] Wrote ${outPath}`);
  }

  console.log('[generate-icons] Done.');
}

main().catch((err) => {
  console.error('[generate-icons] Failed:', err);
  process.exit(1);
});
