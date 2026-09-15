import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { useSelectSearchController } from '../../../lib/components/Select/useSelectSearchController'

type HarnessProps = {
    controlledValue?: string
    onValueChange?: (value: string) => void
    explicitShow?: boolean
    existingSurfaceDefault?: boolean
}

const Harness = ({
    controlledValue,
    onValueChange,
    explicitShow,
    existingSurfaceDefault = false,
}: HarnessProps) => {
    const search = useSelectSearchController({
        controlledValue,
        onValueChange,
        explicitShow,
        existingSurfaceDefault,
    })

    return (
        <div>
            <output data-testid="value">{search.value}</output>
            <output data-testid="controlled">
                {String(search.isControlled)}
            </output>
            <output data-testid="enabled">
                {String(search.isSearchEnabled)}
            </output>
            <output data-testid="filters">
                {String(search.shouldFilterInternally)}
            </output>
            <button onClick={() => search.dispatchUserValue('next')}>
                Set
            </button>
            <button
                onClick={() =>
                    search.dispatchUserValue((previous) => `${previous}!`)
                }
            >
                Append
            </button>
            <button onClick={search.resetUncontrolled}>Reset</button>
        </div>
    )
}

describe('useSelectSearchController', () => {
    it('uses prop presence for controlled mode and never filters internally', async () => {
        const onValueChange = vi.fn()
        const { user } = render(
            <Harness controlledValue="" onValueChange={onValueChange} />
        )

        expect(screen.getByTestId('controlled')).toHaveTextContent('true')
        expect(screen.getByTestId('enabled')).toHaveTextContent('true')
        expect(screen.getByTestId('filters')).toHaveTextContent('false')

        await user.click(screen.getByRole('button', { name: 'Set' }))
        expect(onValueChange).toHaveBeenCalledWith('next')
        expect(screen.getByTestId('value')).toHaveTextContent('')
    })

    it('updates local state and optionally notifies in uncontrolled mode', async () => {
        const onValueChange = vi.fn()
        const { user } = render(<Harness onValueChange={onValueChange} />)

        expect(screen.getByTestId('filters')).toHaveTextContent('true')
        await user.click(screen.getByRole('button', { name: 'Set' }))
        expect(screen.getByTestId('value')).toHaveTextContent('next')
        expect(onValueChange).toHaveBeenCalledWith('next')

        await user.click(screen.getByRole('button', { name: 'Reset' }))
        expect(screen.getByTestId('value')).toHaveTextContent('')
        expect(onValueChange).toHaveBeenCalledTimes(1)
    })

    it('preserves existing defaults while explicit false wins', () => {
        const { rerender } = render(<Harness existingSurfaceDefault={true} />)
        expect(screen.getByTestId('enabled')).toHaveTextContent('true')

        rerender(<Harness controlledValue="query" explicitShow={false} />)
        expect(screen.getByTestId('controlled')).toHaveTextContent('true')
        expect(screen.getByTestId('enabled')).toHaveTextContent('false')
        expect(screen.getByTestId('filters')).toHaveTextContent('false')
    })

    it('supports functional user updates', async () => {
        const onValueChange = vi.fn()
        const { user } = render(<Harness onValueChange={onValueChange} />)

        await user.click(screen.getByRole('button', { name: 'Set' }))
        await user.click(screen.getByRole('button', { name: 'Append' }))

        expect(screen.getByTestId('value')).toHaveTextContent('next!')
        expect(onValueChange).toHaveBeenLastCalledWith('next!')
    })
})
