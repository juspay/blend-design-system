import { describe, it, expect } from 'vitest'
import { createElement, isValidElement } from 'react'
import { tintSlot } from '../src/primitives/tintSlot'

/**
 * `tintSlot` must set `color` and nothing else.
 *
 * Lucide icons are stroke-based: `defaultAttributes` sets `fill: "none"`, and
 * `Icon` spreads unknown props over both the root `Svg` and every child path
 * *after* those defaults. Supplying a `fill` therefore overrides `"none"` and
 * floods the glyph solid — an outlined X becomes a filled block. An earlier
 * version of this function set `fill` alongside `color`.
 */

// Stand-in for a lucide icon: declares fill="none", accepts color.
type StrokeIconProps = { color?: string; fill?: string; size?: number }
const StrokeIcon = (): null => null

describe('tintSlot', () => {
    it('sets color on an untinted element', () => {
        const out = tintSlot(
            createElement<StrokeIconProps>(StrokeIcon, { size: 16 }),
            '#FF0000'
        )
        expect(isValidElement(out)).toBe(true)
        expect(
            (out as React.ReactElement<{ color?: string }>).props.color
        ).toBe('#FF0000')
    })

    it('never sets fill, so stroke-based icons are not flooded solid', () => {
        const out = tintSlot(
            createElement<StrokeIconProps>(StrokeIcon, { fill: 'none' }),
            '#FF0000'
        )
        const props = (out as React.ReactElement<{ fill?: string }>).props
        expect(props.fill).toBe('none')
    })

    it('does not introduce a fill prop where there was none', () => {
        const out = tintSlot(
            createElement<StrokeIconProps>(StrokeIcon, {}),
            '#FF0000'
        )
        const props = (out as React.ReactElement<Record<string, unknown>>).props
        expect('fill' in props).toBe(false)
    })

    it('preserves an explicitly set colour', () => {
        const out = tintSlot(
            createElement<StrokeIconProps>(StrokeIcon, {
                color: 'rebeccapurple',
            }),
            '#FF0000'
        )
        expect(
            (out as React.ReactElement<{ color?: string }>).props.color
        ).toBe('rebeccapurple')
    })

    it('leaves other props untouched', () => {
        const out = tintSlot(
            createElement<StrokeIconProps>(StrokeIcon, { size: 24 }),
            '#FF0000'
        )
        expect((out as React.ReactElement<{ size?: number }>).props.size).toBe(
            24
        )
    })

    it.each([['a string'], [42], [null], [undefined]])(
        'returns non-element child %o untouched',
        (child) => {
            expect(tintSlot(child as React.ReactNode, '#FF0000')).toBe(child)
        }
    )

    it('is a no-op without a colour', () => {
        const node = createElement<StrokeIconProps>(StrokeIcon, {})
        expect(tintSlot(node, undefined)).toBe(node)
    })
})
