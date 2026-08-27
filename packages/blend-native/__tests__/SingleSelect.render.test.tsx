import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { SingleSelect } from '../src/components/SingleSelect'
import type { SingleSelectGroupType } from '../src/components/SingleSelect'

/**
 * SingleSelect behaviour under the jest mocks: trigger chrome, the phone
 * panel, selection closing and firing, error state, search and custom
 * values.
 */

const GROUPS: SingleSelectGroupType[] = [
    {
        groupLabel: 'Frequency',
        items: [
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly', subLabel: 'On the 1st' },
        ],
    },
]

const renderSelect = (
    props: Partial<React.ComponentProps<typeof SingleSelect>> = {}
) => {
    const onSelect = jest.fn()
    render(
        <BlendNativeProvider>
            <SingleSelect
                label="Payout frequency"
                placeholder="Choose one"
                items={GROUPS}
                selected=""
                onSelect={onSelect}
                testID="select"
                {...props}
            />
        </BlendNativeProvider>
    )
    return { onSelect }
}

describe('SingleSelect (phone panel presentation)', () => {
    it('shows the placeholder, opens the panel, selects and closes', () => {
        const { onSelect } = renderSelect()
        expect(screen.getByText('Choose one')).toBeTruthy()
        fireEvent.press(screen.getByTestId('select-trigger'))
        expect(screen.getByText('Frequency')).toBeTruthy()
        fireEvent.press(screen.getByText('Weekly'))
        expect(onSelect).toHaveBeenCalledWith('weekly')
        expect(screen.queryByText('Frequency')).toBeNull()
    })

    it('renders the selected value on the trigger', () => {
        renderSelect({ selected: 'monthly' })
        expect(screen.getByText('Monthly')).toBeTruthy()
        expect(screen.queryByText('Choose one')).toBeNull()
    })

    it('shows the error message over the hint', () => {
        renderSelect({
            hintText: 'You can change this later',
            error: { show: true, message: 'Pick a frequency' },
        })
        expect(screen.getByText('Pick a frequency')).toBeTruthy()
        expect(screen.queryByText('You can change this later')).toBeNull()
    })

    it('search filters and allowCustomValue offers the query', () => {
        const { onSelect } = renderSelect({
            search: { show: true },
            allowCustomValue: true,
        })
        fireEvent.press(screen.getByTestId('select-trigger'))
        fireEvent.changeText(
            screen.getByTestId('select-search-input'),
            'quarterly'
        )
        expect(screen.queryByText('Weekly')).toBeNull()
        fireEvent.press(screen.getByText('Use "quarterly"'))
        expect(onSelect).toHaveBeenCalledWith('quarterly')
    })

    it('marks selected options for assistive tech', () => {
        renderSelect({ selected: 'weekly' })
        fireEvent.press(screen.getByTestId('select-trigger'))
        expect(
            screen.getByLabelText('Weekly').props.accessibilityState.selected
        ).toBe(true)
    })
})
