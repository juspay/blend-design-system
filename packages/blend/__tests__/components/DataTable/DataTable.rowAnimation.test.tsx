import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, renderHook, screen } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import { useRowFlip } from '../../../lib/components/DataTable/hooks/useRowFlip'
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

describe('useRowFlip malformed rowAnimationConfig', () => {
    let warnSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        warnSpy.mockRestore()
    })

    it('does not throw when transitionType is bezier but bezier is missing', () => {
        expect(() =>
            renderHook(() => useRowFlip(['1', '2'], partialBezierConfig))
        ).not.toThrow()
    })

    it.each([
        ['a non-array bezier', { bezier: 'ease-in-out' }],
        ['a short bezier tuple', { bezier: [0.32, 0.72] }],
        ['a bezier tuple with NaN', { bezier: [0.32, 0.72, 0, NaN] }],
        [
            'a non-finite duration',
            { bezier: [0.32, 0.72, 0, 1], duration: NaN },
        ],
        ['a missing enterDuration', { bezier: [0.32, 0.72, 0, 1] }],
    ])('does not throw for %s', (_label, overrides) => {
        const config = {
            enterOffset: 12,
            transitionType: 'bezier',
            ...overrides,
        } as unknown as RowAnimationConfig

        expect(() =>
            renderHook(() => useRowFlip(['1', '2'], config))
        ).not.toThrow()
    })

    it('warns in development instead of throwing', async () => {
        // The warning is deduped at module scope, so load a fresh copy of the
        // hook to observe the first emission.
        vi.resetModules()
        const { useRowFlip: freshUseRowFlip } =
            await import('../../../lib/components/DataTable/hooks/useRowFlip')

        renderHook(() => freshUseRowFlip(['1', '2'], partialBezierConfig))

        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('[DataTable] rowAnimationConfig')
        )
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
    })

    it('accepts a well-formed bezier config without warning', () => {
        const config: RowAnimationConfig = {
            enterDuration: 0.32,
            enterOffset: 12,
            transitionType: 'bezier',
            duration: 0.4,
            bezier: [0.32, 0.72, 0, 1],
        }

        expect(() =>
            renderHook(() => useRowFlip(['1', '2'], config))
        ).not.toThrow()
        expect(warnSpy).not.toHaveBeenCalled()
    })
})
