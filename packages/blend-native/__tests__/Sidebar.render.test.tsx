import { Text } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Sidebar } from '../src/components/Sidebar'
import type { SidebarSectionData } from '../src/components/Sidebar'

/**
 * Sidebar behaviour under the Reanimated/Gesture Handler jest mocks
 * (animations resolve synchronously, gestures inert). What these prove:
 * the rail/drawer breakpoint split, controlled and uncontrolled expand and
 * active-item state, nested-item disclosure, and the drawer's controlled
 * open/close contract.
 *
 * Sidebar checks `useWindowDimensions().width` against a plain 768px
 * constant directly (not Blend's token-driven breakpoint system), so the
 * `Modal`/`Popover` render tests' own technique applies here too: mock the
 * hook itself rather than passing a `breakpoints` prop. Jest's RN preset
 * reports a 750pt window by default, which is already below 768 (drawer
 * mode) — the desktop-rail tests below mock a wider width explicitly.
 */

const DATA: SidebarSectionData[] = [
    {
        label: 'Workspace',
        items: [
            { id: 'home', label: 'Home' },
            {
                id: 'reports',
                label: 'Reports',
                items: [
                    { id: 'reports-daily', label: 'Daily' },
                    { id: 'reports-weekly', label: 'Weekly' },
                ],
            },
        ],
    },
]

describe('Sidebar — desktop rail', () => {
    const rn = jest.requireActual('react-native')
    let spy: jest.SpyInstance

    beforeEach(() => {
        spy = jest.spyOn(rn, 'useWindowDimensions').mockReturnValue({
            width: 1024,
            height: 800,
            scale: 1,
            fontScale: 1,
        })
    })
    afterEach(() => spy.mockRestore())

    it('renders the nav tree and hides the drawer/backdrop', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(screen.getByText('Workspace')).toBeTruthy()
        expect(screen.getByText('Home')).toBeTruthy()
        expect(screen.getByText('Reports')).toBeTruthy()
        expect(screen.queryByTestId('sidebar-backdrop')).toBeNull()
    })

    it('is expanded by default and collapses via the toggle button', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(
            screen.getByLabelText('Collapse sidebar').props.accessibilityState
                .expanded
        ).toBe(true)
        fireEvent.press(screen.getByLabelText('Collapse sidebar'))
        expect(screen.getByLabelText('Expand sidebar')).toBeTruthy()
        // Icon-only mode hides labels; the icon-less items have nothing to
        // query by text, so absence of the group label is the signal.
        expect(screen.queryByText('Workspace')).toBeNull()
    })

    it('is controllable via isExpanded/onExpandedChange', () => {
        const onExpandedChange = jest.fn()
        const { rerender } = render(
            <BlendNativeProvider>
                <Sidebar
                    data={DATA}
                    isExpanded
                    onExpandedChange={onExpandedChange}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        fireEvent.press(screen.getByLabelText('Collapse sidebar'))
        expect(onExpandedChange).toHaveBeenCalledWith(false)
        // Controlled: stays expanded until the owner flips the prop.
        expect(screen.getByText('Workspace')).toBeTruthy()

        rerender(
            <BlendNativeProvider>
                <Sidebar
                    data={DATA}
                    isExpanded={false}
                    onExpandedChange={onExpandedChange}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        expect(screen.queryByText('Workspace')).toBeNull()
    })

    it('hides the toggle button when asked', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} hideToggleButton testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(screen.queryByLabelText('Collapse sidebar')).toBeNull()
    })

    it('expands a nested item and selects a leaf as the active item', () => {
        const onActiveItemChange = jest.fn()
        render(
            <BlendNativeProvider>
                <Sidebar
                    data={DATA}
                    onActiveItemChange={onActiveItemChange}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        expect(screen.queryByText('Daily')).toBeNull()
        fireEvent.press(screen.getByText('Reports'))
        expect(screen.getByText('Daily')).toBeTruthy()

        fireEvent.press(screen.getByText('Home'))
        expect(onActiveItemChange).toHaveBeenCalledWith('home')
    })

    it('renders the header and footer slots, hidden while icon-only', () => {
        render(
            <BlendNativeProvider>
                <Sidebar
                    data={DATA}
                    header={<Text>Acme Inc</Text>}
                    footer={<Text>Account</Text>}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        expect(screen.getByText('Acme Inc')).toBeTruthy()
        expect(screen.getByText('Account')).toBeTruthy()
        fireEvent.press(screen.getByLabelText('Collapse sidebar'))
        expect(screen.queryByText('Acme Inc')).toBeNull()
        expect(screen.queryByText('Account')).toBeNull()
    })
})

describe('Sidebar — mobile drawer', () => {
    it('renders nothing while closed, no docked rail either', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} open={false} testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(screen.queryByText('Workspace')).toBeNull()
    })

    it('presents the full nav tree when open', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} open testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(screen.getByText('Workspace')).toBeTruthy()
        expect(screen.getByTestId('sidebar')).toBeTruthy()
        expect(
            screen.getByTestId('sidebar-backdrop', {
                includeHiddenElements: true,
            })
        ).toBeTruthy()
        // No collapse toggle on mobile — there is no icon-only rail state.
        expect(screen.queryByLabelText('Collapse sidebar')).toBeNull()
    })

    it('requests close on backdrop press', () => {
        const onOpenChange = jest.fn()
        render(
            <BlendNativeProvider>
                <Sidebar
                    data={DATA}
                    open
                    onOpenChange={onOpenChange}
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        const backdrop = screen.getByTestId('sidebar-backdrop', {
            includeHiddenElements: true,
        })
        fireEvent.press(backdrop.children[0] as never)
        expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('is uncontrolled (closed) by default', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(screen.queryByText('Workspace')).toBeNull()
    })
})

describe('Sidebar — isSmallScreen override', () => {
    // A host that measures its own layout (a preview harness rendering
    // inside a scaled device frame, say) can know the real width is wide
    // even though `useWindowDimensions` reports the frame's outer size.
    const rn = jest.requireActual('react-native')
    let spy: jest.SpyInstance

    beforeEach(() => {
        spy = jest.spyOn(rn, 'useWindowDimensions').mockReturnValue({
            width: 1280,
            height: 800,
            scale: 1,
            fontScale: 1,
        })
    })
    afterEach(() => spy.mockRestore())

    it('forces drawer mode even when the window is wide', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} isSmallScreen testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(screen.queryByText('Workspace')).toBeNull()
        expect(screen.queryByLabelText('Collapse sidebar')).toBeNull()
    })

    it('forces rail mode even when the window is narrow', () => {
        spy.mockReturnValue({ width: 320, height: 800, scale: 1, fontScale: 1 })
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} isSmallScreen={false} testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(screen.getByText('Workspace')).toBeTruthy()
        expect(screen.getByLabelText('Collapse sidebar')).toBeTruthy()
    })
})
