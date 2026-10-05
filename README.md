# Obra Studio Docs

Documentation for Obra Studio. The application is open to modular extensions for construction companies.

## Entry points

| I want to | Read |
|---|---|
| Know the project and its principles | [`foundations/principles.md`](foundations/principles.md) |
| Know what a term means | [`AGENTS.md`](AGENTS.md) |
| Know what work is pending | [`execution/roadmap.md`](execution/roadmap.md) |
| Know which tools the team uses | [`references/tools.md`](references/tools.md) |
| Write or change a document | [`AGENTS.md`](AGENTS.md) |

## Structure

| Folder | Authority | Content |
|---|---|---|
| `foundations/` | L0 | Invariants, principles, permanent constraints. |
| `domain/` | L1 | Entities, ownership, relationships, business rules. |
| `system/` | L2 | Architecture, permissions, APIs, events, persistence. |
| `product/` | L3 | Interfaces, workflows, features, observable behavior. |
| `execution/` | L4 | Roadmap, pending work, implementation plans. |
| `references/` | None | Tools, books, links, anti-patterns. |
| `decisions/` | None | The reason for a decision. The options that were rejected. |

Authority descends. `foundations/` has the highest authority.

A folder appears when its first document is written. The folders `domain/`, `system/`, `product/`, and `decisions/` have no documents yet.

## Checks

`scripts/check.sh` verifies the rules that a machine can verify. The commit hook runs the script. The workflow runs the script on each push.

Run the script before a commit:

```sh
sh scripts/check.sh
```

Git holds no hook in a commit. Set the hook path once after a clone:

```sh
git config core.hooksPath .githooks
```

## Versioning

Git is the history. No document holds a version. No document holds a revision date. The state of a document appears in its header: `draft`, `approved`, or `none`.

## Language

The repository holds English content. The reader uses the Chrome translation service to read the wiki in another language.
