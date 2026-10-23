import { Text } from 'react-native'
import { render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { SideDrawer } from '../src/overlay/drawer/SideDrawer'

/**
 * The drawer stays mounted while closed so a large drawer isn't rebuilt on
 * every open (which can outlast the enter animation and make it pop in
 * fully open). Closed, it must be inert: no touches, hidden from assistive
 * tech.
 */

const q = { includeHiddenElements: true }

const renderDrawer = (open: boolean) => (
    <BlendNativeProvider>
        <SideDrawer open={open} onClose={jest.fn()} testID="drawer">
            <Text>Drawer content</Text>
        </SideDrawer>
    </BlendNativeProvider>
)

describe('SideDrawer', () => {
    it('mounts its content before the first open, inert while closed', () => {
        render(renderDrawer(false))
        expect(screen.getByText('Drawer content', q)).toBeTruthy()
        const drawer = screen.getByTestId('drawer', q)
        expect(drawer.props.pointerEvents).toBe('none')
        expect(drawer.props.accessibilityElementsHidden).toBe(true)
        expect(
            screen.getByTestId('drawer-backdrop', q).props.pointerEvents
        ).toBe('none')
    })

    it('becomes interactive when opened and stays mounted after closing', () => {
        const { rerender } = render(renderDrawer(true))
        expect(screen.getByTestId('drawer', q).props.pointerEvents).toBe('auto')
        rerender(renderDrawer(false))
        expect(screen.getByText('Drawer content', q)).toBeTruthy()
        expect(screen.getByTestId('drawer', q).props.pointerEvents).toBe('none')
    })
})
