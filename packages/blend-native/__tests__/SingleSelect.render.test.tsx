import { Text } from 'react-native'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { SingleSelect } from '../src/components/SingleSelect'
import { SelectV2Size, SelectV2Variant } from '@juspay/blend-design-system/node'
import type { SingleSelectV2GroupType } from '@juspay/blend-design-system/node'

const wrap = (ui: React.ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

const groups: SingleSelectV2GroupType[] = [
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

describe('SingleSelect rendering', () => {
    it('renders the placeholder text when no selection', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                testID="ss"
            />
        )
        expect(screen.getByText('Pick a fruit')).toBeTruthy()
    })

    it('renders the selected label when a value is selected', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected="apple"
                onSelect={jest.fn()}
                testID="ss"
            />
        )
        expect(screen.getByText('Apple')).toBeTruthy()
    })

    it('renders label and subLabel', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                label="Choose Fruit"
                subLabel="required"
                required
                testID="ss"
            />
        )
        expect(screen.getByText('Choose Fruit')).toBeTruthy()
    })

    it('opens the dropdown when trigger is pressed (controlled)', () => {
        const onOpenChange = jest.fn()
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                open={false}
                onOpenChange={onOpenChange}
                testID="ss"
            />
        )
        fireEvent.press(screen.getByText('Pick a fruit'))
        expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('renders items when open', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                open
                testID="ss"
            />
        )
        expect(screen.getByText('Apple')).toBeTruthy()
        expect(screen.getByText('Banana')).toBeTruthy()
        expect(screen.getByText('Carrot')).toBeTruthy()
        expect(screen.getByText('Fruits')).toBeTruthy()
    })

    it('calls onSelect when an item is pressed', () => {
        const onSelect = jest.fn()
        const onOpenChange = jest.fn()
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={onSelect}
                open
                onOpenChange={onOpenChange}
                testID="ss"
            />
        )
        // Press "Banana" (there are two "Apple" texts — selected label and item)
        fireEvent.press(screen.getByText('Banana'))
        expect(onSelect).toHaveBeenCalledWith('banana')
        // Should close after select
        expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('renders search input when search.show is true', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                open
                search={{ show: true, placeholder: 'Type to search...' }}
                testID="ss"
            />
        )
        expect(screen.getByPlaceholderText('Type to search...')).toBeTruthy()
    })

    it('filters items based on search text', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                open
                search={{ show: true }}
                testID="ss"
            />
        )
        const input = screen.getByPlaceholderText('Search...')
        fireEvent.changeText(input, 'carrot')
        expect(screen.getByText('Carrot')).toBeTruthy()
        expect(screen.queryByText('Apple')).toBeNull()
        expect(screen.queryByText('Banana')).toBeNull()
    })

    it('renders error state', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                error={{ show: true, message: 'Selection is required' }}
                testID="ss"
            />
        )
        expect(screen.getByText('Selection is required')).toBeTruthy()
    })

    it('renders hintText in the footer', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                hintText="Select one option"
                testID="ss"
            />
        )
        expect(screen.getByText('Select one option')).toBeTruthy()
    })

    it('renders menuFooter when provided', () => {
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                open
                menuFooter={<Text>Footer content</Text>}
                testID="ss"
            />
        )
        expect(screen.getByText('Footer content')).toBeTruthy()
    })

    it('renders with different sizes and variants', () => {
        // Smoke test: just verify it renders
        wrap(
            <SingleSelect
                placeholder="Pick a fruit"
                items={groups}
                selected=""
                onSelect={jest.fn()}
                size={SelectV2Size.LG}
                variant={SelectV2Variant.NO_CONTAINER}
                testID="ss"
            />
        )
        expect(screen.getByText('Pick a fruit')).toBeTruthy()
    })
})
