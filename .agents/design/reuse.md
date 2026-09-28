---
name: design-reuse
description: How to adopt the Silver Glass design system in another repository, and how to rebrand it by editing tokens alone.
version: 1.0.0
author: RBZagan
---

# Reuse

The system is deliberately project-agnostic. This is the procedure for adopting
it in another repository, and the one rule that makes adopting it cheap.

## Copy

| From | To |
|---|---|
| `css/shared/main.css` | `<site>/css/shared/main.css` |
| `css/shared/layout.css` | `<site>/css/shared/layout.css` |
| `css/shared/components.css` | `<site>/css/shared/components.css` |
| `js/site.js` | `<site>/js/site.js` |
| `partials/header.html`, `partials/footer.html` | `<site>/partials/` |
| `docs/index.html` | `<site>/index.html` — the entry, as a starting card grid |
| A section, e.g. `docs/lobby/**` | `<site>/{repo}/**` |

The directory names are not sacred; what matters is the split between *shared
by everything* and *shared by one section*, described in
[`file-organization.md`](file-organization.md). A site that nests them
differently is still correct; a site that puts a `lobby` rule in `shared/` is
not.

## Rebrand — tokens only

**Edit tokens in `main.css` and every component follows automatically.** This is
the entire point of [`principles.md`](principles.md) §2, and it is why a
component containing a hex value is a defect.

* **To change the colour scheme** — edit the `--silver-*` ramp,
  `--ink-*`, and `--accent*` together. They are calibrated against each other;
  changing one and not the others is what produces unreadable text.
* **To move off silver entirely** — replace the `--silver-*` ramp and the
  `--accent*` tokens and the body background gradient. **Leave the `--glass-*`,
  shadow, and geometry tokens alone.** They are what keeps the surface treatment
  coherent, and they work over any backdrop hue.
* **To change the feel** — `--radius*`, `--shadow-*`, `--blur`, and `--maxw`.
  These are independent of colour and safe to tune on their own.

`--blur` and the glass alphas are the two knobs that most change how finished
the site looks. A site with `--glass` at .75 reads as a different, more solid
product from the same stylesheets.

## Edit the partials

`partials/header.html` and `partials/footer.html` are the only files that
carry site-specific navigation. When editing them:

* **Keep the `{{ROOT}}` tokens.** A hard-coded absolute path in a partial is
  correct on exactly one page depth.
* **Keep the `data-section` attributes.** `site.js` matches the active link by
  `data-section` against `window.PAGE_SECTION`; remove one and that link stops
  highlighting. See [`runtime-includes.md`](runtime-includes.md).
* **Keep `[data-year]`** in the footer. The loader stamps it; a literal year goes
  stale in January.

## Author pages

Compose the components in [`components.md`](components.md). Reach for CSS only
when a page needs a layout no component covers, and then put it in
`{repo}/css/{page}.css` rather than in `shared/`.

Check [`accessibility.md`](accessibility.md) before a page is done.

## Keep the two non-negotiables

Everything else is adjustable. These two are not, because breaking either breaks
the design rather than changing it:

1. **Self-contained** — no external fonts, scripts, stylesheets, CDNs, or
   runtime network calls. Inline small assets as data URIs.
2. **Token-driven** — no hard-coded colour, spacing, radius, or shadow outside
   `main.css`.

A site that keeps both and changes every token is still recognisably this design
system. A site that has added a webfont and a Tailwind CDN is not, whatever its
colours.

## Related

* [`file-organization.md`](file-organization.md) — the directory structure.
* [`principles.md`](principles.md) — the rules being preserved.
* [`components.md`](components.md) — what to author pages from.
* [`../index/design-index.md`](../index/design-index.md) — the router.
