import { toString } from 'mdast-util-to-string';

const MARKER_REGEX = /^\[ss(?:\s+.+)?\]$/i;
const CLOSE_MARKER_REGEX = /^\[\/ss\]$/i;
const DEFAULT_DELAY = 5000;
const MIN_DELAY = 2000;
const MAX_DELAY = 20000;
const KNOWN_OPTION_KEYS = new Set(['delay', 'speed']);

const textNode = (value) => ({
  type: 'text',
  value,
});

const elementNode = (hName, hProperties = {}, children = []) => ({
  type: 'slideshow',
  data: {
    hName,
    hProperties,
  },
  children,
});

const normalizeOptionKey = (key) =>
  key
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseDelay = (value) => {
  const parsedValue = Number.parseInt(String(value), 10);

  if (Number.isNaN(parsedValue)) {
    return DEFAULT_DELAY;
  }

  return Math.min(MAX_DELAY, Math.max(MIN_DELAY, parsedValue));
};

const parseMarkerOptions = (markerNode) => {
  const markerText = toString(markerNode).trim();
  const innerText = markerText.slice(1, -1).trim();
  const optionText = innerText.replace(/^ss/i, '').trim();
  const rawOptions = {};

  if (optionText.length > 0) {
    const tokens = optionText.split(/\s+/).filter(Boolean);

    tokens.forEach((token) => {
      const [rawKey, ...rawValueParts] = token.split('=');
      const key = normalizeOptionKey(rawKey);

      if (!key) {
        return;
      }

      const value = rawValueParts.length > 0
        ? rawValueParts.join('=').trim()
        : 'true';

      rawOptions[key] = value;
    });
  }

  const delayCandidate = rawOptions.delay ?? rawOptions.speed ?? DEFAULT_DELAY;
  const delay = parseDelay(delayCandidate);
  const extraAttributes = {};

  Object.entries(rawOptions).forEach(([key, value]) => {
    if (KNOWN_OPTION_KEYS.has(key)) {
      return;
    }

    extraAttributes[`data-ss-${key}`] = String(value);
  });

  return { delay, extraAttributes };
};

const isMarkerParagraph = (node) => {
  if (!node || node.type !== 'paragraph') {
    return false;
  }

  return MARKER_REGEX.test(toString(node).trim());
};

const isCloseMarkerParagraph = (node) => {
  if (!node || node.type !== 'paragraph') {
    return false;
  }

  return CLOSE_MARKER_REGEX.test(toString(node).trim());
};

const isUnorderedList = (node) => node?.type === 'list' && node.ordered !== true;

const buildControlsNode = (trackId) =>
  elementNode(
    'div',
    {
      className: ['ss-controls'],
      'aria-label': 'Slideshow controls',
    },
    [
      elementNode(
        'button',
        {
          type: 'button',
          className: ['ss-prev'],
          'data-ss-action': 'prev',
          'aria-controls': trackId,
          'aria-label': 'Previous slide',
        },
        [textNode('Prev')]
      ),
      elementNode(
        'button',
        {
          type: 'button',
          className: ['ss-toggle'],
          'data-ss-action': 'toggle',
          'aria-controls': trackId,
          'aria-pressed': 'false',
          'aria-label': 'Pause slideshow',
        },
        [textNode('Pause')]
      ),
      elementNode(
        'button',
        {
          type: 'button',
          className: ['ss-next'],
          'data-ss-action': 'next',
          'aria-controls': trackId,
          'aria-label': 'Next slide',
        },
        [textNode('Next')]
      ),
    ]
  );

const buildStatusNode = (slideCount) =>
  elementNode(
    'p',
    {
      className: ['ss-status'],
      'aria-live': 'polite',
      'aria-atomic': 'true',
    },
    [
      elementNode('span', { 'data-ss-current': '' }, [textNode('1')]),
      textNode(' / '),
      elementNode('span', { 'data-ss-total': '' }, [textNode(String(slideCount))]),
    ]
  );

const buildProgressNode = () =>
  elementNode(
    'div',
    {
      className: ['ss-progress'],
      'aria-hidden': 'true',
    },
    [elementNode('span', { className: ['ss-progress-bar'] }, [])]
  );

const applySlideMetadata = (listNode) => {
  listNode.data = {
    ...(listNode.data ?? {}),
    hName: 'ul',
    hProperties: {
      ...((listNode.data && listNode.data.hProperties) ?? {}),
      className: ['ss-track'],
    },
  };

  listNode.children.forEach((item, index) => {
    if (item.type !== 'listItem') {
      return;
    }

    item.data = {
      ...(item.data ?? {}),
      hName: 'li',
      hProperties: {
        ...((item.data && item.data.hProperties) ?? {}),
        className: ['ss-slide'],
        'data-ss-index': String(index),
      },
    };
  });
};

const createSlideshowNode = (listNode, slideshowIndex, options) => {
  const sectionId = `ss-${slideshowIndex}`;
  const trackId = `ss-track-${slideshowIndex}`;

  applySlideMetadata(listNode);
  listNode.data.hProperties.id = trackId;

  return elementNode(
    'section',
    {
      id: sectionId,
      className: ['ss'],
      role: 'region',
      'aria-roledescription': 'carousel',
      'aria-label': `Image slideshow ${slideshowIndex}`,
      'data-ss': '',
      'data-ss-delay': String(options.delay),
      'data-ss-enhanced': 'false',
      'data-ss-controls-visible': 'false',
      'data-ss-paused': 'false',
      ...options.extraAttributes,
    },
    [
      listNode,
      buildControlsNode(trackId),
      buildStatusNode(listNode.children.length),
      buildProgressNode(),
    ]
  );
};

const transformTree = (tree) => {
  let slideshowIndex = 0;

  const walk = (node) => {
    if (!node || !Array.isArray(node.children)) {
      return;
    }

    for (let index = 0; index < node.children.length; index += 1) {
      const currentNode = node.children[index];
      const nextNode = node.children[index + 1];
      const maybeCloseNode = node.children[index + 2];

      if (isMarkerParagraph(currentNode) && isUnorderedList(nextNode)) {
        slideshowIndex += 1;
        const options = parseMarkerOptions(currentNode);
        const slideshowNode = createSlideshowNode(
          nextNode,
          slideshowIndex,
          options
        );

        const removeCount = isCloseMarkerParagraph(maybeCloseNode) ? 3 : 2;
        node.children.splice(index, removeCount, slideshowNode);
        continue;
      }

      walk(currentNode);
    }
  };

  walk(tree);
};

export default function remarkSlideshow() {
  return (tree) => {
    transformTree(tree);
  };
}
