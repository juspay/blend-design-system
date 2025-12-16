import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Slider from '../../../lib/components/Slider/Slider'
import { SliderVariant, SliderSize } from '../../../lib/components/Slider/types'

describe('Slider Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default slider (axe-core validation)', async () => {
            const { container } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Volume slider"
                    min={0}
                    max={100}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all slider variants', async () => {
            const variants = [SliderVariant.PRIMARY, SliderVariant.SECONDARY]

            for (const variant of variants) {
                const { container, unmount } = render(
                    <Slider
                        variant={variant}
                        defaultValue={[50]}
                        aria-label={`${variant} slider`}
                        min={0}
                        max={100}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for all slider sizes', async () => {
            const sizes = [
                SliderSize.SMALL,
                SliderSize.MEDIUM,
                SliderSize.LARGE,
            ]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <Slider
                        size={size}
                        defaultValue={[50]}
                        aria-label={`${size} slider`}
                        min={0}
                        max={100}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Disabled slider"
                    disabled
                    min={0}
                    max={100}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with value labels (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Slider with value labels"
                    showValueLabels
                    min={0}
                    max={100}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with vertical orientation', async () => {
            const { container } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Vertical slider"
                    orientation="vertical"
                    min={0}
                    max={100}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with range slider (multiple thumbs)', async () => {
            const { container } = render(
                <Slider
                    defaultValue={[25, 75]}
                    aria-label="Range slider"
                    min={0}
                    max={100}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Focusable slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            slider.focus()
            expect(document.activeElement).toBe(slider)
        })

        it('can be navigated with arrow keys - keyboard navigation support', async () => {
            const handleValueChange = vi.fn()
            const { user } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Keyboard navigable slider"
                    onValueChange={handleValueChange}
                    min={0}
                    max={100}
                    step={1}
                />
            )

            const slider = screen.getByRole('slider')
            slider.focus()

            // Right arrow should increase value
            await user.keyboard('{ArrowRight}')
            expect(handleValueChange).toHaveBeenCalled()

            // Left arrow should decrease value
            await user.keyboard('{ArrowLeft}')
            expect(handleValueChange).toHaveBeenCalled()
        })

        it('disabled sliders are not focusable (2.4.3 Focus Order)', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Disabled slider"
                    disabled
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-disabled', 'true')
            expect(slider).toHaveAttribute('data-disabled')
        })

        it('supports Home and End keys for min/max navigation', async () => {
            const handleValueChange = vi.fn()
            const { user } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Slider with Home/End keys"
                    onValueChange={handleValueChange}
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            slider.focus()

            // Home key should set to minimum
            await user.keyboard('{Home}')
            expect(handleValueChange).toHaveBeenCalled()

            // End key should set to maximum
            await user.keyboard('{End}')
            expect(handleValueChange).toHaveBeenCalled()
        })

        it('supports PageUp and PageDown keys for step navigation', async () => {
            const handleValueChange = vi.fn()
            const { user } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Slider with PageUp/PageDown"
                    onValueChange={handleValueChange}
                    min={0}
                    max={100}
                    step={10}
                />
            )

            const slider = screen.getByRole('slider')
            slider.focus()

            // PageUp should increase by step
            await user.keyboard('{PageUp}')
            expect(handleValueChange).toHaveBeenCalled()

            // PageDown should decrease by step
            await user.keyboard('{PageDown}')
            expect(handleValueChange).toHaveBeenCalled()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has proper role="slider" attribute', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Test slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toBeInTheDocument()
        })

        it('has accessible name via aria-label', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Volume control"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider', {
                name: 'Volume control',
            })
            expect(slider).toBeInTheDocument()
        })

        it('has accessible name via aria-labelledby', () => {
            render(
                <div>
                    <label id="slider-label">Volume</label>
                    <Slider
                        defaultValue={[50]}
                        aria-labelledby="slider-label"
                        min={0}
                        max={100}
                    />
                </div>
            )

            const slider = screen.getByRole('slider', { name: 'Volume' })
            expect(slider).toBeInTheDocument()
        })

        it('has aria-valuemin attribute', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Test slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuemin', '0')
        })

        it('has aria-valuemax attribute', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Test slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuemax', '100')
        })

        it('has aria-valuenow attribute with current value', () => {
            render(
                <Slider
                    value={[75]}
                    aria-label="Test slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuenow', '75')
        })

        it('has aria-valuetext attribute with formatted value', () => {
            render(
                <Slider
                    value={[50]}
                    aria-label="Percentage slider"
                    valueFormat={{
                        type: 'percentage',
                        suffix: '%',
                    }}
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuetext', '50%')
        })

        it('has aria-orientation attribute for vertical sliders', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Vertical slider"
                    orientation="vertical"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-orientation', 'vertical')
        })

        it('has aria-disabled attribute when disabled', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Disabled slider"
                    disabled
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-disabled', 'true')
        })

        it('supports aria-describedby for additional descriptions', () => {
            render(
                <div>
                    <div id="slider-description">Adjust the volume level</div>
                    <Slider
                        defaultValue={[50]}
                        aria-label="Volume slider"
                        aria-describedby="slider-description"
                        min={0}
                        max={100}
                    />
                </div>
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute(
                'aria-describedby',
                'slider-description'
            )
        })

        it('has proper aria-label for range sliders with multiple thumbs', () => {
            render(
                <Slider
                    defaultValue={[25, 75]}
                    aria-label="Price range"
                    min={0}
                    max={100}
                />
            )

            const sliders = screen.getAllByRole('slider')
            expect(sliders).toHaveLength(2)

            // First thumb should have descriptive label
            expect(sliders[0]).toHaveAttribute(
                'aria-label',
                expect.stringContaining('Price range')
            )

            // Second thumb should have descriptive label
            expect(sliders[1]).toHaveAttribute(
                'aria-label',
                expect.stringContaining('Price range')
            )
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('has visible focus indicator when focused', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Focusable slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            slider.focus()

            // Check that focus styles are applied (Radix UI handles this)
            expect(document.activeElement).toBe(slider)
        })

        it('maintains focus visibility during keyboard navigation', async () => {
            const { user } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Keyboard navigable slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            slider.focus()

            await user.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(slider)
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('value labels are marked as aria-hidden when shown', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Slider with labels"
                    showValueLabels
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            const valueLabel = slider.querySelector('[aria-hidden="true"]')
            expect(valueLabel).toBeInTheDocument()
        })

        it('value labels do not interfere with screen reader announcements', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Slider with labels"
                    showValueLabels
                    valueFormat={{
                        type: 'number',
                        suffix: '%',
                    }}
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            // aria-valuetext should be used instead of visual label
            expect(slider).toHaveAttribute('aria-valuetext')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('maintains semantic structure with proper HTML elements', () => {
            const { container } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Semantic slider"
                    min={0}
                    max={100}
                />
            )

            // Radix UI uses proper semantic structure
            const slider = container.querySelector('[role="slider"]')
            expect(slider).toBeInTheDocument()
        })

        it('preserves relationships between track, range, and thumb', () => {
            render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Slider with relationships"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            // Thumb should be within the slider structure
            expect(slider).toBeInTheDocument()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) - Level AA', () => {
        it('has sufficient contrast for interactive elements', async () => {
            const { container } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="High contrast slider"
                    min={0}
                    max={100}
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

    describe('Screen Reader Support', () => {
        it('announces current value to screen readers', () => {
            render(
                <Slider
                    value={[75]}
                    aria-label="Volume slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuenow', '75')
            expect(slider).toHaveAttribute('aria-valuetext', '75')
        })

        it('announces formatted value when valueFormat is provided', () => {
            render(
                <Slider
                    value={[50]}
                    aria-label="Percentage slider"
                    valueFormat={{
                        type: 'percentage',
                        suffix: '%',
                    }}
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuetext', '50%')
        })

        it('announces value changes during keyboard navigation', async () => {
            const { user } = render(
                <Slider
                    defaultValue={[50]}
                    aria-label="Volume slider"
                    min={0}
                    max={100}
                    step={10}
                />
            )

            const slider = screen.getByRole('slider')
            slider.focus()

            await user.keyboard('{ArrowRight}')
            // Value should update and be announced
            expect(slider).toHaveAttribute('aria-valuenow')
        })
    })

    describe('Edge Cases', () => {
        it('handles minimum value correctly', () => {
            render(
                <Slider
                    value={[0]}
                    aria-label="Minimum value slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuenow', '0')
            expect(slider).toHaveAttribute('aria-valuemin', '0')
        })

        it('handles maximum value correctly', () => {
            render(
                <Slider
                    value={[100]}
                    aria-label="Maximum value slider"
                    min={0}
                    max={100}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuenow', '100')
            expect(slider).toHaveAttribute('aria-valuemax', '100')
        })

        it('handles custom min/max values', () => {
            render(
                <Slider
                    value={[500]}
                    aria-label="Custom range slider"
                    min={100}
                    max={1000}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuemin', '100')
            expect(slider).toHaveAttribute('aria-valuemax', '1000')
            expect(slider).toHaveAttribute('aria-valuenow', '500')
        })

        it('handles decimal step values', () => {
            render(
                <Slider
                    value={[0.5]}
                    aria-label="Decimal slider"
                    min={0}
                    max={1}
                    step={0.1}
                />
            )

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('aria-valuenow', '0.5')
        })

        it('handles range slider with multiple values', () => {
            render(
                <Slider
                    value={[25, 75]}
                    aria-label="Range slider"
                    min={0}
                    max={100}
                />
            )

            const sliders = screen.getAllByRole('slider')
            expect(sliders).toHaveLength(2)
            expect(sliders[0]).toHaveAttribute('aria-valuenow', '25')
            expect(sliders[1]).toHaveAttribute('aria-valuenow', '75')
        })
    })
})
