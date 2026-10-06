#!/usr/bin/env node
// Validates the canonical design tokens under design/tokens/.
// Rules:
//   Every JSON file parses.
//   Every {alias} resolves to a token in the same file set.
//   Every semantic role holds a value in dark and in light.
// No dependency; plain node.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2] ?? process.cwd();
const tokensDir = join(root, 'design/tokens');

if (!existsSync(tokensDir) || readdirSync(tokensDir).length === 0) {
  console.log('tokens-validate: design/tokens/ holds no files yet');
  process.exit(0);
}

const files = [];
const visit = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) visit(full);
    else if (entry.name.endsWith('.json')) files.push(full);
  }
};
visit(tokensDir);

const flat = new Map(); // name -> { value, file }
const parse = (object, prefix, file, into) => {
  for (const [key, node] of Object.entries(object)) {
    if (node === null || typeof node !== 'object') continue;
    if ('$type' in node || '$value' in node) {
      const name = prefix ? `${prefix}.${key}` : key;
      into.set(name, { node, file });
    } else {
      parse(node, prefix ? `${prefix}.${key}` : key, file, into);
    }
  }
};

let failures = 0;
const fail = (message) => {
  console.error(`tokens-validate: ${message}`);
  failures += 1;
};

const byFile = new Map();
for (const file of files) {
  let doc;
  try {
    doc = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`${relative(root, file)} does not parse: ${error.message}`);
    continue;
  }
  byFile.set(file, doc);
  parse(doc, '', file, flat);
}

// Alias resolution across the whole set.
const resolve = (value, seen = new Set()) => {
  if (typeof value !== 'string') return value;
  const match = /^\{(.+)\}$/.exec(value);
  if (!match) return value;
  const name = match[1];
  if (seen.has(name)) return null; // cycle
  seen.add(name);
  const target = flat.get(name);
  if (!target) return undefined;
  return resolve(target.node.$value ?? target.node, seen);
};

for (const [name, { node, file }] of flat) {
  const aliases = JSON.stringify(node.$value ?? node).match(/\{[a-zA-Z0-9.\-_]+\}/g) ?? [];
  for (const alias of aliases) {
    const target = alias.slice(1, -1);
    if (!flat.has(target)) {
      fail(`${relative(root, file)}: ${name} refers to the unknown token ${target}`);
    }
  }
}

// Dark and light hold the same semantic color roles.
const themeFiles = [...byFile.keys()].filter((file) => /themes[/\\](dark|light)\.json$/.test(file));
if (themeFiles.length === 2) {
  const roles = (file) => {
    const names = new Set();
    const walk = (object, prefix) => {
      for (const [key, node] of Object.entries(object)) {
        if (node === null || typeof node !== 'object') continue;
        const name = prefix ? `${prefix}.${key}` : key;
        if ('$value' in node) names.add(name);
        else walk(node, name);
      }
    };
    walk(byFile.get(file), '');
    return names;
  };
  const dark = roles(themeFiles[0]);
  const light = roles(themeFiles[1]);
  for (const role of dark) if (!light.has(role)) fail(`the light theme holds no value for ${role}`);
  for (const role of light) if (!dark.has(role)) fail(`the dark theme holds no value for ${role}`);
}

if (failures > 0) {
  console.error(`tokens-validate: ${failures} failure(s)`);
  process.exit(1);
}
console.log(`tokens-validate: ${flat.size} tokens, ${files.length} files, ok`);
