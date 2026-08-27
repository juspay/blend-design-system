import type { useAnimatedScrollHandler } from 'react-native-reanimated'

/**
 * The handler `useHideOnScroll` produces, threaded down to the scrolling
 * view. Named here so callers do not have to spell out Reanimated's return
 * type, which is not exported under a friendly name.
 */
export type ScrollHandler = ReturnType<typeof useAnimatedScrollHandler>
