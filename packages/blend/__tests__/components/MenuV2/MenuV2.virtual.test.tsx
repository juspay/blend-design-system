import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../test-utils'
import MenuV2 from '../../../lib/components/MenuV2/MenuV2'

vi.mock('@tanstack/react-virtual', () => ({
    useVirtualizer: ({
        count,
        estimateSize,
        getItemKey,
    }: {
        count: number
        estimateSize: (index: number) => number
        getItemKey: (index: number) => string | number
    }) => {
        let start = 0
        const virtualItems = Array.from({ length: count }, (_, index) => {
            const size = estimateSize(index)
            const item = {
                index,
                key: getItemKey(index),
                start,
                end: start + size,
                size,
                lane: 0,
            }
            start += size
            return item
        })

        return {
            getTotalSize: () => start,
            getVirtualItems: () => virtualItems,
        }
    },
}))

describe('MenuV2 virtual selection', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('preserves independent single-selection group boundaries', async () => {
        const user = userEvent.setup()

        render(
            <MenuV2
                trigger={<button type="button">Virtual selection</button>}
                selectionMode="single"
                enableVirtualScrolling
                virtualScrolling={{ threshold: 0, itemHeight: 40 }}
                dimensions={{ maxHeight: 200 }}
                items={[
                    {
                        label: 'Sort',
                        items: [{ label: { text: 'Name' }, selected: true }],
                    },
                    {
                        label: 'Density',
                        items: [{ label: { text: 'Compact' }, selected: true }],
                    },
                ]}
            />
        )

        await user.click(
            screen.getByRole('button', { name: /virtual selection/i })
        )

        const name = await screen.findByRole('menuitemradio', {
            name: /^name$/i,
        })
        const compact = screen.getByRole('menuitemradio', {
            name: /^compact$/i,
        })

        expect(name).toHaveAttribute('aria-checked', 'true')
        expect(compact).toHaveAttribute('aria-checked', 'true')
        expect(name.closest('[role="group"]')).toBeInTheDocument()
        expect(compact.closest('[role="group"]')).toBeInTheDocument()
        expect(name.closest('[role="group"]')).not.toBe(
            compact.closest('[role="group"]')
        )
    })
})
