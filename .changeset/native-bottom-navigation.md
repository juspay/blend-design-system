---
'blend-native': minor
---

Add a native `BottomNavigation` component — a full-width tab bar docked to the bottom edge and padded by the safe-area inset. Items carry an icon, optional `activeIcon` and `Badge` count; selection is controllable (`activeItem`/`defaultActiveItem`/`onActiveItemChange`), and `onItemPress` fires for every press so an item marked `selectable: false` can act as an action (e.g. "More") instead of a destination. An optional `centerAction` renders a raised circular button between the two halves (or `centerGap` reserves an empty one), `background` draws a custom shape behind the bar (e.g. a notch), and `tokens` overrides its colours and item metrics per instance.

Light and dark palettes in `bottomNavigation.theme.ts` read straight from `FOUNDATION_THEME`; there is no web counterpart to port a token slot from.
