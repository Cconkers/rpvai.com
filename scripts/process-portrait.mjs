/**
 * Recorta el retrato de estudio y convierte el fondo negro en alpha (D-014).
 * El recorte es por flood-fill desde los bordes para no agujerear ojos ni barba.
 * Ejecutar: npx -p sharp node scripts/process-portrait.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'src/assets/images/ruben-studio.png');
const output = path.join(root, 'src/assets/images/ruben-cutout.png');

const HARD = 12;
const SOFT = 32;

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h, channels: ch } = info;
const pixels = Buffer.from(data);
const keepBottom = Math.round(h * 0.72);
const bg = new Uint8Array(w * h);

function lumAt(x, y) {
  const i = (y * w + x) * ch;
  return 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
}

const queue = [];
function seed(x, y) {
  const idx = y * w + x;
  if (bg[idx]) return;
  if (lumAt(x, y) > SOFT) return;
  bg[idx] = 1;
  queue.push(idx);
}

for (let x = 0; x < w; x++) {
  seed(x, 0);
  seed(x, h - 1);
}
for (let y = 0; y < h; y++) {
  seed(0, y);
  seed(w - 1, y);
}

while (queue.length) {
  const idx = queue.pop();
  const x = idx % w;
  const y = (idx / w) | 0;
  const neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  for (const [nx, ny] of neighbors) {
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
    const nidx = ny * w + nx;
    if (bg[nidx]) continue;
    if (lumAt(nx, ny) <= SOFT) {
      bg[nidx] = 1;
      queue.push(nidx);
    }
  }
}

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * ch;
    if (!bg[y * w + x]) continue;
    const lum = lumAt(x, y);
    if (lum <= HARD) {
      pixels[i + 3] = 0;
    } else {
      pixels[i + 3] = Math.round(((lum - HARD) / (SOFT - HARD)) * 255);
    }
  }
}

for (let y = keepBottom; y < h; y++) {
  for (let x = 0; x < w; x++) {
    pixels[(y * w + x) * ch + 3] = 0;
  }
}

let minX = w;
let minY = h;
let maxX = 0;
let maxY = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (pixels[(y * w + x) * ch + 3] < 24) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}

const pad = 8;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(w - 1, maxX + pad);
maxY = Math.min(h - 1, maxY + pad);

await sharp(pixels, { raw: { width: w, height: h, channels: 4 } })
  .extract({
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  })
  .png({ compressionLevel: 9 })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log(
  `Wrote ${output} (${meta.width}x${meta.height}, alpha=${meta.hasAlpha})`,
);
