---
name: design-layout-and-chrome
description: The container, the navigation rail and its nav, the footer, and the responsive rules that hold the page together.
version: 1.0.0
author: RBZagan
---

# Layout & Chrome

The frame around the content: container, rail, nav, footer, and the two
responsive behaviours that keep the page working.

## The shell

`body` is the grid. The rail takes the first column; page content and the footer
both take the second:

```css
body {
  display: grid;
  grid-template-columns: var(--rail-w) minmax(0, var(--maxw));
  justify-content: center;
  column-gap: var(--sp-5);
  padding: var(--sp-4);
}
```

Every page already has `#site-header`, `main` and `#site-footer` as direct
children of `body`, so the whole layout is **CSS-only** — a page never writes a
shell wrapper. A new page gets the rail by doing nothing.

The tracks are capped and the assembly is centred so a wide screen does not
strand the rail at the edge of the viewport. `body` itself is never
width-constrained: the fixed field belongs to `body` and has to reach the edges
of the screen (see [`backdrop.md`](backdrop.md)).

## Container

`.container` caps at `--maxw` (1120px) and centres itself. Every page's content
sits in one.

`.narrow` caps at 880px instead, for text-heavy reading pages. A long measure on
a glass field is hard to track — the background is deliberately featureless, so
the eye has nothing to count lines against.

## The rail

A sticky glass panel in the first column, `--rail-w` wide. It stays put as the
reader scrolls, so navigation is always one glance and one click away without
a bar sitting on top of the page.

```html
<header class="site-header">
  <nav class="nav" aria-label="Primary">
    <a class="nav__brand" href="{{ROOT}}index.html">RBZagan</a>
    <ul class="nav__links">
      <li>
        <p class="nav__group__label" id="nav-label-site">Site</p>
        <ul class="nav__sub" aria-labelledby="nav-label-site">
          <li><a class="nav__link" data-section="" href="{{ROOT}}index.html">Home</a></li>
        </ul>
      </li>
    </ul>
    <div class="nav__foot"><a class="btn" href="…">GitHub</a></div>
  </nav>
</header>
```

| Class | Role |
|---|---|
| `.nav__brand` | Wordmark, returns to the entry page. Pinned to the top. |
| `.nav__links` | The list, and the **scroll area**. A `<ul>`, so the count is announced. |
| `.nav__group__label` | A section heading inside the list. |
| `.nav__sub` | The nested list one label belongs to. |
| `.nav__link` | One link. |
| `.is-active` | Modifier, set by `site.js` from `PAGE_SECTION`. |
| `.nav__foot` | Pinned to the bottom, above a hairline. Where a call to action goes. |
| `.nav__toggle` | The drawer button. A real `<button>`, hidden on desktop. |
| `.nav__scrim` | The dim layer behind an open drawer. |

The panel is `--glass-strong`, not `--glass`, and it leans on that .90 alpha
rather than on its blur for legibility — the field behind it shifts as the
reader scrolls. A surface over the *field* may be glass. See
[`surface-recipe.md`](surface-recipe.md).

**Active state is data, not markup.** `data-section` on the link,
`window.PAGE_SECTION` in the page's head, and `site.js` sets `.is-active` on
the match. A hand-written `class="nav__link is-active"` goes stale the moment
a page is renamed.

### Growing the list

**A new section is a new `<li>` — a label and a nested list. Nothing else
changes.** This is the reason the rail scrolls, and the reason sub-items are
always open rather than hidden behind a hover:

* the scroll area absorbs any number of items, so the rail never grows past the
  viewport and never needs a second breakpoint;
* a hover dropdown is unreachable by touch and disappears the moment a finger
  lands on a link that opens it;
* an open nested list needs no script to open and none to close.

A dropdown (`.nav__dd`) existed in an earlier revision of this design and was
removed for exactly this reason. Do not reintroduce it.

### Two implementation traps

Both are load-bearing, and both fail silently when dropped.

**Sticky goes on `#site-header`, not on `.site-header`.** The injected panel is
a child of the mount point, and a grid item is as tall as its row. A sticky
child of a full-height box has no travel to stick through — the rail scrolls
away like any other content. `#site-header` is the grid item, so that is the
element that is `position: sticky`.

**`#site-header` is a flex row, `.site-header` is a flex column.** The row makes
`.site-header` a flex item, so `align-items: stretch` gives it the *definite*
height that its capped max-height implies. Inside it, `.nav__links` is
`flex: 1 1 auto; min-height: 0; overflow-y: auto`. The `min-height: 0` is not
optional: a flex item defaults to `min-height: auto`, which refuses to shrink
below its content, so the list grows the rail past the viewport instead of
scrolling inside it.

```css
#site-header {
  position: sticky; top: var(--sp-4); align-self: start;
  display: flex;
  max-height: calc(100dvh - var(--sp-8));
}
.nav__links {
  flex: 1 1 auto; min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

`overscroll-behavior: contain` stops the list chaining the page scroll once it
reaches its end, which is what makes the rail feel like a rail rather than a
scroll trap.

## Footer

`.site-footer`, with a brand column and link columns. It sits in the content
column, **not** spanning the grid: a spanning footer would centre its own
container against the full viewport width and stop lining up with the page
above it. The year is stamped by `site.js`; the markup carries a placeholder,
not a literal year, so the footer does not go stale every January.

## Responsive

Two behaviours, and only two — the site has no other breakpoints.

**Below 900px the rail becomes a drawer.** The grid drops to one column, the
rail becomes `position: fixed` off the left edge, `.nav__toggle` appears, and
`body` gains top padding so the floating button never sits on the page's own
heading.

```html
<button class="nav__toggle" type="button" aria-expanded="false"
        aria-controls="nav-links" aria-label="Menu">☰</button>
<div class="nav__scrim" aria-hidden="true"></div>
```

The drawer **covers page content**, so it is the case
[`surface-recipe.md`](surface-recipe.md) calls out: it is opaque, and it sets
`backdrop-filter: none`. This is not a stylistic choice — a translucent panel
nested inside a blurred parent can have its background paint suppressed
entirely, revealing the content it was meant to hide. The scrim is a flat
`--ink-900` tint for the same reason.

`scroll-padding-left` is relaxed at the same breakpoint, because a rail that
reserves no track must not reserve scroll padding for one either.

**Grids reflow on their own.** `auto-fit` / `auto-fill` with `minmax()` means
cards and grids change column count at any width with no media query. A card
grid is written once and is correct from 360px to a wide desktop.

**The page body never scrolls horizontally.** Wide content scrolls inside its
own container — which is what `.table-wrap` is for. A page that scrolls
sideways is missing a wrapper, not missing a media query.

## Behaviour to preserve

* The menu button is a real `<button>` with `aria-expanded`, so it is operable
  and announced by keyboard.
* `Escape` closes the drawer and returns focus to the button; the scrim closes
  it on click; focus is never trapped and never lost.
* The rail scrolls independently if the list overflows, and `overscroll-behavior`
  keeps that scroll from leaking into the page.
* Tap targets stay at or above 44px. The toggle is sized in the shared
  stylesheet for exactly this, and drawer links take the larger mobile padding.

## Related

* [`runtime-includes.md`](runtime-includes.md) — how the chrome is injected.
* [`surface-recipe.md`](surface-recipe.md) — why the drawer is not glass.
* [`geometry-and-type.md`](geometry-and-type.md) — `--rail-w`.
* [`components.md`](components.md) — the content components.
* [`accessibility.md`](accessibility.md) — landmarks, labels, focus.
* [`../index/design-index.md`](../index/design-index.md) — the router.
