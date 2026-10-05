# Obra Studio Docs

Documentation for Obra Studio. The application is open to modular extensions for construction companies.

## Entry points

| I want to | Read |
|---|---|
| Know the project and its principles | [`docs/foundations/principles.mdx`](docs/foundations/principles.mdx) |
| Know what the first delivery does | [`docs/product/mvp.mdx`](docs/product/mvp.mdx) |
| Know what an entity means | [`docs/domain/`](docs/domain/) |
| Know how the application stores and notifies | [`docs/system/`](docs/system/) |
| Know what a term means | [`AGENTS.md`](AGENTS.md) |
| Know what work is pending | [`docs/execution/roadmap.mdx`](docs/execution/roadmap.mdx) |
| Know why the team chose something | [`docs/decisions/`](docs/decisions/) |
| Know which tools the team uses | [`docs/references/tools.mdx`](docs/references/tools.mdx) |
| Write or change a document | [`AGENTS.md`](AGENTS.md) |

## Structure

Each folder sits under `docs/`. The site serves no document from another location.

| Folder | Authority | Content |
|---|---|---|
| `docs/foundations/` | L0 | Invariants, principles, permanent constraints. |
| `docs/domain/` | L1 | Entities, ownership, relationships, business rules. |
| `docs/system/` | L2 | Architecture, permissions, APIs, events, persistence. |
| `docs/product/` | L3 | Interfaces, workflows, features, observable behavior. |
| `docs/execution/` | L4 | Roadmap, pending work, implementation plans. |
| `docs/references/` | None | Tools, books, links, anti-patterns. |
| `docs/decisions/` | None | The reason for a decision. The options that were rejected. |

Authority descends. `docs/foundations/` has the highest authority.

A folder appears when its first document is written. Every folder holds at least one document.

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

## Setup

Launch with

```sh
npx @docs.page/cli preview
```