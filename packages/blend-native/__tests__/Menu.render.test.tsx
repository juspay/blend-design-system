import { Text as RNText } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Menu } from '../src/components/Menu'
import type { MenuGroupType } from '../src/components/Menu'

/**
 * Menu behaviour under the jest mocks: open/close, item press with
 * closeOnSelect, search filtering, the sub-menu push-in pane, and both
 * presentations (phone default; tablet via mocked dimensions).
 */

const GROUPS: MenuGroupType[] = [
    {
        label: 'Payouts',
        items: [
            { label: { text: 'Settle now' } },
            { label: { text: 'Schedule' }, subLabel: 'Pick a date' },
        ],
        showSeparator: true,
    },
    {
        items: [
            {
                label: { text: 'More' },
                subMenu: [{ label: { text: 'Export CSV' } }],
            },
        ],
    },
]

const renderMenu = (props: Partial<React.ComponentProps<typeof Menu>> = {}) =>
    render(
        <BlendNativeProvider>
            <Menu
                trigger={<RNText>menu trigger</RNText>}
                items={GROUPS}
                testID="menu"
                {...props}
            />
        </BlendNativeProvider>
    )

describe('Menu (phone sheet presentation)', () => {
    it('opens on trigger press and lists groups, items and sub-menu rows', () => {
        renderMenu()
        expect(screen.queryByText('Settle now')).toBeNull()
        fireEvent.press(screen.getByTestId('menu-trigger'))
        expect(screen.getByText('Payouts')).toBeTruthy()
        expect(screen.getByText('Settle now')).toBeTruthy()
        expect(screen.getByText('Pick a date')).toBeTruthy()
        expect(screen.getByText('More')).toBeTruthy()
    })

    it('fires onPress and closes via closeOnSelect', () => {
        const onPress = jest.fn()
        const groups: MenuGroupType[] = [
            { items: [{ label: { text: 'Settle now' }, onPress }] },
        ]
        renderMenu({ items: groups })
        fireEvent.press(screen.getByTestId('menu-trigger'))
        fireEvent.press(screen.getByText('Settle now'))
        expect(onPress).toHaveBeenCalledTimes(1)
        expect(screen.queryByText('Settle now')).toBeNull()
    })

    it('keeps the menu open when closeOnSelect is off', () => {
        renderMenu({ closeOnSelect: false })
        fireEvent.press(screen.getByTestId('menu-trigger'))
        fireEvent.press(screen.getByText('Settle now'))
        expect(screen.getByText('Settle now')).toBeTruthy()
    })

    it('pushes into a sub-menu pane and back out', () => {
        renderMenu()
        fireEvent.press(screen.getByTestId('menu-trigger'))
        fireEvent.press(screen.getByText('More'))
        expect(screen.getByText('Export CSV')).toBeTruthy()
        expect(screen.queryByText('Settle now')).toBeNull()
        fireEvent.press(screen.getByTestId('menu-back'))
        expect(screen.getByText('Settle now')).toBeTruthy()
    })

    it('filters through the search field', () => {
        renderMenu({ enableSearch: true })
        fireEvent.press(screen.getByTestId('menu-trigger'))
        fireEvent.changeText(
            screen.getByTestId('menu-search-input'),
            'schedule'
        )
        expect(screen.getByText('Schedule')).toBeTruthy()
        expect(screen.queryByText('Settle now')).toBeNull()
    })

    it('marks selected rows for assistive tech', () => {
        const groups: MenuGroupType[] = [
            {
                items: [
                    { label: { text: 'Weekly' }, selected: true },
                    { label: { text: 'Monthly' } },
                ],
            },
        ]
        renderMenu({ items: groups })
        fireEvent.press(screen.getByTestId('menu-trigger'))
        // The checkmark icon itself is SVG (device pass); the contract here
        // is the accessibility state.
        expect(
            screen.getByLabelText('Weekly').props.accessibilityState.selected
        ).toBe(true)
        expect(
            screen.getByLabelText('Monthly').props.accessibilityState.selected
        ).toBeUndefined()
    })
})

describe('Menu (tablet anchored presentation)', () => {
    const rn = jest.requireActual('react-native')
    let spy: jest.SpyInstance

    beforeEach(() => {
        spy = jest.spyOn(rn, 'useWindowDimensions').mockReturnValue({
            width: 1194,
            height: 834,
            scale: 2,
            fontScale: 1,
        })
    })
    afterEach(() => spy.mockRestore())

    it('presents anchored content instead of a sheet', () => {
        renderMenu({ open: true })
        expect(
            screen.getByText('Settle now', { includeHiddenElements: true })
        ).toBeTruthy()
        expect(
            screen.getByTestId('menu-backdrop', {
                includeHiddenElements: true,
            })
        ).toBeTruthy()
    })
})
