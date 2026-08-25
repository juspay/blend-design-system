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
