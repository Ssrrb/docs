# Obra Studio · Design specifications

Source material for the Obra Studio MVP design file. It sits outside the
docs.page wiki: the wiki holds the product rules, this folder turns them into
screen specifications for designers and design agents.

The design tool is Penpot, driven through its MCP server. The tool decision and
the rejected options sit in `docs/decisions/design-tooling.mdx`. The working
plan sits in `docs/execution/design-system.mdx`.

## Inherited application shell

Obra Studio is a fork of Visual Studio Code (Code - OSS). It inherits the
workbench layout, CSS, theme tokens, controls, icons and interaction patterns
from the code in `vscode/`. Designs extend that shell for construction
workflows. Use the current fork as the visual baseline.

The layout maps the regions as follows:

| Workbench region | Obra Studio use |
|---|---|
| Left activity bar | Company view entry points (`01 · Empresa`). |
| Primary sidebar | Project view explorer for the one open project (`02 · Proyecto`). |
| Central editor and tabs | Company screens or documents opened from the project tree. |
| Right secondary sidebar | Inherited chat region, when enabled. |
| Title bar and status bar | Inherited window controls and status. |

The company view covers all projects. The project sidebar covers only the open
project. Opening a project changes that sidebar context and opens its content
in the editor area. With no open project, show an empty project context.
Company navigation remains reachable while a project is open.

Preserve workbench region sizing, resize handles, collapse behavior, tabs,
dividers, control density, typography and focus treatment. Read their current
values from the fork. A 1440×900 frame is a review viewport, not a fixed app
size. Project tables and forms occupy the editor area. Print pages retain their
paper layout. Login uses the inherited controls without requiring a project.

## How the work splits

- The specs state content, behavior, states and exact copy. Every rule citation
  points into `docs/`.
- Design agents build the domain content hierarchy within the inherited regions
  through the Penpot MCP. Shell layout, density, surfaces and motion follow the
  VS Code fork. The project design skills are the reference: `better-interface`,
  `better-layout`, `better-typography`, `better-colors`, `better-accessibility`,
  `better-ui`, `better-writing`, `emil-design-eng`, `penpot-uiux-design`,
  `penpot-audit-tokens`, `penpot-build-from-code`.
- `design/tokens/` holds the canonical token files. Penpot receives token sets
  and themes through the sync in `scripts/tokens-penpot.mjs`. The build in
  `scripts/tokens-build.mjs` emits CSS variables and TypeScript constants.
  Workbench CSS in `vscode/` stays authoritative for inherited UI.
- `components.md` lists the required components. Build the library once and
  instance it everywhere.
- `mapping/penpot-vscode.json` maps every component to its implementation
  target in the fork. The agent `component-mapper` owns that file.

## For a design agent

Read `tokens/`, then `components.md`, then `manifest.json`, then the screen
spec named in the manifest. Build in manifest order: tokens → components →
`01 · Empresa` → `02 · Proyecto` → `04 · Impresos`.

Floors that never bend:

- Window frames are 1440×900; both color modes exist and dark is the default.
- Spanish copy comes from the screen spec exactly as written.
- Every control is keyboard reachable with a visible focus state.
- State is never carried by color alone.
- Money uses tabular numbers and two decimals; currencies never convert.
- Keyboard-triggered interactions do not animate.
- Forms keep visible labels; placeholders are examples.

After each frame run its `Done when` list and then `checklist.md`. The agents
`penpot-builder`, `penpot-auditor` and `design-reviewer` share that loop: the
builder creates, the auditor reports, the reviewer decides `reviewed`.

## Status

`draft` — built from these specs, not reviewed.
`reviewed` — checked by the auditor and the reviewer against `checklist.md`.
`approved` — the repository author approved the visual design.
