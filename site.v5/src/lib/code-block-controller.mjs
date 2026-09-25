const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const COPY_FEEDBACK_MS = 1500;

let codeBlockCount = 0;

const createControlIcon = (iconSet, iconName, classNames = []) => {
  const icon = document.createElementNS(SVG_NAMESPACE, 'svg');
  const use = document.createElementNS(SVG_NAMESPACE, 'use');

  icon.classList.add('code-block__icon', ...classNames);
  icon.setAttribute('width', '1em');
  icon.setAttribute('height', '1em');
  icon.setAttribute('viewBox', '0 0 640 640');
  icon.setAttribute('data-icon', `fa7-${iconSet}:${iconName}`);
  icon.setAttribute('aria-hidden', 'true');
  icon.setAttribute('focusable', 'false');

  use.setAttribute('href', `#ai:fa7-${iconSet}:${iconName}`);
  icon.append(use);

  return icon;
};

const createButton = ({ action, label, tooltip }) => {
  const button = document.createElement('button');

  button.type = 'button';
  button.className = 'code-block__control';
  button.dataset.codeBlockAction = action;
  button.dataset.tooltip = tooltip;
  button.setAttribute('aria-label', label);

  return button;
};

const fallbackCopy = (text, doc) => {
  if (typeof doc.execCommand !== 'function') {
    return false;
  }

  const textarea = doc.createElement('textarea');
  const activeElement = doc.activeElement;

  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.inset = '0 auto auto -9999px';
  textarea.style.opacity = '0';
  doc.body.append(textarea);
  textarea.select();

  try {
    return doc.execCommand('copy');
  } finally {
    textarea.remove();
    activeElement?.focus?.({ preventScroll: true });
  }
};

export const copyText = async (
  text,
  {
    clipboard = globalThis.navigator?.clipboard,
    doc = globalThis.document,
  } = {},
) => {
  if (clipboard?.writeText) {
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      // Continue to the bounded legacy fallback when clipboard permission fails.
    }
  }

  try {
    return Boolean(doc && fallbackCopy(text, doc));
  } catch {
    return false;
  }
};

const announce = (message) => {
  const liveRegion = document.querySelector('[data-code-block-live-region]');

  if (!liveRegion) {
    return;
  }

  liveRegion.textContent = '';
  window.requestAnimationFrame(() => {
    liveRegion.textContent = message;
  });
};

const supportsAnchoredPopover = (status) => (
  typeof status.showPopover === 'function'
  && globalThis.CSS?.supports?.('anchor-name: --code-block')
  && globalThis.CSS?.supports?.('top: anchor(bottom)')
);

const showStatus = (status, message, timeoutId) => {
  window.clearTimeout(timeoutId);
  status.textContent = message;

  if (supportsAnchoredPopover(status)) {
    status.classList.remove('is-visible');
    if (!status.matches(':popover-open')) {
      status.showPopover();
    }
  } else {
    status.removeAttribute('popover');
    status.classList.add('is-visible');
  }

  return window.setTimeout(() => {
    if (typeof status.hidePopover === 'function'
      && status.matches(':popover-open')) {
      status.hidePopover();
    }
    status.classList.remove('is-visible');
  }, COPY_FEEDBACK_MS);
};

const enhanceCodeBlock = (pre) => {
  if (pre.dataset.codeBlockEnhanced === 'true') {
    return;
  }

  const code = pre.querySelector(':scope > code');
  if (!code) {
    return;
  }

  codeBlockCount += 1;
  const blockId = pre.id || `code-block-${codeBlockCount}`;
  const blockAnchor = `--${blockId}-anchor`;
  const copyAnchor = `--${blockId}-copy-anchor`;

  pre.id = blockId;
  pre.dataset.codeBlockEnhanced = 'true';
  pre.style.setProperty('anchor-name', blockAnchor);

  const wrapper = document.createElement('div');
  wrapper.className = 'code-block';
  pre.before(wrapper);
  wrapper.append(pre);

  const controls = document.createElement('div');
  controls.className = 'code-block__controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Code block controls');
  controls.style.setProperty('position-anchor', blockAnchor);

  const wrapButton = createButton({
    action: 'wrap',
    label: 'Wrap lines',
    tooltip: 'Wrap lines',
  });
  wrapButton.setAttribute('aria-controls', blockId);
  wrapButton.setAttribute('aria-pressed', 'false');
  wrapButton.append(createControlIcon('solid', 'text-width'));

  const copyButton = createButton({
    action: 'copy',
    label: 'Copy code',
    tooltip: 'Copy code',
  });
  copyButton.style.setProperty('anchor-name', copyAnchor);
  copyButton.append(createControlIcon(
    'regular',
    'copy',
    ['code-block__icon--copy'],
  ));
  copyButton.append(createControlIcon(
    'solid',
    'check',
    ['code-block__icon--check'],
  ));

  const status = document.createElement('span');
  status.className = 'code-block__status';
  status.setAttribute('popover', 'manual');
  status.style.setProperty('position-anchor', copyAnchor);

  controls.append(wrapButton, copyButton);
  wrapper.append(controls, status);

  let feedbackTimeoutId;
  let resetTimeoutId;

  wrapButton.addEventListener('click', () => {
    const isWrapped = wrapper.classList.toggle('is-wrapped');
    const label = isWrapped ? 'Stop wrapping' : 'Wrap lines';

    wrapButton.setAttribute('aria-pressed', String(isWrapped));
    wrapButton.setAttribute('aria-label', label);
    wrapButton.dataset.tooltip = label;
  });

  copyButton.addEventListener('click', async () => {
    const copied = await copyText(code.textContent ?? '');
    const message = copied ? 'Copied' : 'Copy failed';

    copyButton.dataset.copyState = copied ? 'success' : 'error';
    copyButton.dataset.tooltip = message;
    copyButton.setAttribute('aria-label', message);
    announce(message);
    feedbackTimeoutId = showStatus(status, message, feedbackTimeoutId);
    copyButton.focus({ preventScroll: true });

    window.clearTimeout(resetTimeoutId);
    resetTimeoutId = window.setTimeout(() => {
      copyButton.dataset.copyState = 'idle';
      copyButton.dataset.tooltip = 'Copy code';
      copyButton.setAttribute('aria-label', 'Copy code');
    }, COPY_FEEDBACK_MS);
  });
};

export const initCodeBlockControls = (root = document) => {
  root.querySelectorAll('article pre.astro-code').forEach(enhanceCodeBlock);
};

if (typeof document !== 'undefined') {
  initCodeBlockControls();
}
