/**
 * النشر عبر Vercel REST API (بديل عن git push).
 *
 * الاستخدام:
 *   $env:VERCEL_TOKEN="vcp_..."           # من Vercel → Settings → Tokens
 *   $env:VERCEL_PROJECT_ID="prj_..."      # معرف مشروع Vercel
 *   node scripts/deploy-vercel.mjs
 *
 * ملاحظات:
 *   - يرفع الكود المصدري (بدون node_modules/dist/.env) ويترك Vercel يبني.
 *   - متغيرات البيئة (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) تُقرأ من
 *     متغيرات المشروع في Vercel وليس من ملف .env المحلي.
 *   - الطريقة الأساسية الموصى بها: git push إلى main (نشر تلقائي).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID;
const root = process.env.SRC_DIR || process.cwd();

if (!token || !projectId) {
  console.error('Missing VERCEL_TOKEN or VERCEL_PROJECT_ID env var.');
  process.exit(1);
}

const EXCLUDE_DIRS = new Set(['node_modules', 'dist', '.git', '.vercel', '.next', 'coverage']);
const EXCLUDE_FILES = new Set(['.env', '.env.local']);

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      out.push(...walk(full));
    } else {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      out.push(full);
    }
  }
  return out;
}

const headers = { Authorization: `Bearer ${token}` };

const files = [];
for (const f of walk(root)) {
  const rel = path.relative(root, f).replace(/\\/g, '/');
  files.push({ file: rel, data: fs.readFileSync(f, 'utf8') });
}
console.log(`files: ${files.length}`);

const payload = {
  name: 'madena',
  project: projectId,
  target: 'production',
  files,
  projectSettings: {
    framework: 'vite',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    installCommand: 'npm install',
  },
};

const res = await fetch(`https://api.vercel.com/v13/deployments?projectId=${projectId}`, {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
const json = await res.json();
console.log('status:', res.status);
console.log('id:', json.id);
console.log('url:', json.url);
console.log('readyState:', json.readyState);
if (json.error) console.log('error:', JSON.stringify(json.error));
