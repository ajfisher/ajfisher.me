export const ICON_SIZES = [48, 72, 96, 144, 192, 256, 384, 512];
export const FAVICON_SIZE = 32;
const BASE_URL = import.meta.env.BASE_URL || '/';
const withBase = (val = '/') => {
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const path = String(val || '/');
  if (!path || path === '/') return base || '/';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}` || normalized;
};

export const iconFileName = (size) => `icon-${size}x${size}.png`;
export const iconPath = (size) => withBase(`/icons/${iconFileName(size)}`);
export const faviconFileName = `favicon-${FAVICON_SIZE}x${FAVICON_SIZE}.png`;
export const faviconPath = withBase(`/${faviconFileName}`);
