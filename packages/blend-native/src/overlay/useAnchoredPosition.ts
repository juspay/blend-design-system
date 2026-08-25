import { useCallback, useMemo, useRef, useState } from 'react'
import {
    useWindowDimensions,
    type LayoutChangeEvent,
    type View,
} from 'react-native'
import {
    computeAnchoredPosition,
    type Alignment,
    type AnchoredPosition,
    type Placement,
    type Rect,
    type Size,
} from './positioning'

/**
 * Measurement plumbing for `computeAnchoredPosition`.
 *
 * Wires the three inputs the pure engine needs: the anchor's window rect
 * (`measureInWindow`, taken when the overlay opens), the floating content's
 * size (its `onLayout`), and the window size (re-renders on rotation).
 *
 * ```tsx
 * const { anchorRef, measureAnchor, onContentLayout, position } =
 *     useAnchoredPosition({ placement: 'bottom' })
 *
 * <Pressable ref={anchorRef} onPress={() => { measureAnchor(); open() }} />
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
 */
export function useAnchoredPosition(options?: {
    placement?: Placement
    alignment?: Alignment
    offset?: number
    viewportPadding?: number
}) {
    const anchorRef = useRef<View>(null)
    const [anchorRect, setAnchorRect] = useState<Rect | null>(null)
    const [contentSize, setContentSize] = useState<Size | null>(null)
    const viewport = useWindowDimensions()

    /** Call when opening (and after anything that moves the anchor). */
    const measureAnchor = useCallback(() => {
        anchorRef.current?.measureInWindow((x, y, width, height) => {
            setAnchorRect({ x, y, width, height })
        })
    }, [])

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
            viewport: { width: viewport.width, height: viewport.height },
            placement: options?.placement,
            alignment: options?.alignment,
            offset: options?.offset,
            viewportPadding: options?.viewportPadding,
        })
    }, [
        anchorRect,
        contentSize,
        viewport.width,
        viewport.height,
        options?.placement,
        options?.alignment,
        options?.offset,
        options?.viewportPadding,
    ])

    return { anchorRef, measureAnchor, onContentLayout, position }
}
