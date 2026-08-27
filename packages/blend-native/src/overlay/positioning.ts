/**
 * Anchored-overlay positioning.
 *
 * The native replacement for what Radix/floating-ui do on web: place a
 * floating box (menu, popover, tooltip, select list) against an anchor
 * rect, flipping to the opposite side when space runs out and clamping
 * into the viewport.
 *
 * Pure and RN-free — rects in, a position out — so the whole placement
 * matrix is unit-testable under vitest. `useAnchoredPosition` layers the
 * measurement plumbing on top.
 */

export type Rect = { x: number; y: number; width: number; height: number }
export type Size = { width: number; height: number }

/** Which side of the anchor the content prefers. */
export type Placement = 'top' | 'bottom' | 'left' | 'right'

/** Alignment along the anchor's other axis. */
export type Alignment = 'start' | 'center' | 'end'

export type AnchoredPositionInput = {
    /** The anchor's rect in window coordinates (`measureInWindow`). */
    anchor: Rect
    /** The floating content's measured size. */
    content: Size
    /** The window size (`useWindowDimensions`). */
    viewport: Size
    placement?: Placement
    alignment?: Alignment
    /** Gap between anchor and content, in points. */
    offset?: number
    /** Minimum distance kept from every viewport edge, in points. */
    viewportPadding?: number
}

export type AnchoredPosition = {
    x: number
    y: number
    /** The placement actually used, after any flip. */
    placement: Placement
    /**
     * Space available for the content on the resolved side, after padding.
     * Callers cap scrollable content (menus, select lists) with these so a
     * long list scrolls instead of overflowing the screen.
     */
    maxHeight: number
    maxWidth: number
}

const opposite: Record<Placement, Placement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
}

/** Space between the anchor and the viewport edge on one side. */
function spaceOn(
    side: Placement,
    anchor: Rect,
    viewport: Size,
    offset: number,
    padding: number
): number {
    switch (side) {
        case 'top':
            return anchor.y - offset - padding
        case 'bottom':
            return (
                viewport.height - (anchor.y + anchor.height) - offset - padding
            )
        case 'left':
            return anchor.x - offset - padding
        case 'right':
            return viewport.width - (anchor.x + anchor.width) - offset - padding
    }
}

const clamp = (value: number, min: number, max: number) =>
    // A viewport smaller than the padding produces min > max; the lower
    // bound wins so content pins to the leading edge instead of NaN-ing.
    Math.max(min, Math.min(value, Math.max(min, max)))

/**
 * Compute where to place floating content against an anchor.
 *
 * - **Flip**: when the preferred side cannot fit the content but the
 *   opposite side can fit more of it, the placement flips.
 * - **Clamp**: the cross-axis position shifts to keep the content inside
 *   the viewport padding (matching floating-ui's `shift`).
 * - **Cap**: `maxHeight`/`maxWidth` report the space actually available on
 *   the resolved side, so scrollable content can cap itself.
 */
export function computeAnchoredPosition(
    input: AnchoredPositionInput
): AnchoredPosition {
    const {
        anchor,
        content,
        viewport,
        placement: preferred = 'bottom',
        alignment = 'start',
        offset = 8,
        viewportPadding = 8,
    } = input

    const preferredSpace = spaceOn(
        preferred,
        anchor,
        viewport,
        offset,
        viewportPadding
    )
    const isVertical = preferred === 'top' || preferred === 'bottom'
    const needed = isVertical ? content.height : content.width

    let placement = preferred
    if (needed > preferredSpace) {
        const other = spaceOn(
            opposite[preferred],
            anchor,
            viewport,
            offset,
            viewportPadding
        )
        if (other > preferredSpace) placement = opposite[preferred]
    }

    // ---- Main axis ------------------------------------------------------
    let x = 0
    let y = 0
    switch (placement) {
        case 'top':
            y = anchor.y - offset - content.height
            break
        case 'bottom':
            y = anchor.y + anchor.height + offset
            break
        case 'left':
            x = anchor.x - offset - content.width
            break
        case 'right':
            x = anchor.x + anchor.width + offset
            break
    }

    // ---- Cross axis -----------------------------------------------------
    const alignAlong = (
        anchorStart: number,
        anchorLength: number,
        contentLength: number
    ) => {
        if (alignment === 'start') return anchorStart
        if (alignment === 'end')
            return anchorStart + anchorLength - contentLength
        return anchorStart + (anchorLength - contentLength) / 2
    }

    if (placement === 'top' || placement === 'bottom') {
        x = alignAlong(anchor.x, anchor.width, content.width)
    } else {
        y = alignAlong(anchor.y, anchor.height, content.height)
    }

    // ---- Keep inside the viewport ---------------------------------------
    x = clamp(
        x,
        viewportPadding,
        viewport.width - viewportPadding - content.width
    )
    y = clamp(
        y,
        viewportPadding,
        viewport.height - viewportPadding - content.height
    )

    const available = spaceOn(
        placement,
        anchor,
        viewport,
        offset,
        viewportPadding
    )
    const maxHeight =
        placement === 'top' || placement === 'bottom'
            ? Math.max(0, available)
            : Math.max(0, viewport.height - 2 * viewportPadding)
    const maxWidth =
        placement === 'left' || placement === 'right'
            ? Math.max(0, available)
            : Math.max(0, viewport.width - 2 * viewportPadding)

    return { x, y, placement, maxHeight, maxWidth }
}

export type ArrowPositionInput = {
    /** The anchor's rect in window coordinates. */
    anchor: Rect
    /** Where the content ended up (`computeAnchoredPosition`'s x/y). */
    contentPosition: { x: number; y: number }
    /** The content's measured size. */
    content: Size
    /** The placement actually used, after any flip. */
    placement: Placement
    /** Edge length of the square rendered as the arrow (pre-rotation). */
    arrowSize: number
}

/**
 * Where the arrow sits on the content's anchor-facing edge, as the arrow's
 * **center point in content-local coordinates**: the anchor's center is
 * projected onto that edge and clamped inward by `arrowSize` so the arrow
 * never escapes past the rounded corners. The caller renders a 45°-rotated
 * square centered on the returned point, straddling the edge.
 */
export function computeArrowPosition(input: ArrowPositionInput): {
    x: number
    y: number
} {
    const { anchor, contentPosition, content, placement, arrowSize } = input
    const anchorCenterX = anchor.x + anchor.width / 2
    const anchorCenterY = anchor.y + anchor.height / 2

    if (placement === 'top' || placement === 'bottom') {
        // Arrow on the bottom edge when content sits above the anchor, on
        // the top edge when below.
        const y = placement === 'top' ? content.height : 0
        const x = clamp(
            anchorCenterX - contentPosition.x,
            arrowSize,
            content.width - arrowSize
        )
        return { x, y }
    }

    const x = placement === 'left' ? content.width : 0
    const y = clamp(
        anchorCenterY - contentPosition.y,
        arrowSize,
        content.height - arrowSize
    )
    return { x, y }
}
