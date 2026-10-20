import { Platform, View } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { BottomNavigation } from '../src/components/BottomNavigation'
import type { BottomNavigationItem } from '../src/components/BottomNavigation'

/**
 * BottomNavigation under the Reanimated jest mock (animations resolve
 * synchronously). What these prove: selection state and the `activeIcon`
 * swap, the `onItemPress`/`onActiveItemChange` contract (including
 * non-selectable and disabled items), the centre action's placement
 * between the two halves.
 *
 * Icons sit in `Slot`s hidden from assistive tech, so icon queries pass
 * `includeHiddenElements`.
 */

const q = { includeHiddenElements: true } as const

const ITEMS: BottomNavigationItem[] = [
    {
        id: 'home',
        label: 'Home',
        icon: <View testID="home-icon" />,
        activeIcon: <View testID="home-icon-active" />,
    },
    { id: 'payments', label: 'Payments', icon: <View />, badge: 3 },
    { id: 'reports', label: 'Reports', icon: <View />, disabled: true },
    { id: 'more', label: 'More', icon: <View />, selectable: false },
]

const renderNav = (
    props: Partial<React.ComponentProps<typeof BottomNavigation>> = {}
) =>
    render(
        <BlendNativeProvider>
            <BottomNavigation items={ITEMS} testID="bottom-nav" {...props} />
        </BlendNativeProvider>
    )

const selected = (label: string) =>
    screen.getByLabelText(label).props.accessibilityState.selected

describe('BottomNavigation', () => {
    it('renders every label inside a tabbar', () => {
        renderNav()
        for (const item of ITEMS) {
            expect(screen.getByText(item.label)).toBeTruthy()
        }
        expect(screen.getByTestId('bottom-nav').props.accessibilityRole).toBe(
            'tabbar'
        )
        expect(screen.getAllByRole('tab')).toHaveLength(ITEMS.length)
    })

    it('uses the tablist role on Android, which has no tabbar role', () => {
        const os = Platform.OS
        Platform.OS = 'android'
        try {
            renderNav()
            expect(
                screen.getByTestId('bottom-nav').props.accessibilityRole
            ).toBe('tablist')
        } finally {
            Platform.OS = os
        }
    })

    it('marks the active item selected and swaps in its activeIcon', () => {
        renderNav({ defaultActiveItem: 'home' })
        expect(selected('Home')).toBe(true)
        expect(selected('Payments')).toBe(false)
        expect(screen.getByTestId('home-icon-active', q)).toBeTruthy()
        expect(screen.queryByTestId('home-icon', q)).toBeNull()
    })

    it('fires onItemPress then onActiveItemChange and selects the item', () => {
        const calls: string[] = []
        renderNav({
            onItemPress: (id) => calls.push(`press:${id}`),
            onActiveItemChange: (id) => calls.push(`change:${id}`),
        })
        fireEvent.press(screen.getByLabelText('Payments'))
        expect(calls).toEqual(['press:payments', 'change:payments'])
        expect(selected('Payments')).toBe(true)
    })

    it('stays put when controlled until the owner updates activeItem', () => {
        const onActiveItemChange = jest.fn()
        renderNav({ activeItem: 'home', onActiveItemChange })
        fireEvent.press(screen.getByLabelText('Payments'))
        expect(onActiveItemChange).toHaveBeenCalledWith('payments')
        expect(selected('Home')).toBe(true)
    })

    it('fires onItemPress for a selectable:false item without selecting it', () => {
        const onItemPress = jest.fn()
        const onActiveItemChange = jest.fn()
        renderNav({
            defaultActiveItem: 'home',
            onItemPress,
            onActiveItemChange,
        })
        fireEvent.press(screen.getByLabelText('More'))
        expect(onItemPress).toHaveBeenCalledWith('more')
        expect(onActiveItemChange).not.toHaveBeenCalled()
        expect(selected('Home')).toBe(true)
        expect(selected('More')).toBe(false)
    })

    it('ignores presses on a disabled item', () => {
        const onItemPress = jest.fn()
        const onActiveItemChange = jest.fn()
        renderNav({ onItemPress, onActiveItemChange })
        fireEvent.press(screen.getByLabelText('Reports'))
        expect(onItemPress).not.toHaveBeenCalled()
        expect(onActiveItemChange).not.toHaveBeenCalled()
        expect(
            screen.getByLabelText('Reports').props.accessibilityState.disabled
        ).toBe(true)
    })

    it('renders the centre action between the two halves and fires it', () => {
        const onPress = jest.fn()
        renderNav({
            centerAction: {
                icon: <View />,
                onPress,
                accessibilityLabel: 'Scan',
            },
        })
        const order = screen
            .getAllByRole(/^(tab|button)$/)
            .map((node) => node.props.accessibilityLabel)
        expect(order).toEqual(['Home', 'Payments', 'Scan', 'Reports', 'More'])
        fireEvent.press(screen.getByLabelText('Scan'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('applies token overrides to the active and inactive labels', () => {
        renderNav({
            defaultActiveItem: 'home',
            tokens: { activeForeground: '#454545', foreground: '#939393' },
        })
        const color = (label: string) => {
            const style = screen.getByText(label).props.style
            return [style]
                .flat(Infinity)
                .reduce((found, entry) => entry?.color ?? found, undefined)
        }
        expect(color('Home')).toBe('#454545')
        expect(color('Payments')).toBe('#939393')
    })

    it('draws the background behind the items and drops its own surface', () => {
        renderNav({ background: <View testID="notch" /> })
        expect(screen.getByTestId('notch', q)).toBeTruthy()
        const style = [screen.getByTestId('bottom-nav', q).props.style].flat(
            Infinity
        )
        expect(style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                }),
            ])
        )
    })

    it('reserves an empty centre gap without a centre action', () => {
        renderNav({ centerGap: 50 })
        expect(screen.queryByRole('button')).toBeNull()
        expect(screen.getByLabelText('Home')).toBeTruthy()
        expect(screen.getByLabelText('More')).toBeTruthy()
    })
})
