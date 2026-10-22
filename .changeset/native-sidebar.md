---
'blend-native': minor
---

Add a native `Sidebar` component — a collapsible nav rail on wide screens, a `SideDrawer`-based slide-in drawer on narrow ones (768px breakpoint), both driven by the same section/item data. Nested items expand in place rather than flying out; there is no hover-preview state, topbar, or tenant-switcher rail in this pass (see the component's docblock for the full list of deliberate divergences from web's `SidebarV2`).

Deliberately **not** built on Blend's token system (`useNativeTokens`) — `SidebarV2`/`Directory`'s tokens describe a much larger system this component doesn't implement, and porting a slice of them read as generic rather than as this product's actual sidebar. Instead, `sidebar.theme.ts` hardcodes a small, self-contained set of constants and colours modelled on shadcn/ui's `Sidebar` — a widely-used, well-designed reference implementation for exactly this kind of component.

`SideDrawer`, the horizontal counterpart to `BottomSheet` (edge-anchored slide-in, drag-to-dismiss, backdrop), is exported alongside it for consumer-built drawers.
