import { cloneElement, useCallback, useContext } from 'react'
import type { ReactElement } from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
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
 * The offset reaches the sheet's gesture through a plain JS scroll handler
 * writing a shared value (a Reanimated `useAnimatedScrollHandler` object
 * would crash a plain FlatList, whose VirtualizedList internals call
 * `props.onScroll(e)` directly) — one frame of latency, irrelevant for
 * at-top detection. The child's own `onScroll` still runs; its
 * `scrollEventThrottle` is set to 16. Outside a sheet the child renders
 * unchanged.
 */
export function BottomSheetScrollable({
    children,
}: {
    /** Exactly one scrollable element. */
    children: ReactElement<{
        onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
        scrollEventThrottle?: number
    }>
}) {
    const sheet = useContext(SheetGestureContext)
    const childOnScroll = children.props.onScroll

    const onScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (sheet) {
                sheet.scrollOffsetY.value = event.nativeEvent.contentOffset.y
            }
            childOnScroll?.(event)
        },
        [sheet, childOnScroll]
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
