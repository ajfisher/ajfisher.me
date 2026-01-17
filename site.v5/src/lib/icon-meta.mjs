export const ICON_SIZES = [48, 72, 96, 144, 192, 256, 384, 512];
export const FAVICON_SIZE = 32;

export const iconFileName = (size) => `icon-${size}x${size}.png`;
export const iconPath = (size) => `/icons/${iconFileName(size)}`;
export const faviconFileName = `favicon-${FAVICON_SIZE}x${FAVICON_SIZE}.png`;
export const faviconPath = `/${faviconFileName}`;
