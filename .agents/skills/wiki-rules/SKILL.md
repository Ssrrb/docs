---
name: wiki-rules
description: >-
  Use when writing, amending, or approving rules and documents in the Obra
  wiki (Ssrrb/docs — the only source of requirements for the product). Covers
  the authority layers L0–L4, rule identifiers and draft/approved states, the
  form rules and their check, amendments requested by factory flows, and the
  roadmap updates shipped work produces.
---

# Document rules in the wiki (documenting)

This repository is the rule authority of Obra Studio. The factory reads it,
the design and the code cite it, and nothing else is a requirement. `AGENTS.md`
in this repository is the form authority — read sections 3–8 before writing.

- **Authority descends** — `docs/foundations/` (L0) > `docs/domain/` (L1) >
  `docs/system/` (L2) > `docs/product/` (L3) > `docs/execution/` (L4).
  `docs/references/` and `docs/decisions/` inform; they do not oblige.
- **A rule states one obligation and carries an identifier** (`L0-01`). The
  number is unique in the layer; a retired number is never reused. Cite a rule
  by its identifier, never by its title.
- **States** — `draft` (do not cite), `approved` (citable), `none` (the folder
  has no authority). An agent writes drafts and prepares changes; only the
  author moves a document to `approved` or amends an approved rule. One
  approval is one commit.
- **Check before you commit** — `sh scripts/check.sh` enforces the form rules
  (the commit hook runs it too). If the check fails on this file's word limit,
  remove words, never a rule.
- **The factory consumes this repository mechanically** — `rules-index.yaml`
  in the factory is generated from these documents (id, layer, doc, title,
  state); the `coverage` and `verified_by` columns are human-owned. A rule
  that leaves the wiki moves to a `retired:` list; its number is never reused.
- **Requests arrive from the factory's flows** — Flow B files rule conflicts
  as `needs/rule-approval` and proposes the amendment; Flow C's bug-fix
  variant files a wiki amendment when a production error has no matching rule
  (a specification gap, not a bug); Flow C's dispose step updates
  `docs/execution/roadmap.mdx` with the initiative's status and the issue link.
- **Never reinterpret.** If an instruction conflicts with a lower layer, stop,
  name the identifier, and request the amendment (`AGENTS.md` §3).

Workspace note — the factory, the design platform, and the app are sibling
repositories of the Obra workspace (`factory/manifest.yaml` names every
repository and its remote). When only this repository is checked out, resolve
what you can from the listed remotes and report the rest as unknown — a check
that could not run is never green.
