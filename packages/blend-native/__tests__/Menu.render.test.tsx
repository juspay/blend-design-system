import { Text } from 'react-native'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Menu } from '../src/components/Menu'
import { MenuV2Side, MenuV2Alignment } from '@juspay/blend-design-system/node'
import type { MenuV2GroupType } from '@juspay/blend-design-system/node'

const wrap = (ui: React.ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

const groups: MenuV2GroupType[] = [
    {
        label: 'Fruits',
        items: [
            { id: 'a', label: { text: 'Apple' }, onClick: jest.fn() },
            { id: 'b', label: { text: 'Banana' } },
        ],
    },
    {
        label: 'Veggies',
        items: [
            { id: 'c', label: { text: 'Carrot' } },
            { id: 'd', label: { text: 'Spinach (disabled)' }, disabled: true },
        ],
        showSeparator: true,
    },
]

describe('Menu rendering', () => {
    it('renders the trigger', () => {
        wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={groups}
                testID="menu"
            />
        )
        expect(screen.getByText('Open Menu')).toBeTruthy()
    })

    it('opens the dropdown when trigger is pressed (controlled)', () => {
        const onOpenChange = jest.fn()
        const { rerender } = wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={groups}
                open={false}
                onOpenChange={onOpenChange}
                testID="menu"
            />
        )
        fireEvent.press(screen.getByText('Open Menu'))
        expect(onOpenChange).toHaveBeenCalledWith(true)
        // Now simulate parent setting open=true
        rerender(
            <BlendNativeProvider>
                <Menu
                    trigger={<Text>Open Menu</Text>}
                    items={groups}
                    open
                    onOpenChange={onOpenChange}
                    testID="menu"
                />
            </BlendNativeProvider>
        )
        expect(screen.getByText('Apple')).toBeTruthy()
        expect(screen.getByText('Banana')).toBeTruthy()
        expect(screen.getByText('Carrot')).toBeTruthy()
    })

    it('fires onClick on item press and closes when closeOnSelect', () => {
        const onClick = jest.fn()
        const onOpenChange = jest.fn()
        const { rerender } = wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={[
                    {
                        label: 'Items',
                        items: [
                            {
                                id: 'a',
                                label: { text: 'Apple' },
                                onClick,
                            },
                        ],
                    },
                ]}
                open
                onOpenChange={onOpenChange}
                closeOnSelect
                testID="menu"
            />
        )
        fireEvent.press(screen.getByText('Apple'))
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onOpenChange).toHaveBeenCalledWith(false)
        // Clean up by unmounting
        rerender(
            <BlendNativeProvider>
                <Text>done</Text>
            </BlendNativeProvider>
        )
    })

    it('does not close when closeOnSelect is false', () => {
        const onClick = jest.fn()
        const onOpenChange = jest.fn()
        wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={[
                    {
                        label: 'Items',
                        items: [
                            {
                                id: 'a',
                                label: { text: 'Apple' },
                                onClick,
                            },
                        ],
                    },
                ]}
                open
                onOpenChange={onOpenChange}
                closeOnSelect={false}
                testID="menu"
            />
        )
        fireEvent.press(screen.getByText('Apple'))
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onOpenChange).not.toHaveBeenCalled()
    })

    it('renders group labels', () => {
        wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={groups}
                open
                testID="menu"
            />
        )
        expect(screen.getByText('Fruits')).toBeTruthy()
        expect(screen.getByText('Veggies')).toBeTruthy()
    })

    it('renders search input when enableSearch is true', () => {
        wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={groups}
                open
                enableSearch
                searchPlaceholder="Search items..."
                testID="menu"
            />
        )
        expect(screen.getByPlaceholderText('Search items...')).toBeTruthy()
    })

    it('filters items based on search text', () => {
        wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={groups}
                open
                enableSearch
                testID="menu"
            />
        )
        const input = screen.getByPlaceholderText('Search...')
        fireEvent.changeText(input, 'apple')
        expect(screen.getByText('Apple')).toBeTruthy()
        expect(screen.queryByText('Banana')).toBeNull()
        expect(screen.queryByText('Carrot')).toBeNull()
    })

    it('renders menuFooter when provided', () => {
        wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={groups}
                open
                menuFooter={<Text>Footer content</Text>}
                testID="menu"
            />
        )
        expect(screen.getByText('Footer content')).toBeTruthy()
    })

    it('respects default side and alignment', () => {
        // Smoke test: just verifying it renders without error
        wrap(
            <Menu
                trigger={<Text>Open Menu</Text>}
                items={groups}
                side={MenuV2Side.BOTTOM}
                alignment={MenuV2Alignment.CENTER}
                testID="menu"
            />
        )
        expect(screen.getByText('Open Menu')).toBeTruthy()
    })
})
