import { describe, it, expect } from 'vitest'
import {
    computeAnchoredPosition,
    computeArrowAlignedPosition,
    computeArrowPosition,
    type AnchoredPositionInput,
} from '../src/overlay/positioning'

/**
 * The pure placement engine behind every anchored overlay (menu, popover,
 * tooltip, select). Viewport is a 400x800 phone unless a case says
 * otherwise; the anchor is a 100x40 control.
 */

const base: AnchoredPositionInput = {
    anchor: { x: 150, y: 300, width: 100, height: 40 },
    content: { width: 200, height: 150 },
    viewport: { width: 400, height: 800 },
    offset: 8,
    viewportPadding: 8,
}

describe('computeAnchoredPosition', () => {
    it('places below the anchor by default, aligned to its start', () => {
        const p = computeAnchoredPosition(base)
        expect(p.placement).toBe('bottom')
        expect(p.y).toBe(300 + 40 + 8)
        expect(p.x).toBe(150)
    })

    it.each([
        ['top', 150, 300 - 8 - 150],
        ['bottom', 150, 300 + 40 + 8],
    ] as const)('honours vertical placement %s', (placement, x, y) => {
        const p = computeAnchoredPosition({ ...base, placement })
        expect(p.placement).toBe(placement)
        expect(p.x).toBe(x)
        expect(p.y).toBe(y)
    })

    it('honours horizontal placements', () => {
        const left = computeAnchoredPosition({
            ...base,
            placement: 'left',
            content: { width: 120, height: 60 },
        })
        expect(left.placement).toBe('left')
        expect(left.x).toBe(150 - 8 - 120)
        expect(left.y).toBe(300)

        const right = computeAnchoredPosition({
            ...base,
            placement: 'right',
            content: { width: 120, height: 60 },
        })
        expect(right.x).toBe(150 + 100 + 8)
    })

    it.each([
        ['center', 150 + (100 - 200) / 2],
        ['end', 150 + 100 - 200],
    ] as const)('aligns %s along the cross axis', (alignment, expectedX) => {
        const p = computeAnchoredPosition({ ...base, alignment })
        // The engine still clamps into the viewport afterwards.
        expect(p.x).toBe(Math.max(8, expectedX))
    })

    it('flips to the top when the bottom cannot fit but the top can', () => {
        const p = computeAnchoredPosition({
            ...base,
            anchor: { ...base.anchor, y: 700 }, // 52pt below, 692 above
        })
        expect(p.placement).toBe('top')
        expect(p.y).toBe(700 - 8 - 150)
    })

    it('keeps the preferred side when neither fits but it has more room', () => {
        const p = computeAnchoredPosition({
            ...base,
            content: { width: 200, height: 700 },
            anchor: { ...base.anchor, y: 300 }, // 444 below vs 284 above
        })
        expect(p.placement).toBe('bottom')
        // And reports the space actually available so the caller can cap.
        expect(p.maxHeight).toBe(800 - (300 + 40) - 8 - 8)
    })

    it('clamps the cross axis into the viewport padding', () => {
        const nearEdge = computeAnchoredPosition({
            ...base,
            anchor: { x: 380, y: 300, width: 16, height: 40 },
        })
        expect(nearEdge.x).toBe(400 - 8 - 200)

        const pastStart = computeAnchoredPosition({
            ...base,
            anchor: { x: 2, y: 300, width: 16, height: 40 },
            alignment: 'end', // wants x = 2 + 16 - 200 = -182
        })
        expect(pastStart.x).toBe(8)
    })

    it('reports maxWidth for horizontal placements', () => {
        const p = computeAnchoredPosition({
            ...base,
            placement: 'right',
            content: { width: 300, height: 60 },
            anchor: { x: 20, y: 300, width: 40, height: 40 },
        })
        // 400 - 60 - 8 offset - 8 padding of space on the right
        expect(p.maxWidth).toBe(400 - (20 + 40) - 8 - 8)
    })

    it('never returns negative available space', () => {
        const p = computeAnchoredPosition({
            ...base,
            anchor: { x: 0, y: 790, width: 100, height: 40 }, // hangs off-screen
        })
        expect(p.maxHeight).toBeGreaterThanOrEqual(0)
        expect(p.maxWidth).toBeGreaterThanOrEqual(0)
        expect(Number.isFinite(p.x)).toBe(true)
        expect(Number.isFinite(p.y)).toBe(true)
    })

    it('survives a viewport smaller than the content', () => {
        const p = computeAnchoredPosition({
            anchor: { x: 10, y: 10, width: 50, height: 20 },
            content: { width: 500, height: 900 },
            viewport: { width: 320, height: 480 },
        })
        // Pins to the leading padding instead of producing NaN/negatives.
        expect(p.x).toBe(8)
        expect(p.y).toBe(8)
    })
})

describe('computeArrowPosition', () => {
    const anchor = { x: 150, y: 300, width: 100, height: 40 }
    const content = { width: 200, height: 150 }
    const arrowSize = 6

    it('projects the anchor center onto the top edge for bottom placement', () => {
        // Anchor center x = 200; content at x=150 -> arrow center at 50.
        expect(
            computeArrowPosition({
                anchor,
                contentPosition: { x: 150, y: 348 },
                content,
                placement: 'bottom',
                arrowSize,
            })
        ).toEqual({ x: 50, y: 0 })
    })

    it('sits on the bottom edge for top placement', () => {
        expect(
            computeArrowPosition({
                anchor,
                contentPosition: { x: 150, y: 142 },
                content,
                placement: 'top',
                arrowSize,
            })
        ).toEqual({ x: 50, y: 150 })
    })

    it('sits on the vertical edges for left/right placements', () => {
        // Anchor center y = 320; content at y=280 -> arrow center at 40.
        expect(
            computeArrowPosition({
                anchor,
                contentPosition: { x: 258, y: 280 },
                content,
                placement: 'right',
                arrowSize,
            })
        ).toEqual({ x: 0, y: 40 })
        expect(
            computeArrowPosition({
                anchor,
                contentPosition: { x: -58, y: 280 },
                content,
                placement: 'left',
                arrowSize,
            })
        ).toEqual({ x: 200, y: 40 })
    })

    it('clamps inside the rounded corners when the content is shifted', () => {
        // Content clamped far right of the anchor: projection would land at
        // x = -50, held at arrowSize instead.
        expect(
            computeArrowPosition({
                anchor,
                contentPosition: { x: 250, y: 348 },
                content,
                placement: 'bottom',
                arrowSize,
            })
        ).toEqual({ x: arrowSize, y: 0 })
        // And at the far edge: projection past the width pins to
        // width - arrowSize.
        expect(
            computeArrowPosition({
                anchor,
                contentPosition: { x: -100, y: 348 },
                content,
                placement: 'bottom',
                arrowSize,
            })
        ).toEqual({ x: content.width - arrowSize, y: 0 })
    })

    it('degrades to the leading clamp for content narrower than two arrows', () => {
        expect(
            computeArrowPosition({
                anchor,
                contentPosition: { x: 195, y: 348 },
                content: { width: 8, height: 40 },
                placement: 'bottom',
                arrowSize,
            }).x
        ).toBe(arrowSize)
    })
})

describe('computeArrowAlignedPosition (the tooltip contract)', () => {
    const base = {
        anchor: { x: 150, y: 300, width: 100, height: 40 },
        content: { width: 200, height: 40 },
        viewport: { width: 400, height: 800 },
        offset: 8,
        viewportPadding: 8,
        arrowSize: 7,
    }
    const inset = Math.max(7 * 2, 12) // 14

    it('center: the tip sits mid-content, over the anchor center', () => {
        const r = computeArrowAlignedPosition({
            ...base,
            placement: 'top',
            alignment: 'center',
        })
        expect(r.arrow.x).toBe(100)
        // Content positioned so the tip lands on anchor center x = 200.
        expect(r.x + r.arrow.x).toBe(200)
        expect(r.arrow.y).toBe(base.content.height)
    })

    it('start: the tip sits near the leading edge', () => {
        const r = computeArrowAlignedPosition({
            ...base,
            placement: 'top',
            alignment: 'start',
        })
        expect(r.arrow.x).toBe(inset)
        expect(r.x + r.arrow.x).toBe(200)
    })

    it('end: the tip sits near the trailing edge', () => {
        const r = computeArrowAlignedPosition({
            ...base,
            placement: 'top',
            alignment: 'end',
        })
        expect(r.arrow.x).toBe(base.content.width - inset)
        expect(r.x + r.arrow.x).toBe(200)
    })

    it('clamps the content to the viewport while the tip stays put', () => {
        const r = computeArrowAlignedPosition({
            ...base,
            anchor: { x: 0, y: 300, width: 20, height: 40 },
            placement: 'top',
            alignment: 'end',
        })
        // Anchor center 10; unclamped x would be 10 - 186 < 0.
        expect(r.x).toBe(8)
        expect(r.arrow.x).toBe(base.content.width - inset)
    })

    it('horizontal placements arrow-align on the y axis', () => {
        const r = computeArrowAlignedPosition({
            ...base,
            content: { width: 120, height: 200 },
            placement: 'right',
            alignment: 'start',
        })
        expect(r.arrow.y).toBe(inset)
        expect(r.y + r.arrow.y).toBe(320)
        expect(r.arrow.x).toBe(0)
    })
})
