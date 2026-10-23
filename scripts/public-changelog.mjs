// The game repository keeps the complete development log. The public website
// only removes internal QA bookkeeping and publication-status boilerplate.
// It intentionally keeps limitations such as 'not implemented' and 'experimental'.

const statusOnly = [
  /^(?:\*\*)?(?:Игра(?:овая|овые)? (?:приёмка|проверка|тесты?)|Приёмка(?: в игре)?|Сборка(?: на| и| Java| JDK| Gradle| с)|(?:Java\s?25|JDK\s?25|Gradle|GameTests|JUnit)[^.]*(?:сборка|прогон|тесты|проверка))[^\n]{0,240}(?:не подтвержден[а-яё]*|ожида[а-яё]*|не выполнял[а-яё]*|не проводил[а-яё]*|требуется|не запускал[а-яё]*|пока нет|нужно подтвердить)[^\n]{0,80}(?:\*\*)?\.?$/i,
  /^(?:\*\*)?(?:Нужн[а-яё]*|Требуется|Ожидается|Необходимо) (?:локальная|отдельная|повторная|реальная|игровая|чистая|полная|Java|JDK|Gradle|компиляция|сборка)[^\n]{0,240}(?:сборк[а-яё]*|прогон[а-яё]*|провер[а-яё]*|тест[а-яё]*|приёмк[а-яё]*)[^\n]{0,120}$/i,
  /^\*\*Результат(?:ы)? тест[а-яё]*\*\*:?(?:[\s\S]*)?(?:не подтвержден|ожида[а-яё]*|не выполнял[а-яё]*)[^\n]*$/i,
];

const qaTail = [
  /\s*\*\*(?:Сборка|Игровая приёмка|Игровые тесты|Java\s?25|JDK\s?25|Gradle|GameTests|JUnit)[^\n*]{0,220}(?:не подтвержден[а-яё]*|ожида[а-яё]*|не запускал[а-яё]*|не выполнял[а-яё]*|не проводил[а-яё]*|требуется)[^\n*]{0,80}\.?\*\*/gi,
  /\s*(?:Сборка|Игровая приёмка|Игровые тесты|Java\s?25(?:\s*\/\s*Gradle)?|JDK\s?25|Gradle\/GameTests|GameTests(?: и сборка)?)[^.!?\n]{0,230}(?:не подтвержден[а-яё]*|ожида[а-яё]*|не запускал[а-яё]*|не выполнял[а-яё]*|не проводил[а-яё]*|требуется)[^.!?\n]{0,70}[.!?]/gi,
  /\s*(?:Нужн[а-яё]*|Требуется|Ожидается) (?:локальная|повторная|реальная|игровая|чистая|полная|Java|JDK|Gradle|проверка|сборка)[^.!?\n]{0,220}(?:сборк[а-яё]*|прогон[а-яё]*|провер[а-яё]*|тест[а-яё]*|приёмк[а-яё]*)[^.!?\n]{0,100}[.!?]/gi,
];

export function publicChangelog(markdown) {
  const source = markdown.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');
  const lines = source.split('\n');
  let inFence = false;
  let inFrontmatter = false;
  let seenFrontmatter = false;
  const out = [];

  for (const original of lines) {
    let line = original;
    if (!seenFrontmatter && line === '---') { inFrontmatter = true; seenFrontmatter = true; out.push(line); continue; }
    if (inFrontmatter) { out.push(line); if (line === '---') inFrontmatter = false; continue; }
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }

    // Internal status has no place in a player-facing release history.
    line = line
      .replace(/\s*\((?:код готов,\s*)?(?:игровая )?при[её]мка ожидается\)/gi, '')
      .replace(/\s*\((?:ожидает|ожидают|требуется) (?:игровой )?при[её]мки\)/gi, '')
      .replace(/\s*\((?:сборка|тесты)(?: и (?:тесты|при[её]мка))? не подтвержден[а-яё]*\)/gi, '')
      .replace(/\bПользователь подтвердил\b/gi, 'В игре проверено')
      .replace(/\bпользователь (?:принял|подтвердил)\b/gi, 'проверено в игре');

    for (const pattern of qaTail) line = line.replace(pattern, '');

    // Strip whole QA-only note lines, but never factual limitations.
    if (/^\s*(?:[-*+]\s*|>\s*)$/.test(line)) continue;
    const plain = line
      .replace(/^\s*(?:[-*+] |\d+\.\s+|>\s*)/, '')
      .replace(/^\*\*/, '').replace(/\*\*$/, '')
      .trim();
    if (statusOnly.some(re => re.test(plain))) continue;
    if (/^(?:\*\*)?(?:Игровая при[её]мка|Сборка|Java\s?25|GameTests) (?:и |пока )?(?:не подтвержден|ожида[а-яё]*|не проведен|не выполнен)/i.test(plain)) continue;

    // Remove dangling '—' and collapse excess spaces left by a deleted note.
    line = line.replace(/\s{2,}/g, ' ').replace(/(?:\s+[—–;,:])\s*$/, '').replace(/\*\*\s*\*\*/g, '');
    out.push(line);
  }

  return out.join('\n').replace(/\n{4,}/g, '\n\n\n').replace(/[ \t]+\n/g, '\n').trimEnd() + '\n';
}
