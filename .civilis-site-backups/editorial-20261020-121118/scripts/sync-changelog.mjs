import { readFile, writeFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

// Usage: npm run sync:changelog -- "X:/Dev/civilis"
// Or: set CIVILIS_REPO_PATH=... in your shell.
const repo = resolve(process.argv[2] || process.env.CIVILIS_REPO_PATH || '../civilis');
const source = resolve(repo, 'CHANGELOG.md');
const target = resolve('src/content/docs/changelog.md');

try {
  const file = await stat(source);
  if (!file.isFile()) throw new Error('CHANGELOG.md is not a regular file');
  const raw = (await readFile(source, 'utf8')).replace(/^\uFEFF/, '');
  if (!raw.trim() || !raw.startsWith('# ')) throw new Error('Unexpected changelog format');

  const body = raw.replace(/^# .*?(?:\r?\n|$)/, '').trim();
  // Relative links in source docs are often internal technical references.
  // Keep them readable without generating broken links on the public website.
  const sanitized = body.replace(/\[([^\]]+)\]\((?!https?:\/\/|\/|#)([^)]+\.md)\)/g, '$1');
  const output = [
    '---',
    'title: История версий',
    'description: Подробная история изменений Minecraft-мода Civilis.',
    '---',
    '',
    '> Источник: CHANGELOG.md основного репозитория Civilis. Функции, ожидающие проверки в игре, не считаются подтверждёнными.',
    '',
    sanitized,
    '',
  ].join('\n');

  await writeFile(target, output, 'utf8');
  console.log(`История версий обновлена: ${target} (${output.length} символов)`);
} catch (error) {
  console.error(`Не удалось импортировать ${source}: ${error.message}`);
  process.exitCode = 1;
}
