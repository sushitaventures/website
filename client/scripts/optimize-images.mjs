/**
 * One-shot image optimiser for client/public/images (run: npm run optimize:images).
 *  - JPEG  → mozjpeg, progressive, q78, max 1920px wide
 *  - .webp → real WebP q74 (several were JPEGs with a .webp name), max 1920px wide
 *  - PNG   → palette-quantised PNG
 *  - home/*.webp also get a 640px-wide "-640.webp" variant for srcset on phones
 * Overwrites a file only when the result is ≥10% smaller, so re-running is safe
 * (no generational quality loss on already-optimised files). Originals stay in git.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const MAX_WIDTH = 1920;

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

let before = 0;
let after = 0;
for (const file of walk(root)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

  const input = fs.readFileSync(file);
  const pipeline = sharp(input).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const output =
    ext === '.png'
      ? await pipeline.png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 }).toBuffer()
      : ext === '.webp'
        ? await pipeline.webp({ quality: 74, effort: 6 }).toBuffer()
        : await pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer();

  before += input.length;
  const rel = path.relative(root, file).split(path.sep).join('/');
  if (output.length < input.length * 0.9) {
    fs.writeFileSync(file, output);
    after += output.length;
    console.log(`${(input.length / 1024).toFixed(0).padStart(6)}KB → ${(output.length / 1024).toFixed(0).padStart(5)}KB  ${rel}`);
  } else {
    after += input.length;
  }
}
console.log(`\nimages: ${(before / 1048576).toFixed(1)}MB → ${(after / 1048576).toFixed(1)}MB`);

// Phone-sized variants for srcset: home/<name>.webp → home/<name>-640.webp
const homeDir = path.join(root, 'home');
for (const f of fs.readdirSync(homeDir)) {
  if (!f.endsWith('.webp') || f.endsWith('-640.webp')) continue;
  const out = path.join(homeDir, f.replace(/\.webp$/, '-640.webp'));
  if (fs.existsSync(out)) continue;
  await sharp(path.join(homeDir, f)).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(out);
  console.log(`variant ${(fs.statSync(out).size / 1024).toFixed(0).padStart(4)}KB  home/${path.basename(out)}`);
}
