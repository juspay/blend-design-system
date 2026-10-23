import { Text } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Sidebar } from '../src/components/Sidebar'
import type { SidebarSectionData } from '../src/components/Sidebar'

/**
 * Covers the feature set added on top of `Sidebar.render.test.tsx`'s base
 * rail/drawer contract: the secondary icon rail, the built-in merchant-info
 * picker, active-path highlighting, hierarchy connector lines, the mobile
 * bottom nav + its overflow sheet, and the header's scroll shadow.
 */

const rn = jest.requireActual('react-native')

const renderDesktop = (ui: React.ReactElement) => {
    const spy = jest.spyOn(rn, 'useWindowDimensions').mockReturnValue({
        width: 1024,
        height: 800,
        scale: 1,
        fontScale: 1,
    })
    const result = render(ui)
    return { ...result, restore: () => spy.mockRestore() }
}

const NESTED_DATA: SidebarSectionData[] = [
    {
        label: 'Workspace',
        items: [
            { id: 'home', label: 'Home' },
            {
                id: 'reports',
                label: 'Reports',
                items: [
                    { id: 'daily', label: 'Daily' },
                    { id: 'weekly', label: 'Weekly' },
                ],
            },
        ],
    },
]

describe('Sidebar — secondary panel', () => {
    it('renders items and reports selection, hidden on the mobile drawer', () => {
        const onSelect = jest.fn()
        const { restore } = renderDesktop(
            <BlendNativeProvider>
                <Sidebar
                    data={NESTED_DATA}
                    secondarySidebar={{
                        items: [
                            {
                                label: 'Acme',
                                value: 'acme',
                                icon: <Text>A</Text>,
                            },
                            {
                                label: 'Beta',
                                value: 'beta',
                                icon: <Text>B</Text>,
                            },
                        ],
                        selected: 'acme',
                        onSelect,
                    }}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        expect(screen.getByTestId('sidebar-secondary-panel')).toBeTruthy()
        fireEvent.press(screen.getByLabelText('Select Beta'))
        expect(onSelect).toHaveBeenCalledWith('beta')
        restore()
    })

    it('collapses to 0 width in lockstep with the primary rail', () => {
        const { restore } = renderDesktop(
            <BlendNativeProvider>
                <Sidebar
                    data={NESTED_DATA}
                    secondarySidebar={{
                        items: [
                            {
                                label: 'Acme',
                                value: 'acme',
                                icon: <Text>A</Text>,
                            },
                        ],
                        selected: 'acme',
                        onSelect: jest.fn(),
                    }}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        const panel = screen.getByTestId('sidebar-secondary-panel')
        const widthOf = () =>
            [panel.props.style].flat().find((s) => s?.width != null)?.width

        expect(widthOf()).toBeGreaterThan(0)
        expect(panel.props.accessibilityElementsHidden).toBe(false)

        fireEvent.press(screen.getByLabelText('Collapse sidebar'))
        expect(widthOf()).toBe(0)
        expect(panel.props.accessibilityElementsHidden).toBe(true)
        restore()
    })

    it('is not rendered in the mobile drawer', () => {
        render(
            <BlendNativeProvider>
                <Sidebar
                    data={NESTED_DATA}
                    secondarySidebar={{
                        items: [
                            {
                                label: 'Acme',
                                value: 'acme',
                                icon: <Text>A</Text>,
                            },
                        ],
                        selected: 'acme',
                        onSelect: jest.fn(),
                    }}
                    open
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        expect(screen.queryByTestId('sidebar-secondary-panel')).toBeNull()
    })
})

describe('Sidebar — merchant info header', () => {
    it('renders a picker showing the selected workspace when no custom header is given', () => {
        const { restore } = renderDesktop(
            <BlendNativeProvider>
                <Sidebar
                    data={NESTED_DATA}
                    merchantInfo={{
                        items: [
                            { label: 'Acme Inc', value: 'acme' },
                            { label: 'Beta LLC', value: 'beta' },
                        ],
                        selected: 'acme',
                        onSelect: jest.fn(),
                    }}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        expect(screen.getByText('Acme Inc')).toBeTruthy()
        restore()
    })

    it('yields to a custom header when both are given', () => {
        const { restore } = renderDesktop(
            <BlendNativeProvider>
                <Sidebar
                    data={NESTED_DATA}
                    header={<Text>Custom Header</Text>}
                    merchantInfo={{
                        items: [{ label: 'Acme Inc', value: 'acme' }],
                        selected: 'acme',
                        onSelect: jest.fn(),
                    }}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        expect(screen.getByText('Custom Header')).toBeTruthy()
        expect(screen.queryByText('Acme Inc')).toBeNull()
        restore()
    })
})

describe('Sidebar — highlightActivePath', () => {
    it('marks the selected leaf, its ancestor, and mutes an unrelated row', () => {
        const { restore } = renderDesktop(
            <BlendNativeProvider>
                <Sidebar
                    data={NESTED_DATA}
                    highlightActivePath
                    activeItem="reports/daily"
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        // The nested panel only renders once "Reports" is expanded.
        fireEvent.press(screen.getByText('Reports'))

        const daily = screen.getByText('Daily')
        const reports = screen.getByText('Reports')
        const home = screen.getByText('Home')

        const colorOf = (el: typeof daily) => {
            const style = [el.props.style].flat().find((s) => s?.color)
            return style?.color
        }

        // Light-mode text colour only distinguishes "muted" from everything
        // else — selected and on-path rows share the same full-strength
        // colour there (web's own design: selection reads from background,
        // not text, in light mode). The feature's signal is the unrelated
        // row dimming out while the selected item *and* its ancestor stay
        // full-strength.
        expect(colorOf(home)).not.toBe(colorOf(daily))
        expect(colorOf(home)).not.toBe(colorOf(reports))

        // Only the selected row itself carries the highlighted background —
        // its ancestor reads as on-path through text colour alone.
        const bgOf = (el: ReturnType<typeof screen.getByLabelText>) =>
            [el.props.style].flat().find((s) => s?.backgroundColor)
                ?.backgroundColor
        expect(bgOf(screen.getByLabelText('Daily'))).not.toBe('transparent')
        expect(bgOf(screen.getByLabelText('Reports'))).toBe('transparent')
        restore()
    })

    it('has no effect on sibling colour when off (default two-state behaviour)', () => {
        const { restore } = renderDesktop(
            <BlendNativeProvider>
                <Sidebar
                    data={NESTED_DATA}
                    activeItem="reports/daily"
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        fireEvent.press(screen.getByText('Reports'))
        const reports = screen.getByText('Reports')
        const home = screen.getByText('Home')
        const colorOf = (el: typeof reports) => {
            const style = [el.props.style].flat().find((s) => s?.color)
            return style?.color
        }
        // Without the flag, an ancestor of the selected item is still just a
        // plain default-coloured row — same as any unrelated row.
        expect(colorOf(reports)).toBe(colorOf(home))
        restore()
    })
})

describe('Sidebar — hierarchy connector lines', () => {
    it('draws a connector per nested row only when enabled', () => {
        const { restore, rerender } = renderDesktop(
            <BlendNativeProvider>
                <Sidebar data={NESTED_DATA} testID="sidebar" />
            </BlendNativeProvider>
        )
        fireEvent.press(screen.getByText('Reports'))
        expect(screen.queryByTestId('reports/daily-connector-line')).toBeNull()

        rerender(
            <BlendNativeProvider>
                <Sidebar
                    data={NESTED_DATA}
                    showHierarchyLines
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        // Already expanded from the first render — state persists across
        // `rerender` of the same tree, so pressing again would collapse it.
        expect(screen.getByTestId('reports/daily-connector-line')).toBeTruthy()
        expect(screen.getByTestId('reports/daily-connector-elbow')).toBeTruthy()
        // Root-level items are never "nested" — no connector for them.
        expect(screen.queryByTestId('home-connector-line')).toBeNull()
        restore()
    })
})

describe('Sidebar — scroll shadow', () => {
    it('fades in once the nav list scrolls past its top', () => {
        const { restore } = renderDesktop(
            <BlendNativeProvider>
                <Sidebar data={NESTED_DATA} testID="sidebar" />
            </BlendNativeProvider>
        )
        const shadow = screen.getByTestId('sidebar-scroll-shadow')
        const opacityOf = () =>
            [shadow.props.style].flat().find((s) => s?.opacity != null)?.opacity

        expect(opacityOf()).toBe(0)
        fireEvent.scroll(screen.getByTestId('sidebar-nav-scroll'), {
            nativeEvent: { contentOffset: { y: 40 } },
        })
        expect(opacityOf()).toBe(1)
        restore()
    })
})

const MOBILE_DATA: SidebarSectionData[] = [
    {
        items: [
            { id: 'home', label: 'Home', showOnMobile: true },
            { id: 'search', label: 'Search', showOnMobile: true },
            { id: 'alerts', label: 'Alerts', showOnMobile: true },
            { id: 'profile', label: 'Profile', showOnMobile: true },
            { id: 'settings', label: 'Settings', showOnMobile: true },
            { id: 'help', label: 'Help' },
        ],
    },
]

describe('Sidebar — mobile bottom nav', () => {
    it('renders the first 4 flagged items plus "More" for the rest', () => {
        render(
            <BlendNativeProvider>
                <Sidebar
                    data={MOBILE_DATA}
                    showMobileBottomNav
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        expect(screen.getByTestId('sidebar-mobile-bottom-nav')).toBeTruthy()
        // First 4 flagged items sit directly in the bar.
        expect(screen.getByText('Home')).toBeTruthy()
        expect(screen.getByText('Profile')).toBeTruthy()
        // The 5th flagged item folds into "More" instead.
        expect(screen.queryByText('Settings')).toBeNull()
        // "Help" isn't flagged `showOnMobile` at all — never reachable.
        expect(screen.queryByText('Help')).toBeNull()

        fireEvent.press(screen.getByLabelText('More navigation options'))
        expect(screen.getByText('Settings')).toBeTruthy()
    })

    it('selecting a bar item reports it as the active item', () => {
        const onActiveItemChange = jest.fn()
        render(
            <BlendNativeProvider>
                <Sidebar
                    data={MOBILE_DATA}
                    showMobileBottomNav
                    onActiveItemChange={onActiveItemChange}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        fireEvent.press(screen.getByLabelText('Home'))
        expect(onActiveItemChange).toHaveBeenCalledWith('home')
    })

    it('is absent when the flag is off', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={MOBILE_DATA} testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(screen.queryByTestId('sidebar-mobile-bottom-nav')).toBeNull()
    })
})
