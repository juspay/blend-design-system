import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'jest-axe'
import { render, screen } from '../../test-utils'
import CardV2 from '../../../lib/components/CardV2/CardV2'
import {
    CardV2ActionPlacement,
    CardV2Orientation,
} from '../../../lib/components/CardV2/cardV2.types'
import {
    ButtonV2Size,
    ButtonV2Type,
} from '../../../lib/components/ButtonV2/buttonV2.types'

describe('CardV2 Accessibility', () => {
    describe('WCAG compliance', () => {
        it('has no axe violations for the default card', async () => {
            const { container } = render(
                <CardV2
                    title="Payment success"
                    subtitle="Last 24 hours"
                    description="Successful authorization attempts increased."
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('has no axe violations with media and actions', async () => {
            const { container } = render(
                <CardV2
                    title="Merchant profile"
                    description="Primary owner for escalation policies."
                    media={
                        <img
                            alt="Merchant owner"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320&h=240&fit=crop"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    }
                    actions={{
                        text: 'Open profile',
                        size: ButtonV2Size.SMALL,
                        buttonType: ButtonV2Type.PRIMARY,
                        onClick: vi.fn(),
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('has no axe violations for the compound API', async () => {
            const { container } = render(
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
                        actions={{
                            text: 'Open',
                            size: ButtonV2Size.SMALL,
                        }}
                    >
                        <span>Live</span>
                    </CardV2.Footer>
                </CardV2>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('has no axe violations for an interactive selected card', async () => {
            const { container } = render(
                <CardV2
                    title="Selected payment method"
                    description="Visa ending in 4242"
                    interactive
                    selected
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('ARIA attributes and roles', () => {
        it('uses role region by default', () => {
            render(<CardV2 title="Region card" />)
            expect(screen.getByRole('region')).toBeInTheDocument()
        })

        it('uses role button for interactive cards', () => {
            render(<CardV2 title="Interactive card" interactive />)
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('links aria-labelledby to the generated title id', () => {
            render(<CardV2 title="Accessible title" />)

            const card = screen.getByRole('region')
            const title = screen.getByText('Accessible title')

            expect(title).toHaveAttribute('id')
            expect(card).toHaveAttribute(
                'aria-labelledby',
                title.getAttribute('id')
            )
        })

        it('does not set aria-label when aria-labelledby is available from title', () => {
            render(
                <CardV2
                    title="Labelled title"
                    subtitle="Supporting text"
                    description="Description text"
                    aria-label="Custom card label"
                />
            )

            const card = screen.getByRole('region')

            expect(card).toHaveAttribute('aria-labelledby')
            expect(card).not.toHaveAttribute('aria-label')
        })

        it('links aria-describedby to description before subtitle', () => {
            render(
                <CardV2
                    title="Accessible description"
                    subtitle="Subtitle text"
                    description="Description text"
                />
            )

            const card = screen.getByRole('region')
            const description = screen.getByText('Description text')

            expect(description).toHaveAttribute('id')
            expect(card).toHaveAttribute(
                'aria-describedby',
                description.getAttribute('id')
            )
        })

        it('links aria-describedby to subtitle when description is absent', () => {
            render(
                <CardV2 title="Accessible subtitle" subtitle="Subtitle only" />
            )

            const card = screen.getByRole('region')
            const subtitle = screen.getByText('Subtitle only')

            expect(subtitle).toHaveAttribute('id')
            expect(card).toHaveAttribute(
                'aria-describedby',
                subtitle.getAttribute('id')
            )
        })

        it('preserves custom aria-label for custom cards without text props', () => {
            render(
                <CardV2 aria-label="Custom analytics card">
                    <CardV2.Body>
                        <span>Conversion rate</span>
                    </CardV2.Body>
                </CardV2>
            )

            expect(screen.getByRole('region')).toHaveAttribute(
                'aria-label',
                'Custom analytics card'
            )
        })

        it('keeps footer actions keyboard reachable', () => {
            render(
                <CardV2
                    title="Footer action card"
                    actionPlacement={CardV2ActionPlacement.FOOTER}
                    actions={{
                        text: 'Review',
                        onClick: vi.fn(),
                    }}
                />
            )

            expect(screen.getByRole('button', { name: 'Review' })).toBeEnabled()
        })

        it('supports horizontal cards with accessible media content', () => {
            render(
                <CardV2
                    title="Horizontal card"
                    orientation={CardV2Orientation.HORIZONTAL}
                    media={<img alt="Risk trend" src="/risk-trend.png" />}
                />
            )

            expect(screen.getByAltText('Risk trend')).toBeInTheDocument()
            expect(screen.getByRole('region')).toBeInTheDocument()
        })
    })
})
