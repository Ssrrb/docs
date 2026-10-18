---
name: wiki-rules
description: >-
  Use when writing, amending, or approving documents in the Obra wiki (the
  description of the ERP engine, the ECMS engine, and the bridge between
  them). Covers the folder map, the document form, the draft and approved
  states, the writing rules, and the check.
---

# Writing documents in the wiki

This repository describes ctrl+. `AGENTS.md` at the root is the entry point and the form authority. Read it before you write. It states the terminology, the folder of each topic, the document form, the writing rules, and the commit rules.

- **One folder per topic.** `docs/foundations/` holds the two engines and the bridge. `docs/domain/` holds the entities and the business rules. `docs/system/` holds the architecture. `docs/product/` holds the interfaces and the workflows. `docs/execution/` holds the plans and the pending work. `docs/references/` and `docs/decisions/` inform.
- **Extend before you create.** Search the folder for a document that covers the topic. Create a file only if no document covers the topic. A document holds one topic.
- **The document form.** A knowledge document starts with a title and a state line. An example is `*Domain · draft*`. The states are `draft`, `approved`, and `none`. An agent writes a draft. Only the author moves a document to `approved`.
- **The writing rules.** Write the content in Spanish. A business object of Paraguay keeps its Spanish name, and the document writes the English gloss after the term. Apply ASD-STE100: one idea per sentence, the active voice, the present tense, and a named subject. A rule states one obligation. Put an example in its own line or in its own table.
- **The check.** Run `sh scripts/check.sh` before a commit. The check enforces the word limit of `AGENTS.md`. If the check fails, remove words. Do not remove an obligation to fit the limit.
- **The site.** `docs.json` configures the docs.page site. A document needs no entry in `docs.json`. Run `npx @docs.page/cli preview` to serve the site on the local machine. Run `npx @docs.page/cli check` to find broken links and missing assets.
- **The commits.** Write one commit for one change. The message states what changed and why it changed. A commit can move a document from `draft` to `approved`.
