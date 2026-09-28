---
name: design-runtime-includes
description: How the shared header and footer are injected at runtime — the two globals a page sets, the loader, and the mount points.
version: 1.0.0
author: RBZagan
---

# Runtime Includes

Header and footer are fetched at runtime rather than duplicated into every page,
so navigation lives in one file and every page stays in sync. This is
repo-agnostic: the same four pieces work in any site built on this design system.

## The four pieces

| Piece | Path | Role |
|---|---|---|
| Partials | `partials/header.html`, `partials/footer.html` | The chrome. Internal links use a `{{ROOT}}` token. |
| Loader | `js/site.js` | Fetches the partials, resolves `{{ROOT}}`, wires the nav, stamps the year. |
| Globals | set by each page in `<head>` | `window.SITE_ROOT`, `window.PAGE_SECTION`. |
| Mount points | one per page | `<div id="site-header"></div>` and `<div id="site-footer"></div>`. |

## The two globals

```html
<script>window.SITE_ROOT = "../"; window.PAGE_SECTION = "lobby";</script>
```

**`SITE_ROOT`** is the relative path from the *current page* back to the site
root, as a string ending in `/`:

| Page | `SITE_ROOT` |
|---|---|
| `docs/index.html` | `""` |
| `docs/lobby/index.html` | `"../"` |
| `docs/lobby/conventions.html` | `"../"` |

**`PAGE_SECTION`** is the `data-section` value the nav should mark active. It
matches the slug in the URL path — `lobby`, or `""` on the entry page. The
loader matches links by `data-section`, not by href, so a section can be
renamed in the partial without touching every page that points at it.

Both go in `<head>`, before `site.js` loads. `site.js` reads them at parse time;
a page that sets them in the body has already lost the race.

## `{{ROOT}}`

Links inside a partial are written `{{ROOT}}lobby/index.html`. The loader
replaces every occurrence with `SITE_ROOT`.

This is why a partial is not a valid page on its own — `{{ROOT}}` is not a path.
**Never open a partial directly to check it.** A raw `{{ROOT}}` in a browser
is the loader working, not a bug.

## The loader

`js/site.js`:

1. Reads `SITE_ROOT` and `PAGE_SECTION`.
2. Fetches `SITE_ROOT + 'partials/header.html'` and `'partials/footer.html'`.
3. Replaces `{{ROOT}}` with `SITE_ROOT` in both.
4. Injects them into `#site-header` and `#site-footer`.
5. Sets `.is-active` on the nav link whose `data-section` matches
   `PAGE_SECTION`.
6. Wires `.nav__toggle` — a real `<button>`, `aria-expanded` toggled, the
   panel's class toggled, `Escape` closes it.
7. Injects a favicon as an inline data URI — see
   [`principles.md`](principles.md) §1.
8. Stamps the current year into the footer's `[data-year]` element.

It must be **defensive about the mount points**: a page missing
`#site-header` is a page with no chrome, and a `null.appendChild` throws before
the rest of the page's script runs.

## `fetch()` means HTTP

**The site must be served over HTTP to work.** Opened as `file://`, the
`fetch()` for the partials is blocked by the browser's origin rules, the chrome
never appears, and the page renders with an empty header and footer band.

This is a known, accepted trade: runtime composition is what keeps navigation
from drifting, and the cost is that the site needs a server. GitHub Pages is
one. For local work:

```powershell
python -m http.server 8000 --directory docs
# then open http://localhost:8000/
```

A page whose content is entirely inside `.container` still reads correctly
without the chrome — the failure is visible and obvious, not silent. That is
deliberate: it is better to see a missing header than to read a page whose
navigation quietly shows last year's links.

## Degradation

* **No JavaScript** — content renders, chrome does not. Every page carries its
  `<h1>`, its content, and its own navigation fallback in the entry card grid.
* **No `backdrop-filter`** — surfaces stay translucent, flatter. See
  [`glass-surfaces.md`](glass-surfaces.md).
* **A failed partial fetch** — the mount points stay empty and the rest of the
  page still works. Do not let a chrome failure take the content with it.

## Related

* [`layout-and-chrome.md`](layout-and-chrome.md) — what the partials contain.
* [`file-organization.md`](file-organization.md) — where the pieces live.
* [`principles.md`](principles.md) — why everything is in-repo.
* [`../index/design-index.md`](../index/design-index.md) — the router.
