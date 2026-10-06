# Obra Studio · Figma specifications

Source material for the Obra Studio MVP Figma file. It sits outside the
docs.page wiki: the wiki holds the product rules, this folder turns them into
screen specifications for designers and design agents.

## Inherited application shell

Obra Studio is a fork of Visual Studio Code (Code - OSS). It inherits the
workbench layout, CSS, theme tokens, controls, icons and interaction patterns
from the code in `vscode/`. Figma designs extend that shell for construction
workflows. Use the current fork as the visual baseline.

The supplied layout suggestion maps the regions as follows:

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

The red and yellow outlines in the supplied image identify regions. They are
annotations, not application colors or borders. The image suggests the shell
layout; screen specs still define domain content and Spanish copy.

Preserve workbench region sizing, resize handles, collapse behavior, tabs,
dividers, control density, typography and focus treatment. Read their current
values from the fork. A 1440×900 frame is a review viewport, not a fixed app
size. Project tables and forms occupy the editor area. Print pages retain their
paper layout. Login uses the inherited controls without requiring a project.

## How the work splits

- The specs state content, behavior, states and exact copy. Every rule citation
  points into `docs/`.
- Designers own the domain content hierarchy within the inherited regions.
  Shell layout, density, surfaces and motion follow the VS Code fork. The project design skills are the reference: `better-interface`,
  `better-layout`, `better-typography`, `better-colors`, `better-accessibility`,
  `better-ui`, `better-writing`, `emil-design-eng`.
- `tokens.json` holds shared foundations and the workbench token mapping.
  Resolve inherited values from the fork before building the Figma library.
  Literal values are draft fallbacks, not overrides of workbench CSS.
- `components.md` lists the required components. Build the library once and
  instance it everywhere.

## For a design agent

Read `tokens.json`, then `components.md`, then `manifest.json`, then the screen
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

After each frame run its `Done when` list and then `checklist.md`.

## Status

`draft` — created from these specs, not reviewed.
`reviewed` — checked against `checklist.md` and the cited rules.
`approved` — the repository author approved the visual design.
