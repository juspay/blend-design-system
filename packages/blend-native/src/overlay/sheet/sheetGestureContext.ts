import { createContext } from 'react'
import type { PanGesture } from 'react-native-gesture-handler'
import type { SharedValue } from 'react-native-reanimated'

/**
 * Published by `BottomSheet` for `BottomSheetScrollable` below it: the
 * sheet's pan gesture (so the inner scroll gesture can run simultaneously
 * with it) and the shared scroll offset that gates whether the pan moves the
 * sheet or lets the list scroll. Internal — the pair only means anything
 * inside a sheet.
 */
export type SheetGestureValue = {
    panGesture: PanGesture
    scrollOffsetY: SharedValue<number>
}

export const SheetGestureContext = createContext<SheetGestureValue | null>(null)
