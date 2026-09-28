---
name: design-glass-surfaces
description: The transparent glass tokens — fills, borders, blur, and the three-tier surface hierarchy.
version: 1.0.0
author: RBZagan
---

# Glass Surfaces

The transparency layer. This is what makes the site read as glass rather than as
grey cards, and it is where most of the visual character lives.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--glass` | `rgba(255,255,255,.62)` | Default panel/card fill. |
| `--glass-strong` | `rgba(255,255,255,.90)` | Header and buttons — stays readable even without blur. |
| `--glass-faint` | `rgba(255,255,255,.40)` | Subtle inset blocks. |
| `--glass-border` | `rgba(255,255,255,.75)` | Highlight (top) border. |
| `--hairline` | `rgba(120,133,154,.28)` | Divider / low-contrast border. |
| `--surface-solid` | `rgba(255,255,255,.98)` | Near-opaque fallback for content-covering overlays. |
| `--blur` | `saturate(160%) blur(14px)` | `backdrop-filter` for glass. |

## The three tiers

`--glass`, `--glass-strong`, and `--glass-faint` are not interchangeable, and
using the wrong one produces a legibility bug rather than a taste disagreement.

| Tier | Alpha | For | Never for |
|---|---|---|---|
| `--glass-strong` | .90 | Sticky header, buttons, anything that must read over scrolling content | Large content panels — it flattens the effect at that size |
| `--glass` | .62 | Panels, cards, hero — the default raised surface | Overlays that cover page content |
| `--glass-faint` | .40 | Inset blocks nested inside a panel: a code caption, a quiet metadata strip | Body text, unless you have checked the contrast |

**`--glass-faint` is the tier people get wrong.** It is a background, not a
text colour. Ink on `--glass-faint` is materially less contrast than ink on
`--glass`; body copy there needs `--ink-900`, not `--ink-700`, and a check.

## Two borders, two jobs

`--glass-border` is a *highlight* — it is white at 75%, and on a light backdrop
it reads as a lit top edge, which is what gives a panel its raised look.

`--hairline` is a *divider* — it is silver-grey at 28%, and it separates without
drawing attention.

A panel uses both: `--glass-border` for the outline, `--hairline` for a rule
inside it. Using `--glass-border` for an internal rule makes the whole thing
look like a stack of outlines.

## `backdrop-filter` and the webkit prefix

`--blur` is used as a property value, not called:

```css
background: var(--glass);
-webkit-backdrop-filter: var(--blur);
backdrop-filter: var(--blur);
```

Both lines are required. The `-webkit-` prefix is still needed for Safari and
for any engine that has not cut over, and dropping it costs you the entire
effect on those browsers — the surface still renders, just flat, so the failure
is silent.

Where a blur is unavailable, the `rgba` alpha still gives a translucent surface.
It looks flatter. That is the intended degradation.

## What this is not for

**A `--glass` surface must sit over the fixed page background, never over other
page content.** The moment a translucent fill is layered on top of text that
needs to stay readable, you are relying on `backdrop-filter` to do the work —
and that is exactly the case where the blur can fail. Content-covering overlays
are solid; see [`surface-recipe.md`](surface-recipe.md) for the rule and the
reason.

## Related

* [`surface-recipe.md`](surface-recipe.md) — how to build a glass panel.
* [`backdrop.md`](backdrop.md) — the field the glass sits against.
* [`palette-and-ink.md`](palette-and-ink.md) — the opaque ramps.
* [`../index/design-index.md`](../index/design-index.md) — the router.
