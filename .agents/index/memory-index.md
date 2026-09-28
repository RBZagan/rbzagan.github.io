---
name: memory-index
description: Router for .agents/memory/ — which record holds a given fact about this repository.
version: 1.0.0
author: RBZagan
---

# Memory Index

**Scope:** `.agents/memory/`
**Parent:** none — this repository has no `root-index.md`. See *Gaps* below.

Memory records what happened or what is outstanding. It is never normative: a
file here may say "we currently do X", never "always do X". Anything that
should bind a future session is a rule, and rules live in
[`../design/`](../design/) or the shared set.

Read this index every session, the way
[`design-index.md`](design-index.md) is read, and load only the record whose
scope matches the task.

## tasks

Ongoing work, and the closing entry for work that shipped. Entries are
newest-first under `## {YYYY-MM-DD}` headings.

| File | Purpose |
|---|---|
| [`../memory/tasks/navigation-rail.md`](../memory/tasks/navigation-rail.md) | **done** — the left rail that replaced the top bar, and the two CSS details it silently depends on. |
| [`../memory/tasks/github-pages-source.md`](../memory/tasks/github-pages-source.md) | **open** — Pages still publishes from `/` instead of `/docs`, so every page 404s. |

## Naming

`{type}/{subject}.md`, where the subject is the thing, not the task number.
Types in use here: `tasks/`. `sessions/`, `decisions/`, and `state/` are
available and unused.

**One subject per file.** Work about a different subject gets its own record
rather than a section in this one — that is why the Pages setting is a second
file and not a note under the rail.

## Retention

When a `tasks/` record closes it is marked `status: done` and given a closing
entry with its PR. A closed record is kept: the two CSS details in
`navigation-rail.md` are the kind of thing that gets rediscovered expensively.

## Gaps

Two things are missing from this repository's instruction tree. Both are
reported findings, not oversights, and neither has been created unasked:

- **No `root-index.md`.** [`design-index.md`](design-index.md) names itself
  orphaned for the same reason. The workspace rules expect one.
- **No rule for bumping an instruction file's own `version:` field.** Four
  design files changed substantively in PR #3 and all four stayed at `1.0.0`.
  See the open note in
  [`../memory/tasks/navigation-rail.md`](../memory/tasks/navigation-rail.md).

## Related

* [`design-index.md`](design-index.md) — the sibling index for the design set.
