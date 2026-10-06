#!/usr/bin/env node
// Builds the generated token artifacts for the fork under design/generated/.
// Reads the canonical DTCG files under design/tokens/ and emits:
//   tokens.css         literal values, dark default, light override block
//   tokens-vscode.css  the same names bound to --vscode-* theme variables
//   tokens.manifest.json  name -> resolved value per mode (sync + audit input)
// Generated files are reproducible; never edit them by hand.

import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2] ?? process.cwd();
const tokensDir = join(root, 'design/tokens');
const outDir = join(root, 'design/generated');

if (!existsSync(tokensDir)) {
  console.error('tokens-build: design/tokens/ does not exist');
  process.exit(1);
}

// ---- load -----------------------------------------------------------------

const files = [];
const visit = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) visit(full);
    else if (entry.name.endsWith('.json')) files.push(full);
  }
};
visit(tokensDir);

const flat = new Map(); // name -> node
const parse = (object, prefix) => {
  for (const [key, node] of Object.entries(object)) {
    if (node === null || typeof node !== 'object') continue;
    const name = prefix ? `${prefix}.${key}` : key;
    if ('$value' in node) flat.set(name, node);
    else parse(node, name);
  }
};
for (const file of files) parse(JSON.parse(readFileSync(file, 'utf8')), '');

const resolveValue = (value, seen = new Set()) => {
  if (typeof value !== 'string') return value;
  const match = /^\{(.+)\}$/.exec(value);
  if (!match) return value;
  const target = flat.get(match[1]);
  if (!target || seen.has(match[1])) return undefined;
  seen.add(match[1]);
  return resolveValue(target.$value, seen);
};

const kebab = (name) => `--ds-${name.replace(/\./g, '-').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
const cssVar = (name) => `var(${kebab(name)})`;

// ---- collect per file kind ------------------------------------------------

const themeFiles = files.filter((file) => /themes[/\\](dark|light)\.json$/.test(file));
const themes = new Map(); // 'dark' | 'light' -> Map(name -> resolved)
for (const file of themeFiles) {
  const mode = /dark\.json$/.test(file) ? 'dark' : 'light';
  const values = new Map();
  const local = new Map();
  parse(JSON.parse(readFileSync(file, 'utf8')), '', local);
  // re-parse into local map
  function parse(object, prefix, into) {
    for (const [key, node] of Object.entries(object)) {
      if (node === null || typeof node !== 'object') continue;
      const name = prefix ? `${prefix}.${key}` : key;
      if ('$value' in node) into.set(name, node);
      else parse(node, name, into);
    }
  }
  for (const [name, node] of local) {
    const resolved = resolveValue(node.$value);
    if (resolved === undefined) {
      console.error(`tokens-build: ${name} does not resolve`);
      process.exit(1);
    }
    values.set(name, resolved);
  }
  themes.set(mode, values);
}

const semantic = new Map(); // name -> node (mode-neutral tokens)
for (const file of files.filter((f) => !themeFiles.includes(f) && !f.endsWith('primitives.json'))) {
  parse(JSON.parse(readFileSync(file, 'utf8')), '', semantic);
  function parse(object, prefix, into) {
    for (const [key, node] of Object.entries(object)) {
      if (node === null || typeof node !== 'object') continue;
      const name = prefix ? `${prefix}.${key}` : key;
      if ('$value' in node) into.set(name, node);
      else parse(node, name, into);
    }
  }
}

// ---- emit tokens.css ------------------------------------------------------

const colorRoles = [...themes.get('dark').keys()].filter((name) => themes.get('dark').get(name).startsWith('#'));
const cssBlock = (mode) => {
  const values = themes.get(mode);
  const lines = colorRoles.map((name) => `  ${kebab(name)}: ${values.get(name)};`);
  return mode === 'dark' ? `:root {\n${lines.join('\n')}\n}` : `:root[data-mode="light"] {\n${lines.join('\n')}\n}`;
};

const semanticCss = [...semantic.entries()]
  .filter(([, node]) => node.$type === 'typography')
  .map(([name, node]) => {
    const v = node.$value;
    const family = resolveValue(v.fontFamily);
    const size = resolveValue(v.fontSize);
    const weight = resolveValue(v.fontWeight);
    const lineHeight = resolveValue(v.lineHeight);
    return `  ${kebab(name)}: ${weight} ${size}/${lineHeight} ${family};`;
  })
  .join('\n');

const tokensCss = `/* Generated from design/tokens/. Do not edit. */
${cssBlock('dark')}

${cssBlock('light')}

:root {
  /* semantic typography, mode-neutral */
${semanticCss}
}
`;

// ---- emit tokens-vscode.css ----------------------------------------------

const vscodeMapping = {
  'bg.app': 'editor.background',
  'bg.surface': 'sideBar.background',
  'bg.raised': 'editorWidget.background',
  'bg.hover': 'list.hoverBackground',
  'bg.selected': 'list.activeSelectionBackground',
  'text.primary': 'foreground',
  'text.secondary': 'descriptionForeground',
  'text.muted': 'disabledForeground',
  'border.subtle': 'sideBar.border',
  'accent.solid': 'button.background',
  'accent.on': 'button.foreground',
  'focus.ring': 'focusBorder'
};

const vscodeCss = `/* Generated from design/tokens/. Do not edit.
   Webview fallback layer: each --ds-* role falls back to its workbench theme
   variable. Load after tokens.css. */
:root {
${colorRoles
  .map((name) => {
    const id = vscodeMapping[name];
    const fallback = themes.get('dark').get(name);
    return id ? `  ${kebab(name)}: var(--vscode-${id.replace(/\./g, '-')}, ${fallback});` : `  ${kebab(name)}: ${fallback};`;
  })
  .join('\n')}
}
`;

// ---- emit manifest --------------------------------------------------------

const manifest = {};
for (const name of colorRoles) {
  manifest[name] = {
    type: 'color',
    dark: themes.get('dark').get(name),
    light: themes.get('light').get(name),
    vscode: vscodeMapping[name] ?? null
  };
}
for (const [name, node] of semantic) {
  if (node.$type === 'typography') {
    const v = node.$value;
    manifest[name] = {
      type: 'typography',
      value: {
        fontFamily: resolveValue(v.fontFamily),
        fontSize: resolveValue(v.fontSize),
        fontWeight: resolveValue(v.fontWeight),
        lineHeight: resolveValue(v.lineHeight)
      },
      vscode: null
    };
  }
}

// Mode-neutral tokens: dimension, borderRadius, shadow, number from any file.
const neutralTypes = new Set(['dimension', 'borderRadius', 'shadow', 'number']);
for (const [name, node] of flat) {
  if (!neutralTypes.has(node.$type)) continue;
  if (manifest[name]) continue;
  const resolved = resolveValue(node.$value);
  if (resolved === undefined) continue;
  manifest[name] = { type: node.$type, value: resolved, vscode: null };
}

// ---- write ----------------------------------------------------------------

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'tokens.css'), tokensCss);
writeFileSync(join(outDir, 'tokens-vscode.css'), vscodeCss);
writeFileSync(join(outDir, 'tokens.manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`tokens-build: wrote ${relative(root, outDir)}/tokens.css, tokens-vscode.css, tokens.manifest.json`);
