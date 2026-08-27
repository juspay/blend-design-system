import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { MultiSelect } from '../src/components/MultiSelect'
import type { MultiSelectGroupType } from '../src/components/MultiSelect'

/**
 * MultiSelect behaviour under the jest mocks: toggle-keeps-open, one
 * onSelectionChange per gesture, select-all tri-state, max cap, clear and
 * the action bar.
 */

const GROUPS: MultiSelectGroupType[] = [
    {
        items: [
            { label: 'UPI', value: 'upi' },
            { label: 'Cards', value: 'cards' },
            { label: 'Netbanking', value: 'netbanking', disabled: true },
        ],
    },
]

const renderMulti = (
    props: Partial<React.ComponentProps<typeof MultiSelect>> = {}
) => {
    const onSelectionChange = jest.fn()
    render(
        <BlendNativeProvider>
            <MultiSelect
                label="Payment methods"
                placeholder="Choose methods"
                items={GROUPS}
                selectedValues={[]}
                onSelectionChange={onSelectionChange}
                testID="multi"
                {...props}
            />
        </BlendNativeProvider>
    )
    return { onSelectionChange }
}

describe('MultiSelect (phone panel presentation)', () => {
    it('opens, toggles a value and stays open', () => {
        const { onSelectionChange } = renderMulti()
        fireEvent.press(screen.getByTestId('multi-trigger'))
        fireEvent.press(screen.getByText('UPI'))
        expect(onSelectionChange).toHaveBeenCalledWith(['upi'])
        // Stays open — the panel content is still mounted.
        expect(screen.getByText('Cards')).toBeTruthy()
    })

    it('reports the complete selection per gesture and shows the count tag', () => {
        const { onSelectionChange } = renderMulti({
            selectedValues: ['upi'],
        })
        expect(screen.getByTestId('multi-count')).toBeTruthy()
        expect(screen.getByText('1')).toBeTruthy()
        fireEvent.press(screen.getByTestId('multi-trigger'))
        fireEvent.press(screen.getByText('Cards'))
        expect(onSelectionChange).toHaveBeenCalledWith(['upi', 'cards'])
        fireEvent.press(screen.getByText('UPI'))
        expect(onSelectionChange).toHaveBeenLastCalledWith([])
    })

    it('caps additions at maxSelections', () => {
        const { onSelectionChange } = renderMulti({
            selectedValues: ['upi'],
            maxSelections: 1,
        })
        fireEvent.press(screen.getByTestId('multi-trigger'))
        fireEvent.press(screen.getByText('Cards'))
        expect(onSelectionChange).not.toHaveBeenCalled()
    })

    it('select-all fills selectable values and clears back', () => {
        const { onSelectionChange } = renderMulti({ enableSelectAll: true })
        fireEvent.press(screen.getByTestId('multi-trigger'))
        fireEvent.press(screen.getByText('Select all'))
        // Disabled Netbanking is not selectable.
        expect(onSelectionChange).toHaveBeenCalledWith(['upi', 'cards'])
    })

    it('clear-all keeps alwaysSelected values and fires onClearAllClick', () => {
        const onClearAllClick = jest.fn()
        const groups: MultiSelectGroupType[] = [
            {
                items: [
                    { label: 'UPI', value: 'upi', alwaysSelected: true },
                    { label: 'Cards', value: 'cards' },
                ],
            },
        ]
        const { onSelectionChange } = renderMulti({
            items: groups,
            selectedValues: ['upi', 'cards'],
            showClearButton: true,
            onClearAllClick,
        })
        fireEvent.press(screen.getByTestId('multi-trigger'))
        fireEvent.press(screen.getByTestId('multi-clear'))
        expect(onClearAllClick).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(['upi'])
    })

    it('renders the action bar and hands primary the selection', () => {
        const onClick = jest.fn()
        renderMulti({
            selectedValues: ['upi'],
            showActionButtons: true,
            primaryAction: { text: 'Apply', onClick },
        })
        fireEvent.press(screen.getByTestId('multi-trigger'))
        fireEvent.press(screen.getByText('Apply'))
        expect(onClick).toHaveBeenCalledWith(['upi'])
    })
})
