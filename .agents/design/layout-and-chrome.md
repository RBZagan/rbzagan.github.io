---
name: design-layout-and-chrome
description: The container, the sticky header and its nav, the footer, and the responsive rules that hold the page together.
version: 1.0.0
author: RBZagan
---

# Layout & Chrome

The frame around the content: container, header, nav, footer, and the two
responsive behaviours that keep the page working.

## Container

`.container` caps at `--maxw` (1120px) and centres itself. Every page's content
sits in one.

`.narrow` caps at 880px instead, for text-heavy reading pages. A long measure on
a glass field is hard to track — the background is deliberately featureless, so
the eye has nothing to count lines against.

## Header

A sticky glass bar, `--header-h` tall:

```html
<header class="site-header">
  <nav class="nav" aria-label="Primary">
    <a class="nav__brand" href="{{ROOT}}index.html">RBZagan</a>
    <ul class="nav__links">
      <li><a class="nav__link" data-section="lobby" href="{{ROOT}}lobby/index.html">lobby</a></li>
    </ul>
  </nav>
</header>
```

| Class | Role |
|---|---|
| `.nav__brand` | Wordmark, returns to the entry page. |
| `.nav__links` | The list. A `<ul>`, so the count is announced. |
| `.nav__link` | One link. |
| `.is-active` | Modifier, set by `site.js` from `PAGE_SECTION`. |
| `.nav__dd` | Optional dropdown. Opens on focus-within. |
| `.nav__spacer` | An empty list item that pushes everything after it right. |
| `.nav__toggle` | The mobile button. A real `<button>`. |

The header is `--glass-strong`, not `--glass`, and it is one of the surfaces
exempt from the "glass over content" problem in
[`surface-recipe.md`](surface-recipe.md) — it is translucent by design, and it
relies on `--glass-strong`'s .90 alpha rather than on its blur for legibility.
That is the difference: a surface over the *field* may be glass; a surface over
*content* may not.

**Active state is data, not markup.** `data-section` on the link,
`window.PAGE_SECTION` in the page's head, and `site.js` sets `.is-active` on
the match. A hand-written `class="nav__link is-active"` goes stale the moment
a page is renamed.

**`.nav__spacer` is a layout tool, not a content hack.** An empty `<li>` with
flex-grow pushes the last link — a call to action, typically — to the far right
without absolute positioning.

## Footer

`.site-footer`, with a brand column and link columns. The year is stamped by
`site.js`; the markup carries a placeholder, not a literal year, so the footer
does not go stale every January.

## Responsive

Two behaviours, and only two — the site has no other breakpoints.

**Below 900px the nav collapses.** `.nav__toggle` appears and
`.nav__links` becomes a toggled panel.

That panel **fully covers the page content**, so it is the case
[`surface-recipe.md`](surface-recipe.md) calls out: it is opaque, and it sets
`backdrop-filter: none`. This is not a stylistic choice — a translucent panel
nested inside the blurred header can have its background paint suppressed
entirely, revealing the content it was meant to hide.

**Grids reflow on their own.** `auto-fit` / `auto-fill` with `minmax()` means
cards and grids change column count at any width with no media query. A card
grid is written once and is correct from 360px to a wide desktop.

**The page body never scrolls horizontally.** Wide content scrolls inside its
own container — which is what `.table-wrap` is for. A page that scrolls
sideways is missing a wrapper, not missing a media query.

## Mobile behaviour to preserve

* The menu button is a real `<button>` with `aria-expanded`, so it is operable
  and announced by keyboard.
* The panel traps nothing and scrolls independently if it overflows; on a phone
  the nav is short enough that it never does.
* Tap targets stay at or above 44px. The nav toggle is sized in the shared
  stylesheet for exactly this.

## Related

* [`runtime-includes.md`](runtime-includes.md) — how the chrome is injected.
* [`components.md`](components.md) — the content components.
* [`accessibility.md`](accessibility.md) — landmarks, labels, focus.
* [`../index/design-index.md`](../index/design-index.md) — the router.
