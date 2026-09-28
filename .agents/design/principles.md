---
name: design-principles
description: The five rules every page and stylesheet in this site obeys — self-containment, tokens, layering, accessibility, and runtime chrome.
version: 1.0.0
author: RBZagan
---

# Design Principles — Silver Glass

The five rules below are the source of truth. Every other file in
[`.agents/design/`](../index/design-index.md) is a consequence of one of them;
where a later rule looks like a detail, this is why it is not negotiable.

**Aesthetic:** white, silver, and transparent — a light glassmorphism surface
treatment with translucent panels, hairline borders, soft shadows, and a subtle
silver gradient backdrop. Calm, airy, and neutral so it fits any brand.

## 1. Self-contained

**No external fonts, scripts, stylesheets, CDNs, or runtime network calls.
Everything ships in-repo; inline small assets as data URIs.**

A documentation site that reaches a CDN fails the moment it is offline, the CDN
is blocked, or the reader is behind a firewall that dislikes the domain. A favicon
is a data URI. An icon is a data URI or an SVG inline. There is no build step
that fetches anything, and no `npm install` in the path between a clone and a
working page.

This is also why the site uses `fetch()` only against **its own repository
files** — see [`runtime-includes.md`](runtime-includes.md).

## 2. Token-driven

**All color, spacing, radius, and shadow decisions come from CSS custom
properties. Never hard-code a hex value in a component.**

A hard-coded `#5b7189` in a card is a rebranding bug: the next person changes
`--accent` and that card keeps the old colour forever, with nothing pointing at
it. The tokens are declared once and everything downstream references them.

Tokens are listed in [`palette-and-ink.md`](palette-and-ink.md),
[`glass-surfaces.md`](glass-surfaces.md), and
[`geometry-and-type.md`](geometry-and-type.md).

## 3. Layered CSS

**Root tokens → shared layout → shared components → per-section overrides. A
page pulls in exactly those layers plus its own.**

Four layers, loaded in that order, each overriding the one before. The order is
what makes a per-section file able to be small: it can say `grid-template-columns:
240px 1fr` and inherit everything else.

Never link a layer out of order, and never link a shared file from a section
folder. The mapping to paths is in [`file-organization.md`](file-organization.md).

## 4. Progressive and accessible

**Semantic HTML first, native elements where possible, visible focus states,
sufficient contrast, responsive down to ~360px.**

Native beats custom: `<details>` is an accordion with correct keyboard
behaviour, focus management, and screen-reader semantics, and needs no
JavaScript. `<button>` is a button. `<nav>` is a nav. The CSS in this system
exists to style those elements, never to replace them.

The full checklist is in [`accessibility.md`](accessibility.md).

## 5. Runtime-composed chrome

**Header and footer are shared partials injected client-side, so navigation
lives in one file and every page stays in sync.**

A header duplicated into five HTML files is a header that will be correct in four
of them. One partial, fetched at runtime, cannot drift.

The cost is that `fetch()` needs HTTP — a page opened as `file://` will render
without its header. The trade is deliberate, and the mechanism is in
[`runtime-includes.md`](runtime-includes.md).

## What this means when you are writing a page

* Reach for a class in [`components.md`](components.md) before writing CSS.
* If you do write CSS, it goes in the page's own file and uses tokens.
* If the page needs a layout no component covers, that is the only reason
  [`file-organization.md`](file-organization.md) sanctions a new stylesheet.
* Check [`accessibility.md`](accessibility.md) before calling a page done.

## Related

* [`file-organization.md`](file-organization.md) — where each layer lives.
* [`reuse.md`](reuse.md) — adopting this system in another repository.
* [`../index/design-index.md`](../index/design-index.md) — the router.
