---
name: memory-task-navigation-rail
description: The left navigation rail that replaced the top bar, and the two CSS details it silently depends on.
status: done
created: 2026-09-28
closed: 2026-09-28
pr: 3
---

# Navigation rail

Replaces the full-width sticky top bar with a left-hand rail that travels with
the reader as they scroll.

| | |
|---|---|
| **Status** | done |
| **Branch** | `fix/nav-rail` — deleted after merge |
| **PR** | #3 — <https://github.com/RBZagan/rbzagan.github.io/pull/3> |
| **Merged** | 2026-09-28, squash, `82d999f` |

## 2026-09-28 — shipped

`body` is now the grid: the rail in column one, page content and the footer in
column two. **No page markup changed**, because every page already had
`#site-header`, `main` and `#site-footer` as direct children of `body`.

The rail's link list is the scroll area, so a long navigation scrolls *inside*
the rail instead of growing it. Sub-items are an always-open nested group
(`.nav__sub`); the hover dropdown (`.nav__dd`) was removed, because a dropdown
is unreachable by touch and does not survive a long list. Adding a section is
adding one `<li>` — nothing else moves.

Below 900px the rail becomes an off-canvas drawer with a scrim, and is opaque.
That is the content-covering case `surface-recipe.md` names: a surface that
hides content is solid, and does not lean on `backdrop-filter`.

### Two details that fail silently

Both are load-bearing, and both are now written up in
`../design/layout-and-chrome.md`:

- **Sticky is on `#site-header`, not on `.site-header`.** A sticky child of a
  full-height grid item has no travel to stick through, so the rail scrolls
  away like any other content and nothing looks broken.
- **`.nav__links` needs `min-height: 0`.** A flex item defaults to
  `min-height: auto` and refuses to shrink below its content, so the list
  pushes the rail past the viewport instead of scrolling inside it.

### Token change

`--header-h` became `--rail-w`, and `scroll-padding` now reserves room on the
**left** — a left-hand rail hides an `#anchor` target exactly as a top bar did,
so the value that matters moved sides.

### What was checked, and what was not

Checked: brace balance across all four stylesheets; every class used in markup
and JavaScript is defined in CSS, with nothing orphaned; tag balance in both
partials; all six pages still carry the three shell mount points; every asset
returns 200 over HTTP (the only way `site.js`'s `fetch` of the partials
resolves at all).

**Not checked: nothing was rendered.** No browser was available, so the flex
chain above is confirmed by reading and by static checks, not by pixels. Open
the site in a browser before trusting the scroll behaviour with a long nav.

### Versions

The four amended design files kept `version: 1.0.0` in their frontmatter. A
version bump is a claim that needs its own approval, and the rules do not say
which kind of change warrants one — see the open finding on that.

## Related

- [`../../design/layout-and-chrome.md`](../../design/layout-and-chrome.md) —
  the shell, the rail, and both traps above.
- [`../../design/geometry-and-type.md`](../../design/geometry-and-type.md) —
  `--rail-w` and the scroll-padding.
