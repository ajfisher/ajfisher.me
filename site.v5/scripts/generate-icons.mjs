import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

import {
  FAVICON_SIZE,
  ICON_SIZES,
  faviconFileName,
  iconFileName,
} from '../src/lib/icon-meta.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(__dirname, '../../content');
const sourceIcon = path.join(contentDir, 'img', 'ajfisher_large.jpg');
const iconDir = path.join(contentDir, 'icons');
const faviconPath = path.join(contentDir, faviconFileName);

const outputPaths = [
  faviconPath,
  ...ICON_SIZES.map((size) => path.join(iconDir, iconFileName(size))),
];

const resizeOptions = {
  fit: 'contain',
  background: { r: 255, g: 255, b: 255, alpha: 0 },
};

const ensureSourceExists = async () => {
  try {
    return await fs.stat(sourceIcon);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      throw new Error(`Icon source not found at ${sourceIcon}`);
    }
    throw error;
  }
};

const needsRegeneration = async (sourceStats) => {
  const checks = await Promise.all(
    outputPaths.map(async (outputPath) => {
      try {
        const stats = await fs.stat(outputPath);
        return stats.mtimeMs < sourceStats.mtimeMs;
      } catch (error) {
        if (error && error.code === 'ENOENT') {
          return true;
        }
        throw error;
      }
    }),
  );

  return checks.some(Boolean);
};

export const generateIcons = async () => {
  const sourceStats = await ensureSourceExists();
  const shouldGenerate = await needsRegeneration(sourceStats);

  if (!shouldGenerate) {
    return;
  }

  await fs.mkdir(iconDir, { recursive: true });

  const image = sharp(sourceIcon);
  const metadata = await image.metadata();

  if (metadata.width && metadata.height && metadata.width !== metadata.height) {
    console.warn(
      `Icon source at ${sourceIcon} is not square; generated icons will be square.`,
    );
  }

  for (const size of ICON_SIZES) {
    await image
      .clone()
      .resize(size, size, resizeOptions)
      .png()
      .toFile(path.join(iconDir, iconFileName(size)));
  }

  await image
    .clone()
    .resize(FAVICON_SIZE, FAVICON_SIZE, resizeOptions)
    .png()
    .toFile(faviconPath);
};
