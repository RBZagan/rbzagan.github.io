---
name: design-components
description: Every class the shared stylesheet provides — cards, tables, badges, buttons — and when to compose instead of adding CSS.
version: 1.0.0
author: RBZagan
---

# Components

Provided by `css/shared/components.css`. **Use these class names as-is.**
Prefer composing these over new CSS; add a per-section stylesheet only for
genuinely page-specific layouts.

## Surfaces

| Component | Class(es) | Notes |
|---|---|---|
| Hero banner | `.hero` | Large intro glass panel with a soft radial glow. |
| Panel / section | `.panel`, `.section` | Grouped glass block. Every raised surface is a `.panel`. |

## Cards

`.card-grid` > `.card`, and the grid is `auto-fill` at `minmax(248px, 1fr)` —
so it reflows without a media query and every card in a row is the same width.

| Class | Role |
|---|---|
| `a.card` | Clickable. Lifts on hover, per [`surface-recipe.md`](surface-recipe.md). |
| `.card__icon` | Decorative glyph. `aria-hidden`. |
| `.card__title` | The link text. This is the accessible name. |
| `.card__desc` | One or two lines. Not a paragraph. |
| `.card__more` | Trailing affordance, e.g. `→`. Decorative. |

A clickable card is a link **wrapping the whole card**, not a link inside a
card with a click handler on the card. `a.card` is focusable, announces as a
link, and works with middle-click and "open in new tab". A `div` with an
`onclick` does none of that.

## Content

| Component | Class(es) | Notes |
|---|---|---|
| Feature list | `.feature-list` | Stacked highlighted rows. |
| Accordion | `details.acc` > `summary` + `.acc__body` | **Native `<details>`** — no JS. `+`/`–` marker via CSS. Group in `.accordion`. |
| Code | `pre` / `code` | Dark `pre` (`#1c2431`), inline `code` tinted with accent. `.code-label` for a caption. |
| Table | `.table-wrap` > `table` | **Always** wrap tables in `.table-wrap` for horizontal scroll. |
| Definition list | `.deflist` > `.deflist__row` (`.deflist__term`) | Two-column term/description. |
| Breadcrumbs | `.breadcrumbs` (`a`, `.sep`) | Page context trail. |

**The accordion is `<details>`.** Not a div with a class, not a button that
toggles a class. The native element already has the keyboard behaviour, the
`aria-expanded` state, and the screen-reader semantics; a JavaScript
reimplementation has to re-earn all three, and usually gets one of them wrong.

**Always wrap a table.** A page with a table and no `.table-wrap` gets a
horizontal scrollbar on the *page* at 360px, which breaks the whole layout. With
the wrapper, the table scrolls inside its own container and nothing else moves.

## Labels and status

| Component | Class(es) | Notes |
|---|---|---|
| Badge / chip | `.badge` (`--accent` / `--ok` / `--warn`), `.chip` / `.chip-row` | Small status/labels. |
| Eyebrow / lead | `.eyebrow`, `.lead` | Section kicker and intro paragraph. |
| Button | `.btn` (`--primary` / `--sponsor`), `.btn-row` | Pill buttons; primary/sponsor are gradient-filled. |

`.badge--ok` and `.badge--warn` are **modifier suffixes on `.badge`**, not
standalone classes. `.chip-row` exists so a set of chips wraps consistently
instead of each page inventing its own flex gap.

**A badge is a label, not a link.** If it navigates, it is a chip in a
`.chip-row`, or a button.

## Callouts

`.callout` with a `--info`, `--warn`, or `--danger` modifier. Icon plus body, as
an `<aside>`.

Use a callout for a thing the reader must not miss. If three callouts sit on one
page, none of them is emphasised any more — that is the signal to move the
content into the body.

## Composing

```html
<div class="card-grid">
  <a class="card" href="../lobby/">
    <div class="card__icon" aria-hidden="true">◆</div>
    <div class="card__title">lobby</div>
    <div class="card__desc">The lobby package for the Minigame universe.</div>
    <div class="card__more" aria-hidden="true">→</div>
  </a>
</div>
```

That is the entry page's card grid, and it is the shape every card grid in the
site uses. The grid, the card, the lift, and the responsive reflow are all
already handled.

## When to add CSS

Add a per-section stylesheet only when a page needs a layout **no component
covers** — a slot map, a stat bar, a timeline. If you are writing a rule to
restyle an existing component, that is a rebrand and it belongs in the tokens
instead. See [`file-organization.md`](file-organization.md).

## Related

* [`surface-recipe.md`](surface-recipe.md) — how a `.panel` is built.
* [`layout-and-chrome.md`](layout-and-chrome.md) — the container and the chrome.
* [`geometry-and-type.md`](geometry-and-type.md) — the tokens these reference.
* [`../index/design-index.md`](../index/design-index.md) — the router.
