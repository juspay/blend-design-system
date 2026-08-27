import { fireEvent, render } from '@testing-library/react-native'
import { TextArea } from '../src/components/TextArea'
import { SearchInput } from '../src/components/SearchInput'
import { NumberInput } from '../src/components/NumberInput'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import type { ReactElement } from 'react'

/**
 * Render tests for the Wave B input variants — anatomy, uncontrolled
 * behaviour and the RN-specific input plumbing as it reaches the screen.
 */

const wrap = (ui: ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

describe('TextArea rendering', () => {
    it('renders a multiline field with rows-driven minimum height', () => {
        const { getByTestId } = wrap(
            <TextArea
                label="Notes"
                placeholder="Add a note"
                rows={4}
                testID="ta"
            />
        )
        const input = getByTestId('ta-input')
        expect(input.props.multiline).toBe(true)
        expect(input.props.textAlignVertical).toBe('top')
    })

    it('works uncontrolled and notifies onChangeText', () => {
        const onChangeText = jest.fn()
        const { getByTestId } = wrap(
            <TextArea
                label="Notes"
                placeholder="Add a note"
                defaultValue="seed"
                onChangeText={onChangeText}
                testID="ta"
            />
        )
        expect(getByTestId('ta-input').props.value).toBe('seed')
        fireEvent.changeText(getByTestId('ta-input'), 'typed')
        expect(getByTestId('ta-input').props.value).toBe('typed')
        expect(onChangeText).toHaveBeenCalledWith('typed')
    })

    it('error state shows the footer message', () => {
        const { getByText } = wrap(
            <TextArea
                label="Notes"
                placeholder="Add a note"
                error={{ show: true, message: 'Too short' }}
            />
        )
        expect(getByText('Too short')).toBeTruthy()
    })
})

describe('SearchInput rendering', () => {
    it('shows the clear button once there is text and clears on press', () => {
        const onClear = jest.fn()
        const { getByTestId, queryByTestId } = wrap(
            <SearchInput onClear={onClear} testID="si" />
        )
        expect(queryByTestId('si-clear')).toBeNull()
        fireEvent.changeText(getByTestId('si-input'), 'upi')
        expect(getByTestId('si-clear')).toBeTruthy()
        fireEvent.press(getByTestId('si-clear'))
        expect(onClear).toHaveBeenCalledTimes(1)
        expect(getByTestId('si-input').props.value).toBe('')
    })

    it('hides the clear button when rightSlot occupies the spot', () => {
        const { getByTestId, queryByTestId } = wrap(
            <SearchInput defaultValue="upi" rightSlot={<></>} testID="si" />
        )
        expect(getByTestId('si-input').props.value).toBe('upi')
        expect(queryByTestId('si-clear')).toBeNull()
    })

    it('uses the search return key and supports controlled value', () => {
        const { getByTestId } = wrap(<SearchInput value="fixed" testID="si" />)
        const input = getByTestId('si-input')
        expect(input.props.returnKeyType).toBe('search')
        fireEvent.changeText(input, 'attempt')
        expect(getByTestId('si-input').props.value).toBe('fixed')
    })
})

describe('NumberInput rendering', () => {
    it('announces an adjustable with value and steps via a11y actions', () => {
        const onValueChange = jest.fn()
        const { getByTestId } = wrap(
            <NumberInput
                label="Amount"
                value={5}
                min={0}
                max={10}
                onValueChange={onValueChange}
                testID="ni"
            />
        )
        const input = getByTestId('ni-input')
        expect(input.props.accessibilityRole).toBe('adjustable')
        expect(input.props.accessibilityValue).toEqual({
            min: 0,
            max: 10,
            now: 5,
        })
        fireEvent(input, 'accessibilityAction', {
            nativeEvent: { actionName: 'increment' },
        })
        expect(onValueChange).toHaveBeenCalledWith(6)
    })

    it('steppers step and respect bounds; unit replaces them', () => {
        const onValueChange = jest.fn()
        const { getByTestId, queryByTestId, rerender } = wrap(
            <NumberInput
                label="Qty"
                value={9}
                max={10}
                onValueChange={onValueChange}
                testID="ni"
            />
        )
        fireEvent.press(getByTestId('ni-step-up'))
        expect(onValueChange).toHaveBeenCalledWith(10)

        rerender(
            <BlendNativeProvider>
                <NumberInput
                    label="Amount"
                    value={9}
                    unit="INR"
                    onValueChange={onValueChange}
                    testID="ni"
                />
            </BlendNativeProvider>
        )
        expect(queryByTestId('ni-step-up')).toBeNull()
        expect(getByTestId('ni-unit')).toBeTruthy()
    })

    it('sanitizes typing and clamps on blur', () => {
        const onValueChange = jest.fn()
        const { getByTestId } = wrap(
            <NumberInput
                label="Amount"
                value={null}
                max={100}
                onValueChange={onValueChange}
                testID="ni"
            />
        )
        const input = getByTestId('ni-input')
        fireEvent(input, 'focus')
        fireEvent.changeText(input, '15a0')
        expect(onValueChange).toHaveBeenCalledWith(150)
        fireEvent(input, 'blur')
        expect(onValueChange).toHaveBeenLastCalledWith(100)
    })

    it('out-of-range value auto-raises the footer error', () => {
        const { getByText } = wrap(
            <NumberInput label="Amount" value={150} max={100} testID="ni" />
        )
        expect(getByText('Value must be at most 100')).toBeTruthy()
    })
})
