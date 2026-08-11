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

// Issue #1651: a config the union forbids but JS callers can still produce.
const partialBezierConfig = {
    enterDuration: 0.32,
    enterOffset: 12,
    transitionType: 'bezier',
} as unknown as RowAnimationConfig

const DEFAULT_CURVE = 'cubic-bezier(0.32, 0.72, 0, 1)'

// Queued, not run synchronously: the hook commits inside a double rAF, and a
// sync stub would erase the pre-commit state before a test could observe it.
let frameQueue: FrameRequestCallback[] = []

const MAX_FRAME_GENERATIONS = 10

function flushFrames() {
    // Throw rather than truncate: a quiet exit would leave every assertion
    // reading stale pre-commit state while still passing.
    let generations = 0
    while (frameQueue.length > 0) {
        if (generations++ >= MAX_FRAME_GENERATIONS) {
            throw new Error(
                `flushFrames exceeded ${MAX_FRAME_GENERATIONS} generations with ` +
                    `${frameQueue.length} callback(s) still queued — the hook's ` +
                    `rAF nesting changed, and these assertions are no longer ` +
                    `observing committed styles.`
            )
        }
        const pending = frameQueue
        frameQueue = []
        pending.forEach((cb) => cb(0))
    }
}

// A `tr` with a controllable top, so the FLIP delta clears the hook's
// `Math.abs(delta) < 1` guard under jsdom's all-zero rects.
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

// Mount exercises the enter path; `reorder()` exercises the FLIP path.
// Nothing is flushed automatically.
function mountRows(config: RowAnimationConfig | undefined) {
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

    return {
        row: first.el,
        reorder() {
            flushFrames()
            first.moveTo(20)
            second.moveTo(0)
            rerender({ ids: ['b', 'a'] })
            flushFrames()
        },
    }
}

function reorderAndCapture(config: RowAnimationConfig | undefined) {
    const { row, reorder } = mountRows(config)
    reorder()
    return row
}

describe('useRowFlip malformed rowAnimationConfig', () => {
    let warnSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
        frameQueue = []
        vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
            frameQueue.push(cb)
            return frameQueue.length
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

        expect(el.style.transition).toContain(DEFAULT_CURVE)
        expect(el.style.transition).toContain('0.8s')
        expect(el.style.transition).not.toContain('0.35s')
        expect(warnSpy).not.toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.duration)
        )
    })

    describe('a valid curve with a non-finite duration', () => {
        // Mirror of the case above: curve survives, duration does not.
        it.each([
            ['NaN', NaN],
            ['Infinity', Infinity],
            ['a missing duration', undefined],
            ['a string duration', '0.8'],
        ])('keeps the curve and warns for %s', (_label, duration) => {
            const config = {
                enterDuration: 0.32,
                enterOffset: 12,
                transitionType: 'bezier',
                bezier: [0.1, 0.2, 0.3, 0.4],
                duration,
            } as unknown as RowAnimationConfig

            const el = reorderAndCapture(config)

            expect(el.style.transition).toBe(
                'transform 0.35s cubic-bezier(0.1, 0.2, 0.3, 0.4), opacity 0.35s cubic-bezier(0.1, 0.2, 0.3, 0.4)'
            )
            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining(ROW_ANIMATION_WARNINGS.duration)
            )
            expect(warnSpy).not.toHaveBeenCalledWith(
                expect.stringContaining(ROW_ANIMATION_WARNINGS.bezier)
            )
        })
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

    describe('the enter path', () => {
        // These pin the known limitation that entering rows ignore `bezier`.
        // Teaching the enter path to honour it is a fix, not a break — update
        // these expectations rather than reverting.
        const enterlessConfig = {
            transitionType: 'bezier',
            duration: 0.4,
            bezier: [0.1, 0.2, 0.3, 0.4],
        } as unknown as RowAnimationConfig

        it('defaults enterOffset when it is missing', () => {
            const { row } = mountRows(enterlessConfig)

            // Before the double-rAF commit clears it.
            expect(row.style.transform).toBe('translateY(12px)')
            expect(row.style.opacity).toBe('0')
        })

        it('defaults enterDuration when it is missing', () => {
            const { row } = mountRows(enterlessConfig)

            flushFrames()

            expect(row.style.transition).toBe(
                `transform 0.35s ${DEFAULT_CURVE}, opacity 0.35s ${DEFAULT_CURVE}`
            )
            expect(row.style.transform).toBe('')
            expect(row.style.opacity).toBe('1')
        })

        it('applies well-formed enter values verbatim, but not the configured curve', () => {
            const config: RowAnimationConfig = {
                enterDuration: 0.6,
                enterOffset: 40,
                transitionType: 'bezier',
                duration: 0.4,
                bezier: [0.1, 0.2, 0.3, 0.4],
            }

            const { row } = mountRows(config)
            expect(row.style.transform).toBe('translateY(40px)')

            flushFrames()
            expect(row.style.transition).toBe(
                `transform 0.6s ${DEFAULT_CURVE}, opacity 0.6s ${DEFAULT_CURVE}`
            )
            expect(row.style.transition).not.toContain(
                'cubic-bezier(0.1, 0.2, 0.3, 0.4)'
            )
        })

        it('warns when enterDuration/enterOffset are missing', () => {
            mountRows(enterlessConfig)

            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining(ROW_ANIMATION_WARNINGS.enter)
            )
        })
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

        expect(el.style.transition).toContain(DEFAULT_CURVE)
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.spring)
        )
        expect(warnSpy).not.toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.bezier)
        )
        // The spring arm does not declare `duration`.
        expect(warnSpy).not.toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.duration)
        )
    })

    it('warns once per instance, and again for a fresh instance', () => {
        const first = reorderAndCapture(partialBezierConfig)
        expect(first.style.transition).toContain(DEFAULT_CURVE)

        const bezierWarnings = () =>
            warnSpy.mock.calls.filter((call) =>
                String(call[0]).includes(ROW_ANIMATION_WARNINGS.bezier)
            ).length

        // Effect ran twice (mount + reorder), warned once.
        expect(bezierWarnings()).toBe(1)

        // A fresh instance warns again (the HMR case).
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
        // Animation off: the config is never read.
        expect(warnSpy).not.toHaveBeenCalled()
    })
})
