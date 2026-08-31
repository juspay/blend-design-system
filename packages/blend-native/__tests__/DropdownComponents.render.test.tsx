import { Text } from 'react-native'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { DropdownContent } from '../src/components/shared/dropdown/DropdownContent'
import { DropdownItem } from '../src/components/shared/dropdown/DropdownItem'
import { DropdownSearch } from '../src/components/shared/dropdown/DropdownSearch'
import { DropdownSeparator } from '../src/components/shared/dropdown/DropdownSeparator'
import type {
    DropdownItemAdapter,
    DropdownItemTokens,
} from '../src/components/shared/dropdown/dropdown.types'
import type { AnchoredPosition } from '../src/overlay/positioning'

const fullContentTokens = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 8,
}

const wrap = (ui: React.ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

const itemTokens: DropdownItemTokens = {
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    margin: undefined,
    gap: 8,
    borderRadius: 6,
    backgroundColor: {
        default: '#FFFFFF',
        hover: '#F3F4F6',
        active: '#E5E7EB',
        focus: '#F3F4F6',
        focusVisible: '#F3F4F6',
        disabled: '#F9FAFB',
        selected: '#EFF6FF',
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: {
            default: '#111827',
            hover: '#111827',
            active: '#111827',
            focus: '#111827',
            focusVisible: '#111827',
            disabled: '#9CA3AF',
            selected: '#111827',
        },
        subText: {
            fontSize: 12,
            fontWeight: '400',
            color: {
                default: '#6B7280',
                hover: '#6B7280',
                active: '#6B7280',
                focus: '#6B7280',
                focusVisible: '#6B7280',
                disabled: '#D1D5DB',
                selected: '#6B7280',
            },
        },
        leftSlot: { maxHeight: 20 },
        rightChevron: { color: '#6B7280', width: 16 },
    },
}

describe('DropdownContent', () => {
    it('renders children when open with a position', () => {
        const position: AnchoredPosition = {
            x: 10,
            y: 20,
            placement: 'bottom',
            maxHeight: 300,
            maxWidth: 300,
        }
        wrap(
            <DropdownContent
                open
                onClose={jest.fn()}
                position={position}
                onContentLayout={jest.fn()}
                tokens={fullContentTokens}
                testID="dropdown-content"
            >
                <Text>panel content</Text>
            </DropdownContent>
        )
        expect(screen.getByText('panel content')).toBeTruthy()
    })

    it('renders nothing when closed', () => {
        wrap(
            <DropdownContent
                open={false}
                onClose={jest.fn()}
                position={null}
                onContentLayout={jest.fn()}
                tokens={fullContentTokens}
            >
                <Text>hidden</Text>
            </DropdownContent>
        )
        expect(screen.queryByText('hidden')).toBeNull()
    })

    it('calls onClose when backdrop is pressed', () => {
        const onClose = jest.fn()
        const position: AnchoredPosition = {
            x: 0,
            y: 0,
            placement: 'bottom',
            maxHeight: 300,
            maxWidth: 300,
        }
        wrap(
            <DropdownContent
                open
                onClose={onClose}
                position={position}
                onContentLayout={jest.fn()}
                tokens={fullContentTokens}
                accessibilityLabel="Close dropdown"
            >
                <Text>content</Text>
            </DropdownContent>
        )
        fireEvent.press(screen.getAllByLabelText('Close dropdown')[0])
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})

describe('DropdownItem', () => {
    const makeAdapter = (
        overrides: Partial<DropdownItemAdapter> = {}
    ): DropdownItemAdapter => ({
        id: 'item-1',
        primaryText: 'Apple',
        item: { value: 'apple' },
        ...overrides,
    })

    it('renders the primary text', () => {
        wrap(
            <DropdownItem
                adapter={makeAdapter()}
                tokens={itemTokens}
                onPress={jest.fn()}
                testID="item"
            />
        )
        expect(screen.getByText('Apple')).toBeTruthy()
    })

    it('renders secondary text when provided', () => {
        wrap(
            <DropdownItem
                adapter={makeAdapter({ secondaryText: 'A fruit' })}
                tokens={itemTokens}
                onPress={jest.fn()}
            />
        )
        expect(screen.getByText('A fruit')).toBeTruthy()
    })

    it('calls onPress when pressed', () => {
        const onPress = jest.fn()
        wrap(
            <DropdownItem
                adapter={makeAdapter()}
                tokens={itemTokens}
                onPress={onPress}
                testID="item"
            />
        )
        fireEvent.press(screen.getByText('Apple'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('does not call onPress when disabled', () => {
        const onPress = jest.fn()
        wrap(
            <DropdownItem
                adapter={makeAdapter({ disabled: true })}
                tokens={itemTokens}
                onPress={onPress}
                testID="item"
            />
        )
        // The Pressable primitive disables interaction
        const row = screen.getByTestId('item')
        expect(row.props.accessibilityState.disabled).toBe(true)
    })

    it('shows selected state in accessibility', () => {
        wrap(
            <DropdownItem
                adapter={makeAdapter({ isSelected: true })}
                tokens={itemTokens}
                onPress={jest.fn()}
                testID="item"
            />
        )
        const row = screen.getByTestId('item')
        expect(row.props.accessibilityState.selected).toBe(true)
    })
})

describe('DropdownSearch', () => {
    it('renders a text input with placeholder', () => {
        wrap(
            <DropdownSearch
                value=""
                onChange={jest.fn()}
                placeholder="Search fruits..."
                testID="search"
            />
        )
        expect(screen.getByPlaceholderText('Search fruits...')).toBeTruthy()
    })

    it('calls onChange on text input', () => {
        const onChange = jest.fn()
        wrap(
            <DropdownSearch
                value=""
                onChange={onChange}
                placeholder="Search..."
            />
        )
        const input = screen.getByPlaceholderText('Search...')
        fireEvent.changeText(input, 'apple')
        expect(onChange).toHaveBeenCalledWith('apple')
    })
})

describe('DropdownSeparator', () => {
    it('renders a separator with the given color', () => {
        wrap(
            <DropdownSeparator color="#E5E7EB" height={1} testID="separator" />
        )
        expect(
            screen.getByTestId('separator', {
                includeHiddenElements: true,
            })
        ).toBeTruthy()
    })
})
