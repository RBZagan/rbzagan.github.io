---
name: memory-task-github-pages-source
description: Open - Pages publishes from the repository root instead of /docs, so every page 404s.
status: open
created: 2026-09-28
pr: none
---

# GitHub Pages source

Point Pages at `docs/` so the site is actually served.

| | |
|---|---|
| **Status** | open — nothing attempted |
| **Created** | 2026-09-28 |
| **Blocks** | every page of the live site |

## 2026-09-28 — identified, not started

Pages is configured to publish from the repository root (`/`) on `master`. The
site lives in `docs/`, so `https://rbzagan.github.io/` currently returns 404 for
every page.

This is a repository setting rather than a code change, so nothing in the tree
records it — which is why it needs this file. The site content itself has been
correct since PR #2 merged; only the setting is wrong.

**To finish:**

```
gh api --method PATCH repos/RBZagan/rbzagan.github.io/pages \
  -f 'source[branch]=master' -f 'source[path]=/docs'
```

Then confirm a page returns 200, and that the two lobby sub-pages resolve too —
they are one directory deeper and are the ones a wrong path would break first.

**Not run.** It changes a live repository setting and needs the user's explicit
go-ahead first.

## Related

- [`navigation-rail.md`](navigation-rail.md) — the last change to the site, and
  the one that made the 404 more obvious rather than causing it.
