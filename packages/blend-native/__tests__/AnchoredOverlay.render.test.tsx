import { Text } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { AnchoredOverlay } from '../src/overlay/anchored/AnchoredOverlay'

/**
 * The shared anchored-surface building block, under the inert Reanimated
 * jest mock: mount lifecycle around `open`, backdrop dismissal, portal
 * layering, escape wiring and the arrow node. Placement math lives in the
 * pure positioning suite.
 */

const renderOverlay = (
    open: boolean,
    props: Partial<React.ComponentProps<typeof AnchoredOverlay>> = {}
) => {
    const onRequestClose = jest.fn()
    const ui = (isOpen: boolean) => (
        <BlendNativeProvider>
            <Text>app content</Text>
            <AnchoredOverlay
                open={isOpen}
                onRequestClose={onRequestClose}
                trigger={<Text>trigger</Text>}
                testID="overlay"
                {...props}
            >
                <Text>overlay content</Text>
            </AnchoredOverlay>
        </BlendNativeProvider>
    )
    return { ...render(ui(open)), ui, onRequestClose }
}

describe('AnchoredOverlay', () => {
    it('renders only the trigger while closed', () => {
        renderOverlay(false)
        expect(screen.getByText('trigger')).toBeTruthy()
        expect(screen.queryByText('overlay content')).toBeNull()
    })

    it('presents content in a portal layer when open', () => {
        renderOverlay(true)
        expect(screen.getByText('overlay content')).toBeTruthy()
        expect(
            screen.getByTestId('overlay-backdrop', {
                includeHiddenElements: true,
            })
        ).toBeTruthy()
    })

    it('unmounts after the exit animation when open flips off', () => {
        const { rerender, ui } = renderOverlay(true)
        rerender(ui(false))
        expect(screen.queryByText('overlay content')).toBeNull()
        expect(screen.getByText('trigger')).toBeTruthy()
    })

    it('requests close on backdrop press', () => {
        const { onRequestClose } = renderOverlay(true)
        const backdrop = screen.getByTestId('overlay-backdrop', {
            includeHiddenElements: true,
        })
        fireEvent.press(backdrop.children[0] as never)
        expect(onRequestClose).toHaveBeenCalledTimes(1)
    })

    it('can render without any backdrop', () => {
        renderOverlay(true, { backdrop: false })
        expect(
            screen.queryByTestId('overlay-backdrop', {
                includeHiddenElements: true,
            })
        ).toBeNull()
    })

    it('wires VoiceOver escape to onRequestClose', () => {
        const { onRequestClose } = renderOverlay(true)
        const content = screen.getByTestId('overlay', {
            includeHiddenElements: true,
        })
        content.props.onAccessibilityEscape()
        expect(onRequestClose).toHaveBeenCalledTimes(1)
    })

    it('parks the content invisibly (and arrowless) until measurement lands', () => {
        // Under jest, measureInWindow never calls back, so the anchor rect —
        // and with it position/arrow — cannot resolve. What this proves is
        // the parking state: content is mounted (so onLayout can fire) but
        // invisible and non-interactive, and no arrow renders without a
        // position. The measured path is pure math (positioning suite) plus
        // the device pass.
        renderOverlay(true, { arrowSize: 6 })
        const content = screen.getByTestId('overlay', {
            includeHiddenElements: true,
        })
        expect(screen.getByText('overlay content')).toBeTruthy()
        const flat = Object.assign(
            {},
            ...[content.props.style].flat(Infinity).filter(Boolean)
        )
        expect(flat.opacity).toBe(0)
        expect(content.props.pointerEvents).toBe('none')
        expect(
            screen.queryByTestId('overlay-arrow', {
                includeHiddenElements: true,
            })
        ).toBeNull()
    })
})
