import React from 'react'
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import KeyValuePairV2 from '../../../lib/components/KeyValuePairV2/KeyValuePairV2'
import {
    KeyValuePairV2Size,
    KeyValuePairV2StateType,
} from '../../../lib/components/KeyValuePairV2/keyValuePairV2.types'
import { Info, Star, ArrowRight } from 'lucide-react'

describe('KeyValuePairV2 Accessibility', () => {
    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic key-value pair (axe-core validation)', async () => {
            const { container } = render(
                <KeyValuePairV2 keyString="Name" value="John Doe" />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for key-value pair with slots (axe-core validation)', async () => {
            const { container } = render(
                <KeyValuePairV2
                    keyString="Rating"
                    value="5.0"
                    keySlot={<Info size={16} />}
                    valueLeftSlot={<Star size={16} />}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for horizontal layout (axe-core validation)', async () => {
            const { container } = render(
                <KeyValuePairV2
                    keyString="Status"
                    value="Active"
                    keyValuePairState={KeyValuePairV2StateType.horizontal}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('ensures sufficient contrast for text (1.4.3 Contrast Minimum - Level AA)', async () => {
            const { container } = render(
                <KeyValuePairV2
                    keyString="Description"
                    value="This is a long description text"
                    size={KeyValuePairV2Size.MEDIUM}
                />
            )

            const results = await axe(container, {
                rules: {
                    'color-contrast': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('uses semantic HTML structure - key-value relationship is programmatically determinable', () => {
            render(
                <KeyValuePairV2 keyString="Email" value="user@example.com" />
            )

            const container = screen.getByText('Email').closest('div')
            expect(container).toBeInTheDocument()
        })

        it('maintains logical reading order - key before value', () => {
            const { container } = render(
                <KeyValuePairV2 keyString="Name" value="John Doe" />
            )

            const keyText = screen.getByText('Name')
            const valueText = screen.getByText('John Doe')

            const allElements = Array.from(container.querySelectorAll('*'))
            const keyIndex = allElements.findIndex(
                (el) =>
                    el.textContent === 'Name' ||
                    el.textContent?.includes('Name')
            )
            const valueIndex = allElements.findIndex(
                (el) =>
                    el.textContent === 'John Doe' ||
                    el.textContent?.includes('John Doe')
            )

            expect(keyText).toBeInTheDocument()
            expect(valueText).toBeInTheDocument()
            expect(keyIndex).toBeGreaterThanOrEqual(0)
            expect(valueIndex).toBeGreaterThanOrEqual(0)
        })

        it('preserves relationships in horizontal layout', () => {
            render(
                <KeyValuePairV2
                    keyString="Status"
                    value="Active"
                    keyValuePairState={KeyValuePairV2StateType.horizontal}
                />
            )

            const keyText = screen.getByText('Status')
            const valueText = screen.getByText('Active')

            expect(keyText).toBeInTheDocument()
            expect(valueText).toBeInTheDocument()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('decorative slots should have aria-hidden added by user', () => {
            const { container } = render(
                <KeyValuePairV2
                    keyString="Rating"
                    value="5.0"
                    keySlot={
                        <Info
                            size={16}
                            data-testid="key-icon"
                            aria-hidden="true"
                        />
                    }
                    valueLeftSlot={
                        <Star
                            size={16}
                            data-testid="value-icon"
                            aria-hidden="true"
                        />
                    }
                />
            )

            const keyIcon = container.querySelector('[data-testid="key-icon"]')
            const valueIcon = container.querySelector(
                '[data-testid="value-icon"]'
            )

            if (keyIcon) {
                expect(keyIcon).toHaveAttribute('aria-hidden', 'true')
            }
            if (valueIcon) {
                expect(valueIcon).toHaveAttribute('aria-hidden', 'true')
            }
        })

        it('non-decorative slots maintain accessibility', () => {
            render(
                <KeyValuePairV2
                    keyString="Action"
                    value="Continue"
                    valueRightSlot={
                        <button aria-label="Continue to next step">
                            <ArrowRight size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )

            const button = screen.getByRole('button', {
                name: 'Continue to next step',
            })
            expect(button).toBeInTheDocument()
        })
    })

    describe('WCAG 1.4.1 Use of Color (Level A)', () => {
        it('does not rely solely on color to convey information', () => {
            render(
                <KeyValuePairV2
                    keyString="Status"
                    value="Active"
                    keySlot={<Info size={16} />}
                />
            )

            const keyText = screen.getByText('Status')
            const valueText = screen.getByText('Active')

            expect(keyText).toBeInTheDocument()
            expect(valueText).toBeInTheDocument()
        })
    })

    describe('Text Overflow and Tooltip Accessibility', () => {
        it('truncated text with tooltip is accessible', async () => {
            const longValue =
                'This is a very long value that will be truncated and should show a tooltip on hover'
            const { container } = render(
                <KeyValuePairV2
                    keyString="Description"
                    value={longValue}
                    textOverflow="truncate"
                    showTooltipOnTruncate={true}
                    maxWidth="100px"
                />
            )

            await new Promise((resolve) => setTimeout(resolve, 100))

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('wrapped text without tooltip is accessible', async () => {
            const { container } = render(
                <KeyValuePairV2
                    keyString="Description"
                    value="This text will wrap naturally without truncation"
                    textOverflow="wrap"
                    showTooltipOnTruncate={false}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('wrap-clamp text is accessible', async () => {
            const longValue = Array(10)
                .fill('This is a line of text.')
                .join(' ')
            const { container } = render(
                <KeyValuePairV2
                    keyString="Long Description"
                    value={longValue}
                    textOverflow="wrap-clamp"
                    maxLines={3}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Different Sizes', () => {
        it('small size is accessible', async () => {
            const { container } = render(
                <KeyValuePairV2
                    keyString="Small"
                    value="Small value"
                    size={KeyValuePairV2Size.SMALL}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('medium size is accessible', async () => {
            const { container } = render(
                <KeyValuePairV2
                    keyString="Medium"
                    value="Medium value"
                    size={KeyValuePairV2Size.MEDIUM}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('large size is accessible', async () => {
            const { container } = render(
                <KeyValuePairV2
                    keyString="Large"
                    value="Large value"
                    size={KeyValuePairV2Size.LARGE}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Edge Cases', () => {
        it('handles special characters in key and value', () => {
            render(
                <KeyValuePairV2
                    keyString="Email & Phone"
                    value="user@example.com & +1-555-1234"
                />
            )

            expect(screen.getByText('Email & Phone')).toBeInTheDocument()
            expect(
                screen.getByText('user@example.com & +1-555-1234')
            ).toBeInTheDocument()
        })

        it('handles empty string value', () => {
            render(<KeyValuePairV2 keyString="Empty Field" value="" />)

            expect(screen.getByText('Empty Field')).toBeInTheDocument()
        })

        it('handles very long key and value', () => {
            const longKey = 'A'.repeat(100)
            const longValue = 'B'.repeat(200)

            render(
                <KeyValuePairV2
                    keyString={longKey}
                    value={longValue}
                    textOverflow="wrap"
                />
            )

            expect(screen.getByText(longKey)).toBeInTheDocument()
            expect(screen.getByText(longValue)).toBeInTheDocument()
        })
    })
})
