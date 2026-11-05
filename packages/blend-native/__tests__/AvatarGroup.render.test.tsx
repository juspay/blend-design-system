import { fireEvent, render } from '@testing-library/react-native'
import type { ReactElement } from 'react'
import { AvatarGroup } from '../src/components/AvatarGroup'
import { SplitTag } from '../src/components/SplitTag'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'

const wrap = (ui: ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

const people = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    alt: `Person ${i + 1}`,
}))

describe('AvatarGroup rendering', () => {
    it('shows maxCount avatars and a +N counter for the rest', () => {
        const { getByTestId, queryByTestId, getByText } = wrap(
            <AvatarGroup avatars={people} maxCount={4} testID="group" />
        )
        expect(getByTestId('group-item-3')).toBeTruthy()
        expect(queryByTestId('group-item-4')).toBeNull()
        expect(getByText('+3')).toBeTruthy()
        expect(getByTestId('group-overflow').props.accessibilityLabel).toBe(
            '3 more avatars, press to view and select'
        )
    })

    it('renders no counter when everything fits', () => {
        const { queryByTestId } = wrap(
            <AvatarGroup avatars={people.slice(0, 3)} testID="group" />
        )
        expect(queryByTestId('group-overflow')).toBeNull()
    })

    it('labels the group and each avatar, with selection state', () => {
        const { getByTestId } = wrap(
            <AvatarGroup
                avatars={people.slice(0, 3)}
                selectedAvatarIds={[2]}
                testID="group"
            />
        )
        expect(getByTestId('group').props.accessibilityLabel).toBe(
            'Group of 3 avatars, 1 selected'
        )
        const second = getByTestId('group-item-1')
        expect(second.props.accessibilityLabel).toBe('Person 2, selected')
        expect(second.props.accessibilityState.selected).toBe(true)
        expect(
            getByTestId('group-item-0').props.accessibilityState.selected
        ).toBe(false)
    })

    it('toggles selection and reports the new ids', () => {
        const onSelectionChange = jest.fn()
        const { getByTestId } = wrap(
            <AvatarGroup
                avatars={people.slice(0, 3)}
                onSelectionChange={onSelectionChange}
                testID="group"
            />
        )
        fireEvent.press(getByTestId('group-item-0'))
        expect(onSelectionChange).toHaveBeenLastCalledWith([1])
        fireEvent.press(getByTestId('group-item-2'))
        expect(onSelectionChange).toHaveBeenLastCalledWith([1, 3])
        fireEvent.press(getByTestId('group-item-0'))
        expect(onSelectionChange).toHaveBeenLastCalledWith([3])
    })

    it('follows selectedAvatarIds when the prop changes', () => {
        const { getByTestId, rerender } = wrap(
            <AvatarGroup
                avatars={people.slice(0, 3)}
                selectedAvatarIds={[1]}
                testID="group"
            />
        )
        expect(
            getByTestId('group-item-0').props.accessibilityState.selected
        ).toBe(true)
        rerender(
            <BlendNativeProvider>
                <AvatarGroup
                    avatars={people.slice(0, 3)}
                    selectedAvatarIds={[3]}
                    testID="group"
                />
            </BlendNativeProvider>
        )
        expect(
            getByTestId('group-item-0').props.accessibilityState.selected
        ).toBe(false)
        expect(
            getByTestId('group-item-2').props.accessibilityState.selected
        ).toBe(true)
    })

    it('swaps the counter for a skeleton while loading', () => {
        const { queryByTestId, queryByText } = wrap(
            <AvatarGroup
                avatars={people}
                maxCount={2}
                skeleton={{ show: true }}
                testID="group"
            />
        )
        expect(queryByTestId('group-overflow')).toBeNull()
        expect(queryByText('+5')).toBeNull()
    })

    it('opens the overflow menu from the counter', () => {
        const { getByTestId, getByText } = wrap(
            <AvatarGroup avatars={people} maxCount={2} testID="group" />
        )
        fireEvent.press(getByTestId('group-overflow'))
        expect(getByText('Person 7')).toBeTruthy()
    })
})

describe('SplitTag rendering', () => {
    it('renders both tags in one labelled group', () => {
        const { getByText, getByTestId } = wrap(
            <SplitTag
                primaryTag={{ text: 'Status' }}
                secondaryTag={{ text: 'Settled' }}
                testID="split"
            />
        )
        expect(getByText('Status')).toBeTruthy()
        expect(getByText('Settled')).toBeTruthy()
        expect(getByTestId('split').props.accessibilityLabel).toBe(
            'Status: Settled'
        )
    })

    it('renders the primary alone, and honours an explicit label', () => {
        const { queryByText, getByTestId } = wrap(
            <SplitTag
                primaryTag={{ text: 'Status' }}
                accessibilityLabel="Payment status"
                testID="split"
            />
        )
        expect(queryByText('Settled')).toBeNull()
        expect(getByTestId('split').props.accessibilityLabel).toBe(
            'Payment status'
        )
    })

    it('keeps interactive halves pressable', () => {
        const onPress = jest.fn()
        const { getByText } = wrap(
            <SplitTag
                primaryTag={{ text: 'Status' }}
                secondaryTag={{ text: 'Settled', onPress }}
            />
        )
        fireEvent.press(getByText('Settled'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })
})
