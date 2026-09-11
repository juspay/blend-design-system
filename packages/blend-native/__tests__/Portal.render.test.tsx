import { Text, View } from 'react-native'
import { render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Portal } from '../src/overlay/portal'

/**
 * Portal behaviour that only a mounted tree can prove: teleportation above
 * the app's children, stacking order, live updates, unmounting, and the
 * inline fallback without a provider.
 */

describe('Portal', () => {
    it('renders portal content into the overlay layer', () => {
        render(
            <BlendNativeProvider>
                <View testID="app">
                    <Portal>
                        <Text testID="overlay">menu</Text>
                    </Portal>
                </View>
            </BlendNativeProvider>
        )

        const overlay = screen.getByTestId('overlay')
        expect(overlay).toBeTruthy()
        // Teleported: the overlay is NOT a descendant of the app view.
        const app = screen.getByTestId('app')
        const descendants: unknown[] = []
        const walk = (node: { children?: unknown[] }) => {
            for (const child of node.children ?? []) {
                descendants.push(child)
                if (typeof child === 'object' && child !== null) {
                    walk(child as { children?: unknown[] })
                }
            }
        }
        walk(app)
        expect(descendants).not.toContain(overlay)
    })

    it('stacks portals in mount order, later on top', () => {
        render(
            <BlendNativeProvider>
                <Portal>
                    <Text>first</Text>
                </Portal>
                <Portal>
                    <Text>second</Text>
                </Portal>
            </BlendNativeProvider>
        )
        const first = screen.getByText('first')
        const second = screen.getByText('second')
        expect(first).toBeTruthy()
        expect(second).toBeTruthy()
    })

    it('updates portal content in place', () => {
        const ui = (label: string) => (
            <BlendNativeProvider>
                <Portal>
                    <Text>{label}</Text>
                </Portal>
            </BlendNativeProvider>
        )
        const { rerender } = render(ui('before'))
        expect(screen.getByText('before')).toBeTruthy()
        rerender(ui('after'))
        expect(screen.getByText('after')).toBeTruthy()
        expect(screen.queryByText('before')).toBeNull()
    })

    it('removes the layer when the portal unmounts', () => {
        const ui = (open: boolean) => (
            <BlendNativeProvider>
                {open ? (
                    <Portal>
                        <Text>overlay</Text>
                    </Portal>
                ) : null}
            </BlendNativeProvider>
        )
        const { rerender } = render(ui(true))
        expect(screen.getByText('overlay')).toBeTruthy()
        rerender(ui(false))
        expect(screen.queryByText('overlay')).toBeNull()
    })

    it('a modal layer hides the app and lower layers from assistive tech', () => {
        const ui = (modalOpen: boolean) => (
            <BlendNativeProvider>
                <Text>app content</Text>
                <Portal>
                    <Text>below</Text>
                </Portal>
                {modalOpen ? (
                    <Portal modal>
                        <Text>sheet</Text>
                    </Portal>
                ) : null}
                <Portal priority={1}>
                    <Text>toast</Text>
                </Portal>
            </BlendNativeProvider>
        )
        const { rerender } = render(ui(true))
        // RNTL's default queries skip accessibility-hidden elements, so the
        // hiding itself is the assertion.
        expect(screen.queryByText('app content')).toBeNull()
        expect(screen.queryByText('below')).toBeNull()
        expect(
            screen.getByText('app content', { includeHiddenElements: true })
        ).toBeTruthy()
        // The modal layer itself and higher-priority layers stay reachable.
        expect(screen.getByText('sheet')).toBeTruthy()
        expect(screen.getByText('toast')).toBeTruthy()

        // Unmounting the modal layer restores everything.
        rerender(ui(false))
        expect(screen.getByText('app content')).toBeTruthy()
        expect(screen.getByText('below')).toBeTruthy()
    })

    it('falls back to inline rendering with no provider, warning once', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
        try {
            render(
                <Portal>
                    <Text>inline</Text>
                </Portal>
            )
            expect(screen.getByText('inline')).toBeTruthy()
            expect(warn).toHaveBeenCalledWith(
                expect.stringContaining('without BlendNativeProvider')
            )
        } finally {
            warn.mockRestore()
        }
    })
})
