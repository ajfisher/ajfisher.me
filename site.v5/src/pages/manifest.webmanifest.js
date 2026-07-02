import { ICON_SIZES, iconPath } from '../lib/icon-meta.mjs';
import { basePath } from '../lib/utils.mjs';

export const prerender = true;

const MANIFEST = {
  name: 'ajfisher website',
  short_name: 'ajfisher',
  start_url: basePath,
  display: 'minimal-ui',
  background_color: '#FF5E9A',
  theme_color: '#FF5E9A',
  icons: ICON_SIZES.map((size) => ({
    src: iconPath(size),
    sizes: `${size}x${size}`,
    type: 'image/png',
  })),
};

export const GET = () =>
  new Response(JSON.stringify(MANIFEST), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
    },
  });
