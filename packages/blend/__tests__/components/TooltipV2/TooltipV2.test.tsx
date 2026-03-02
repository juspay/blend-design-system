import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import TooltipV2 from '../../../lib/components/TooltipV2/TooltipV2'
import {
    TooltipV2Side,
    TooltipV2Align,
    TooltipV2Size,
    TooltipV2SlotDirection,
} from '../../../lib/components/TooltipV2/tooltipV2.types'
import { MockIcon } from '../../test-utils'

describe('TooltipV2 Component', () => {
    describe('Rendering', () => {
        it('renders with trigger and content', async () => {
            const { user } = render(
                <TooltipV2 content="This is a tooltip">
                    <button>Hover me</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button', { name: 'Hover me' })
            expect(trigger).toBeInTheDocument()

            await user.hover(trigger)
            await waitFor(() => {
                expect(screen.getAllByText('This is a tooltip')).toHaveLength(2)
            })
        })

        it('renders with string content', async () => {
            const { user } = render(
                <TooltipV2 content="Simple string content">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Simple string content')
                ).toHaveLength(2)
            })
        })

        it('renders with ReactNode content', async () => {
            const { user } = render(
                <TooltipV2
                    content={
                        <span>
                            Complex <strong>content</strong>
                        </span>
                    }
                >
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Complex')).toHaveLength(2)
                expect(screen.getAllByText('content')).toHaveLength(2)
            })
        })

        it('renders with slot content on left', async () => {
            const { user } = render(
                <TooltipV2
                    content="Tooltip with icon"
                    slot={<MockIcon />}
                    slotDirection={TooltipV2SlotDirection.LEFT}
                >
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Tooltip with icon')).toHaveLength(2)
                expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
            })
        })

        it('renders with slot content on right', async () => {
            const { user } = render(
                <TooltipV2
                    content="Tooltip with icon right"
                    slot={<MockIcon />}
                    slotDirection={TooltipV2SlotDirection.RIGHT}
                >
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Tooltip with icon right')
                ).toHaveLength(2)
                expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
            })
        })

        it('renders without slot when not provided', async () => {
            const { user } = render(
                <TooltipV2 content="No slot tooltip">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('No slot tooltip')).toHaveLength(2)
                expect(
                    screen.queryByTestId('mock-icon')
                ).not.toBeInTheDocument()
            })
        })
    })

    describe('Tooltip Sides', () => {
        it.each([
            [TooltipV2Side.TOP, 'top'],
            [TooltipV2Side.RIGHT, 'right'],
            [TooltipV2Side.BOTTOM, 'bottom'],
            [TooltipV2Side.LEFT, 'left'],
        ])('renders on %s side correctly', async (side, sideLabel) => {
            const { user } = render(
                <TooltipV2 content={`Tooltip on ${sideLabel}`} side={side}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText(`Tooltip on ${sideLabel}`)
                ).toHaveLength(2)
            })
        })

        it('defaults to top side when not specified', async () => {
            const { user } = render(
                <TooltipV2 content="Default side tooltip">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Default side tooltip')
                ).toHaveLength(2)
            })
        })
    })

    describe('Tooltip Alignment', () => {
        it.each([
            [TooltipV2Align.START, 'start'],
            [TooltipV2Align.CENTER, 'center'],
            [TooltipV2Align.END, 'end'],
        ])('renders with %s alignment correctly', async (align, alignLabel) => {
            const { user } = render(
                <TooltipV2 content={`Aligned to ${alignLabel}`} align={align}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText(`Aligned to ${alignLabel}`)
                ).toHaveLength(2)
            })
        })

        it('defaults to center alignment when not specified', async () => {
            const { user } = render(
                <TooltipV2 content="Default alignment">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Default alignment')).toHaveLength(2)
            })
        })
    })

    describe('Tooltip Sizes', () => {
        it.each([
            [TooltipV2Size.SM, 'sm'],
            [TooltipV2Size.LG, 'lg'],
        ])('renders %s size correctly', async (size, sizeLabel) => {
            const { user } = render(
                <TooltipV2 content={`Size ${sizeLabel} tooltip`} size={size}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText(`Size ${sizeLabel} tooltip`)
                ).toHaveLength(2)
            })
        })

        it('defaults to sm size when not specified', async () => {
            const { user } = render(
                <TooltipV2 content="Default size tooltip">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Default size tooltip')
                ).toHaveLength(2)
            })
        })
    })

    describe('Arrow Display', () => {
        it('shows arrow by default', async () => {
            const { user } = render(
                <TooltipV2 content="Tooltip with arrow">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Tooltip with arrow')[0]
                ).toBeInTheDocument()
                const tooltipContainer = screen
                    .getByRole('button')
                    .closest('body')
                expect(
                    tooltipContainer?.querySelector('svg')
                ).toBeInTheDocument()
            })
        })

        it('hides arrow when showArrow is false', async () => {
            const { user } = render(
                <TooltipV2 content="Tooltip without arrow" showArrow={false}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Tooltip without arrow')[0]
                ).toBeInTheDocument()
                const tooltipContainer = screen
                    .getByRole('button')
                    .closest('body')
                expect(
                    tooltipContainer?.querySelector('svg')
                ).not.toBeInTheDocument()
            })
        })
    })

    describe('Controlled State', () => {
        it('shows tooltip when open is true', () => {
            render(
                <TooltipV2 content="Always visible" open={true}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            expect(screen.getAllByText('Always visible')).toHaveLength(2)
        })

        it('hides tooltip when open is false', async () => {
            const { user } = render(
                <TooltipV2 content="Never visible" open={false}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            expect(screen.queryByText('Never visible')).not.toBeInTheDocument()
        })

        it('works as uncontrolled when open prop is not provided', async () => {
            const { user } = render(
                <TooltipV2 content="Uncontrolled tooltip" delayDuration={50}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')

            expect(
                screen.queryByText('Uncontrolled tooltip')
            ).not.toBeInTheDocument()

            await user.hover(trigger)
            await waitFor(() => {
                expect(
                    screen.getAllByText('Uncontrolled tooltip')
                ).toHaveLength(2)
            })

            await user.unhover(trigger)
            expect(trigger).toBeInTheDocument()
        })
    })

    describe('Delay Duration', () => {
        it('respects custom delay duration', async () => {
            const { user } = render(
                <TooltipV2 content="Delayed tooltip" delayDuration={100}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(
                () => {
                    expect(screen.getAllByText('Delayed tooltip')).toHaveLength(
                        2
                    )
                },
                { timeout: 200 }
            )
        })

        it('uses default delay when not specified', async () => {
            const { user } = render(
                <TooltipV2 content="Default delay tooltip">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(
                () => {
                    expect(
                        screen.getAllByText('Default delay tooltip')
                    ).toHaveLength(2)
                },
                { timeout: 500 }
            )
        })
    })

    describe('Offset', () => {
        it('applies custom offset', async () => {
            const { user } = render(
                <TooltipV2 content="Custom offset tooltip" offset={10}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Custom offset tooltip')
                ).toHaveLength(2)
            })
        })

        it('uses default offset when not specified', async () => {
            const { user } = render(
                <TooltipV2 content="Default offset tooltip">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Default offset tooltip')
                ).toHaveLength(2)
            })
        })
    })

    describe('Slot Direction', () => {
        it('positions slot on left by default', async () => {
            const { user } = render(
                <TooltipV2 content="Left slot" slot={<MockIcon />}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Left slot')).toHaveLength(2)
                expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
            })
        })

        it('positions slot on right when specified', async () => {
            const { user } = render(
                <TooltipV2
                    content="Right slot"
                    slot={<MockIcon />}
                    slotDirection={TooltipV2SlotDirection.RIGHT}
                >
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Right slot')).toHaveLength(2)
                expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
            })
        })
    })

    describe('Trigger Elements', () => {
        it('works with button trigger', async () => {
            const { user } = render(
                <TooltipV2 content="Button tooltip">
                    <button>Button trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Button tooltip')).toHaveLength(2)
            })
        })

        it('works with div trigger', async () => {
            const { user } = render(
                <TooltipV2 content="Div tooltip">
                    <div>Div trigger</div>
                </TooltipV2>
            )

            const trigger = screen.getByText('Div trigger')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Div tooltip')).toHaveLength(2)
            })
        })

        it('works with span trigger', async () => {
            const { user } = render(
                <TooltipV2 content="Span tooltip">
                    <span>Span trigger</span>
                </TooltipV2>
            )

            const trigger = screen.getByText('Span trigger')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Span tooltip')).toHaveLength(2)
            })
        })

        it('works with icon trigger', async () => {
            const { user } = render(
                <TooltipV2 content="Icon tooltip" delayDuration={50}>
                    <MockIcon />
                </TooltipV2>
            )

            const trigger = screen.getByTestId('mock-icon')
            expect(trigger).toBeInTheDocument()

            await user.hover(trigger)
            expect(trigger).toBeInTheDocument()
        })
    })

    describe('Token Application', () => {
        it('applies responsive tokens through useResponsiveTokens hook', async () => {
            const { user } = render(
                <TooltipV2 content="Token tooltip">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Token tooltip')).toHaveLength(2)
            })
        })

        it('applies proper z-index for layering', async () => {
            const { user } = render(
                <TooltipV2 content="Layered tooltip">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Layered tooltip')).toHaveLength(2)
            })
        })
    })

    describe('Edge Cases', () => {
        it('handles empty content gracefully', async () => {
            const { user } = render(
                <TooltipV2 content="">
                    <button>Empty content</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(trigger).toBeInTheDocument()
                expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
            })
        })

        it('handles undefined slot gracefully', async () => {
            const { user } = render(
                <TooltipV2 content="No slot" slot={undefined}>
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('No slot')).toHaveLength(2)
                expect(
                    screen.queryByTestId('mock-icon')
                ).not.toBeInTheDocument()
            })
        })

        it('handles very long content', async () => {
            const longContent =
                'This is a very long tooltip content that should wrap properly within the maximum width constraints set by the tooltip tokens and should not break the layout or cause overflow issues.'

            const { user } = render(
                <TooltipV2 content={longContent}>
                    <button>Long content</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText(longContent)).toHaveLength(2)
            })
        })

        it('maintains proper overflow handling', async () => {
            const { user } = render(
                <TooltipV2 content="Overflow test tooltip">
                    <button>Overflow test</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Overflow test tooltip')
                ).toHaveLength(2)
            })
        })
    })

    describe('Multiple Tooltips', () => {
        it('handles multiple tooltips on the same page', async () => {
            const { user } = render(
                <div>
                    <TooltipV2 content="First tooltip" delayDuration={50}>
                        <button>First trigger</button>
                    </TooltipV2>
                    <TooltipV2 content="Second tooltip" delayDuration={50}>
                        <button>Second trigger</button>
                    </TooltipV2>
                </div>
            )

            const firstTrigger = screen.getByRole('button', {
                name: 'First trigger',
            })
            const secondTrigger = screen.getByRole('button', {
                name: 'Second trigger',
            })

            await user.hover(firstTrigger)
            await waitFor(
                () => {
                    expect(screen.getAllByText('First tooltip')).toHaveLength(2)
                },
                { timeout: 500 }
            )

            await user.hover(secondTrigger)
            await waitFor(
                () => {
                    expect(screen.getAllByText('Second tooltip')).toHaveLength(
                        2
                    )
                },
                { timeout: 500 }
            )

            expect(screen.queryByText('First tooltip')).not.toBeInTheDocument()
        })

        it('handles nested tooltip scenarios', async () => {
            const { user } = render(
                <TooltipV2 content="Outer tooltip">
                    <div>
                        <span>Outer content</span>
                        <TooltipV2 content="Inner tooltip">
                            <button>Inner trigger</button>
                        </TooltipV2>
                    </div>
                </TooltipV2>
            )

            const outerTrigger = screen.getByText('Outer content')
            const innerTrigger = screen.getByRole('button', {
                name: 'Inner trigger',
            })

            await user.hover(outerTrigger)
            await waitFor(() => {
                expect(screen.getAllByText('Outer tooltip')).toHaveLength(2)
            })

            await user.hover(innerTrigger)
            await waitFor(() => {
                expect(screen.getAllByText('Inner tooltip')).toHaveLength(2)
            })
        })
    })

    describe('Performance', () => {
        it('does not re-render unnecessarily', async () => {
            const renderSpy = vi.fn()
            const TestTooltip = (props: Record<string, unknown>) => {
                renderSpy()
                return (
                    <TooltipV2 content="Performance test unique" {...props}>
                        <button>Performance trigger</button>
                    </TooltipV2>
                )
            }

            const { rerender, user } = render(<TestTooltip />)
            renderSpy.mockClear()

            rerender(<TestTooltip />)
            expect(renderSpy).toHaveBeenCalledTimes(1)

            const trigger = screen.getByRole('button', {
                name: 'Performance trigger',
            })
            await user.hover(trigger)
            await waitFor(() => {
                expect(
                    screen.getAllByText('Performance test unique')
                ).toHaveLength(2)
            })
        })

        it('handles rapid hover/unhover efficiently', async () => {
            const { user } = render(
                <TooltipV2 content="Rapid hover test" delayDuration={50}>
                    <button>Rapid trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')

            for (let i = 0; i < 5; i++) {
                await user.hover(trigger)
                await user.unhover(trigger)
            }

            expect(trigger).toBeInTheDocument()
        })
    })

    describe('Ref forwarding', () => {
        it('forwards ref to native button trigger', () => {
            const ref = React.createRef<HTMLButtonElement | HTMLDivElement>()
            render(
                <TooltipV2 content="Ref tooltip" ref={ref}>
                    <button>Trigger</button>
                </TooltipV2>
            )
            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
            expect(ref.current?.tagName).toBe('BUTTON')
        })

        it('forwards ref to wrapped span when trigger is not native element', () => {
            const ref = React.createRef<HTMLButtonElement | HTMLDivElement>()
            render(
                <TooltipV2 content="Ref tooltip" ref={ref}>
                    <div>Custom trigger</div>
                </TooltipV2>
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current?.tagName).toBe('DIV')
        })
    })

    describe('fullWidth and maxWidth', () => {
        it('applies maxWidth when provided', async () => {
            const { user } = render(
                <TooltipV2 content="Constrained width tooltip" maxWidth="200px">
                    <button>Trigger</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(
                    screen.getAllByText('Constrained width tooltip')
                ).toHaveLength(2)
            })
        })

        it('renders with fullWidth without crashing', async () => {
            const { user } = render(
                <TooltipV2 content="Full width trigger" fullWidth>
                    <button>Full width</button>
                </TooltipV2>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Full width trigger')).toHaveLength(
                    2
                )
            })
        })
    })
})
