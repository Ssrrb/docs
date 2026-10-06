# Obra Studio · Figma specifications

Source material for the Obra Studio MVP Figma file. It sits outside the
docs.page wiki: the wiki holds the product rules, this folder turns them into
screen specifications for designers and design agents.

## How the work splits

- The specs state content, behavior, states and exact copy. Every rule citation
  points into `docs/`.
- Designers own the visual layer: layout, density, hierarchy, surfaces and
  motion. The project design skills are the reference: `better-interface`,
  `better-layout`, `better-typography`, `better-colors`, `better-accessibility`,
  `better-ui`, `better-writing`, `emil-design-eng`.
- `tokens.json` holds the shared foundations. Starting values, not a cage:
  change the token, not one screen.
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
