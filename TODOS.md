# TODOS

## MultiSelect

### Remove legacy per-item selection callbacks

**What:** In the next major release, formally deprecate and remove the legacy `MultiSelect` and `MultiSelectV2` per-item `onChange` callbacks.

**Why:** Consumers should use `onSelectionChange`, which returns the complete resulting selection once per user gesture.

**Context:** Provide migration guidance when removing the callbacks so existing consumers can move to `onSelectionChange` without ambiguity.

**Effort:** M
**Priority:** P3
**Depends on:** Next major release

## SelectListV2 / MultiSelectListV2

### Migrate MobileColumnManagerDrawer off drawer-inside-a-drawer

**What:** Migrate `DataTable/MobileColumnManagerDrawer` off its drawer-inside-a-drawer onto `MultiSelectListV2`.

**Why:** It currently renders `<MultiSelect useDrawerOnMobile>` inside a `<Drawer>` (`packages/blend/lib/components/DataTable/MobileColumnManagerDrawer/index.tsx`), stacking two drawer implementations. Consciously deferred out of the inline-select-list PR to keep that PR's blast radius to the new components.

**Effort:** M
**Priority:** P3
**Depends on:** None

### Re-implement the four `*SelectDrawer` components as thin wrappers

**What:** Re-implement `MultiSelectDrawer`, `SingleSelectDrawer`, `NestedMultiSelectDrawer` and `NestedSingleSelectDrawer` (`packages/blend/lib/components/Drawer/components/`) as thin wrappers over `SelectListV2`/`MultiSelectListV2`.

**Why:** Deliberately not done in the inline-select-list PR, which only JSDoc-deprecates the four; the nested variants also block on `subMenu` drill-down support below.

**Effort:** L
**Priority:** P3
**Depends on:** `subMenu` drill-down support (below), for the nested variants

### Add `subMenu` drill-down navigation to the inline lists

**What:** Add push/pop drill-down navigation for `subMenu` items to `SelectListV2`/`MultiSelectListV2`.

**Why:** Both components accept `subMenu` in their item model, but currently hard-reject it in development (`flattenSelectListV2Groups` in `packages/blend/lib/components/SelectListV2/utils.ts` fires a dev-only `console.error` via `warnOnce`) and do not render the nested options at all — the parent renders as an ordinary selectable row and the children are dropped. That gap is why the nested drawers have no full V2 replacement yet. Consciously deferred out of the inline-select-list PR.

**Effort:** L
**Priority:** P3
**Depends on:** None

### Fix SelectItemV2's V1 Checkbox import

**What:** Replace the V1 `Checkbox` import in `packages/blend/lib/components/SelectV2/SelectItemV2.tsx` with `CheckboxV2` (or an equivalent V2-token indicator).

**Why:** It resolves the deprecated `CHECKBOX` token slot via `useResponsiveTokens`, so every `MultiSelectV2` dropdown consumer already emits a v1 deprecation `console.warn`. Pre-existing and out of the inline-select-list PR's blast radius — `SelectListV2`/`MultiSelectListV2` use `SelectItemIndicator` instead, not this code path.

**Effort:** S
**Priority:** P3
**Depends on:** None

### Add `aria-setsize`/`aria-posinset` to the virtualized MultiSelectV2 dropdown listbox

**What:** Pass `ariaSetSize`/`ariaPosInSet` through `MultiSelectV2MenuItem` (`packages/blend/lib/components/MultiSelectV2/MultiSelectV2MenuItem.tsx`) into `SelectItemV2`.

**Why:** `SelectItemV2` already supports both props and `SelectListV2` wires them for its listbox, but `MultiSelectV2MenuItem` doesn't pass them for the dropdown case, leaving the virtualized `MultiSelectV2` popover listbox without them — a pre-existing APG gap noticed while building the inline lists, deliberately not fixed there.

**Effort:** S
**Priority:** P3
**Depends on:** None

## Test Infrastructure

### Evaluate happy-dom for faster test runs

**What:** Try replacing Vitest's `jsdom` environment with `happy-dom` to determine whether it materially improves suite speed.

**Why:** `happy-dom` is generally faster than `jsdom`, but its looser DOM-spec fidelity may introduce behavioral differences.

**Context:** Before adopting it, require a green run of all 174+ test files and verify that jest-axe, styled-components, and Radix portal-based components such as Popover, Menu, and Dropdown still behave correctly. Deferred from the Vitest concurrency and speed work on `fix-parallel-test-flakes`.

**Effort:** M
**Priority:** P3
**Depends on:** None

## Completed
