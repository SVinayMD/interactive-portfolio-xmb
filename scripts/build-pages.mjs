import { mkdirSync, rmSync, copyFileSync, readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const ASSETS = join(ROOT, 'assets');
const SITE = join(ROOT, 'site');

function rimraf(p) {
  try { rmSync(p, { recursive: true, force: true }); } catch {}
}

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function copyRecursive(src, dest) {
  ensureDir(dest);
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const d = join(dest, entry);
    const st = statSync(s);
    if (st.isDirectory()) copyRecursive(s, d);
    else copyFileSync(s, d);
  }
}

// 1) Clean up the site directory
rimraf(SITE);
ensureDir(SITE);

// 2) Copy static folders
copyRecursive(join(SRC, 'css'), join(SITE, 'css'));
copyRecursive(join(SRC, 'locales'), join(SITE, 'locales'));
copyRecursive(ASSETS, join(SITE, 'assets'));

// 3) Prepare page HTML
const indexSrc = join(SRC, 'index.html');
let html = readFileSync(indexSrc, 'utf-8');
html = html.replaceAll('src/js/', 'js/');
html = html.replaceAll('../assets/', 'assets/');

// 4) Write the modified HTML into site/
writeFileSync(join(SITE, 'index.html'), html, 'utf-8');

// 5) Prepare site/js directory; obfuscation step will output there.
ensureDir(join(SITE, 'js'));

console.log('Prepared site/ for GitHub Pages. Next step will obfuscate JS into site/js.');
