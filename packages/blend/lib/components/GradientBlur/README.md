# GradientBlur (internal)

**Status: out of the theming contract. Not part of the public API.**

`GradientBlur` is an internal visual utility used for layered `backdrop-filter`
masks. It is **not** exported from `@juspay/blend-design-system`.

## Why it is not theme-aware

The CSS file uses `rgba(0, 0, 0, …)` only as **alpha/luminance masks** for
progressive blur layers. Those values are not surface or ink colors, so they
do not participate in light/dark ThemeProvider tokens.

## Decision

Leave GradientBlur internal. Do not export it or add token modules unless a
maintainer explicitly wants a public, theme-aware blur chrome component.
