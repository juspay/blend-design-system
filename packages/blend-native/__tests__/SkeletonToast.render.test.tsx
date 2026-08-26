import { Text } from 'react-native'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Skeleton } from '../src/components/Skeleton'
import { Portal } from '../src/overlay/portal'
import {
    dismissToast,
    resetToasts,
    showToast,
} from '../src/overlay/toast/toastStore'

/**
 * Render coverage for the loading-state foundations: Skeleton's two usage
 * modes and their AT posture, and the provider-mounted toast outlet's
 * lifecycle (show, replace, auto-dismiss, cap).
 */

const q = { includeHiddenElements: true } as const

describe('Skeleton', () => {
    it('renders a standalone box hidden from assistive tech', () => {
        render(
            <BlendNativeProvider>
                <Skeleton width={120} height={16} testID="sk" />
            </BlendNativeProvider>
        )
        const root = screen.getByTestId('sk', q)
        expect(root.props.importantForAccessibility).toBe('no-hide-descendants')
        const surface = screen.getByTestId('sk-surface', q)
        const style = Object.assign({}, ...[surface.props.style].flat(Infinity))
        expect(style.width).toBe(120)
        expect(style.height).toBe(16)
        expect(typeof style.backgroundColor).toBe('string')
    })

    it('wrap mode keeps the content in the tree but invisible', () => {
        render(
            <BlendNativeProvider>
                <Skeleton testID="sk">
                    <Text>Loaded content</Text>
                </Skeleton>
            </BlendNativeProvider>
        )
        // Content still lays the box out...
        expect(screen.getByText('Loaded content', q)).toBeTruthy()
        // ...but its wrapper renders at opacity 0 with the surface above.
        const root = screen.getByTestId('sk', q)
        const contentWrapper = root.children[0] as {
            props: { style?: unknown }
        }
        const style = Object.assign(
            {},
            ...[contentWrapper.props.style].flat(Infinity)
        )
        expect(style.opacity).toBe(0)
        expect(screen.getByTestId('sk-surface', q)).toBeTruthy()
    })
})

describe('toast outlet', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        resetToasts()
    })
    afterEach(() => {
        act(() => {
            dismissToast()
        })
        jest.useRealTimers()
    })

    const mount = () =>
        render(
            <BlendNativeProvider>
                <Text>app</Text>
            </BlendNativeProvider>
        )

    it('renders nothing until a toast is shown, then shows it', () => {
        mount()
        expect(screen.queryByTestId('blend-toast-outlet')).toBeNull()
        act(() => {
            showToast({ content: <Text>Saved</Text> })
        })
        expect(screen.getByText('Saved')).toBeTruthy()
    })

    it('auto-dismisses after its duration', () => {
        mount()
        act(() => {
            showToast({ content: <Text>Bye</Text>, duration: 1000 })
        })
        expect(screen.getByText('Bye')).toBeTruthy()
        act(() => {
            jest.advanceTimersByTime(1100)
        })
        expect(screen.queryByText('Bye')).toBeNull()
    })

    it('a sticky toast survives until dismissed', () => {
        mount()
        let id = ''
        act(() => {
            id = showToast({ content: <Text>Stay</Text>, duration: null })
        })
        act(() => {
            jest.advanceTimersByTime(60_000)
        })
        expect(screen.getByText('Stay')).toBeTruthy()
        act(() => {
            dismissToast(id)
        })
        expect(screen.queryByText('Stay')).toBeNull()
    })

    it('replaces content in place when the id is reused', () => {
        mount()
        act(() => {
            showToast({ id: 'save', content: <Text>Saving…</Text> })
        })
        act(() => {
            showToast({ id: 'save', content: <Text>Saved</Text> })
        })
        expect(screen.queryByText('Saving…')).toBeNull()
        expect(screen.getByText('Saved')).toBeTruthy()
    })

    it('function content receives a working dismiss', () => {
        mount()
        let dismissFn: (() => void) | undefined
        act(() => {
            showToast({
                content: (dismiss) => {
                    dismissFn = dismiss
                    return <Text>Undo</Text>
                },
                duration: null,
            })
        })
        expect(screen.getByText('Undo')).toBeTruthy()
        act(() => dismissFn?.())
        expect(screen.queryByText('Undo')).toBeNull()
    })

    it('shows only the newest three at once', () => {
        mount()
        act(() => {
            for (let i = 1; i <= 5; i++) {
                showToast({ content: <Text>{`toast-${i}`}</Text> })
            }
        })
        expect(screen.queryByText('toast-1')).toBeNull()
        expect(screen.queryByText('toast-2')).toBeNull()
        expect(screen.getByText('toast-3')).toBeTruthy()
        expect(screen.getByText('toast-5')).toBeTruthy()
    })

    it('a finger on the toast pauses its auto-dismiss countdown', () => {
        mount()
        act(() => {
            showToast({ content: <Text>Hold me</Text>, duration: 1000 })
        })
        act(() => {
            jest.advanceTimersByTime(500)
        })
        // Touch down: the countdown pauses with ~500ms remaining.
        fireEvent(screen.getByText('Hold me'), 'touchStart')
        act(() => {
            jest.advanceTimersByTime(5000)
        })
        expect(screen.getByText('Hold me')).toBeTruthy()
        // Release: the remainder runs out.
        fireEvent(screen.getByText('Hold me'), 'touchEnd')
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(screen.queryByText('Hold me')).toBeNull()
    })

    it('paints above overlay layers that mount later', () => {
        render(
            <BlendNativeProvider>
                <Text>app</Text>
            </BlendNativeProvider>
        )
        act(() => {
            showToast({ content: <Text>on top</Text>, duration: null })
        })
        // A sheet-like overlay opened AFTER the toast mounts its portal
        // later — without priority it would paint above the toast.
        screen.rerender(
            <BlendNativeProvider>
                <Text>app</Text>
                <Portal>
                    <Text>sheet</Text>
                </Portal>
            </BlendNativeProvider>
        )
        const tree = JSON.stringify(screen.toJSON())
        const toastIndex = tree.indexOf('blend-toast-outlet')
        const sheetIndex = tree.indexOf('sheet')
        expect(sheetIndex).toBeGreaterThan(-1)
        expect(toastIndex).toBeGreaterThan(sheetIndex)
    })
})
