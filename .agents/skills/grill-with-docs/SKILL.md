---
name: grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
disable-model-invocation: true
---

Call the Skill tool three times, for "grilling", "domain-modeling", and "wiki-rules".

When the outcome is durable knowledge for ctrl+, document it inside this wiki:

- Read `AGENTS.md` as the form authority before you write.
- Extend `docs/` before you create: one topic per document, reference by path (e.g. `docs/domain/budgets.mdx`).
- Run `sh scripts/check.sh` before a commit.

Source: `vscode/.agents/skills/grill-with-docs/SKILL.md`.
