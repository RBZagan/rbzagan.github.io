---
name: design-backdrop
description: The fixed silver gradient field behind every page, and why it is attached rather than scrolled.
version: 1.0.0
author: RBZagan
---

# Backdrop

The page background. One fixed, layered silver gradient — soft white highlights
top-left and top-right, a light silver wash toward the bottom — over a
`linear-gradient(160deg, #eef1f6 → #dbe1ea)`.

## The field

```css
body {
  background-color: #eef1f6;
  background-image:
    radial-gradient(1100px 620px at 12% -8%,  rgba(255,255,255,.85), transparent 60%),
    radial-gradient(900px  520px at 88% -6%,   rgba(255,255,255,.65), transparent 62%),
    radial-gradient(800px  700px at 50% 108%,  rgba(255,255,255,.40), transparent 65%),
    linear-gradient(160deg, #eef1f6 0%, #dbe1ea 100%);
  background-attachment: fixed;
}
```

Four layers, painted in order: two top highlights, one bottom lift, and the base
gradient underneath all three. The two `--silver-*` values at the ends of the
linear gradient are the ramp's `100` and a shade past `200`; they are the field,
not a component, so they are written here as literals rather than as tokens.

## Why `background-attachment: fixed`

**This is the one declaration the whole aesthetic depends on.** The glass panels
in [`glass-surfaces.md`](glass-surfaces.md) get their look from blurring
*something*. If the backdrop scrolls, the blur samples a different part of the
gradient under every panel — a card picks up a highlight and loses it as you
scroll, and the page looks broken rather than glassy.

Fixed, the field is stationary. The content moves over a stable gradient, every
panel blurs the same calm background, and the site keeps its depth at any scroll
position.

The cost: on a long page, a fixed background is repainted on scroll, which is
materially more expensive than a scrolling one on low-powered devices. It is
still the right trade for a documentation site, where the alternative is visibly
broken.

## Reduced motion and the fixed field

`background-attachment: fixed` is not affected by `prefers-reduced-motion` — it
is not an animation — and should not be disabled. Nothing about it moves.

## What belongs here and what does not

The backdrop is a **field, not a decoration**. Do not add shapes, patterns, or
icons to it. If a page needs a visual anchor, that is a component — a card, a
stat bar, a callout — sitting *on* the field, not an addition to it.

The one sanctioned addition is a per-section override, and it is a *recolour*,
never an extra layer. A section that must feel distinct does it by shifting the
gradient stops or the highlight positions, keeping the structure intact.

## Do not set a background on `body` in a page stylesheet

`background-attachment: fixed` is the trap. A page file that sets
`background: #fff` on `body` silently un-fixes the field and every panel on that
page loses its depth, with no error anywhere.

If a page must change the field, set the background on a wrapper **and** carry
`background-attachment: fixed` with it. A per-page override is legitimate;
dropping the `fixed` is not.

## Related

* [`glass-surfaces.md`](glass-surfaces.md) — what is layered on top of this.
* [`surface-recipe.md`](surface-recipe.md) — building a panel over the field.
* [`principles.md`](principles.md) — the self-containment rule this obeys.
* [`../index/design-index.md`](../index/design-index.md) — the router.
