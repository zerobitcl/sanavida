import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.html') ? [join(d, e.name)] : []));
let fail = 0;

for (const f of walk('dist')) {
  const h = readFileSync(f, 'utf8');
  const problems = [];
  let types = '';
  try {
    const graph = JSON.parse(h.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
    types = graph.map((x) => [].concat(x['@type']).join('+')).join(', ');
  } catch {
    problems.push('JSON-LD inválido');
  }
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${h1} h1`);
  if (!/<link rel="canonical"/.test(h)) problems.push('sin canonical');
  if (problems.length) fail++;
  console.log(`${problems.length ? '✗' : '✓'} ${f.padEnd(42)} ${(h.length / 1024).toFixed(1).padStart(5)} KB  ${types} ${problems.join(' | ')}`);
}
process.exit(fail ? 1 : 0);
