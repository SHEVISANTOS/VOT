#!/usr/bin/env node
// Ping IndexNow (Bing, Yandex, Seznam, Naver, ...) so new/updated/deleted pages get recrawled fast.
//
// Usage:
//   node scripts/indexnow.mjs                    # submit every URL in sitemap.xml
//   node scripts/indexnow.mjs --changed [ref]    # submit .html pages changed since git ref (default HEAD~1)
//   node scripts/indexnow.mjs zanzibar.html /tour.html https://www.volunteertotanzania.com/
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HOST = 'www.volunteertotanzania.com';
const KEY = '162363ae6022480f85e51425e5f1f64d';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['404.html', 'googlea6274c7c17e11000.html']);

function toUrl(p) {
  if (/^https?:\/\//.test(p)) return p;
  p = p.replace(/^\/+/, '');
  return `https://${HOST}/${p === 'index.html' ? '' : p}`;
}

function sitemapUrls() {
  const xml = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(m => m[1]);
}

function changedPages(ref) {
  const out = execSync(`git diff --name-only ${ref} HEAD -- "*.html"`, { cwd: ROOT, encoding: 'utf8' });
  return out.split('\n').filter(f => f && !f.includes('/') && !SKIP.has(f)).map(toUrl);
}

const args = process.argv.slice(2);
let urls;
if (args[0] === '--changed') urls = changedPages(args[1] || 'HEAD~1');
else if (args.length) urls = args.map(toUrl);
else urls = sitemapUrls();
urls = [...new Set(urls)];

if (!urls.length) {
  console.log('IndexNow: nothing to submit.');
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
urls.forEach(u => console.log('  ' + u));
// 200 = OK, 202 = accepted (key validation pending). Anything else is a failure.
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
