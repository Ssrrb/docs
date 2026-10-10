# Obra Studio Docs

Documentation for Obra Studio. The application is open to modular extensions for construction companies.

## Entry points

| I want to | Read |
|---|---|
| Know the project and its two engines | [`docs/foundations/erp-ecms-architecture.mdx`](docs/foundations/erp-ecms-architecture.mdx) |
| Know the architecture of the application | [`docs/system/architecture-overview.mdx`](docs/system/architecture-overview.mdx) |
| Know how the ERP and the ECMS exchange information | [`docs/system/erp-ecms-bridge.mdx`](docs/system/erp-ecms-bridge.mdx) |
| Know what an entity or a business rule means | [`docs/domain/`](docs/domain) |
| Know how a certification works in the interface | [`docs/product/certification-workflow.mdx`](docs/product/certification-workflow.mdx) |
| Know what documentation is pending | [`docs/execution/documentation-architecture-erp-ecms.mdx`](docs/execution/documentation-architecture-erp-ecms.mdx) |
| Know how the team plans the work | [`docs/execution/agile-workflow.mdx`](docs/execution/agile-workflow.mdx) |
| Know what a term means | [`AGENTS.md`](AGENTS.md) |
| Write or change a document | [`AGENTS.md`](AGENTS.md) |

## Structure

Each folder sits under `docs/`. The site serves no document from another location.

| Folder | Content |
|---|---|
| `docs/foundations/` | The two engines, the bridge, and the separation principles. |
| `docs/domain/` | Entities, ownership, relationships, and business rules. |
| `docs/system/` | Architecture, layers, flows, events, and persistence. |
| `docs/product/` | Interfaces, workflows, and observable behavior. |
| `docs/execution/` | Plans, pending work, and the roadmap. |
| `docs/references/` | Tools, books, links, and anti-patterns. |
| `docs/decisions/` | The reason for a decision. The options that were rejected. |

A folder appears when its first document is written.

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

The documents under `docs/` hold Spanish content. A business object of Paraguay keeps its Spanish name, and the document writes the English gloss after the term. The reader uses a translation tool to read the content in another language.

## Setup

Launch the site on the local machine with

```sh
npx @docs.page/cli preview
```

Check the links and the assets before a push:

```sh
npx @docs.page/cli check
```
