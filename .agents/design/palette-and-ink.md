---
name: design-palette-and-ink
description: The white and silver surface tokens and the four ink tokens — the colour half of the Silver Glass palette.
version: 1.0.0
author: RBZagan
---

# Palette & Ink

Two ramps: a neutral silver surface scale, and an ink scale for text. Declared
once on `:root` in `css/shared/main.css`; use these names verbatim, and never
type a hex value into a component.

## Palette — white & silver

| Token | Value | Use |
|---|---|---|
| `--white` | `#ffffff` | Pure surfaces, button text on accent. |
| `--silver-050` | `#f6f8fb` | Lightest tint. |
| `--silver-100` | `#eef1f6` | Background top. |
| `--silver-200` | `#e2e7ee` | Background mid. |
| `--silver-300` | `#d2d9e3` | Backdrop blobs. |
| `--silver-400` | `#b9c2d0` | Muted fills. |
| `--silver-500` | `#9aa6b8` | Bar starts, dividers. |
| `--silver-600` | `#78859a` | Strong silver. |

The scale is **050 → 600, light to dark**, and is used for *surfaces and fills*.
It is not a text ramp — text comes from the ink scale below. A silver that is
dark enough to read on is already too dark to be a background.

## Ink — text

| Token | Value | Use |
|---|---|---|
| `--ink-900` | `#1b2430` | Headings, strong text. |
| `--ink-700` | `#333f4f` | Body text. |
| `--ink-500` | `#5a6676` | Secondary / lead text. |
| `--ink-400` | `#78859a` | Muted captions, eyebrows. |

Four steps, and the discipline is **one per role**:

* `--ink-900` is the only token for `<h1>`–`<h3>`, and for anything emphasised
  with `<strong>`.
* `--ink-700` is the body default. If you are styling a paragraph, this is it.
* `--ink-500` is for `.lead` and other secondary prose — a paragraph you want the
  reader to skim rather than read.
* `--ink-400` is for `.eyebrow`, captions, and metadata. **Never** for a
  sentence the reader is meant to read; it is at the edge of legibility on
  `--glass-faint`, and check it against whatever it sits on.

## Accent & intent

| Token | Value | Use |
|---|---|---|
| `--accent` | `#5b7189` | Cool steel accent. |
| `--accent-strong` | `#3f5872` | Links, emphasis. |
| `--accent-soft` | `rgba(91,113,137,.12)` | Accent chip/active backgrounds. |
| `--sponsor` | `#d6336c` | Donation / call-to-heart accent. |
| `--sponsor-soft` | `rgba(214,51,108,.10)` | Sponsor backgrounds. |

**`--accent` is a surface, `--accent-strong` is a link.** This is the single
most common mistake: a link at `--accent` on a `--glass` panel sits at roughly
3.5:1 and fails AA for body text. Links use `--accent-strong`.

Intent colours, used by badges and callouts, are **not tokens** — they appear in
exactly one place each, in `components.css`:

| Intent | Value |
|---|---|
| success | `#1f7a54` |
| warning | `#9a6b16` |
| danger | reuses `--sponsor` |

Danger deliberately has no separate value. A second red would drift from
`--sponsor`; sharing one keeps "bad" a single colour across badges, callouts,
and buttons.

## Choosing between them

* Filling a surface → the silver scale. Filling a chip → `--accent-soft`.
* Text → the ink scale. Never a silver.
* A link, or text that must be emphasised → `--accent-strong`.
* Anything donation-related → `--sponsor`, and nothing else.
* If you cannot name the role, you are one step away from a hard-coded hex. Stop
  and pick one.

## Related

* [`glass-surfaces.md`](glass-surfaces.md) — the transparency tokens these sit on.
* [`geometry-and-type.md`](geometry-and-type.md) — spacing, radius, and fonts.
* [`backdrop.md`](backdrop.md) — what the silver ramp is painted over.
* [`../index/design-index.md`](../index/design-index.md) — the router.
