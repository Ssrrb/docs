#!/bin/sh
# Verifies the design contract: the manifest, the screen specs, the tokens
# and the mapping registry. The commit hook runs this file through
# scripts/check.sh. The author changes the checks in this file.

set -eu

root=$(cd "$(dirname "$0")/.." && pwd)
design="$root/design"
fail=0

note() {
  printf 'check-design: %s\n' "$1"
}

bail() {
  printf 'check-design: %s\n' "$1" >&2
  fail=1
}

command -v node >/dev/null 2>&1 || {
  printf 'check-design: node is required\n' >&2
  exit 1
}

# Every spec named in the manifest exists; every spec id is unique.
node -e '
const fs = require("fs");
const path = require("path");
const root = process.argv[1];
const manifest = JSON.parse(fs.readFileSync(path.join(root, "design/manifest.json"), "utf8"));
const errors = [];
const seen = new Map();
for (const frame of manifest.frames) {
  if (seen.has(frame.id)) {
    errors.push(`duplicate frame id ${frame.id}`);
  }
  seen.set(frame.id, true);
  const spec = path.join(root, "design", frame.spec);
  if (!fs.existsSync(spec)) {
    errors.push(`missing spec ${frame.spec}`);
    continue;
  }
  const text = fs.readFileSync(spec, "utf8");
  if (!text.includes(`id: ${frame.id}`)) {
    errors.push(`${frame.spec} does not state id ${frame.id}`);
  }
  const expected = `frameName: "${frame.frameName}"`;
  if (!text.includes(expected)) {
    errors.push(`${frame.spec} does not state frameName ${frame.frameName}`);
  }
}
if (errors.length) {
  for (const error of errors) console.error(`check-design: ${error}`);
  process.exit(1);
}
' "$root" || fail=1

# The token file parses as JSON.
node -e '
const fs = require("fs");
try {
  JSON.parse(fs.readFileSync(process.argv[1] + "/design/tokens.json", "utf8"));
} catch (error) {
  console.error(`check-design: design/tokens.json does not parse: ${error.message}`);
  process.exit(1);
}
' "$root" || fail=1

# The canonical token files under design/tokens/ parse as JSON when present.
node -e '
const fs = require("fs");
const path = require("path");
const root = process.argv[1];
const dir = path.join(root, "design/tokens");
if (!fs.existsSync(dir)) process.exit(0);
let count = 0;
const stack = [dir];
while (stack.length) {
  const current = stack.pop();
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) stack.push(full);
    else if (entry.name.endsWith(".json")) {
      count += 1;
      try {
        JSON.parse(fs.readFileSync(full, "utf8"));
      } catch (error) {
        console.error(`check-design: ${path.relative(root, full)} does not parse: ${error.message}`);
        process.exit(1);
      }
    }
  }
}
console.log(`check-design: ${count} token files parse`);
' "$root" || fail=1

# The canonical tokens validate: aliases resolve, themes are complete.
if [ -d "$design/tokens" ] && [ -n "$(ls -A "$design/tokens" 2>/dev/null)" ]; then
  node "$root/scripts/tokens-validate.mjs" "$root" || fail=1

  # The generated artifacts must reproduce with a clean tree.
  node "$root/scripts/tokens-build.mjs" "$root" >/dev/null || fail=1
  if git -C "$root" ls-files --error-unmatch design/generated/tokens.css >/dev/null 2>&1; then
    if ! git -C "$root" diff --quiet -- design/generated; then
      printf 'check-design: design/generated is stale. Run node scripts/tokens-build.mjs and commit.\n' >&2
      fail=1
    fi
  fi
fi

# The mapping registry holds one entry per component in the inventory.
node -e '
const fs = require("fs");
const path = require("path");
const root = process.argv[1];
const registry = path.join(root, "design/mapping/penpot-vscode.json");
const components = path.join(root, "design/components.md");
if (!fs.existsSync(components)) process.exit(0);
if (!fs.existsSync(registry)) {
  console.log("check-design: no mapping registry yet; the check is skipped");
  process.exit(0);
}
const text = fs.readFileSync(components, "utf8");
const named = [...text.matchAll(/^- \*\*(.+?)\*\*/gm)].map((match) => match[1]);
if (!named.length) process.exit(0);
const parsed = JSON.parse(fs.readFileSync(registry, "utf8"));
const known = new Set((parsed.components || []).map((component) => component.component));
const missing = named.filter((name) => !known.has(name));
if (missing.length) {
  for (const name of missing) console.error(`check-design: the registry holds no entry for ${name}`);
  process.exit(1);
}
console.log(`check-design: the registry covers ${named.length} components`);
' "$root" || fail=1

note "done"
exit $fail
