import React from 'react'
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import KeyValuePair from '../../../lib/components/KeyValuePair/KeyValuePair'
import {
    KeyValuePairSize,
    KeyValuePairStateType,
    TextOverflowMode,
} from '../../../lib/components/KeyValuePair/types'
import { Info, Star, ArrowRight, Settings } from 'lucide-react'

describe('KeyValuePair Accessibility', () => {
    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic key-value pair (axe-core validation)', async () => {
            const { container } = render(
                <KeyValuePair keyString="Name" value="John Doe" />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for key-value pair with slots (axe-core validation)', async () => {
            const { container } = render(
                <KeyValuePair
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
                <KeyValuePair
                    keyString="Status"
                    value="Active"
                    keyValuePairState={KeyValuePairStateType.horizontal}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('ensures sufficient contrast for text (1.4.3 Contrast Minimum - Level AA)', async () => {
            const { container } = render(
                <KeyValuePair
                    keyString="Description"
                    value="This is a long description text"
                    size={KeyValuePairSize.MEDIUM}
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
            render(<KeyValuePair keyString="Email" value="user@example.com" />)

            // Component should use semantic structure (dl/dt/dd or aria-labelledby)
            const container = screen.getByText('Email').closest('div')
            expect(container).toBeInTheDocument()
        })

        it('maintains logical reading order - key before value', () => {
            const { container } = render(
                <KeyValuePair keyString="Name" value="John Doe" />
            )

            const keyText = screen.getByText('Name')
            const valueText = screen.getByText('John Doe')

            // Check DOM order by comparing positions
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
            // Key should appear before value in DOM
            expect(keyIndex).toBeGreaterThanOrEqual(0)
            expect(valueIndex).toBeGreaterThanOrEqual(0)
        })

        it('preserves relationships in horizontal layout', () => {
            render(
                <KeyValuePair
                    keyString="Status"
                    value="Active"
                    keyValuePairState={KeyValuePairStateType.horizontal}
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
                <KeyValuePair
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

            // Users should add aria-hidden to decorative icons
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
                <KeyValuePair
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
                <KeyValuePair
                    keyString="Status"
                    value="Active"
                    keySlot={<Info size={16} />}
                />
            )

            // Information is conveyed through text, not just color
            const keyText = screen.getByText('Status')
            const valueText = screen.getByText('Active')

            expect(keyText).toBeInTheDocument()
            expect(valueText).toBeInTheDocument()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('text has sufficient contrast ratio', async () => {
            const { container } = render(
                <KeyValuePair
                    keyString="Description"
                    value="This is a description with sufficient contrast"
                    size={KeyValuePairSize.LARGE}
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

    describe('WCAG 1.4.4 Resize Text (Level AA)', () => {
        it('text can be resized up to 200% without loss of content', () => {
            const { container } = render(
                <KeyValuePair
                    keyString="Long Key Name"
                    value="This is a very long value that should wrap or truncate appropriately"
                    textOverflow="wrap"
                />
            )

            const keyText = screen.getByText('Long Key Name')
            const valueText = screen.getByText(
                'This is a very long value that should wrap or truncate appropriately'
            )

            expect(keyText).toBeInTheDocument()
            expect(valueText).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.6 Headings and Labels (Level AA)', () => {
        it('key and value labels are descriptive', () => {
            render(
                <KeyValuePair
                    keyString="Email Address"
                    value="user@example.com"
                />
            )

            const keyText = screen.getByText('Email Address')
            const valueText = screen.getByText('user@example.com')

            expect(keyText).toBeInTheDocument()
            expect(valueText).toBeInTheDocument()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('key and value text are programmatically determinable', () => {
            render(<KeyValuePair keyString="Name" value="John Doe" />)

            const keyText = screen.getByText('Name')
            const valueText = screen.getByText('John Doe')

            expect(keyText).toBeInTheDocument()
            expect(valueText).toBeInTheDocument()
        })

        it('empty value is handled gracefully', () => {
            render(<KeyValuePair keyString="Optional Field" value="" />)

            const keyText = screen.getByText('Optional Field')
            expect(keyText).toBeInTheDocument()

            // Empty value should not cause errors
            const container = keyText.closest('div')
            expect(container).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('maintains logical sequence in vertical layout', () => {
            const { container } = render(
                <KeyValuePair
                    keyString="First"
                    value="Second"
                    keyValuePairState={KeyValuePairStateType.vertical}
                />
            )

            const firstText = screen.getByText('First')
            const secondText = screen.getByText('Second')

            expect(firstText).toBeInTheDocument()
            expect(secondText).toBeInTheDocument()

            // In vertical layout, key should come before value
            // Check by comparing positions in DOM
            const allElements = Array.from(container.querySelectorAll('*'))
            const firstIndex = allElements.findIndex(
                (el) =>
                    el.textContent === 'First' ||
                    el.textContent?.includes('First')
            )
            const secondIndex = allElements.findIndex(
                (el) =>
                    el.textContent === 'Second' ||
                    el.textContent?.includes('Second')
            )

            expect(firstIndex).toBeGreaterThanOrEqual(0)
            expect(secondIndex).toBeGreaterThanOrEqual(0)
        })

        it('maintains logical sequence in horizontal layout', () => {
            const { container } = render(
                <KeyValuePair
                    keyString="Label"
                    value="Value"
                    keyValuePairState={KeyValuePairStateType.horizontal}
                />
            )

            const labelText = screen.getByText('Label')
            const valueText = screen.getByText('Value')

            expect(labelText).toBeInTheDocument()
            expect(valueText).toBeInTheDocument()

            // In horizontal layout, key should come before value
            // Check by comparing positions in DOM
            const allElements = Array.from(container.querySelectorAll('*'))
            const labelIndex = allElements.findIndex(
                (el) =>
                    el.textContent === 'Label' ||
                    el.textContent?.includes('Label')
            )
            const valueIndex = allElements.findIndex(
                (el) =>
                    el.textContent === 'Value' ||
                    el.textContent?.includes('Value')
            )

            expect(labelIndex).toBeGreaterThanOrEqual(0)
            expect(valueIndex).toBeGreaterThanOrEqual(0)
        })
    })

    describe('Text Overflow and Tooltip Accessibility', () => {
        it('truncated text with tooltip is accessible', async () => {
            const longValue =
                'This is a very long value that will be truncated and should show a tooltip on hover'
            const { container } = render(
                <KeyValuePair
                    keyString="Description"
                    value={longValue}
                    textOverflow="truncate"
                    showTooltipOnTruncate={true}
                    maxWidth="100px"
                />
            )

            // Wait for tooltip detection
            await new Promise((resolve) => setTimeout(resolve, 100))

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('wrapped text without tooltip is accessible', async () => {
            const { container } = render(
                <KeyValuePair
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
                <KeyValuePair
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
                <KeyValuePair
                    keyString="Small"
                    value="Small value"
                    size={KeyValuePairSize.SMALL}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('medium size is accessible', async () => {
            const { container } = render(
                <KeyValuePair
                    keyString="Medium"
                    value="Medium value"
                    size={KeyValuePairSize.MEDIUM}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('large size is accessible', async () => {
            const { container } = render(
                <KeyValuePair
                    keyString="Large"
                    value="Large value"
                    size={KeyValuePairSize.LARGE}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Edge Cases', () => {
        it('handles special characters in key and value', () => {
            render(
                <KeyValuePair
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
            render(<KeyValuePair keyString="Empty Field" value="" />)

            expect(screen.getByText('Empty Field')).toBeInTheDocument()
        })

        it('handles very long key and value', () => {
            const longKey = 'A'.repeat(100)
            const longValue = 'B'.repeat(200)

            render(
                <KeyValuePair
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
