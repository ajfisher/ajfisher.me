#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRepoRoot = path.resolve(__dirname, '../..');

const flagNames = new Set(['title', 'date', 'tags']);

export const slugifyTitle = (title) => String(title ?? '')
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

const pad = (value) => String(value).padStart(2, '0');

export const formatPostDate = (date = new Date()) => {
  const offsetMinutes = -date.getTimezoneOffset();
  const offsetSign = offsetMinutes >= 0 ? '+' : '-';
  const offsetAbsolute = Math.abs(offsetMinutes);
  const offsetHours = pad(Math.floor(offsetAbsolute / 60));
  const offsetRemainder = pad(offsetAbsolute % 60);

  const calendarDate =
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const clockTime =
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

  return `${calendarDate} ${clockTime}${offsetSign}${offsetHours}:${offsetRemainder}`;
};

export const normalizeTags = (tags = '') => String(tags ?? '')
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean)
  .join(', ');

export const datePrefixFromPostDate = (date) => {
  const dateString = String(date ?? '');
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})(?:\s|T|$)/);

  if (!match || Number.isNaN(Date.parse(dateString.replace(' ', 'T')))) {
    throw new Error(
      'Date must begin with YYYY-MM-DD and be parseable by JavaScript Date.',
    );
  }

  return `${match[1]}-${match[2]}-${match[3]}`;
};

const quoteYamlString = (value) => JSON.stringify(value);

export const renderPostMarkdown = ({ title, date, slug, tags }) => {
  const normalizedTags = normalizeTags(tags);
  const lines = [
    '---',
    'author: ajfisher',
    `date: ${date}`,
    'layout: post',
    `slug: ${slug}`,
    `title: ${quoteYamlString(title)}`,
  ];

  if (normalizedTags) {
    lines.push(`tags: ${normalizedTags}`);
  }

  lines.push('---', '');

  return `${lines.join('\n')}\n`;
};

export const buildPostPath = ({ repoRoot = defaultRepoRoot, date, slug }) => {
  const datePrefix = datePrefixFromPostDate(date);

  return path.join(
    repoRoot,
    'content',
    'text',
    'posts',
    `${datePrefix}-${slug}.md`,
  );
};

export const parseArgs = (argv) => {
  const values = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      return { values, help: true };
    }

    if (!arg.startsWith('--')) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const [rawName, inlineValue] = arg.slice(2).split(/=(.*)/s, 2);

    if (!flagNames.has(rawName)) {
      throw new Error(`Unknown option: --${rawName}`);
    }

    if (inlineValue !== undefined) {
      values[rawName] = inlineValue;
      continue;
    }

    const nextValue = argv[index + 1];

    if (!nextValue || nextValue.startsWith('--')) {
      throw new Error(`Missing value for --${rawName}`);
    }

    values[rawName] = nextValue;
    index += 1;
  }

  return { values, help: false };
};

export const createPost = async ({
  repoRoot = defaultRepoRoot,
  title,
  date = formatPostDate(),
  tags = '',
}) => {
  const trimmedTitle = String(title ?? '').trim();
  const slug = slugifyTitle(trimmedTitle);

  if (!trimmedTitle) {
    throw new Error('Title is required.');
  }

  if (!slug) {
    throw new Error('Title must contain at least one slug-safe character.');
  }

  const filePath = buildPostPath({ repoRoot, date, slug });
  const markdown = renderPostMarkdown({
    title: trimmedTitle,
    date,
    slug,
    tags,
  });

  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.writeFile(filePath, markdown, { flag: 'wx' });
  } catch (error) {
    if (error && error.code === 'EEXIST') {
      const collisionError = new Error(`Post already exists: ${filePath}`);
      collisionError.code = 'EEXIST';
      collisionError.filePath = filePath;
      throw collisionError;
    }

    throw error;
  }

  return { filePath, slug };
};

const promptForValue = async (rl, label, defaultValue = '') => {
  const suffix = defaultValue ? ` (${defaultValue})` : '';
  const answer = await rl.question(`${label}${suffix}: `);
  const trimmedAnswer = answer.trim();

  return trimmedAnswer || defaultValue;
};

const collectOptions = async ({
  values,
  input = process.stdin,
  output = process.stdout,
  now = new Date(),
}) => {
  const defaults = {
    date: formatPostDate(now),
    tags: '',
  };
  const options = {
    title: values.title,
    date: values.date,
    tags: values.tags,
  };
  const shouldPrompt = Boolean(input.isTTY && output.isTTY);

  if (!shouldPrompt) {
    return {
      title: options.title,
      date: options.date || defaults.date,
      tags: options.tags || defaults.tags,
    };
  }

  const rl = createInterface({ input, output });

  try {
    while (!options.title || !options.title.trim()) {
      options.title = await promptForValue(rl, 'Title');
    }

    if (!options.date) {
      options.date = await promptForValue(rl, 'Date', defaults.date);
    }

    if (options.tags === undefined) {
      options.tags = await promptForValue(rl, 'Tags');
    }

    return options;
  } finally {
    rl.close();
  }
};

const helpText = `Create a new ajfisher.me post scaffold.

Usage:
  npm run new-post
  npm run new-post -- --title "My Post" --tags "ai, development"
  node site.v5/scripts/new-post.mjs --title "My Post"

Options:
  --title <title>  Post title. Required in non-interactive mode.
  --date <date>    Frontmatter date. Defaults to the current local timestamp.
  --tags <tags>    Optional comma-separated tags.
  -h, --help       Show this help.
`;

export const runCli = async ({
  argv = process.argv.slice(2),
  input = process.stdin,
  output = process.stdout,
  repoRoot = defaultRepoRoot,
  now = new Date(),
} = {}) => {
  const { values, help } = parseArgs(argv);

  if (help) {
    output.write(helpText);
    return 0;
  }

  const options = await collectOptions({ values, input, output, now });

  if (!options.title || !options.title.trim()) {
    throw new Error('Missing required --title in non-interactive mode.');
  }

  const result = await createPost({ repoRoot, ...options });
  const relativePath = path.relative(process.cwd(), result.filePath);

  output.write(`Created ${relativePath}\n\n`);
  output.write('Next steps:\n');
  output.write(`  $EDITOR ${relativePath}\n`);
  output.write('  make dev\n');

  return 0;
};

const isDirectRun = process.argv[1]
  && pathToFileURL(process.argv[1]).href === import.meta.url;

if (isDirectRun) {
  runCli().catch((error) => {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exitCode = 1;
  });
}
