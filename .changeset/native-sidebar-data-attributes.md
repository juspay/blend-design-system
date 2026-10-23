---
'blend-native': minor
---

`Sidebar` now renders the same `data-*` attributes as web's `Sidebar`/`Directory` on react-native-web, so selectors and automation written against the web sidebar work unchanged: `data-sidebar` and `data-status` (`expanded`/`collapsed`/`intermediate`) on the root, `data-icon="sidebar-hamburger"` on the toggle, `data-element="sidebar-section"` with `data-id`/`data-status`/`data-state` on sections, and `data-element="sidebar-sub-section"` with `data-id`/`data-status`/`data-path-state`/`data-sidebar-expanded` on rows. Nothing changes on iOS/Android.

New props: `isPreviewing` reports a host-driven preview (e.g. hover over a collapsed rail) as `data-status="intermediate"` without changing the visuals, and `dataSet` on `SidebarSectionData`/`SidebarNavItem` adds consumer `data-*` attributes (built-in ones always win). Exports the `SidebarDataSet`, `SidebarStatus` and `SidebarItemVisualState` types.

Section headers now display upper-cased, as web `Directory` renders them; `data-id` and the accessible name keep the label as given, so pass labels in their natural case.
