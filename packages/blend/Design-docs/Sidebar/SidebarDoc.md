# Sidebar (SidebarV2) Documentation

## Overview

`SidebarV2` is the V2 sidebar layout component for the Blend design system. It composes:

- **Primary sidebar**: directory navigation from `data` (`DirectoryData[]`). The primary directory panel is mounted only when `data` is non-null and has at least one entry.
- **Optional secondary sidebar rail**: `secondarySidebar` (tenant / top-level switcher). When the sidebar is expanded, the rail can still render even if `data` is null or empty.
- **Topbar**: `TopbarV2` is mounted only when `topbar` is provided (sticky region above main content). Auto-hide and visibility props apply in that case.
- **Mobile navigation dock** (small screens): derived from `NavbarItem.showOnMobile`

`SidebarV2` is token-driven (via `SIDEBARV2`, `MOBILE_NAVIGATION_V2`, `DIRECTORY`, `TOPBARV2`, `TOOLTIPV2`) and supports controlled/uncontrolled state for expansion and active navigation selection.

---

## Requirements

- **Navigation data**: pass `data?: DirectoryData[] | null`
    - `null`, `undefined`, or `[]` is safe: the **primary directory panel is omitted** (no empty tree placeholder). The outer sidebar shell still renders; optional `secondarySidebar` can appear when expanded.
    - With at least one section in `data`, the directory renders as usual.
- **Secondary rail (optional)**: pass `secondarySidebar?: SecondarySidebarInfo`
    - Rail items render from `secondarySidebar.items`
    - Bottom actions render via `secondarySidebar.footerSlot`
    - Optional `buttonProps` on the rail config apply to rail item triggers where supported.
- **Mobile**:
    - Mobile dock items are derived from `NavbarItem.showOnMobile === true`
    - Optional `showMobilePrimaryActionButton` and `mobilePrimaryActionButtonProps`
- **Expand/collapse**:
    - Uncontrolled: `defaultIsExpanded`
    - Controlled: `isExpanded` + `onExpandedChange`
    - On small viewports, expanded desktop chrome is collapsed (controlled callers receive `onExpandedChange(false)`).
- **Active item selection**:
    - Uncontrolled: `defaultActiveItem`
    - Controlled: `activeItem` + `onActiveItemChange`
- **Topbar**:
    - Slot: `topbar?: ReactNode` — when omitted, no sticky `TopbarV2` wrapper is rendered.
    - `rightActions?: ReactNode` — passed through to `TopbarV2` when `topbar` is set (layout follows `TopbarV2` breakpoints).
    - Auto-hide: `enableTopbarAutoHide?: boolean`
    - Controlled visibility: `isTopbarVisible` + `onTopbarVisibilityChange`

---

## Anatomy

```
┌───────────────────────────────────────────────────────────────────────┐
│ TopbarV2 (sticky) — only when `topbar` is passed                     │
├───────────────────────────────────────────────────────────────────────┤
│ ┌───────────────┐ ┌───────────────────────────────────────────────┐   │
│ │ SecondaryRail │ │ Primary sidebar (Directory) when `data` has   │   │
│ │ (optional)    │ │ items                                          │   │
│ │ - items       │ │ - Sections                                     │   │
│ │ - footerSlot  │ │ - Items (truncate + tooltip on hover)        │   │
│ │               │ │ - Nested items (collapsible)                   │   │
│ └───────────────┘ └───────────────────────────────────────────────┘   │
│                                                                       │
│ Main content (children)                                               │
│                                                                       │
│ Mobile: floating dock (derived from showOnMobile)                     │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Props (SidebarV2)

Source: `packages/blend/lib/components/SidebarV2/types.ts`

### Layout

- `height?: string` (default: `100dvh`)
- `children?: ReactNode`
- `footer?: ReactNode` (primary sidebar footer area)
- `sidebarTopSlot?: ReactNode` (primary sidebar header slot)

### Navigation

- `data?: DirectoryData[] | null` — if missing, null, or empty, the directory panel is not rendered.
- `secondarySidebar?: SecondarySidebarInfo`

### Expand / collapse

- `sidebarCollapseKey?: string` (default: `/`)
- `defaultIsExpanded?: boolean` (default: `true`)
- `isExpanded?: boolean`
- `onExpandedChange?: (isExpanded: boolean) => void`
- `onSidebarStateChange?: (state: 'collapsed' | 'expanded' | 'intermediate') => void`

### Mobile dock

- `showMobilePrimaryActionButton?: boolean`
- `mobilePrimaryActionButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>`

### Active item

- `defaultActiveItem?: string | null`
- `activeItem?: string | null`
- `onActiveItemChange?: (item: string | null) => void`

### Topbar

- `topbar?: ReactNode` — required for any sticky top bar; without it, `rightActions` and top-level `TopbarV2` are not mounted.
- `merchantInfo?: MerchantInfo`
- `rightActions?: ReactNode` — only applies when `topbar` is set.
- `enableTopbarAutoHide?: boolean`
- `defaultIsTopbarVisible?: boolean` (default: `true`)
- `isTopbarVisible?: boolean`
- `onTopbarVisibilityChange?: (isVisible: boolean) => void`

---

## Types

### Directory (`DirectoryData`, `NavbarItem`)

Source: `packages/blend/lib/components/Directory/types.ts`

#### `DirectoryData`

- `label?: string`
- `items?: NavbarItem[]`
- `isCollapsible?: boolean`
- `defaultOpen?: boolean`

#### `NavbarItem`

- `label: string`
- `leftSlot?: ReactNode`
- `rightSlot?: ReactNode`
- `href?: string`
- `onClick?: () => void`
- `isSelected?: boolean` (optional controlled selection per item)
- `items?: NavbarItem[]` (nested children)
- `showOnMobile?: boolean` (controls inclusion in mobile dock)

### Secondary rail (`SecondarySidebarInfo`)

Source: `packages/blend/lib/components/SidebarV2/types.ts`

- `items: SecondarySidebarItem[]` (`label`, `value`, `icon`)
- `selected: string`
- `onSelect: (value: string) => void`
- `buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>`
- `footerSlot?: ReactNode`

---

## Behavior

### Desktop

- **Expanded**: when `data` has items, the primary sidebar renders full directory content. With no directory data, only optional chrome (for example the secondary rail) may show when expanded.
- **Collapsed (icon-only)**: when directory data exists, the primary sidebar becomes icon-only; tooltips show labels on hover.
- **Intermediate (hover preview)**: when collapsed, hovering can temporarily show an intermediate preview state (reported via `onSidebarStateChange('intermediate')`).

### Mobile / small screens

- The desktop sidebar column is hidden; the layout uses main content plus a **floating mobile navigation dock** when there are items with `showOnMobile: true` (derived from flattened directory data).
- The dock supports an optional primary action (`showMobilePrimaryActionButton` / `mobilePrimaryActionButtonProps`) and an overflow (“More”) expansion for additional items.

---

## Accessibility

- **Keyboard shortcut**: `sidebarCollapseKey` toggles expansion on **non-small** viewports when focus is not in an input, textarea, or `contenteditable` element (disabled on small screens where the desktop rail is hidden).
- **ARIA**:
    - Sidebar exposes an accessible label for navigation regions.
    - Toggle buttons use `aria-label`, `aria-expanded`, and `aria-controls` where applicable.
- **Tooltips**:
    - Icon-only mode uses `TooltipV2` for item labels.
    - Expanded mode uses single-line truncation with `TooltipV2` shown only when the label is actually truncated.

---

## Theming & Tokens

`SidebarV2` styling is driven by component tokens:

- `SIDEBARV2`: overall layout, widths, header/footer, secondary rail, hover preview shadow
- `MOBILE_NAVIGATION_V2`: floating dock surface + item anatomy
- `DIRECTORY`: directory item spacing/typography and icon-only padding
- `TOPBARV2`: topbar layout and visuals
- `TOOLTIPV2`: tooltip visuals used by truncation + icon-only mode

---

## Usage

```tsx
import { SidebarV2 } from '@juspay/blend-design-system'
import type { DirectoryData } from '@juspay/blend-design-system/components/Directory/types'

const data: DirectoryData[] = [
    {
        label: 'General',
        items: [
            { label: 'Home', onClick: () => {}, showOnMobile: true },
            {
                label: 'Team',
                items: [
                    { label: 'Members', onClick: () => {} },
                    { label: 'Invites', onClick: () => {} },
                ],
            },
        ],
    },
]

export function AppLayout() {
    return (
        <SidebarV2
            data={data}
            sidebarCollapseKey="/"
            topbar={<span>Page title</span>}
            rightActions={<button type="button">Save</button>}
        >
            <div>Page content</div>
        </SidebarV2>
    )
}
```
