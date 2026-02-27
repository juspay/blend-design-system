import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import RadioV2 from '../../../lib/components/SelectorV2/RadioV2/RadioV2'
import { RadioV2Size } from '../../../lib/components/SelectorV2/RadioV2/radioV2.types'
import { MockIcon } from '../../test-utils'

describe('RadioV2 Component', () => {
    describe('Rendering', () => {
        it('renders with label', () => {
            render(<RadioV2 label="Test Radio" checked={false} />)
            expect(screen.getByText('Test Radio')).toBeInTheDocument()
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('renders with label and subLabel', () => {
            render(
                <RadioV2
                    label="Option"
                    subLabel="Additional info"
                    checked={false}
                />
            )
            expect(screen.getByText('Option')).toBeInTheDocument()
            expect(screen.getByText('Additional info')).toBeInTheDocument()
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('renders without label', () => {
            render(<RadioV2 checked={false} />)
            expect(screen.getByRole('radio')).toBeInTheDocument()
            expect(
                document.querySelector('[data-radio="radio"]')
            ).toBeInTheDocument()
        })

        it('renders with slot content', () => {
            render(
                <RadioV2
                    label="Radio with slot"
                    checked={false}
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                />
            )
            expect(screen.getByText('Radio with slot')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="slot-icon"]')
            ).toBeInTheDocument()
        })

        it('renders required indicator', () => {
            render(<RadioV2 label="Required Radio" required checked={false} />)
            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('renders complex radio with all features', () => {
            render(
                <RadioV2
                    label="Complex Radio"
                    subLabel="With subtext"
                    checked={false}
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                    required
                />
            )
            expect(screen.getByRole('radio')).toBeInTheDocument()
            expect(screen.getByText('Complex Radio')).toBeInTheDocument()
            expect(screen.getByText('With subtext')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Radio States', () => {
        it('renders unchecked state by default', () => {
            render(<RadioV2 label="Unchecked Radio" checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-checked', 'false')
        })

        it('renders checked state', () => {
            render(<RadioV2 label="Checked Radio" checked={true} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-checked', 'true')
        })

        it('renders disabled state', () => {
            render(<RadioV2 label="Disabled Radio" disabled checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toBeDisabled()
        })

        it('renders error state', () => {
            render(<RadioV2 label="Error Radio" error checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-invalid', 'true')
        })

        it('renders required state', () => {
            render(<RadioV2 label="Required Radio" required checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-required', 'true')
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Size Variants', () => {
        it('renders small size', () => {
            render(
                <RadioV2
                    label="Small Radio"
                    size={RadioV2Size.SMALL}
                    checked={false}
                />
            )

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toBeInTheDocument()
        })

        it('renders medium size (default)', () => {
            render(<RadioV2 label="Medium Radio" checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toBeInTheDocument()
        })

        it.each([RadioV2Size.SMALL, RadioV2Size.MEDIUM])(
            'renders %s size correctly',
            (size) => {
                const { unmount } = render(
                    <RadioV2
                        label={`${size} Radio`}
                        size={size}
                        checked={false}
                    />
                )
                expect(screen.getByRole('radio')).toBeInTheDocument()
                unmount()
            }
        )
    })

    describe('Controlled vs Uncontrolled', () => {
        it('works as controlled component', () => {
            const handleChange =
                vi.fn<(e: React.ChangeEvent<HTMLInputElement>) => void>()
            render(
                <RadioV2
                    label="Controlled Radio"
                    checked={true}
                    onChange={handleChange}
                />
            )

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-checked', 'true')
        })

        it('controlled component updates when checked prop changes', () => {
            const { rerender } = render(
                <RadioV2 label="Controlled Radio" checked={false} />
            )

            let radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-checked', 'false')

            rerender(<RadioV2 label="Controlled Radio" checked={true} />)

            radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-checked', 'true')
        })
    })

    describe('Event Handling', () => {
        it('calls onChange when clicked', async () => {
            const handleChange =
                vi.fn<(e: React.ChangeEvent<HTMLInputElement>) => void>()
            const { user } = render(
                <RadioV2
                    label="Clickable Radio"
                    checked={false}
                    onChange={handleChange}
                />
            )

            const radioElement = screen.getByRole('radio')
            await user.click(radioElement)

            expect(handleChange).toHaveBeenCalledTimes(1)
        })

        it('does not call onChange when disabled', async () => {
            const handleChange =
                vi.fn<(e: React.ChangeEvent<HTMLInputElement>) => void>()
            const { user } = render(
                <RadioV2
                    label="Disabled Radio"
                    disabled
                    checked={false}
                    onChange={handleChange}
                />
            )

            const radioElement = screen.getByRole('radio')
            await user.click(radioElement)

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('does not call onChange when onChange is not provided', async () => {
            const { user } = render(
                <RadioV2 label="No Handler Radio" checked={false} />
            )

            const radioElement = screen.getByRole('radio')
            await user.click(radioElement)

            // Should not throw error
            expect(radioElement).toBeInTheDocument()
        })
    })

    describe('Text Truncation', () => {
        it('truncates label when maxLength is provided', () => {
            const longLabel = 'A'.repeat(100)
            render(
                <RadioV2
                    label={longLabel}
                    checked={false}
                    maxLength={{ label: 10 }}
                />
            )

            const labelElement = screen.getByText(/^A{10}/)
            expect(labelElement).toBeInTheDocument()
        })

        it('truncates subLabel when maxLength is provided', () => {
            const longSubLabel = 'B'.repeat(100)
            render(
                <RadioV2
                    label="Radio"
                    subLabel={longSubLabel}
                    checked={false}
                    maxLength={{ subLabel: 10 }}
                />
            )

            const subLabelElement = screen.getByText(/^B{10}/)
            expect(subLabelElement).toBeInTheDocument()
        })

        it('does not truncate when maxLength is not provided', () => {
            const longLabel = 'C'.repeat(100)
            render(<RadioV2 label={longLabel} checked={false} />)

            expect(screen.getByText(longLabel)).toBeInTheDocument()
        })
    })

    describe('Data Attributes', () => {
        it('has data-radio attribute with label value', () => {
            render(<RadioV2 label="Test Radio" checked={false} />)

            expect(
                document.querySelector('[data-radio="Test Radio"]')
            ).toBeInTheDocument()
        })

        it('has data-radio="radio" when label is not provided', () => {
            render(<RadioV2 checked={false} />)

            expect(
                document.querySelector('[data-radio="radio"]')
            ).toBeInTheDocument()
        })

        it('has data-element="slot-icon" when slot is provided', () => {
            render(
                <RadioV2
                    label="Radio"
                    checked={false}
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                />
            )

            expect(
                document.querySelector('[data-element="slot-icon"]')
            ).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty string label', () => {
            render(<RadioV2 label="" checked={false} />)
            const radioElement = screen.getByRole('radio')
            expect(radioElement).toBeInTheDocument()
        })

        it('handles very long label text', () => {
            const longText = 'A'.repeat(1000)
            render(<RadioV2 label={longText} checked={false} />)
            expect(screen.getByText(longText)).toBeInTheDocument()
        })
    })
})
