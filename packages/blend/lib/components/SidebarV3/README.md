# SidebarV3

`SidebarV3` is the generic Blend shell for the signed-off Euler **Chin up (D)** design. It is exported separately from `SidebarV2`.

```tsx
import { SidebarV3 } from '@juspay/blend-design-system'
;<SidebarV3
    data={navigation}
    topStrip={<AccountControls />}
    topStripLabel="Account controls"
    sidebarSearch={<SearchTrigger />}
    merchantInfo={merchantInfo}
    showHierarchyLines
    activeItem="payments/orders"
>
    <OrdersPage />
</SidebarV3>
```

## Differences from SidebarV2

| Prop or behavior      | SidebarV2                                                | SidebarV3                                                                      |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Top strip             | Consumer must wrap the component                         | `topStrip` slot; 48px strip and rounded inner surface                          |
| Search below merchant | No slot; `sidebarTopSlot` replaces the merchant selector | `sidebarSearch` appears after the header and before Directory                  |
| Height                | Defaults to `100dvh`                                     | Outer frame defaults to `100dvh`; inner surface fills the remaining height     |
| Navigation appearance | V2 tokens                                                | `SIDEBARV3` tokens passed to Directory through its appearance provider         |
| Nested disclosure     | Content mounts and unmounts                              | V3 keeps the nested list mounted while closed so it can animate open and close |
| Mobile                | `showOnMobile` items form the mobile navigation          | Same navigation, with the top strip still visible                              |
| Collapse shortcut     | `/` by default                                           | `/` by default; override `sidebarCollapseKey` for app shortcuts                |

The signed-off Euler D demo uses `sidebarCollapseKey="["`; pass the same prop to use `[` in an app. Shortcuts are ignored while typing in an input or textarea.

All other SidebarV2 props are accepted. `topbar` stays optional and renders inside the rounded surface; the signed-off D design omits it. `topStrip` only places content: apps own their logo, account actions, permissions, and click handlers. Likewise, `sidebarSearch` places an app-owned control; apps own search results, keyboard shortcut, modal, and routing. Use stable `id` values on navigation items when labels can repeat; `activeItem` and `defaultExpandedItems` use item paths.

Set `topStripLabel` to a localized name when the strip needs an accessible landmark name. V3 places a separator before every section after the first, including labeled sections. The 150ms disclosure and 200ms row feedback durations, plus their easing, are Euler D design values because Foundation has no motion scale yet.

The Storybook navigation and merchant values are preview fixtures, like the SidebarV2 stories. SidebarV3 does not ship those values. The strip, surface, separator, hierarchy guide, selected/hover states, and disclosure motion use `SIDEBARV3` tokens. V3 passes its navigation values explicitly to Directory; override `SIDEBARV3` for V3-specific states. Other Directory values continue to come from the consumer's `DIRECTORY` tokens.

When `enableVirtualization` is true, Directory uses its virtualized renderer and nested disclosure motion is disabled. Navigation and selection still work.
