# Component library

Build these on the page `03 · Componentes` and publish them. Screens instance
them; never detach. Reuse the VS Code fork controls, CSS, Codicons and theme tokens. Penpot library
components represent those inherited controls. Add domain components where the
workbench has no equivalent. Resolve values through `design/tokens/` and use the design skills:
`better-interface`, `better-ui`, `better-accessibility`. Below is the inventory
and what each component must carry.

## Actions

- **Button** — variants: primary, secondary, ghost, danger. Sizes sm/md.
  States: default, hover, pressed, focus, disabled, loading. One primary action
  per view; labels start with a verb.
- **IconButton** — comfortable target; the tooltip text is the accessible name.

## Data display

- **StateChip** — tone draft | pending | success | closed | danger, always with
  an icon and the Spanish label.

  | Tone | States |
  |---|---|
  | draft | borrador |
  | pending | emitido |
  | success | aprobado, registrado, vigente |
  | closed | cerrado, terminado |
  | danger | anulado |

- **MoneyCell** — right-aligned tabular numbers, two decimals; the currency
  comes from the column header or the row label; a negative value shows the
  danger tone and the minus sign, never color alone.
- **DataTable** — header, row, cell; cell types: text, money, chip, actions;
  hover and selected states; rows reachable by keyboard; empty, loading and
  error content renders inside the table region.
- **SummaryPanel** — label/value pairs for totals and control boxes: the
  economic view, the contract control, document totals.

## Workbench baseline

ActivityBar carries company navigation. The primary sidebar carries the open
project tree. Tabs and document content use the central editor region. Keep the
optional chat in the secondary sidebar. Reuse the title bar, status bar, resize
handles, menus, focus indicators and selected markers from the fork.

Use Codicons on workbench surfaces. Preserve their native geometry and weight.
New domain icons use the same set and `currentColor`. Keep structural dividers;
use elevation only for overlays. Preserve native control radii and density.
Apply better-ui polish to new domain controls without restyling inherited ones.
Keyboard actions have no animation. Frequent actions use instant feedback or
opacity/color transitions of at most 150ms. Theme changes snap without a global
crossfade. Every state change keeps a static cue.

## Structure

- **PageHeader** — title, optional count line, actions.
- **DocumentHeader** — type and number, state chip, title, meta, actions.
- **ActionBar** — the footer of a document editor; it shows only the actions
  the current state allows (a document in borrador has no transition button).
- **Toolbar** — search, filters, view actions; sticks below the tabs.
- **Trees and chrome** — `TreeRow`, `SegmentedControl`, `Tabs`, `ActivityBar`,
  `StatusBar`. Keyboard support follows `better-accessibility` (roving
  tabindex, focus visible, Escape closes overlays).

## Forms

- **FormField** — visible label, control, helper text, error text and the
  "Recomendado" chip for template values. Composes `Input`, `Select`, `Switch`,
  `Checkbox`. The error says how to fix it.

## Feedback

- **EmptyState** — what this place is, and one next action.
- **InlineBanner** — info, success, warning, danger; icon plus text.
- **Dialog** — small and medium; traps focus, returns it to the trigger, and
  its confirm button repeats the consequence.
- **Menu** — popover menus with keyboard navigation and a danger item style.
- **Toast** — short confirmations, with an optional undo action; errors stay
  until dismissed.
- **Lightbox** — evidence viewer: image, counter, arrows, Escape closes.
