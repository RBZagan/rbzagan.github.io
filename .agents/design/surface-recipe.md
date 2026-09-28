---
name: design-surface-recipe
description: The five-line glass panel recipe, the hover lift, and the one case where glass is wrong — overlays that cover content.
version: 1.0.0
author: RBZagan
---

# Surface Recipe

Every raised element in this system is built the same way. If a component is not
this recipe, it is a bug.

## The recipe

```css
background: var(--glass);
-webkit-backdrop-filter: var(--blur);
backdrop-filter: var(--blur);
border: 1px solid var(--glass-border);
box-shadow: var(--shadow-sm);
border-radius: var(--radius);
```

Five declarations, in this order, no substitutions. `.panel`, `.card`, `.hero`,
`.callout`, and every other surface inherit it from `.panel` — a new component
that needs a raised surface composes the class rather than restating it.

**The order matters for the same reason the prefixes do.** `background` before
`backdrop-filter` so the fill is painted before the filter is declared;
`-webkit-` before unprefixed so an older engine takes the prefixed one and a
newer one takes the last. See [`glass-surfaces.md`](glass-surfaces.md) for the
tokens.

## The hover lift

Interactive cards lift:

```css
a.card { transition: transform .18s ease, box-shadow .18s ease; }
a.card:hover,
a.card:focus-visible { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
```

`translateY(-4px)` and `--shadow-lg`, together. The lift alone looks like a
tooltip; the shadow alone looks like a colour change. Both, and the card reads
as picked up.

**Transitions stay between `.15s` and `.2s`.** Shorter than that and the lift
reads as a jump; longer and a grid of cards lags the cursor by a visible
distance.

`:focus-visible` is in the same rule as `:hover` deliberately. A keyboard
user's focus must produce the same affordance as a mouse user's hover — see
[`accessibility.md`](accessibility.md).

## Overlays that cover content — do not use translucent glass

**The glass recipe is for surfaces that sit over the fixed background, not over
other page content.** Any overlay that **fully covers page content** — the mobile
navigation panel, dropdown menus, modals — must use an opaque background and
**must not** rely on `backdrop-filter` blur for legibility.

```css
/* content-covering overlay */
background: #ffffff;         /* or var(--surface-solid) */
-webkit-backdrop-filter: none;
backdrop-filter: none;
box-shadow: var(--shadow-md);
```

### Why

When such an overlay is nested inside another element that already has
`backdrop-filter` — anything inside the blurred rail is the canonical case —
the child's background paint can be **suppressed** in browsers and environments
where `backdrop-filter` is unsupported or disabled. What you get instead is the
content behind showing through a panel that was supposed to be covering it.

And a blur over content you are *hiding* adds nothing. The one thing the overlay
needs is to be opaque, and the one thing that is least reliable is the blur.

### How to tell if an overlay qualifies

Ask: **if this element failed to render its background entirely, would the
reader see text they should not be reading?** If yes, it is a content-covering
overlay and it is solid. If no — a dropdown arrow, a hover highlight, a divider —
it can be glass.

A nav link highlighting on hover is glass. The same rail, as a drawer sliding over
the page, is solid. The distinction is whether it *hides* anything, not whether
it is part of the navigation.

## What must not be done

* **Restating the recipe in a page stylesheet.** Extend `.panel`; if a page needs
  to change a surface, change one token or one class, not five declarations.
* **Adding a sixth declaration to make a surface "more glassy".** A second blur
  radius, a second border colour, an extra inset shadow — each is a page-level
  override that will not be restyled when the tokens change.
* **Using `--glass-faint` for a surface carrying body text** without checking
  contrast. See [`glass-surfaces.md`](glass-surfaces.md).
* **Using glass for anything that overlays content.** The rule above.

## Related

* [`glass-surfaces.md`](glass-surfaces.md) — the tokens in the recipe.
* [`backdrop.md`](backdrop.md) — the field the glass blurs.
* [`components.md`](components.md) — the things built from this recipe.
* [`../index/design-index.md`](../index/design-index.md) — the router.
