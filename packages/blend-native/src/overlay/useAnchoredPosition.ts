import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    useWindowDimensions,
    type LayoutChangeEvent,
    type View,
} from 'react-native'
import {
    computeAnchoredPosition,
    computeArrowPosition,
    type Alignment,
    type AnchoredPosition,
    type Placement,
    type Rect,
    type Size,
} from './positioning'
import { useKeyboardHeight } from './useKeyboardHeight'

/**
 * Measurement plumbing for `computeAnchoredPosition`.
 *
 * Wires the three inputs the pure engine needs: the anchor's window rect
 * (`measureInWindow`), the floating content's size (its `onLayout`), and
 * the window size — reduced by the soft keyboard's height so content flips
 * and clamps above it.
 *
 * Re-measure philosophy: the overlay components render a touch-capturing
 * backdrop while open, so nothing can scroll under an open overlay — the
 * anchor only moves on rotation or when the keyboard changes the window.
 * The anchor is measured when `open` flips true and re-measured on
 * window-dimension or keyboard changes while open; `remeasure()` covers
 * anything exotic. There is no RN ResizeObserver, and polling would burn
 * battery for a case the backdrop already prevents.
 *
 * ```tsx
 * const { anchorRef, onContentLayout, position, arrow } =
 *     useAnchoredPosition({ open, placement: 'bottom', arrowSize: 6 })
 *
 * <Pressable ref={anchorRef} onPress={open} />
 * <Portal>
 *   <View
 *     onLayout={onContentLayout}
 *     style={position && {
 *       position: 'absolute', left: position.x, top: position.y,
 *       maxHeight: position.maxHeight, opacity: 1,
 *     }}
 *   />
 * </Portal>
 * ```
 *
 * `position` is `null` until both measurements land — render the content
 * transparent (not unmounted, or `onLayout` never fires) until then.
 * `arrow` is `null` unless `arrowSize` is set; it is the arrow's center in
 * content-local coordinates (`computeArrowPosition`).
 */
export function useAnchoredPosition(options: {
    /** Whether the overlay is presented — measurement follows this. */
    open: boolean
    placement?: Placement
    alignment?: Alignment
    offset?: number
    viewportPadding?: number
    /** Edge length of the arrow square; enables the `arrow` result. */
    arrowSize?: number
}) {
    const { open, placement, alignment, offset, viewportPadding, arrowSize } =
        options
    const anchorRef = useRef<View>(null)
    const [anchorRect, setAnchorRect] = useState<Rect | null>(null)
    const [contentSize, setContentSize] = useState<Size | null>(null)
    const viewport = useWindowDimensions()
    const keyboard = useKeyboardHeight()

    /** Re-measure the anchor now — for anchors that move in exotic ways. */
    const remeasure = useCallback(() => {
        anchorRef.current?.measureInWindow((x, y, width, height) => {
            setAnchorRect({ x, y, width, height })
        })
    }, [])

    // Measure on open; re-measure on rotation/keyboard while open; drop the
    // stale rect on close so the next open cannot flash at the old spot.
    useEffect(() => {
        if (open) {
            remeasure()
        } else {
            setAnchorRect(null)
            setContentSize(null)
        }
    }, [open, remeasure, viewport.width, viewport.height, keyboard.height])

    const onContentLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout
        setContentSize((previous) =>
            previous?.width === width && previous?.height === height
                ? previous
                : { width, height }
        )
    }, [])

    const position = useMemo<AnchoredPosition | null>(() => {
        if (!anchorRect || !contentSize) return null
        return computeAnchoredPosition({
            anchor: anchorRect,
            content: contentSize,
            viewport: {
                width: viewport.width,
                height: Math.max(0, viewport.height - keyboard.height),
            },
            placement,
            alignment,
            offset,
            viewportPadding,
        })
    }, [
        anchorRect,
        contentSize,
        viewport.width,
        viewport.height,
        keyboard.height,
        placement,
        alignment,
        offset,
        viewportPadding,
    ])

    const arrow = useMemo(() => {
        if (!position || !anchorRect || !contentSize || !arrowSize) return null
        return computeArrowPosition({
            anchor: anchorRect,
            contentPosition: { x: position.x, y: position.y },
            content: contentSize,
            placement: position.placement,
            arrowSize,
        })
    }, [position, anchorRect, contentSize, arrowSize])

    return { anchorRef, onContentLayout, position, arrow, remeasure }
}
