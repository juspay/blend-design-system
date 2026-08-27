import type { useAnimatedScrollHandler } from 'react-native-reanimated'

/**
 * The handler `useHideOnScroll` produces, threaded down to whichever view is
 * scrolling. Named here so `Playground` and `Gallery` do not both have to
 * spell out Reanimated's return type.
 */
export type ScrollHandler = ReturnType<typeof useAnimatedScrollHandler>
