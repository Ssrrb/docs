# Checklist

Run after every frame, before `reviewed` status.

## Inherited workbench

- [ ] Shell matches the current VS Code fork CSS, theme and control density.
- [ ] Company navigation uses the activity bar; the primary sidebar shows only
      the open project tree; screens and documents use the editor region.
- [ ] Title bar, status bar, tabs, resize handles and optional chat remain native.
- [ ] Reference-image annotation colors do not appear as application decoration.
- [ ] Sidebar resize and collapse states preserve access to company navigation.
- [ ] Inherited controls use Codicons and native hover, focus and selected states.

## Tokens

- [ ] Variables and styles only. No raw color, size, radius or shadow in frames.
- [ ] Both variable modes exist; dark is the default; the frame renders in both.
- [ ] Text styles match `tokens.json → typography.roles`; money and quantity
      styles use tabular numbers.
- [ ] Contrast is measured for resolved workbench tokens and domain controls;
      the draft palette report alone does not verify inherited themes;
      the focus ring stays visible on every background it crosses.

## Layout

- [ ] Window frames 1440×900; regions match the layout map of the screen.
- [ ] Spacing uses the `space` scale; the gap between groups is at least twice
      the gap within a group.
- [ ] Long names wrap or truncate with a way to reach the full value.
- [ ] Empty, loading and error states exist for every list.

## Components

- [ ] Instances, never detached; variants change through properties.
- [ ] No custom button, chip or table where a library component exists.

## Accessibility

- [ ] Every control reachable and operable by keyboard; order matches reading
      order.
- [ ] Focus-visible ring on every interactive element; never removed.
- [ ] Targets 24×24 minimum, 40×40 where density permits; hit areas do not
      overlap.
- [ ] Every input has a visible label; icon-only buttons have an accessible
      name.
- [ ] State is never carried by color alone (icon and label present).
- [ ] Errors state how to recover; failing fields are marked; toasts are polite.
- [ ] Reduced motion: movement becomes an opacity crossfade.

## Motion

- [ ] Only `transform`, `opacity` and `filter` animate.
- [ ] New domain durations come from `motion.duration`; keyboard-initiated interactions do
      not animate.
- [ ] Popovers scale from their trigger; dialogs scale from center.
- [ ] New domain press feedback uses scale 0.96; inherited controls keep native feedback.
- [ ] Theme switches suppress transitions; frequent actions respond within 150ms.

## Copy

- [ ] All copy is Spanish and matches the `Copy` table of the screen exactly.
- [ ] Buttons start with a verb; no bare "OK"; dialogs repeat the consequence.
- [ ] Errors say how to fix; empty states offer one next action.
- [ ] Amounts show two decimals in the locale of `MoneyCell`.
