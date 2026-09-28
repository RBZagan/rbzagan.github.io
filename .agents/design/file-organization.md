---
name: design-file-organization
description: Where each CSS layer, the loader, and the partials live, and which stylesheets a page links in which order.
version: 1.0.0
author: RBZagan
---

# File Organization

Two directories, one boundary: `css/` is shared by everything, `{repo}/css/` is
private to one section.

## The layout

```
docs/
  index.html                  entry — the org landing page
  css/
    shared/                   shared by EVERY page at every depth
      main.css                :root tokens + base element styles
      layout.css              header, nav, footer, breadcrumbs
      components.css          cards, accordions, tables, badges, buttons, callouts
    {repo}/                   shared by every page in that one section
      {repo}.css              that section's layout only
  js/
    site.js                   the loader
  partials/
    header.html
    footer.html
  {repo}/
    index.html                the section entry
    **                        the section's pages
    css/                      page-specific CSS, only where a page needs it
```

`css/shared/` is the boundary. **Nothing in it may know which repository it is
serving.** A rule in `shared/` that mentions `lobby` belongs in
`css/lobby/lobby.css` or in `lobby/css/`.

`css/{repo}/` is shared across that section's pages — everything in
`{repo}/` can use it. `{repo}/css/` is narrower: only a page in that folder uses
it, which is why it can be as specific as a slot map or a stat bar.

## What a page links, in order

```html
<link rel="stylesheet" href="../css/shared/main.css">
<link rel="stylesheet" href="../css/shared/layout.css">
<link rel="stylesheet" href="../css/shared/components.css">
<link rel="stylesheet" href="../css/lobby/lobby.css">
<!-- only if this page needs it -->
<link rel="stylesheet" href="css/status.css">
```

Four layers, always in that order, plus at most one page layer. The order is
the cascade: tokens, then frame, then components, then overrides. Linking
`components.css` before `layout.css` is not a style preference, it is the layer
order from [`principles.md`](principles.md) §3 and it must not be reordered.

**The relative prefixes differ by page.** A page at `docs/lobby/index.html`
reaches the shared CSS with `../css/…`; a page at `docs/lobby/css/…` is
addressing *its own* folder. There are no pages deeper than one level in this
site, so a page stylesheet in `{repo}/css/` is only ever referenced from
`{repo}/`, never from inside `css/` itself.

## Which file gets a new rule

| The rule is about | Put it in |
|---|---|
| A colour, radius, shadow, font, or spacing value | `shared/main.css`, as a token |
| Header, nav, footer, breadcrumbs | `shared/layout.css` |
| A card, accordion, table, badge, button, callout | `shared/components.css` |
| The shape of one repository's section | `css/{repo}/{repo}.css` |
| One page's bespoke layout — a slot map, stat bars, a timeline | `{repo}/css/{page}.css` |

**The test for the last two rows:** could a second page in this section want
it? Then it is `css/{repo}/`. Could a page in a *different* section want it?
Then it is `shared/`. If neither, it is a page stylesheet.

## What must not happen

* **A new shared file.** Three files in `shared/` is the whole set. A fourth
  means a component that should have been a class.
* **A stylesheet under `css/{repo}/` that a page in another section links.**
  That is a copy, and it will drift from the original.
* **A page stylesheet that restates a component.** If the rule restyles
  something `components.css` already provides, it belongs in the tokens or the
  component.
* **A hard-coded hex in anything but `main.css`.** See
  [`palette-and-ink.md`](palette-and-ink.md).
* **A second `index.html` per section beyond the one.** `{repo}/index.html` is
  the only entry for that folder.

## Related

* [`runtime-includes.md`](runtime-includes.md) — the loader and the partials.
* [`components.md`](components.md) — what lives in `components.css`.
* [`reuse.md`](reuse.md) — copying this structure into another repository.
* [`../index/design-index.md`](../index/design-index.md) — the router.
