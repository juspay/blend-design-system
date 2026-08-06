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
 * `requestAnimationFrame` callbacks queued by the hook. The hook commits both
 * the enter and the FLIP styles inside a *double* rAF, so a synchronous stub
 * would erase the pre-commit state (the `translateY(offset)` a row starts
 * from) before a test could observe it. Queue instead, and drain explicitly.
 */
let frameQueue: FrameRequestCallback[] = []

const MAX_FRAME_GENERATIONS = 10

function flushFrames() {
    // Nested rAF: draining one generation schedules the next. The hook is
    // double-rAF, so two generations is the real ceiling. Throw rather than
    // exit quietly if that ever grows — a silent truncation would leave every
    // assertion reading stale pre-commit state while still passing, which is
    // exactly the wrong-but-doesn't-throw failure this suite exists to catch.
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
 * Mounts the hook over two registered rows. On mount both rows are new, so
 * this exercises the *enter* path; call `reorder()` to then exercise the FLIP
 * path. Nothing is flushed automatically — a caller that wants the committed
 * styles calls `flushFrames()` itself.
 */
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
            // Swap them: 'a' slides down 20px, 'b' slides up 20px.
            first.moveTo(20)
            second.moveTo(0)
            rerender({ ids: ['b', 'a'] })
            flushFrames()
        },
    }
}

/** Drives a reorder and returns the moved row with its FLIP styles committed. */
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

        // The caller lost the curve they asked for, but not their timing.
        expect(el.style.transition).toContain(DEFAULT_CURVE)
        expect(el.style.transition).toContain('0.8s')
        expect(el.style.transition).not.toContain('0.35s')
        expect(warnSpy).not.toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.duration)
        )
    })

    describe('a valid curve with a non-finite duration', () => {
        // The mirror of the case above: the curve survives, the duration does
        // not. Distinct from the fallback block, where 0.35s appears *because*
        // the curve fell back too.
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
        // KNOWN LIMITATION, pinned deliberately: the enter animation always
        // uses DEFAULT_CURVE, ignoring the configured `bezier` — see the
        // comment on the enter loop in useRowFlip.ts. These `toBe` assertions
        // therefore expect the default curve even where the config carries a
        // different one. If you are here because you taught the enter path to
        // honour `bezier`, you are correcting that limitation, not breaking a
        // spec: update these expectations.
        const enterlessConfig = {
            transitionType: 'bezier',
            duration: 0.4,
            bezier: [0.1, 0.2, 0.3, 0.4],
        } as unknown as RowAnimationConfig

        it('defaults enterOffset when it is missing', () => {
            const { row } = mountRows(enterlessConfig)

            // Asserted before the double-rAF commit clears it — this is the
            // offset the row actually starts its enter animation from.
            expect(row.style.transform).toBe('translateY(12px)')
            expect(row.style.opacity).toBe('0')
        })

        it('defaults enterDuration when it is missing', () => {
            const { row } = mountRows(enterlessConfig)

            flushFrames()

            // The enter path always uses the default curve; only the duration
            // comes from config, so this is where enterDuration is observable.
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
            // enterDuration is honoured; `bezier` is not (known limitation).
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

        // Spring physics were never implemented; the config renders as the
        // default curve. Assert the warning names that specifically.
        expect(el.style.transition).toContain(DEFAULT_CURVE)
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.spring)
        )
        expect(warnSpy).not.toHaveBeenCalledWith(
            expect.stringContaining(ROW_ANIMATION_WARNINGS.bezier)
        )
        // The spring arm does not declare `duration`, so its absence is not a
        // defect there and must not be reported as one.
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
