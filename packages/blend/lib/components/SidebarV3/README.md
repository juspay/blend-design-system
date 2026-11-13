# SidebarV3

`SidebarV3` is the generic Blend shell for the signed-off Euler **Chin up (D)** design. It is exported separately from `SidebarV2`.

```tsx
import { SidebarV3 } from '@juspay/blend-design-system'
;<SidebarV3
    data={navigation}
    topStrip={<AccountControls />}
    sidebarSearch={<SearchTrigger />}
    merchantInfo={merchantInfo}
    showHierarchyLines
    activeItem="payments/orders"
>
    <OrdersPage />
</SidebarV3>
```

## Differences from SidebarV2

| Prop or behavior      | SidebarV2                                                | SidebarV3                                                                    |
| --------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Top strip             | Consumer must wrap the component                         | `topStrip` slot; 48px strip and rounded inner surface                        |
| Search below merchant | No slot; `sidebarTopSlot` replaces the merchant selector | `sidebarSearch` appears after the header and before Directory                |
| Height                | Defaults to `100dvh`                                     | Outer frame defaults to `100dvh`; inner surface fills the remaining height   |
| Navigation appearance | V2 tokens                                                | `SIDEBARV3` tokens and scoped D styling                                      |
| Nested disclosure     | Content mounts and unmounts                              | V3 keeps the nested list inert while closed so it can animate open and close |
| Mobile                | `showOnMobile` items form the mobile navigation          | Same navigation, with the top strip still visible                            |
| Collapse shortcut     | `/` by default                                           | `[` by default, leaving `/` available for app search                         |

All other SidebarV2 props are accepted. `topbar` stays optional and renders inside the rounded surface; the signed-off D design omits it. `topStrip` only places content: apps own their logo, account actions, permissions, and click handlers. Likewise, `sidebarSearch` places an app-owned control; apps own search results, keyboard shortcut, modal, and routing. Use stable `id` values on navigation items when labels can repeat; `activeItem` and `defaultExpandedItems` use item paths.

The Storybook navigation and merchant values are preview fixtures, like the SidebarV2 stories. SidebarV3 does not ship those values. The strip, sidebar surface, separator, hierarchy guide, merchant trigger spacing, and disclosure motion use `SIDEBARV3` tokens; applications can override those tokens through the theme.

The current Blend source and Euler's installed package differ. Euler must upgrade to a release containing V3 before replacing its `/dashboard` shell. The Juspay Portal additionally needs matching generated ReScript bindings and a separate adapter/feature-flag migration.
