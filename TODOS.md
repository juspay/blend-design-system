# TODOS

## Ship

### Fix Button hover transition performance regression

**What:** Investigate and fix the failing `Button Performance > Animation Performance > hover transitions are smooth` test.

**Why:** The full Blend suite reports an intermittent performance regression, so the repository's performance baseline is not reliable.

**Context:** `/ship` observed this pre-existing failure on branch `funnel-chart-and-tooltips` on 2026-08-06: `Performance test failed: 14.04ms > 14ms` in `packages/blend/__tests__/components/Button/Button.performance.test.tsx`. A later full run passed but still emitted performance-regression warnings for the same test. The branch does not modify the Button test or implementation; reproduce with `pnpm run test:run` from `packages/blend` and check the local performance baseline before changing code.

**Effort:** M
**Priority:** P0
**Depends on:** None

## MultiSelect

### Remove legacy per-item selection callbacks

**What:** In the next major release, formally deprecate and remove the legacy `MultiSelect` and `MultiSelectV2` per-item `onChange` callbacks.

**Why:** Consumers should use `onSelectionChange`, which returns the complete resulting selection once per user gesture.

**Context:** Provide migration guidance when removing the callbacks so existing consumers can move to `onSelectionChange` without ambiguity.

**Effort:** M
**Priority:** P3
**Depends on:** Next major release

## Test Infrastructure

### Evaluate happy-dom for faster test runs

**What:** Try replacing Vitest's `jsdom` environment with `happy-dom` to determine whether it materially improves suite speed.

**Why:** `happy-dom` is generally faster than `jsdom`, but its looser DOM-spec fidelity may introduce behavioral differences.

**Context:** Before adopting it, require a green run of all 174+ test files and verify that jest-axe, styled-components, and Radix portal-based components such as Popover, Menu, and Dropdown still behave correctly. Deferred from the Vitest concurrency and speed work on `fix-parallel-test-flakes`.

**Effort:** M
**Priority:** P3
**Depends on:** None

## Completed
