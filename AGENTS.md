# AGENTS.md

This file is the entry point for every agent that works in this repository.

It holds the basic idea of the project and the terminology that every agent needs. It states where a topic belongs. It states how to write a document.

This file states no rule of the project. `docs/foundations/principles.mdx` holds the rules. If this file differs from that file, that file is correct.

## 1. The project

Obra Studio is an application for construction companies. The first product serves one user with several projects in Paraguay. The people who use the application are engineers and architects.

The application has an opinionated core. The core holds a base structure, a central library, and a common design. Modules and connectors follow that structure. A new need enters through a module, not through a change of the core.

`docs/foundations/principles.mdx` holds the rules of this section.

## 2. Terminology

### Project terms

This table holds the one meaning of each term. No other document states a second meaning for a term in this table.

| Term | One line |
|---|---|
| Core | The opinionated internal base of the application. |
| Base structure | The structure that integrates modules and connectors. |
| Common design | The design that the core publishes. |
| Central library | The internal component that holds the common functions. |
| Common function | A function that two or more extensions need. |
| Specific function | A function that one module needs for its own capability. |
| Variety | The number of different states that a component can have. |
| Variability | The degree of change of a component over time. |
| Extension point | A place in the core where an extension connects. |
| Module reserve | The set of modules that the platform offers. |
| Extension | A module or a connector that joins the application as a plugin. |
| Module | An extension that provides a specific capability. |
| Connector | An extension that joins an external system. |
| Harness | The internal composition of skills, tests, tools, and loops for an agent. |
| ERP | The engine for cost, capital, and control. |
| ECMS | The engine for engineering and for project processes. |
| Bridge | The mechanism that exchanges information between the two engines. |
| MVP | The first delivery of the application. |
| Construction company | A company that executes an `obra`. |
| Obra (work site) | The unit of work of a construction company. |
| Project | A group of `obra`. |

The name `obra` names an entity of the domain. The name `Obras` names a module of the application. The `docs/domain/` folder holds the rules for the three domain terms when that folder appears. The `docs/domain/` folder will hold budgets, unit price analysis, M.O. (labor), inputs, subcontractors, suppliers, and certificates.

### Writing terms

This table gives the words that this file uses.

| Term | Meaning in this file |
|---|---|
| Layer | One level of authority. `docs/foundations/` is L0. `docs/domain/` is L1. |
| Authority | The right of a layer to define a rule. |
| Rule | A sentence that states one obligation. |
| Obligation | A requirement that a rule states. |
| Identifier | A layer letter, a hyphen, and two digits. An example is `L0-01`. |
| State | The header value that names the approval of a document. |
| Amendment | A change to an approved rule. Only the author makes an amendment. |
| Gloss | The English words that follow a Spanish term. |
| Example | A line or a table that shows the use of a rule. Do not write an example as a rule. |
| Citation | A reference to the identifier of a rule. |
| Check | A program that verifies a rule. |

## 3. How to work

1. Read section 4. Name the folder that holds the topic.
2. Search that folder for a document that covers the topic.
3. Read the document. Then read the documents of the folders with lower authority.
4. Use each project term as section 2 defines it. A term has one meaning.
5. Extend the document that covers the topic. Create a file only if no document covers the topic.
6. Follow sections 5 to 8. Check the result against section 10.
7. Commit the change.

| The author instruction | The response of the agent |
|---|---|
| It is clear and it does not conflict | Execute it. |
| It has a material ambiguity | Ask one question about the missing information. |
| It conflicts with a rule of a lower layer | Stop. Name the identifier of the rule. Request the amendment. |

An agent must not reinterpret an instruction. An agent must not ignore an instruction. An agent must not weaken an instruction.

## 4. Where a topic belongs

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

- A higher layer must not redefine a rule of a lower layer.
- An approved rule changes only through an amendment from the author.
- An agent must not infer an amendment. The author names the identifier of the rule. The author names the documents that the amendment changes.
- The agent states the affected documents before the agent edits them.
- The folder states the authority. The file does not repeat the authority.
- A folder appears when its first document is written. Do not create an empty folder.
- If no folder fits the topic, ask one question. Do not create a folder without the answer.

### File names

- The name states the topic. The name contains no layer number.
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
| `none` | The folder has no authority. The document informs. The document does not oblige. |

- A document holds one topic.
- Omit the version from the state line. Omit the date from the state line. Git records both.
- Three files follow no state line: `README.md`, `AGENTS.md`, and `docs.json`.

## 6. How to write a rule

- A rule states one obligation. Name the subject.
- Split the rule if the subject changes. Split the rule if the condition changes.
- A rule must not hold an implementation detail of a lower layer.
- Put an example in its own line or in its own table. Do not put an example in the sentence of a rule.
- A citation is not a rule. Record the source in `docs/references/` or in `docs/decisions/`.

An identifier contains a layer letter, a hyphen, and two digits. An example is `L0-01`.

- The number is unique in the layer.
- Do not use a retired number for another rule.
- Cite a rule by its identifier. Do not cite a rule by its title.

### The limit for this file

A check enforces the word limit of this file. The check holds the limit. The check is `scripts/check.sh`. The commit hook runs the check. A commit with a failing check does not pass.

If the check fails, the agent removes words. The agent must not remove a rule to fit the limit. The author amends the limit in the check.

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
- An amendment commit names the identifier of the rule that the amendment changes.
- A commit can move a document from `draft` to `approved`.

## 9. The site

`docs.json` configures the docs.page site. `docs.json` is not an index of the repository.

- A document needs no entry in `docs.json`.
- A document without an entry in `docs.json` is a valid document.
- Change `docs.json` when a person publishes. Treat the file as a site file. Do not treat the file as a rule.

## 10. Checklist

Before the agent commits a document, the agent checks the list.

- The topic sits in the folder of the right authority.
- A document of that folder covers the topic.
- The file name holds no layer number. The file name does not repeat the folder.
- The header holds a title and a state line.
- Each rule in a knowledge document states one obligation and holds an identifier.
- No document holds a version or a revision date.
- The commit message states what changed and why it changed.
- If the change touches this file, the check passes.
