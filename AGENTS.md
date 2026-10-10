# AGENTS.md

This file is the entry point for every agent that works in this repository.

It holds the basic idea of the project and the terminology that every agent needs. It states where a topic belongs. It states how to write a document.

This file states how the repository works. A document under `docs/` states a requirement of the product.

## 1. The project

Obra Studio is an application for construction companies. The first product serves one construction company with several projects in Paraguay. The people who use the application are engineers and architects.

The application joins two engines. The ERP manages money, purchases, and legal documents. The ECMS manages the `obra`, the budget, the measurement, and the cost. The bridge exchanges information between the two engines.

The application has an opinionated core. The core holds the shared structure. A module adds a capability to the core. A new need enters through a module, not through a change of the core.

`docs/foundations/erp-ecms-architecture.mdx` describes the two engines and the bridge.

## 2. Terminology

### Project terms

This table holds the one meaning of each term. No other document states a second meaning for a term in this table.

| Term | One line |
|---|---|
| Core | The shared base of the application. |
| Module | A capability of the application. |
| Extension point | A place in the core where a module connects. |
| ERP | The engine for money, purchases, and legal documents. |
| ECMS | The engine for the `obra`, the budget, the measurement, and the cost. |
| Bridge | The mechanism that exchanges information between the two engines. |
| MVP | The first delivery of the application. |
| Construction company | A company that executes an `obra`. |
| Obra (work site) | The unit of work of a construction company. |
| Project | A group of `obra`. |
| Presupuesto (budget) | The economic plan of one `obra`. |
| Ítem (budget item) | One line of a `presupuesto`. |
| ACU (unit cost analysis) | The technical and economic decomposition of one `ítem`. |
| Medición oficial (official measurement) | The quantity of work that an engineer measures on site. |
| Certificado (certificate) | The record that certifies a medición oficial for the client or for the subcontratista. |
| Subcontratista (subcontractor) | A company that executes part of an `obra`. |
| Socio (partner) | The company that sells to the construction company. |
| Cliente (client) | The person or the company that pays the work. |
| Cobro (collection) | The money that a client pays a project. |

### Writing terms

This table gives the words that this file uses.

| Term | Meaning in this file |
|---|---|
| Rule | A sentence that states one obligation. |
| Obligation | A requirement that a rule states. |
| State | The header value that names the approval of a document. |
| Gloss | The English words that follow a Spanish term. |
| Example | A line or a table that shows the use of a rule. Do not write an example as a rule. |
| Check | A program that verifies the repository. |

## 3. How to work

1. Read section 4. Name the folder that holds the topic.
2. Search that folder for a document that covers the topic.
3. Read the document. Read the documents of the other folders that the topic touches.
4. Use each project term as section 2 defines it. A term has one meaning.
5. Extend the document that covers the topic. Create a file only if no document covers the topic.
6. Follow sections 5 to 8. Check the result against section 10.
7. Commit the change.

| The author instruction | The response of the agent |
|---|---|
| It is clear and it does not conflict with an approved document | Execute it. |
| It has a material ambiguity | Ask one question about the missing information. |
| It conflicts with an approved document | Stop. Name the document. Ask the author. |

An agent writes a draft. Only the author moves a document to `approved`.

An agent must not reinterpret an instruction. An agent must not ignore an instruction. An agent must not weaken an instruction.

## 4. Where a topic belongs

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

- The agent states the affected documents before the agent edits them.
- A folder appears when its first document is written. Do not create an empty folder.
- If no folder fits the topic, ask one question. Do not create a folder without the answer.

### File names

- The name states the topic.
- The name uses lowercase letters and hyphens. An example is `unit-price-analysis.mdx`.
- The name does not repeat the folder. An example is `budgets.mdx` in `docs/domain/`. Do not write `domain-budgets.mdx`.

## 5. Document form

A knowledge document starts with a title and a state line.

```markdown
# Unit price analysis

*Domain · draft*
```

The state line contains the folder name. The state line contains the state.

| State | Meaning |
|---|---|
| `draft` | The author has not approved the content. Do not cite the document. |
| `approved` | The author approved the content. The document can be cited. |
| `none` | The document informs. The document does not oblige. |

- A document holds one topic.
- Reference another document by its path. An example is `docs/domain/collections.mdx`.
- Omit the version from the state line. Omit the date from the state line. Git records both.
- Three files follow no state line: `README.md`, `AGENTS.md`, and `docs.json`.

## 6. How to write

- A rule states one obligation. Name the subject.
- Split the rule if the subject changes. Split the rule if the condition changes.
- A rule must not hold an implementation detail. Put the detail in the document that describes the implementation.
- Put an example in its own line or in its own table. Do not put an example in the sentence of a rule.
- Record a source in `docs/references/` or in `docs/decisions/`.

### The limit for this file

A check enforces the word limit of this file. The check holds the limit. The check is `scripts/check.sh`. The commit hook runs the check. A commit with a failing check does not pass.

If the check fails, the agent removes words. The agent must not remove an obligation to fit the limit. The author amends the limit in the check.

## 7. Language and style

- Write the content in English.
- Write a term in Spanish when the term names a business object in Paraguay. Write the gloss after the term. An example is `obra (work site)`.
- The reader uses the Chrome translation service. The repository holds no translated copy of a document.

| Keyword | Meaning |
|---|---|
| **MUST** | required |
| **MUST NOT** | prohibited |
| **SHOULD** | recommended |
| **MAY** | optional |

Each keyword keeps the same meaning in every document.

Apply ASD-STE100.

- Write one idea per sentence.
- Use the active voice. Use the present tense.
- Name the subject.
- Use an approved word. Do not invent a word.
- State a condition with "if".
- Use no more than three nouns in a row.
- Avoid an adverb that ends in "-ly".
- Do not write "and/or". Write "or".
- Spell out a number from one through nine. Use a numeral for ten and above.

## 8. Commits

Git is the history of the repository. A document holds no version. A document holds no revision date.

- Write one commit for one change. The message states what changed. The message states why it changed.
- A commit can move a document from `draft` to `approved`.

## 9. The site

`docs.json` configures the docs.page site. `docs.json` is not an index of the repository.

- `npx @docs.page/cli preview` serves the site on the local machine.
- `npx @docs.page/cli check` reports broken links and missing assets.
- A document needs no entry in `docs.json`.
- A document without an entry in `docs.json` is a valid document.
- Change `docs.json` when a person publishes. Treat the file as a site file. Do not treat the file as a rule.

## 10. Checklist

Before the agent commits a document, the agent checks the list.

- The topic sits in the folder of the right content.
- A document of that folder covers the topic.
- The file name states the topic. The file name does not repeat the folder.
- The header holds a title and a state line.
- Each rule states one obligation.
- No document holds a version or a revision date.
- The commit message states what changed and why it changed.
- If the change touches this file, the check passes.
