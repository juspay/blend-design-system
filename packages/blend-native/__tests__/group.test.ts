import { describe, it, expect } from 'vitest'
import {
    getGroupedBorderRadius,
    getGroupedBorderWidths,
    getGroupPosition,
} from '../src/components/shared/group'

describe('getGroupedBorderRadius', () => {
    it('leaves an ungrouped control untouched', () => {
        expect(getGroupedBorderRadius('10px', undefined)).toBe('10px')
    })

    it('keeps only the outward corners for the end caps', () => {
        expect(getGroupedBorderRadius('10px', 'left')).toBe('10px 0 0 10px')
        expect(getGroupedBorderRadius('10px', 'right')).toBe('0 10px 10px 0')
    })

    it('squares every corner for interior members', () => {
        expect(getGroupedBorderRadius('10px', 'center')).toBe('0px 0px 0px 0px')
    })

    it('accepts a numeric radius', () => {
        expect(getGroupedBorderRadius(10, 'left')).toBe('10 0 0 10')
    })
})

describe('getGroupedBorderWidths', () => {
    // Regression: without this, adjacent grouped controls each drew their own
    // border on the shared edge, so every seam rendered double width. Web
    // avoids it in `getButtonBorderStyles` by setting borderLeft/borderRight
    // to 'none' for the centre position.
    it('drops the shared edges for interior members', () => {
        expect(getGroupedBorderWidths('center')).toEqual({
            borderLeftWidth: 0,
            borderRightWidth: 0,
        })
    })

    it.each([[undefined], ['left' as const], ['right' as const]])(
        'leaves %s fully bordered',
        (position) => {
            expect(getGroupedBorderWidths(position)).toEqual({})
        }
    )

    it('composes over a resolved surface without clobbering other sides', () => {
        // The overlay is spread after the surface, so `borderWidth` still
        // covers top and bottom.
        const composed = {
            borderWidth: 1,
            ...getGroupedBorderWidths('center'),
        }
        expect(composed.borderWidth).toBe(1)
        expect(composed.borderLeftWidth).toBe(0)
        expect(composed.borderRightWidth).toBe(0)
    })
})

describe('getGroupPosition', () => {
    it('gives a lone member no position, so it keeps its full radius', () => {
        expect(getGroupPosition(0, 1)).toBeUndefined()
        expect(getGroupPosition(0, 0)).toBeUndefined()
    })

    it('splits a pair into the two end caps', () => {
        expect(getGroupPosition(0, 2)).toBe('left')
        expect(getGroupPosition(1, 2)).toBe('right')
    })

    it('marks every interior member center', () => {
        expect(getGroupPosition(0, 4)).toBe('left')
        expect(getGroupPosition(1, 4)).toBe('center')
        expect(getGroupPosition(2, 4)).toBe('center')
        expect(getGroupPosition(3, 4)).toBe('right')
    })
})
