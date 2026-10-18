#!/usr/bin/env node
/**
 * Checks every Unsplash photo used in the project and tells you which are dead.
 *   npm run check:images
 * Dead photos still show on-brand artwork (see src/lib/imageFallback.ts), but
 * replacing them with live photos makes the site look best.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../src', import.meta.url).pathname;
const BASE = process.env.IMG_BASE || 'https://images.unsplash.com';

const walk = dir =>
  readdirSync(dir).flatMap(f => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|css)$/.test(f) ? [p] : [];
  });

const uses = new Map(); // photo id -> set of files
for (const file of walk(ROOT)) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/photo-([0-9a-f]+-[0-9a-f]+)|unsplash\('([0-9a-f]+-[0-9a-f]+)'/g)) {
    const id = m[1] || m[2];
    if (!uses.has(id)) uses.set(id, new Set());
    uses.get(id).add(relative(ROOT, file));
  }
}

async function check(id) {
  try {
    const ctl = AbortSignal.timeout(12000);
    const res = await fetch(`${BASE}/photo-${id}?auto=format&fit=crop&w=200&q=40`, { method: 'GET', signal: ctl });
    return res.ok ? 'ok' : `dead (${res.status})`;
  } catch {
    return 'unreachable';
  }
}

const ids = [...uses.keys()];
console.log(`Checking ${ids.length} photos...\n`);
const results = await Promise.all(ids.map(async id => [id, await check(id)]));

let dead = 0, unreachable = 0;
for (const [id, status] of results.sort((a, b) => a[1].localeCompare(b[1]))) {
  if (status === 'ok') { console.log(`  ok    photo-${id}`); continue; }
  status === 'unreachable' ? unreachable++ : dead++;
  console.log(`  ${status.padEnd(12)} photo-${id}\n        used in: ${[...uses.get(id)].join(', ')}`);
}
console.log(`\n${ids.length - dead - unreachable} ok, ${dead} dead, ${unreachable} unreachable`);
if (dead) console.log('\nReplace dead ones: find a photo on unsplash.com, copy the id after "photo-" from its image URL, and swap it in src/data/index.ts.');
if (unreachable) console.log('\nSome could not be reached; check your internet connection and re-run.');
process.exit(dead ? 1 : 0);
