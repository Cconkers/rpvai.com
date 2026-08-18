/**
 * One-off asset: retrato circular sin fondo azul ni sparkle (D-014).
 * Ejecutar: npx -p sharp node scripts/process-portrait.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'src/assets/images/ruben-source.png');
const output = path.join(root, 'src/assets/images/ruben-cutout.png');

const size = 1024;
const faceScale = 1.85;
const circleRadius = 340;

const scaledSize = Math.round(size * faceScale);
const offset = Math.round((scaledSize - size) / 2);

const circleMask = Buffer.from(
  `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${circleRadius}" fill="white"/>
  </svg>`,
);

const scaled = await sharp(input)
  .resize(scaledSize, scaledSize, { fit: 'cover', position: 'centre' })
  .extract({ left: offset, top: offset, width: size, height: size })
  .ensureAlpha()
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(scaled).toFile(output);

const meta = await sharp(output).metadata();
console.log(`Wrote ${output} (${meta.width}x${meta.height}, alpha=${meta.hasAlpha})`);
