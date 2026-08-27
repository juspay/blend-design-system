import { fireEvent, render } from '@testing-library/react-native'
import { TextArea } from '../src/components/TextArea'
import { SearchInput } from '../src/components/SearchInput'
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
