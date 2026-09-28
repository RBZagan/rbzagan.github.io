---
name: design-index
description: Index of design — the Silver Glass design system this site's pages are built from, and the rules that hold it together.
version: 1.0.0
author: RBZagan
---

# Design Index

**Scope:** `.agents/design/`
**Parent:** none — this repository has no `skills-index.md`; this index is the
entry point for the scope.

The design system the site in `docs/` is built from. **Repository-local**, not
part of any shared instruction set — it describes one site's visual language,
and no other repository's copy of these rules would be true for that repository.

Read [`../design/principles.md`](../design/principles.md) first. The rest assume
it.

## foundation

| File | Purpose |
|---|---|
| [`../design/principles.md`](../design/principles.md) | The five rules everything else is an expression of. Start here. |
| [`../design/palette-and-ink.md`](../design/palette-and-ink.md) | The silver ramp, the ink ramp, the accent and sponsor colours, and when to use which. |
| [`../design/backdrop.md`](../design/backdrop.md) | The four-layer fixed gradient behind every page, and why `body` carries no background. |

## surface

| File | Purpose |
|---|---|
| [`../design/glass-surfaces.md`](../design/glass-surfaces.md) | The three glass tiers, the border and hairline, and why there are two borders. |
| [`../design/surface-recipe.md`](../design/surface-recipe.md) | The five declarations that make a surface, the hover lift, and what never to put glass over. |
| [`../design/geometry-and-type.md`](../design/geometry-and-type.md) | Shadows, radii, the measure, the header height, and the system fonts. |

## structure

| File | Purpose |
|---|---|
| [`../design/file-organization.md`](../design/file-organization.md) | Where each CSS layer, the loader, and the partials live, and which file gets a new rule. |
| [`../design/layout-and-chrome.md`](../design/layout-and-chrome.md) | Container, sticky header, nav, footer, and the two responsive behaviours. |
| [`../design/runtime-includes.md`](../design/runtime-includes.md) | The two globals a page sets, the `{{ROOT}}` token, and the loader that assembles the chrome. |

## authoring

| File | Purpose |
|---|---|
| [`../design/components.md`](../design/components.md) | Every class available to a page, and when a new one is warranted. |
| [`../design/accessibility.md`](../design/accessibility.md) | The checklist a page passes before it is done. |

## adoption

| File | Purpose |
|---|---|
| [`../design/reuse.md`](../design/reuse.md) | Copying the system into another repository, and rebranding it by editing tokens alone. |

## Naming

Every instruction in this scope carries a `design-` prefix on its `name`, so it
cannot collide with a shared-set file of the same subject. This index follows
the `{scope}-index` pattern and is named `design-index`.

## Ordering

The five files in **foundation** are the ones a reader has to have. The two
under **surface** are the ones most often got wrong. **Structure** and
**authoring** are consulted while building. **Adoption** is read once, by
whoever is about to copy this elsewhere.

Any file added to, removed from, or renamed in `design/` updates this index in
the same change.
