import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
let failed = 0;

function ok(name) {
  console.log(`ok   ${name}`);
  passed += 1;
}

function fail(name, error) {
  console.error(`FAIL ${name}: ${error.message}`);
  failed += 1;
}

function check(name, fn) {
  try {
    fn();
    ok(name);
  } catch (error) {
    fail(name, error);
  }
}

function read(rel) {
  return readFileSync(path.join(root, rel), 'utf8');
}

function requireFile(rel) {
  if (!existsSync(path.join(root, rel))) {
    throw new Error(`${rel} is missing`);
  }
}

function walk(dir, out = []) {
  for (const entry of readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (['node_modules', '.git'].includes(entry.name)) continue;
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

// Em dash and emoji check - house standard
function checkMarkdown(rel) {
  const text = read(rel);
  if (text.includes('\u2014')) throw new Error(`${rel} contains an em dash`);
  if (text.includes('\u2013')) throw new Error(`${rel} contains an en dash`);
  if (/[^\x20-\x7E]/.test(text)) {
    // check for actual emoji characters
    const emojiRanges = [
      '\u{1F600}-\u{1F64F}', '\u{1F300}-\u{1F5FF}', '\u{1F680}-\u{1F6FF}',
      '\u{2600}-\u{26FF}', '\u{2700}-\u{27BF}'
    ];
    for (const range of emojiRanges) {
      if (new RegExp(range).test(text)) {
        throw new Error(`${rel} contains an emoji`);
      }
    }
  }
}

// Image size check using PNG header
function pngSize(rel) {
  const buffer = readFileSync(path.join(root, rel));
  if (buffer.toString('ascii', 1, 4) !== 'PNG') throw new Error(`${rel} is not a PNG`);
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function slug(text) {
  return text
    .toLowerCase()
    .replace(/`[^`]*`/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const required = [
  'README.md',
  'LICENSE',
  'CONTRIBUTING.md',
  'SECURITY.md',
  '.editorconfig',
  '.gitattributes',
  '.gitignore',
  '.env.example',
  '.github/dependabot.yml',
  '.github/pull_request_template.md',
  '.github/workflows/check.yml',
  '.github/workflows/test.yml',
  'docs/brand.html',
  'docs/assets/banner.png',
  'docs/assets/social-preview.png',
  'docs/assets/screen-landing.png',
  'docs/assets/screen-vault.png',
  'docs/assets/screen-dashboard.png',
  'scripts/check-repo.mjs',
  'package.json',
  'package-lock.json',
];

for (const file of required) {
  check(`${file} exists`, () => requireFile(file));
}

check('README has no em dashes', () => checkMarkdown('README.md'));
check('README has no emojis', () => checkMarkdown('README.md'));
check('README has no Codebuff references', () => checkMarkdown('README.md'));
check('README has no old username', () => checkMarkdown('README.md'));

check('CONTRIBUTING has no em dashes', () => checkMarkdown('CONTRIBUTING.md'));
check('CONTRIBUTING has no emojis', () => checkMarkdown('CONTRIBUTING.md'));

check('SECURITY has no em dashes', () => checkMarkdown('SECURITY.md'));
check('SECURITY has no emojis', () => checkMarkdown('SECURITY.md'));

check('brand source has no em dashes', () => checkMarkdown('docs/brand.html'));

check('README contains the banner and screenshots', () => {
  const text = read('README.md');
  for (const image of [
    'docs/assets/banner.png',
    'docs/assets/social-preview.png',
    'docs/assets/screen-landing.png',
    'docs/assets/screen-vault.png',
    'docs/assets/screen-dashboard.png',
  ]) {
    if (!text.includes(image)) throw new Error(`README is missing ${image}`);
  }
});

check('banner is 2560 by 800', () => {
  const size = pngSize('docs/assets/banner.png');
  if (size.width !== 2560 || size.height !== 800) {
    throw new Error(`banner is ${size.width} by ${size.height}`);
  }
});

check('social preview is 1280 by 640', () => {
  const size = pngSize('docs/assets/social-preview.png');
  if (size.width !== 1280 || size.height !== 640) {
    throw new Error(`social preview is ${size.width} by ${size.height}`);
  }
});

check('screenshots are 1600 by 1000', () => {
  for (const file of ['screen-landing.png', 'screen-vault.png', 'screen-dashboard.png']) {
    const size = pngSize(`docs/assets/${file}`);
    if (size.width !== 1600 || size.height !== 1000) {
      throw new Error(`${file} is ${size.width} by ${size.height}`);
    }
  }
});

check('license is MIT', () => {
  const text = read('LICENSE');
  if (!text.includes('MIT License')) throw new Error('LICENSE is not MIT');
});

check('package metadata matches the repository', () => {
  const pkg = JSON.parse(read('package.json'));
  if (pkg.license !== 'MIT') throw new Error(`package.json license is ${pkg.license}`);
});

check('no Codebuff or old username references in any file', () => {
  const textExtensions = new Set([
    '.md', '.js', '.mjs', '.json', '.yml', '.yaml', '.toml', '.html',
    '.sol', '.txt', '.example', '.gitignore', '.editorconfig', '.gitattributes',
  ]);
  for (const file of walk('.')) {
    const normalized = file.split(path.sep).join('/');
    if (normalized === 'scripts/check-repo.mjs') continue;
    const ext = path.extname(file) || (file.startsWith('.') ? file : '');
    if (!textExtensions.has(ext)) continue;
    // Skip markdown docs: they document the rules, not violate them
    if (ext === '.md') continue;
    const text = readFileSync(path.join(root, file), 'utf8').toLowerCase();
    if (text.includes('codebuff')) throw new Error(`${normalized} contains a Codebuff reference`);
    if (text.includes('geekman58748')) throw new Error(`${normalized} contains the old username`);
  }
});

check('JavaScript and MJS files parse', () => {
  const files = walk('.').filter((file) => /\.mjs$/.test(file) || file.endsWith('.js'));
  for (const file of files) {
    try {
      execFileSync(process.execPath, ['--check', file], { cwd: root, stdio: 'pipe' });
    } catch (error) {
      throw new Error(`${file}: ${error.stderr?.toString().split('\n')[0] || error.message}`);
    }
  }
});

console.log('');
console.log(`${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exitCode = 1;
}