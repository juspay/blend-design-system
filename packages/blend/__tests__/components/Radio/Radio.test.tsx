import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import Radio from '../../../lib/components/Radio/Radio'
import { RadioSize } from '../../../lib/components/Radio/types'
import { RadioPropsBuilder, RadioTestFactory } from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

describe('Radio Component', () => {
    describe('Rendering', () => {
        it('renders with label text', () => {
            render(<Radio value="test">Accept terms</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
            expect(screen.getByText('Accept terms')).toBeInTheDocument()
        })

        it('renders without label (radio only)', () => {
            render(<Radio value="test" />)
            const radio = screen.getByRole('radio')
            expect(radio).toBeInTheDocument()
            // Radio renders without visible label text
        })

        it('renders with subtext', () => {
            const props = RadioTestFactory.withSubtext()
            render(<Radio {...props} />)

            expect(screen.getByRole('radio')).toBeInTheDocument()
            expect(screen.getByText('Radio with subtext')).toBeInTheDocument()
            expect(
                screen.getByText('Additional information')
            ).toBeInTheDocument()
        })

        it('renders with slot content', () => {
            render(
                <Radio value="test" slot={<MockIcon />}>
                    Radio with slot
                </Radio>
            )

            expect(screen.getByRole('radio')).toBeInTheDocument()
            expect(screen.getByText('Radio with slot')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('renders with required indicator', () => {
            const props = RadioTestFactory.required()
            render(<Radio {...props} />)

            expect(screen.getByRole('radio')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('renders complex radio with all features', () => {
            const props = new RadioPropsBuilder()
                .withChildren('Complex Radio')
                .withValue('complex')
                .withSubtext('With subtext')
                .withSlot(<MockIcon />)
                .withRequired()
                .withSize(RadioSize.MEDIUM)
                .build()

            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeInTheDocument()
            expect(screen.getByText('Complex Radio')).toBeInTheDocument()
            expect(screen.getByText('With subtext')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })
    })

    describe('Radio States', () => {
        it('renders unchecked state by default', () => {
            render(<Radio value="test">Unchecked</Radio>)
            const radio = screen.getByRole('radio')
            expect(radio).not.toBeChecked()
            expect(radio).toHaveAttribute('data-state', 'unchecked')
        })

        it('renders checked state correctly', () => {
            const props = RadioTestFactory.checked()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeChecked()
            expect(radio).toHaveAttribute('data-state', 'checked')
        })

        it('renders disabled state correctly', () => {
            const handleChange = vi.fn()
            const props = new RadioPropsBuilder()
                .withChildren('Disabled Radio')
                .withValue('disabled')
                .withDisabled()
                .withOnChange(handleChange)
                .build()

            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeDisabled()

            fireEvent.click(radio)
            expect(handleChange).not.toHaveBeenCalled()
        })

        it('renders error state correctly', () => {
            const props = RadioTestFactory.withError()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toHaveAttribute('data-state', 'unchecked')
            // Error styling is applied via CSS classes/data attributes
        })

        it('handles combined states correctly', () => {
            const props = new RadioPropsBuilder()
                .withChildren('Complex State')
                .withValue('complex')
                .withChecked()
                .withDisabled()
                .withError()
                .withRequired()
                .build()

            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeChecked()
            expect(radio).toBeDisabled()
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Size Variants', () => {
        it.each([
            [RadioSize.SMALL, 'sm'],
            [RadioSize.MEDIUM, 'md'],
        ])('renders %s size correctly', (size, sizeLabel) => {
            const props = new RadioPropsBuilder()
                .withChildren(`Size ${sizeLabel}`)
                .withValue(sizeLabel)
                .withSize(size)
                .build()

            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeInTheDocument()
            expect(screen.getByText(`Size ${sizeLabel}`)).toBeInTheDocument()
        })

        it('renders all sizes with consistent behavior', () => {
            const allSizes = RadioTestFactory.allSizes()

            allSizes.forEach((props) => {
                const { unmount } = render(<Radio {...props} />)

                const radio = screen.getByRole('radio')
                expect(radio).toBeInTheDocument()
                expect(radio).not.toBeChecked()

                unmount()
            })
        })
    })

    describe('Controlled vs Uncontrolled', () => {
        it('works as controlled component', () => {
            const handleChange = vi.fn()
            const props = new RadioPropsBuilder()
                .withChildren('Controlled')
                .withValue('controlled')
                .withChecked(false)
                .withOnChange(handleChange)
                .build()

            const { rerender } = render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).not.toBeChecked()

            fireEvent.click(radio)
            expect(handleChange).toHaveBeenCalledWith(true)

            // Simulate parent component updating the checked prop
            rerender(<Radio {...props} checked={true} />)
            expect(radio).toBeChecked()
        })

        it('works as uncontrolled component', () => {
            const handleChange = vi.fn()
            const props = new RadioPropsBuilder()
                .withChildren('Uncontrolled')
                .withValue('uncontrolled')
                .withDefaultChecked(false)
                .withOnChange(handleChange)
                .build()

            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).not.toBeChecked()

            fireEvent.click(radio)
            expect(handleChange).toHaveBeenCalledWith(true)
            expect(radio).toBeChecked()
        })

        it('defaults to unchecked when no checked or defaultChecked provided', () => {
            render(<Radio value="default">Default State</Radio>)

            const radio = screen.getByRole('radio')
            expect(radio).not.toBeChecked()
            expect(radio).toHaveAttribute('data-state', 'unchecked')
        })
    })

    describe('Event Handling', () => {
        it('calls onChange when clicked', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Click me
                </Radio>
            )

            const radio = screen.getByRole('radio')
            await user.click(radio)

            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('does not uncheck when clicked if already checked', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" checked onChange={handleChange}>
                    Already checked
                </Radio>
            )

            const radio = screen.getByRole('radio')
            expect(radio).toBeChecked()

            await user.click(radio)
            // Radio buttons don't trigger onChange when already checked
            expect(handleChange).not.toHaveBeenCalled()
            expect(radio).toBeChecked()
        })

        it('does not call onChange when disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" disabled onChange={handleChange}>
                    Disabled
                </Radio>
            )

            const radio = screen.getByRole('radio')
            await user.click(radio)

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('handles label click to select radio', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Click label
                </Radio>
            )

            const label = screen.getByText('Click label')
            await user.click(label)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('renders radio input correctly', () => {
            render(<Radio value="test">Radio Input</Radio>)

            // Test that the radio input is accessible and has correct attributes
            const radio = screen.getByRole('radio')
            expect(radio).toBeInstanceOf(HTMLInputElement)
            expect(radio.getAttribute('type')).toBe('radio')
            expect(radio.getAttribute('value')).toBe('test')
        })
    })

    describe('Form Integration', () => {
        it('works with form submission', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <Radio value="terms" name="agreement">
                        Accept terms
                    </Radio>
                    <button type="submit">Submit</button>
                </form>
            )

            const radio = screen.getByRole('radio')
            expect(radio).toHaveAttribute('value', 'terms')
            expect(radio).toHaveAttribute('name', 'agreement')
        })

        it('handles required field validation', () => {
            render(
                <form>
                    <Radio value="required" required>
                        Required field
                    </Radio>
                </form>
            )

            const radio = screen.getByRole('radio')
            expect(radio).toHaveAttribute('required')
            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('generates unique IDs when not provided', () => {
            render(
                <>
                    <Radio value="first">First radio</Radio>
                    <Radio value="second">Second radio</Radio>
                </>
            )

            const radios = screen.getAllByRole('radio')
            const firstId = radios[0].id
            const secondId = radios[1].id

            expect(firstId).toBeTruthy()
            expect(secondId).toBeTruthy()
            expect(firstId).not.toBe(secondId)
        })

        it('uses provided ID when given', () => {
            render(
                <Radio id="custom-radio" value="custom">
                    Custom ID
                </Radio>
            )

            const radio = screen.getByRole('radio')
            expect(radio).toHaveAttribute('id', 'custom-radio')
        })

        it('groups radios with same name', () => {
            render(
                <>
                    <Radio name="group" value="option1">
                        Option 1
                    </Radio>
                    <Radio name="group" value="option2">
                        Option 2
                    </Radio>
                    <Radio name="other" value="option3">
                        Option 3
                    </Radio>
                </>
            )

            const radios = screen.getAllByRole('radio')
            expect(radios[0]).toHaveAttribute('name', 'group')
            expect(radios[1]).toHaveAttribute('name', 'group')
            expect(radios[2]).toHaveAttribute('name', 'other')
        })
    })

    describe('HTML Props and Attributes', () => {
        it('passes through HTML attributes', () => {
            const props = new RadioPropsBuilder()
                .withChildren('With Attrs')
                .withValue('attrs')
                .withCustomProps({
                    'data-testid': 'custom-radio',
                    'aria-describedby': 'help-text',
                    className: 'custom-class',
                })
                .build()

            render(<Radio {...props} />)

            const radio = screen.getByTestId('custom-radio')
            expect(radio).toHaveAttribute('aria-describedby', 'help-text')
        })

        it('applies data attributes correctly', () => {
            render(
                <Radio
                    value="data"
                    data-testid="data-radio"
                    data-category="form-control"
                >
                    With Data Attrs
                </Radio>
            )

            const radio = screen.getByTestId('data-radio')
            expect(radio).toHaveAttribute('data-category', 'form-control')
        })
    })

    describe('Token Application', () => {
        it('applies responsive tokens through useResponsiveTokens hook', () => {
            render(<Radio value="responsive">Responsive</Radio>)
            const radio = screen.getByRole('radio')
            expect(radio).toBeInTheDocument()
            // Token application is tested through visual regression and computed styles
        })

        it('has proper data attributes for styling', () => {
            const props = new RadioPropsBuilder()
                .withChildren('Styled Radio')
                .withValue('styled')
                .withChecked()
                .withError()
                .build()

            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toHaveAttribute('data-state', 'checked')
        })
    })

    describe('Edge Cases', () => {
        it('renders without any props except value', () => {
            render(<Radio value="minimal" />)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('handles empty children', () => {
            render(<Radio value="empty">{''}</Radio>)
            const radio = screen.getByRole('radio')
            expect(radio).toBeInTheDocument()
        })

        it('handles null children', () => {
            render(<Radio value="null">{null}</Radio>)
            const radio = screen.getByRole('radio')
            expect(radio).toBeInTheDocument()
        })

        it('handles undefined subtext gracefully', () => {
            render(
                <Radio value="undefined" subtext={undefined}>
                    No subtext
                </Radio>
            )
            expect(screen.getByRole('radio')).toBeInTheDocument()
            expect(screen.getByText('No subtext')).toBeInTheDocument()
        })

        it('maintains proper layout structure', () => {
            render(
                <Radio value="layout" subtext="Helper text" slot={<MockIcon />}>
                    Layout test
                </Radio>
            )

            const radio = screen.getByRole('radio')
            const label = screen.getByText('Layout test')
            const subtext = screen.getByText('Helper text')
            const icon = screen.getByTestId('mock-icon')

            expect(radio).toBeInTheDocument()
            expect(label).toBeInTheDocument()
            expect(subtext).toBeInTheDocument()
            expect(icon).toBeInTheDocument()
        })

        it('handles rapid state changes', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="rapid" onChange={handleChange}>
                    Rapid clicks
                </Radio>
            )

            const radio = screen.getByRole('radio')

            // Simulate rapid clicking
            await user.click(radio)
            await user.click(radio)
            await user.click(radio)

            // Radio buttons only trigger onChange when becoming checked (first click)
            // Subsequent clicks on an already checked radio don't trigger onChange
            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('handles missing value prop gracefully', () => {
            // This should still render but may not work properly in forms
            render(<Radio>No value</Radio>)
            const radio = screen.getByRole('radio')
            expect(radio).toBeInTheDocument()
        })
    })

    describe('Radio Group Behavior', () => {
        it('only allows one radio to be selected in a group', async () => {
            const handleChange1 = vi.fn()
            const handleChange2 = vi.fn()
            const { user } = render(
                <>
                    <Radio
                        name="group"
                        value="option1"
                        onChange={handleChange1}
                    >
                        Option 1
                    </Radio>
                    <Radio
                        name="group"
                        value="option2"
                        onChange={handleChange2}
                    >
                        Option 2
                    </Radio>
                </>
            )

            const radio1 = screen.getByRole('radio', { name: 'Option 1' })
            const radio2 = screen.getByRole('radio', { name: 'Option 2' })

            // Select first radio
            await user.click(radio1)
            expect(radio1).toBeChecked()
            expect(radio2).not.toBeChecked()
            expect(handleChange1).toHaveBeenCalledWith(true)

            // Select second radio
            await user.click(radio2)
            expect(radio1).not.toBeChecked()
            expect(radio2).toBeChecked()
            expect(handleChange2).toHaveBeenCalledWith(true)
        })

        it('allows different groups to have independent selections', async () => {
            const { user } = render(
                <>
                    <Radio name="group1" value="a1">
                        Group 1 Option 1
                    </Radio>
                    <Radio name="group1" value="a2">
                        Group 1 Option 2
                    </Radio>
                    <Radio name="group2" value="b1">
                        Group 2 Option 1
                    </Radio>
                    <Radio name="group2" value="b2">
                        Group 2 Option 2
                    </Radio>
                </>
            )

            const group1Radio1 = screen.getByRole('radio', {
                name: 'Group 1 Option 1',
            })
            const group2Radio1 = screen.getByRole('radio', {
                name: 'Group 2 Option 1',
            })

            await user.click(group1Radio1)
            await user.click(group2Radio1)

            expect(group1Radio1).toBeChecked()
            expect(group2Radio1).toBeChecked()
        })
    })
})
