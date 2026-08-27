import { cloneElement, useContext } from 'react'
import type { ReactElement } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated'
import { SheetGestureContext } from './sheetGestureContext'

/**
 * Makes one scrollable (ScrollView, FlatList, SectionList) cooperate with
 * the `BottomSheet` drag: the list scrolls normally, and the sheet takes
 * over the drag only while the list sits at its top and the finger moves
 * downward — the vaul behaviour, and what every sheet-hosted list (Menu,
 * the Selects) needs.
 *
 * Wrap the scrollable directly:
 *
 * ```tsx
 * <BottomSheet open={open} onClose={close}>
 *     <BottomSheetScrollable>
 *         <FlatList data={rows} renderItem={renderRow} />
 *     </BottomSheetScrollable>
 * </BottomSheet>
 * ```
 *
 * The child's `onScroll` and `scrollEventThrottle` are replaced (the offset
 * has to reach the sheet's UI-thread gesture via a Reanimated handler) —
 * attach scroll listeners through `onMomentumScrollEnd`/`onScrollEndDrag`
 * instead. Outside a sheet the child renders unchanged.
 */
export function BottomSheetScrollable({
    children,
}: {
    /** Exactly one scrollable element. */
    children: ReactElement<{
        onScroll?: unknown
        scrollEventThrottle?: number
    }>
}) {
    const sheet = useContext(SheetGestureContext)
    // Hooks must run unconditionally; outside a sheet the handler writes to
    // this inert local value.
    const fallbackOffset = useSharedValue(0)
    const offset = sheet?.scrollOffsetY ?? fallbackOffset

    const onScroll = useAnimatedScrollHandler(
        (event) => {
            offset.value = event.contentOffset.y
        },
        [offset]
    )

    if (!sheet) return children

    const native = Gesture.Native().simultaneousWithExternalGesture(
        sheet.panGesture
    )

    return (
        <GestureDetector gesture={native}>
            {cloneElement(children, { onScroll, scrollEventThrottle: 16 })}
        </GestureDetector>
    )
}

BottomSheetScrollable.displayName = 'BottomSheetScrollable'

export default BottomSheetScrollable
