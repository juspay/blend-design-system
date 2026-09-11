import { Text as RNText } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Tooltip } from '../src/components/Tooltip'

/**
 * Tooltip behaviour under the inert gesture/Reanimated jest mocks:
 * long-press lifecycle, controlled mode, portal content, dismissal.
 * Placement/arrow math is the pure positioning suite; visuals ride the
 * device pass.
 */

const renderTooltip = (
    props: Partial<React.ComponentProps<typeof Tooltip>> = {}
) =>
    render(
        <BlendNativeProvider>
            <Tooltip content="Settled today" testID="tip" {...props}>
                <RNText>anchor</RNText>
            </Tooltip>
        </BlendNativeProvider>
    )

describe('Tooltip', () => {
    it('shows on long-press and hides on backdrop tap', () => {
        renderTooltip()
        expect(screen.queryByText('Settled today')).toBeNull()
        fireEvent(screen.getByTestId('tip-trigger'), 'longPress')
        expect(
            screen.getByText('Settled today', { includeHiddenElements: true })
        ).toBeTruthy()
        const backdrop = screen.getByTestId('tip-backdrop', {
            includeHiddenElements: true,
        })
        fireEvent.press(backdrop.children[0] as never)
        expect(screen.queryByText('Settled today')).toBeNull()
    })

    it('supports controlled open', () => {
        const onOpenChange = jest.fn()
        const ui = (open: boolean) => (
            <BlendNativeProvider>
                <Tooltip
                    content="Settled today"
                    open={open}
                    onOpenChange={onOpenChange}
                    testID="tip"
                >
                    <RNText>anchor</RNText>
                </Tooltip>
            </BlendNativeProvider>
        )
        const { rerender } = render(ui(false))
        expect(screen.queryByText('Settled today')).toBeNull()
        rerender(ui(true))
        expect(
            screen.getByText('Settled today', { includeHiddenElements: true })
        ).toBeTruthy()
        // Long-press in controlled mode notifies without flipping itself.
        fireEvent(screen.getByTestId('tip-trigger'), 'longPress')
        expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('exposes string content as the trigger accessibility hint', () => {
        renderTooltip()
        expect(screen.getByTestId('tip-trigger').props.accessibilityHint).toBe(
            'Settled today'
        )
    })

    it('renders a slot beside the content', () => {
        renderTooltip({ slot: <RNText>ICON</RNText>, open: true })
        expect(
            screen.getByText('ICON', { includeHiddenElements: true })
        ).toBeTruthy()
    })
})
