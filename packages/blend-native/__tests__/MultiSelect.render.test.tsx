import { Text } from 'react-native'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { MultiSelect } from '../src/components/MultiSelect'
import { MultiSelectV2SelectionTagType } from '@juspay/blend-design-system/node'
import type { MultiSelectV2GroupType } from '@juspay/blend-design-system/node'

const wrap = (ui: React.ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

const groups: MultiSelectV2GroupType[] = [
    {
        groupLabel: 'Fruits',
        items: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
        ],
    },
    {
        groupLabel: 'Veggies',
        items: [
            { value: 'carrot', label: 'Carrot' },
            { value: 'spinach', label: 'Spinach' },
        ],
    },
]

describe('MultiSelect rendering', () => {
    it('renders the placeholder text when no selection', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                testID="ms"
            />
        )
        expect(screen.getByText('Pick fruits')).toBeTruthy()
    })

    it('renders selection count when COUNT tag type and selection exists', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={['apple', 'banana']}
                onSelectionChange={jest.fn()}
                selectionTagType={MultiSelectV2SelectionTagType.COUNT}
                testID="ms"
            />
        )
        expect(screen.getByText('2')).toBeTruthy()
    })

    it('renders selection text when TEXT tag type and selection exists', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={['apple']}
                onSelectionChange={jest.fn()}
                selectionTagType={MultiSelectV2SelectionTagType.TEXT}
                testID="ms"
            />
        )
        expect(screen.getByText('Apple')).toBeTruthy()
    })

    it('renders label when provided', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                label="Choose Fruits"
                testID="ms"
            />
        )
        expect(screen.getByText('Choose Fruits')).toBeTruthy()
    })

    it('opens the dropdown when trigger is pressed (controlled)', () => {
        const onOpenChange = jest.fn()
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                open={false}
                onOpenChange={onOpenChange}
                testID="ms"
            />
        )
        fireEvent.press(screen.getByText('Pick fruits'))
        expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('renders items when open', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                open
                testID="ms"
            />
        )
        expect(screen.getByText('Apple')).toBeTruthy()
        expect(screen.getByText('Banana')).toBeTruthy()
        expect(screen.getByText('Carrot')).toBeTruthy()
        expect(screen.getByText('Fruits')).toBeTruthy()
    })

    it('calls onSelectionChange when an item is pressed', () => {
        const onSelectionChange = jest.fn()
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={onSelectionChange}
                open
                testID="ms"
            />
        )
        fireEvent.press(screen.getByText('Apple'))
        expect(onSelectionChange).toHaveBeenCalledWith(['apple'])
    })

    it('toggles selection when item is pressed again', () => {
        const onSelectionChange = jest.fn()
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={['apple']}
                onSelectionChange={onSelectionChange}
                open
                testID="ms"
            />
        )
        fireEvent.press(screen.getByText('Apple'))
        expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    it('renders select-all header when enableSelectAll is true', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                open
                enableSelectAll
                selectAllText="Select All"
                testID="ms"
            />
        )
        expect(screen.getByText('Select All')).toBeTruthy()
    })

    it('selects all when select-all is pressed', () => {
        const onSelectionChange = jest.fn()
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={onSelectionChange}
                open
                enableSelectAll
                selectAllText="Select All"
                testID="ms"
            />
        )
        fireEvent.press(screen.getByText('Select All'))
        expect(onSelectionChange).toHaveBeenCalledWith([
            'apple',
            'banana',
            'carrot',
            'spinach',
        ])
    })

    it('renders search input in header when search.show is true', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                open
                search={{ show: true }}
                testID="ms"
            />
        )
        expect(screen.getByPlaceholderText('Search...')).toBeTruthy()
    })

    it('renders clear button when showClearButton and selection exists', () => {
        const onClearAllClick = jest.fn()
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={['apple']}
                onSelectionChange={jest.fn()}
                selectionTagType={MultiSelectV2SelectionTagType.COUNT}
                showClearButton
                onClearAllClick={onClearAllClick}
                testID="ms"
            />
        )
        const clearBtn = screen.getByLabelText('Clear selection')
        expect(clearBtn).toBeTruthy()
    })

    it('calls onClearAllClick when clear button is pressed', () => {
        const onSelectionChange = jest.fn()
        const onClearAllClick = jest.fn()
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={['apple']}
                onSelectionChange={onSelectionChange}
                selectionTagType={MultiSelectV2SelectionTagType.COUNT}
                showClearButton
                onClearAllClick={onClearAllClick}
                testID="ms"
            />
        )
        fireEvent.press(screen.getByLabelText('Clear selection'))
        expect(onSelectionChange).toHaveBeenCalledWith([])
        expect(onClearAllClick).toHaveBeenCalledTimes(1)
    })

    it('renders action buttons when showActionButtons is true', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={['apple']}
                onSelectionChange={jest.fn()}
                open
                showActionButtons
                primaryAction={{
                    text: 'Apply',
                    onClick: jest.fn(),
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: jest.fn(),
                }}
                testID="ms"
            />
        )
        expect(screen.getByText('Apply')).toBeTruthy()
        expect(screen.getByText('Cancel')).toBeTruthy()
    })

    it('renders error state', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                error={{ show: true, message: 'At least one required' }}
                testID="ms"
            />
        )
        expect(screen.getByText('At least one required')).toBeTruthy()
    })

    it('renders hintText in the footer', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                hintText="Choose multiple"
                testID="ms"
            />
        )
        expect(screen.getByText('Choose multiple')).toBeTruthy()
    })

    it('renders menuFooter when provided', () => {
        wrap(
            <MultiSelect
                placeholder="Pick fruits"
                items={groups}
                selectedValues={[]}
                onSelectionChange={jest.fn()}
                open
                menuFooter={<Text>Footer content</Text>}
                testID="ms"
            />
        )
        expect(screen.getByText('Footer content')).toBeTruthy()
    })
})
