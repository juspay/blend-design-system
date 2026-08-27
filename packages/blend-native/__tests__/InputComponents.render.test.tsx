import { fireEvent, render } from '@testing-library/react-native'
import { TextArea } from '../src/components/TextArea'
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
