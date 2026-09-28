---
name: design-accessibility
description: The accessibility checklist for every page in this system — landmarks, heading order, focus, contrast, and keyboard operation.
version: 1.0.0
author: RBZagan
---

# Accessibility

A page is not done until this checklist passes. Every item is a requirement, not
a suggestion — the visual language of this system is low-contrast by
construction, so the accessibility work is what makes it safe.

## Landmarks and structure

* **Use semantic landmarks** — `<header>`, `<nav>`, `<main>`, `<footer>`. They
  are what a screen reader's region list is built from, and a page made of
  `<div>`s has no regions at all.
* **One `<h1>` per page**, and it is the page's subject, not the site's name. The
  site's name belongs in the `.nav__brand`.
* **Heading levels descend without skipping.** `<h1>` → `<h2>` → `<h3>`. A card
  grid of `<h3>`s under a page `<h1>` with no `<h2>` is a broken outline, even
  when it looks right.
* **The footer is a `<footer>`, not a `<div>`**, even when it sits inside
  another landmark. `role="contentinfo"` is a fallback, not a replacement.

## Labels

* **`aria-label` on the nav** — `<nav aria-label="Primary">`. Two `<nav>`
  elements on a page need distinguishing; the label is how.
* **`aria-label` on the breadcrumb** region, and a `<nav>` around the trail so it
  is reachable as a region.
* **Decorative icons are `aria-hidden="true"`.** `.card__icon`, `.card__more`,
  and callout glyphs are all decorative. A screen reader that announces "black
  diamond" instead of the link's title is worse than one that says nothing.
* **A callout is an `<aside>`** with a label, so it appears in the landmark list
  as something distinct from the main prose.

## Focus

* **Visible `:focus-visible` outline** — provided in `main.css`; do not remove
  it. `outline: none` without a replacement makes a page unusable by keyboard and
  fails WCAG 2.4.7.
* **Focus must produce the same affordance as hover.** `a.card` gets its lift on
  `:focus-visible` as well as `:hover` — a keyboard user gets the same feedback
  a mouse user does, at the same moment. See
  [`surface-recipe.md`](surface-recipe.md).
* **The mobile toggle is a real `<button>`** with `aria-expanded` toggled to
  match its state. A `<div>` with a click handler is not focusable, is not
  announced, and does not respond to Space or Enter.
* **Focus order follows DOM order.** Never use `tabindex` greater than `0`;
  positive values break the natural order permanently and are not recoverable.

## Contrast

**Body ink on glass over the silver field meets WCAG AA.** That is the default
case and it needs no per-page checking.

Where checking *is* required:

* **Text on `--glass-faint`** — the .40 tier. Body copy there needs `--ink-900`,
  not `--ink-700`. Do not place body text directly on `--glass-faint` without
  checking.
* **Text on `--accent-soft`** — the active chip and nav-link backgrounds.
* **`--ink-400`** — at the legibility edge by design. Captions and eyebrows only.
  Never a sentence.
* **Links.** `--accent` on a `--glass` panel is roughly 3.5:1 and fails AA for
  body text. **Links use `--accent-strong`.** This is the single most common
  contrast failure in this system.
* **`--sponsor` text on a light surface** — check it, do not assume.

## Keyboard and motion

* **Every interactive control is reachable and operable by keyboard.** The
  accordion is native `<details>`, so this is free. The dropdown opens on
  focus-within, so it is free. The mobile menu is a real `<button>`, so it is
  free. All three are free *because* the native element was used.
* **`<details>` is the accordion.** A JavaScript replacement must re-earn
  keyboard operation, `aria-expanded`, and announcement. Native has all three.
* **The page does not scroll horizontally at 360px.** Wide content scrolls inside
  its own container — see [`components.md`](components.md) on `.table-wrap`.
* **Transitions are `.15s`–`.2s`.** Nothing in this system animates on a timer,
  and nothing autoplays, so `prefers-reduced-motion` has little to disable — but
  do not introduce a carousel or an auto-advancing element to work around it.

## Before publishing

1. One `<h1>`, headings descending, landmarks present.
2. Tab through the whole page. Every stop is visible and meaningful.
3. Decorative glyphs are `aria-hidden`; nav and breadcrumbs are labelled.
4. Links are `--accent-strong`.
5. Resize to 360px. No horizontal scroll on the body.
6. Read it with the backdrop disabled — if a surface is illegible without its
   blur, it is relying on something unreliable. See
   [`surface-recipe.md`](surface-recipe.md).
