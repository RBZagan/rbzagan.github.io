---
name: design-geometry-and-type
description: Shadow, radius, width, height, and font tokens — the non-colour half of the Silver Glass scale.
version: 1.0.0
author: RBZagan
---

# Geometry & Type

Everything here is a token for the same reason the colours are: a value that
appears in more than one component belongs in `:root`, not in the component.

## Shadows

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(27,36,48,.06), 0 2px 8px rgba(27,36,48,.05)` |
| `--shadow-md` | `0 6px 22px rgba(27,36,48,.10)` |
| `--shadow-lg` | `0 18px 48px rgba(27,36,48,.16)` |

Three elevations, and the gaps between them are wide on purpose — a glass design
reads as flat without a clear separation between "resting" and "raised".

* `--shadow-sm` — at rest. Every panel and card.
* `--shadow-md` — content-covering overlays, and the sticky header when it
  detaches.
* `--shadow-lg` — hover only. A lifted card.

Note the shadow ink is `--ink-900` at low alpha rather than black. A neutral
black shadow on a silver-blue field reads as dirt; tinting it with the ink hue
reads as depth.

## Geometry

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `10px` | Chips, badges, small buttons, inline code. |
| `--radius` | `16px` | Panels, cards, tables — the default. |
| `--radius-lg` | `22px` | The hero and other one-per-page containers. |
| `--maxw` | `1120px` | Content max width. |
| `--header-h` | `64px` | Header height, and the scroll-padding that keeps anchors clear of it. |

`--maxw` has one companion, `.narrow`, which caps at `880px` for text-heavy
reading pages. A long line of prose is the one thing the silver field actively
punishes — there is no background texture to give the eye a ruler, so measure is
the only cue the reader gets.

**`--header-h` is not just the header's height.** The sticky header will cover
the heading a `#anchor` link was aiming at unless the page sets
`scroll-padding-top: calc(var(--header-h) + 16px)`. That is in `main.css`
already; do not re-derive it per page.

## Type

| Token | Value |
|---|---|
| `--font` | system UI stack (`-apple-system, "Segoe UI", Roboto, …`) |
| `--mono` | system mono stack (`ui-monospace, "JetBrains Mono", Consolas, …`) |

Both are system stacks, deliberately. There is no webfont file in this
repository — see [`principles.md`](principles.md) §1. A system stack costs
nothing, loads instantly, and renders in whatever the reader's OS already
optimises for.

`--mono` is for code only: `pre`, inline `code`, and any value that has to be
compared character by character. Do not use it for UI labels.

## Scale and rhythm

Sizes and the spacing scale live in `main.css` as `--fs-*` and `--sp-*`, named
by role rather than by number — `--fs-body`, `--fs-lead`, `--fs-h1` — for the
same reason as the rest: a component references a role, and a role can be
retuned without touching that component.

**Vertical rhythm comes from `--sp-*` alone.** A page that adds `margin-top: 24px`
by hand has broken the scale, even when it looks fine, because the next page
using the scale will not match it.

## Related

* [`principles.md`](principles.md) — why tokens exist at all.
* [`glass-surfaces.md`](glass-surfaces.md) — the transparency half.
* [`layout-and-chrome.md`](layout-and-chrome.md) — where these get applied.
* [`../index/design-index.md`](../index/design-index.md) — the router.
