import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, renderHook, screen } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ROW_ANIMATION_WARNINGS,
    useRowFlip,
} from '../../../lib/components/DataTable/hooks/useRowFlip'
import {
    ColumnDefinition,
    ColumnType,
    type RowAnimationConfig,
} from '../../../lib/components/DataTable/types'

type Row = { id: number; name: string }

const columns: ColumnDefinition<Row>[] = [
    {
        field: 'name',
        header: 'Name',
        type: ColumnType.TEXT,
        isSortable: false,
    },
]

const rows: Row[] = [
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Grace' },
]

/**
 * A config a JS caller (or a generated binding) can produce but the
 * discriminated union forbids: `transitionType: 'bezier'` with no `bezier`.
 * Issue #1651 — this used to throw out of `useLayoutEffect` and take the
 * whole DataTable down.
 */
const partialBezierConfig = {
    enterDuration: 0.32,
    enterOffset: 12,
    transitionType: 'bezier',
} as unknown as RowAnimationConfig

const DEFAULT_CURVE = 'cubic-bezier(0.32, 0.72, 0, 1)'

/**
 * A `tr` whose `getBoundingClientRect().top` we control, so the FLIP delta is
 * observable under jsdom (which otherwise reports every rect as all-zero and
 * would make the hook's `Math.abs(delta) < 1` guard skip every row).
 */
function makeRow(top: number) {
    const el = document.createElement('tr')
    let currentTop = top
    el.getBoundingClientRect = () => ({ top: currentTop }) as DOMRect
    return {
        el,
        moveTo(next: number) {
            currentTop = next
        },
    }
}

/**
 * Drives a reorder through the hook and returns the row that moved, with its
 * inline styles already committed. `requestAnimationFrame` is stubbed to run
 * synchronously so the hook's double-rAF commit lands before we assert.
 */
function reorderAndCapture(config: RowAnimationConfig | undefined) {
    const first = makeRow(0)
    const second = makeRow(20)

    const { rerender } = renderHook(
        ({ ids }: { ids: string[] }) => {
            const { register } = useRowFlip(ids, config)
            register('a', first.el as unknown as HTMLTableRowElement)
            register('b', second.el as unknown as HTMLTableRowElement)
            return null
        },
        { initialProps: { ids: ['a', 'b'] } }
    )

    // Swap them: 'a' slides down 20px, 'b' slides up 20px.
    first.moveTo(20)
    second.moveTo(0)
    rerender({ ids: ['b', 'a'] })

    return first.el
}

describe('useRowFlip malformed rowAnimationConfig', () => {
    let warnSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
        // Synchronous rAF: the hook commits transitions inside a double
        // requestAnimationFrame, and jsdom's default would defer past the
        // assertion.
        vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
            cb(0)
            return 0
        })
    })

    afterEach(() => {
        warnSpy.mockRestore()
        vi.unstubAllGlobals()
    })

    it('does not throw when transitionType is bezier but bezier is missing', () => {
        expect(() =>
            renderHook(() => useRowFlip(['1', '2'], partialBezierConfig))
        ).not.toThrow()
    })

    describe('falls back to the default curve and duration', () => {
        it.each([
            ['a missing bezier', {}],
            ['a non-array bezier', { bezier: 'ease-in-out' }],
            ['a short bezier tuple', { bezier: [0.32, 0.72] }],
            ['a bezier tuple with NaN', { bezier: [0.32, 0.72, 0, NaN] }],
        ])('for %s', (_label, overrides) => {
            const config = {
                enterDuration: 0.32,
                enterOffset: 12,
                transitionType: 'bezier',
                ...overrides,
            } as unknown as RowAnimationConfig

            const el = reorderAndCapture(config)

            expect(el.style.transition).toContain(DEFAULT_CURVE)
            expect(el.style.transition).toContain('0.35s')
            expect(el.style.transition).not.toContain('NaN')
            expect(el.style.transition).not.toContain('undefined')
            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining(ROW_ANIMATION_WARNINGS.bezier)
            )
        })
    })

    it('preserves a valid duration when only the bezier tuple is malformed', () => {
        const config = {
            enterDuration: 0.32,
            enterOffset: 12,
            transitionType: 'bezier',
            duration: 0.8,
            bezier: [0.32, 0.72],
        } as unknown as RowAnimationConfig

        const el = reorderAndCapture(config)

        // The caller lost the curve they asked for, but not their timing.
        expect(el.style.transition).toContain(DEFAULT_CURVE)
        expect(el.style.transition).toContain('0.8s')
        expect(el.style.transition).not.toContain('0.35s')
    })

    it('applies a well-formed bezier config verbatim, without warning', () => {
        const config: RowAnimationConfig = {
            enterDuration: 0.32,
            enterOffset: 12,
            transitionType: 'bezier',
            duration: 0.4,
            bezier: [0.1, 0.2, 0.3, 0.4],
        }

        const el = reorderAndCapture(config)

        expect(el.style.transition).toBe(
            'transform 0.4s cubic-bezier(0.1, 0.2, 0.3, 0.4), opacity 0.4s cubic-bezier(0.1, 0.2, 0.3, 0.4)'
        )
        expect(warnSpy).not.toHaveBeenCalled()
    })

    it('falls back to defaults and warns when enterDuration/enterOffset are missing', () => {
        const config = {
            transitionType: 'bezier',
            duration: 0.4,
            bezier: [0.1, 0.2, 0.3, 0.4],
        } as unknown as RowAnimationConfig

        renderHook(() => useRowFlip(['a'], config))

        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.enter)
        )
    })

    it('warns that a valid spring config is not implemented', () => {
        const config: RowAnimationConfig = {
            enterDuration: 0.32,
            enterOffset: 12,
            transitionType: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 1,
        }

        const el = reorderAndCapture(config)

        // Spring physics were never implemented; the config renders as the
        // default curve. Assert the warning names that specifically.
        expect(el.style.transition).toContain(DEFAULT_CURVE)
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.spring)
        )
        expect(warnSpy).not.toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.bezier)
        )
    })

    it('warns once per instance, and again for a fresh instance', () => {
        const first = reorderAndCapture(partialBezierConfig)
        expect(first.style.transition).toContain(DEFAULT_CURVE)

        const bezierWarnings = () =>
            warnSpy.mock.calls.filter((call) =>
                String(call[0]).includes(ROW_ANIMATION_WARNINGS.bezier)
            ).length

        // The layout effect ran twice (mount + reorder) but warned once.
        expect(bezierWarnings()).toBe(1)

        // A second mount is a new instance — it warns again, so an HMR edit
        // that re-breaks the config is still visible.
        reorderAndCapture(partialBezierConfig)
        expect(bezierWarnings()).toBe(2)
    })

    it('still renders the table with row animation enabled', () => {
        render(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                enableRowAnimation
                rowAnimationConfig={partialBezierConfig}
            />
        )

        expect(screen.getByText('Ada')).toBeInTheDocument()
        expect(screen.getByText('Grace')).toBeInTheDocument()
    })

    it('still renders the table with row animation disabled', () => {
        render(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                enableRowAnimation={false}
                rowAnimationConfig={partialBezierConfig}
            />
        )

        expect(screen.getByText('Ada')).toBeInTheDocument()
        expect(screen.getByText('Grace')).toBeInTheDocument()
        // Animation is off, so the config is never read and never warned about.
        expect(warnSpy).not.toHaveBeenCalled()
    })
})
