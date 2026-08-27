import { fireEvent, render } from '@testing-library/react-native'
import { Checkbox } from '../src/components/Checkbox'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import type { ReactElement } from 'react'

/**
 * Render tests for the Wave B selection controls and stateful layout —
 * roles, a11y state, toggling and label-tap parity as they reach the
 * screen.
 */

const wrap = (ui: ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

describe('Checkbox rendering', () => {
    it('exposes a checkbox role with checked state and toggles on press', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId } = wrap(
            <Checkbox
                label="Accept terms"
                checked={false}
                onCheckedChange={onCheckedChange}
                testID="cb"
            />
        )
        const box = getByTestId('cb')
        expect(box.props.accessibilityRole).toBe('checkbox')
        expect(box.props.accessibilityState.checked).toBe(false)
        fireEvent.press(box)
        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('label-tap toggles (the row is one pressable)', () => {
        const onCheckedChange = jest.fn()
        const { getByText } = wrap(
            <Checkbox
                label="Row toggles"
                checked
                onCheckedChange={onCheckedChange}
            />
        )
        fireEvent.press(getByText('Row toggles'))
        expect(onCheckedChange).toHaveBeenCalledWith(false)
    })

    it('indeterminate reports mixed and resolves to checked on press', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId } = wrap(
            <Checkbox
                label="Some selected"
                checked="indeterminate"
                onCheckedChange={onCheckedChange}
                testID="cb"
            />
        )
        expect(getByTestId('cb').props.accessibilityState.checked).toBe('mixed')
        fireEvent.press(getByTestId('cb'))
        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('disabled blocks toggling and reaches a11y state', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId } = wrap(
            <Checkbox
                label="Frozen"
                checked
                disabled
                onCheckedChange={onCheckedChange}
                testID="cb"
            />
        )
        expect(getByTestId('cb').props.accessibilityState.disabled).toBe(true)
        fireEvent.press(getByTestId('cb'))
        expect(onCheckedChange).not.toHaveBeenCalled()
    })
})
