import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { publicChangelog } from './public-changelog.mjs';

const target = resolve('src/content/docs/changelog.md');
const before = await readFile(target, 'utf8');
const after = publicChangelog(before);
if (after !== before) {
  await writeFile(target, after, 'utf8');
  console.log(`Public changelog cleaned: ${target}`);
} else {
  console.log('Public changelog is already clean.');
}
