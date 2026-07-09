import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import CardV2 from '../../../lib/components/CardV2/CardV2'
import {
    CardV2ActionPlacement,
    CardV2Orientation,
    CardV2Padding,
    CardV2Variant,
} from '../../../lib/components/CardV2/cardV2.types'
import {
    ButtonV2Size,
    ButtonV2Type,
} from '../../../lib/components/ButtonV2/buttonV2.types'

const media = <div data-testid="card-media-content">Media</div>

describe('CardV2 Component', () => {
    describe('Rendering', () => {
        it('renders the simple prop API with title, subtitle and description', () => {
            render(
                <CardV2
                    title="Payment success"
                    subtitle="Last 24 hours"
                    description="Successful authorization attempts increased."
                />
            )

            expect(screen.getByText('Payment success')).toBeInTheDocument()
            expect(screen.getByText('Last 24 hours')).toBeInTheDocument()
            expect(
                screen.getByText('Successful authorization attempts increased.')
            ).toBeInTheDocument()
            expect(screen.getByRole('region')).toHaveAttribute(
                'aria-labelledby',
                screen.getByText('Payment success').getAttribute('id')
            )
        })

        it('renders leading and trailing slots', () => {
            render(
                <CardV2
                    title="Risk queue"
                    leadingSlot={<span data-testid="leading-slot" />}
                    trailingSlot={<span data-testid="trailing-slot" />}
                />
            )

            expect(screen.getByTestId('leading-slot')).toBeInTheDocument()
            expect(screen.getByTestId('trailing-slot')).toBeInTheDocument()
        })

        it('renders media with custom sizing props', () => {
            const { container } = render(
                <CardV2
                    title="Profile"
                    media={media}
                    mediaWidth="96px"
                    mediaHeight="72px"
                    mediaMinHeight="72px"
                />
            )

            const mediaElement = container.querySelector(
                '[data-element="card-media"]'
            )

            expect(screen.getByTestId('card-media-content')).toBeInTheDocument()
            expect(mediaElement).toHaveStyle({
                width: '96px',
                height: '72px',
                minHeight: '72px',
            })
        })

        it('does not render empty content sections for media-only cards', () => {
            const { container } = render(
                <CardV2
                    media={media}
                    mediaHeight="140px"
                    aria-label="Media only"
                />
            )

            expect(screen.getByTestId('card-media-content')).toBeInTheDocument()
            expect(
                container.querySelector('[data-element="card-header"]')
            ).not.toBeInTheDocument()
            expect(
                container.querySelector('[data-element="card-body"]')
            ).not.toBeInTheDocument()
            expect(
                container.querySelector('[data-element="card-footer"]')
            ).not.toBeInTheDocument()
        })

        it('supports the horizontal media layout', () => {
            const { container } = render(
                <CardV2
                    title="3DS routing policy"
                    description="A fixed leading visual for scan-friendly rows."
                    media={media}
                    orientation={CardV2Orientation.HORIZONTAL}
                />
            )

            expect(screen.getByText('3DS routing policy')).toBeInTheDocument()
            expect(
                container.querySelector('[data-element="card-media"]')
            ).toBeInTheDocument()
        })

        it('renders footer content and moves actions to footer', () => {
            const { container } = render(
                <CardV2
                    title="Settlement batch"
                    footer={<span>Updated 2m ago</span>}
                    actionPlacement={CardV2ActionPlacement.FOOTER}
                    actions={{
                        text: 'Review',
                        size: ButtonV2Size.SMALL,
                        buttonType: ButtonV2Type.SECONDARY,
                    }}
                />
            )

            expect(screen.getByText('Updated 2m ago')).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Review' })
            ).toBeInTheDocument()
            expect(
                container.querySelector('[data-element="card-footer"]')
            ).toHaveAttribute('data-divider', 'true')
        })

        it('does not render a footer divider for footer-only visual content', () => {
            const { container } = render(
                <CardV2
                    title="Authorization"
                    subtitle="Today"
                    description="98.42%"
                    footer={<div data-testid="progress-footer" />}
                />
            )

            expect(screen.getByTestId('progress-footer')).toBeInTheDocument()
            expect(
                container.querySelector('[data-element="card-footer"]')
            ).not.toHaveAttribute('data-divider')
        })

        it('renders custom children with the prop API', () => {
            render(
                <CardV2 title="Limits">
                    <dl>
                        <dt>Daily cap</dt>
                        <dd>$24,000</dd>
                    </dl>
                </CardV2>
            )

            expect(screen.getByText('Daily cap')).toBeInTheDocument()
            expect(screen.getByText('$24,000')).toBeInTheDocument()
        })

        it('makes body scrollable by default when maxHeight is set', () => {
            const { container } = render(
                <CardV2
                    title="Scrollable card"
                    maxHeight="180px"
                    description="Scrollable content"
                />
            )

            expect(
                container.querySelector('[data-element="card-body"]')
            ).toHaveStyle({
                overflowY: 'auto',
            })
        })

        it('allows maxHeight without body scrolling when scrollable is false', () => {
            const { container } = render(
                <CardV2
                    title="Clipped card"
                    maxHeight="180px"
                    scrollable={false}
                    description="Clipped content"
                />
            )

            expect(
                container.querySelector('[data-element="card-body"]')
            ).not.toHaveStyle({
                overflowY: 'auto',
            })
        })

        it('renders the compound API without prop composition', () => {
            render(
                <CardV2>
                    <CardV2.Header
                        eyebrow="Operations"
                        title="Manual review"
                        subtitle="Queue health"
                    />
                    <CardV2.Body description="12 reviews need attention.">
                        <span>Median age: 8 minutes</span>
                    </CardV2.Body>
                    <CardV2.Footer
                        divider
                        actions={{
                            text: 'Open',
                            size: ButtonV2Size.SMALL,
                        }}
                    >
                        <span>Live</span>
                    </CardV2.Footer>
                </CardV2>
            )

            expect(screen.getByText('Manual review')).toBeInTheDocument()
            expect(
                screen.getByText('12 reviews need attention.')
            ).toBeInTheDocument()
            expect(
                screen.getByText('Median age: 8 minutes')
            ).toBeInTheDocument()
            expect(screen.getByText('Live')).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Open' })
            ).toBeInTheDocument()
        })

        it('stacks trailing slot with centered header content', () => {
            const { container } = render(
                <CardV2
                    centered
                    title="Ananya Rao"
                    subtitle="Risk operations"
                    trailingSlot={<span>Online</span>}
                />
            )

            const header = container.querySelector(
                '[data-element="card-header"]'
            )

            expect(header).toHaveStyle({
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            })
            expect(screen.getByText('Online')).toBeInTheDocument()
        })
    })

    describe('Actions', () => {
        it('renders multiple body actions and calls handlers', async () => {
            const handlePrimary = vi.fn()
            const handleSecondary = vi.fn()
            const { user } = render(
                <CardV2
                    title="Routing rule"
                    actions={[
                        {
                            text: 'Save',
                            onClick: handlePrimary,
                            buttonType: ButtonV2Type.PRIMARY,
                        },
                        {
                            text: 'Cancel',
                            onClick: handleSecondary,
                            buttonType: ButtonV2Type.SECONDARY,
                        },
                    ]}
                />
            )

            await user.click(screen.getByRole('button', { name: 'Save' }))
            await user.click(screen.getByRole('button', { name: 'Cancel' }))

            expect(handlePrimary).toHaveBeenCalledTimes(1)
            expect(handleSecondary).toHaveBeenCalledTimes(1)
        })
    })

    describe('States and variants', () => {
        it.each([
            CardV2Variant.OUTLINED,
            CardV2Variant.ELEVATED,
            CardV2Variant.GHOST,
        ])('renders the %s variant', (variant) => {
            const { container } = render(
                <CardV2 variant={variant} title={`${variant} card`} />
            )

            expect(container.firstElementChild).toHaveAttribute(
                'data-card-variant',
                variant
            )
        })

        it.each([
            CardV2Padding.NONE,
            CardV2Padding.COMPACT,
            CardV2Padding.COMFORTABLE,
        ])('renders with %s padding', (padding) => {
            render(<CardV2 padding={padding} title={`${padding} padding`} />)
            expect(screen.getByText(`${padding} padding`)).toBeInTheDocument()
        })

        it('defaults ghost cards to no external padding', () => {
            const { container } = render(
                <CardV2 variant={CardV2Variant.GHOST} title="Ghost card" />
            )

            expect(container.firstElementChild).toHaveStyle({
                padding: '0px',
            })
        })

        it('allows ghost cards to opt into explicit padding', () => {
            const { container } = render(
                <CardV2
                    variant={CardV2Variant.GHOST}
                    padding={CardV2Padding.COMFORTABLE}
                    title="Padded ghost card"
                />
            )

            expect(container.firstElementChild).not.toHaveStyle({
                padding: '0px',
            })
        })

        it('renders interactive selected cards as keyboard focusable buttons', () => {
            render(<CardV2 title="Selected card" interactive selected />)

            const card = screen.getByRole('button')
            expect(card).toHaveAttribute('tabIndex', '0')
            expect(card).toHaveAttribute('aria-pressed', 'true')
            expect(card).not.toHaveAttribute('aria-selected')
            expect(card).toHaveAttribute('data-selected', 'true')
        })

        it('allows consumers to override role and tabIndex', () => {
            render(
                <CardV2
                    title="List item card"
                    interactive
                    role="listitem"
                    tabIndex={-1}
                />
            )

            const card = screen.getByRole('listitem')
            expect(card).toHaveAttribute('tabIndex', '-1')
        })
    })

    describe('Truncation', () => {
        it('applies truncation styles to prop title when truncateTitle is true', () => {
            render(
                <CardV2
                    title="This is a very long card title that should truncate"
                    truncateTitle
                />
            )

            expect(screen.getByText(/very long card title/)).toHaveStyle({
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            })
        })

        it('applies truncation styles to compound title when truncateTitle is true', () => {
            render(
                <CardV2>
                    <CardV2.Header
                        title="A compound card title that should truncate"
                        truncateTitle
                    />
                </CardV2>
            )

            expect(screen.getByText(/compound card title/)).toHaveStyle({
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            })
        })
    })

    describe('Skeleton', () => {
        it('renders skeleton content and hides card content while loading', () => {
            const { container } = render(
                <CardV2
                    title="Hidden while loading"
                    description="This should not render"
                    skeleton={{ show: true, height: '120px' }}
                />
            )

            expect(
                screen.queryByText('Hidden while loading')
            ).not.toBeInTheDocument()
            expect(
                screen.queryByText('This should not render')
            ).not.toBeInTheDocument()
            expect(container.firstElementChild).toBeInTheDocument()
        })
    })
})
