# Sidebar (SidebarV2) Documentation

## Overview

`SidebarV2` is the V2 sidebar layout component for the Blend design system. It composes:

- **Primary sidebar**: directory navigation rendered from `DirectoryData[]`
- **Optional secondary sidebar rail**: `secondarySidebar` (tenant / top-level switcher)
- **Topbar**: via `TopbarV2` integration (auto-hide optional)
- **Mobile navigation dock** (small screens): derived from `NavbarItem.showOnMobile`

`SidebarV2` is token-driven (via `SIDEBARV2`, `MOBILE_NAVIGATION_V2`, `DIRECTORY`, `TOPBARV2`, `TOOLTIPV2`) and supports controlled/uncontrolled state for expansion and active navigation selection.

---

## Requirements

- **Navigation data**: pass `data?: DirectoryData[] | null`
    - `null`/`undefined` is safe and renders an empty navigation.
- **Secondary rail (optional)**: pass `secondarySidebar?: SecondarySidebarInfo`
    - Rail items render from `secondarySidebar.items`
    - Bottom actions render via `secondarySidebar.footerSlot`
- **Mobile**:
    - Mobile dock items are derived from `NavbarItem.showOnMobile === true`
    - Optional `showPrimaryActionButton` and `primaryActionButtonProps`
- **Expand/collapse**:
    - Uncontrolled: `defaultIsExpanded`
    - Controlled: `isExpanded` + `onExpandedChange`
- **Active item selection**:
    - Uncontrolled: `defaultActiveItem`
    - Controlled: `activeItem` + `onActiveItemChange`
- **Topbar**:
    - Slot: `topbar?: ReactNode`
    - Auto-hide: `enableTopbarAutoHide?: boolean`
    - Controlled visibility: `isTopbarVisible` + `onTopbarVisibilityChange`

---

## Anatomy

```
┌───────────────────────────────────────────────────────────────────────┐
│ TopbarV2 (sticky)                                                     │
├───────────────────────────────────────────────────────────────────────┤
│ ┌───────────────┐ ┌───────────────────────────────────────────────┐   │
│ │ SecondaryRail │ │ PrimarySidebar (Directory)                     │   │
│ │ (optional)    │ │ - Sections                                     │   │
│ │ - items       │ │ - Items (single-line truncate + tooltip on hover)│  │
│ │ - footerSlot  │ │ - Nested items (collapsible)                   │   │
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

- `data?: DirectoryData[] | null`
- `secondarySidebar?: SecondarySidebarInfo`

### Expand / collapse

- `sidebarCollapseKey?: string` (default: `/`)
- `defaultIsExpanded?: boolean` (default: `true`)
- `isExpanded?: boolean`
- `onExpandedChange?: (isExpanded: boolean) => void`
- `onSidebarStateChange?: (state: 'collapsed' | 'expanded' | 'intermediate') => void`

### Mobile dock

- `showPrimaryActionButton?: boolean`
- `primaryActionButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>`

### Active item

- `defaultActiveItem?: string | null`
- `activeItem?: string | null`
- `onActiveItemChange?: (item: string | null) => void`

### Topbar

- `topbar?: ReactNode`
- `merchantInfo?: MerchantInfo`
- `rightActions?: ReactNode`
- `enableTopbarAutoHide?: boolean`
- `defaultIsTopbarVisible?: boolean` (default: `true`)
- `isTopbarVisible?: boolean`
- `onTopbarVisibilityChange?: (isVisible: boolean) => void`

---

## Types (Data Model)

Source: `packages/blend/lib/components/Directory/types.ts`

### `DirectoryData`

- `label?: string`
- `items?: NavbarItem[]`
- `isCollapsible?: boolean`
- `defaultOpen?: boolean`

### `NavbarItem`

- `label: string`
- `leftSlot?: ReactNode`
- `rightSlot?: ReactNode`
- `href?: string`
- `onClick?: () => void`
- `isSelected?: boolean` (optional controlled selection per item)
- `items?: NavbarItem[]` (nested children)
- `showOnMobile?: boolean` (controls inclusion in mobile dock)

---

## Behavior

### Desktop

- **Expanded**: primary sidebar renders full directory content.
- **Collapsed (icon-only)**: primary sidebar becomes icon-only; tooltips show labels on hover.
- **Intermediate (hover preview)**: when collapsed, hovering can temporarily show an intermediate preview state (reported via `onSidebarStateChange('intermediate')`).

### Mobile / small screens

- Sidebar auto-collapses and renders a **floating mobile navigation dock** when there are items with `showOnMobile: true`.
- The dock supports an optional primary action button and an overflow (“More”) expansion for additional items.

---

## Accessibility

- **Keyboard shortcut**: `sidebarCollapseKey` toggles expansion when focus is not in an input/textarea/contenteditable element.
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
        <SidebarV2 data={data} sidebarCollapseKey="/">
            <div>Page content</div>
        </SidebarV2>
    )
}
```
