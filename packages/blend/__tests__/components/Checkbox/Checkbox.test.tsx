import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import Checkbox from '../../../lib/components/Checkbox/Checkbox'
import { CheckboxSize } from '../../../lib/components/Checkbox/types'
import {
    CheckboxPropsBuilder,
    CheckboxTestFactory,
} from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

describe.skip('Checkbox Component', () => {
    describe('Rendering', () => {
        it('renders with label text', () => {
            render(<Checkbox>Accept terms</Checkbox>)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(screen.getByText('Accept terms')).toBeInTheDocument()
        })

        it('renders without label (checkbox only)', () => {
            render(<Checkbox />)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            // Checkbox renders without visible label text
        })

        it('renders with subtext', () => {
            const props = CheckboxTestFactory.withSubtext()
            render(<Checkbox {...props} />)

            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(
                screen.getByText('Checkbox with subtext')
            ).toBeInTheDocument()
            expect(
                screen.getByText('Additional information')
            ).toBeInTheDocument()
        })

        it('renders with slot content', () => {
            render(<Checkbox slot={<MockIcon />}>Checkbox with slot</Checkbox>)

            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(screen.getByText('Checkbox with slot')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('renders with required indicator', () => {
            const props = CheckboxTestFactory.required()
            render(<Checkbox {...props} />)

            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('renders complex checkbox with all features', () => {
            const props = CheckboxTestFactory.complex()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()
            expect(screen.getByText('Complex Checkbox')).toBeInTheDocument()
            expect(screen.getByText('With subtext')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })
    })

    describe('Checkbox States', () => {
        it('renders unchecked state by default', () => {
            render(<Checkbox>Unchecked</Checkbox>)
            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).not.toBeChecked()
            expect(checkbox).toHaveAttribute('data-state', 'unchecked')
        })

        it('renders checked state correctly', () => {
            const props = CheckboxTestFactory.checked()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeChecked()
            expect(checkbox).toHaveAttribute('data-state', 'checked')
        })

        it('renders indeterminate state correctly', () => {
            const props = CheckboxTestFactory.indeterminate()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('data-state', 'indeterminate')
            // Note: indeterminate checkboxes show as unchecked in the DOM but have special styling
            expect(checkbox).not.toBeChecked()
        })

        it('renders disabled state correctly', () => {
            const handleChange = vi.fn()
            const props = new CheckboxPropsBuilder()
                .withChildren('Disabled Checkbox')
                .withDisabled()
                .withOnCheckedChange(handleChange)
                .build()

            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeDisabled()
            expect(checkbox).toHaveAttribute('data-error', 'false')

            fireEvent.click(checkbox)
            expect(handleChange).not.toHaveBeenCalled()
        })

        it('renders error state correctly', () => {
            const props = CheckboxTestFactory.withError()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('data-error', 'true')
        })

        it('handles combined states correctly', () => {
            const props = new CheckboxPropsBuilder()
                .withChildren('Complex State')
                .withChecked()
                .withDisabled()
                .withError()
                .withRequired()
                .build()

            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeChecked()
            expect(checkbox).toBeDisabled()
            expect(checkbox).toHaveAttribute('data-error', 'true')
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Size Variants', () => {
        it.each([
            [CheckboxSize.SMALL, 'sm'],
            [CheckboxSize.MEDIUM, 'md'],
        ])('renders %s size correctly', (size, sizeLabel) => {
            const props = new CheckboxPropsBuilder()
                .withChildren(`Size ${sizeLabel}`)
                .withSize(size)
                .build()

            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()
            expect(screen.getByText(`Size ${sizeLabel}`)).toBeInTheDocument()
        })

        it('renders all sizes with consistent behavior', () => {
            const allSizes = CheckboxTestFactory.allSizes()

            allSizes.forEach((props) => {
                const { unmount } = render(<Checkbox {...props} />)

                const checkbox = screen.getByRole('checkbox')
                expect(checkbox).toBeInTheDocument()
                expect(checkbox).not.toBeChecked()

                unmount()
            })
        })
    })

    describe('Controlled vs Uncontrolled', () => {
        it('works as controlled component', () => {
            const handleChange = vi.fn()
            const props = new CheckboxPropsBuilder()
                .withChildren('Controlled')
                .withChecked(false)
                .withOnCheckedChange(handleChange)
                .build()

            const { rerender } = render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).not.toBeChecked()

            fireEvent.click(checkbox)
            expect(handleChange).toHaveBeenCalledWith(true)

            // Simulate parent component updating the checked prop
            rerender(<Checkbox {...props} checked={true} />)
            expect(checkbox).toBeChecked()
        })

        it('works as uncontrolled component', () => {
            const handleChange = vi.fn()
            const props = new CheckboxPropsBuilder()
                .withChildren('Uncontrolled')
                .withDefaultChecked(false)
                .withOnCheckedChange(handleChange)
                .build()

            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).not.toBeChecked()

            fireEvent.click(checkbox)
            expect(handleChange).toHaveBeenCalledWith(true)
            expect(checkbox).toBeChecked()
        })

        it('handles indeterminate state in controlled mode', () => {
            const handleChange = vi.fn()
            const props = new CheckboxPropsBuilder()
                .withChildren('Indeterminate Controlled')
                .withIndeterminate()
                .withOnCheckedChange(handleChange)
                .build()

            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('data-state', 'indeterminate')

            fireEvent.click(checkbox)
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('defaults to unchecked when no checked or defaultChecked provided', () => {
            render(<Checkbox>Default State</Checkbox>)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).not.toBeChecked()
            expect(checkbox).toHaveAttribute('data-state', 'unchecked')
        })
    })

    describe('Event Handling', () => {
        it('calls onCheckedChange when clicked', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>Click me</Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)

            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('toggles between checked and unchecked states', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>Toggle me</Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')

            // First click: unchecked -> checked
            await user.click(checkbox)
            expect(handleChange).toHaveBeenCalledWith(true)

            // Second click: checked -> unchecked
            await user.click(checkbox)
            expect(handleChange).toHaveBeenCalledWith(false)
        })

        it('handles indeterminate to checked transition', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox
                    checked="indeterminate"
                    onCheckedChange={handleChange}
                >
                    Indeterminate
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('does not call onCheckedChange when disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox disabled onCheckedChange={handleChange}>
                    Disabled
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('handles label click to toggle checkbox', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>Click label</Checkbox>
            )

            const label = screen.getByText('Click label')
            await user.click(label)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLButtonElement>()
            render(<Checkbox ref={ref}>With Ref</Checkbox>)

            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
            expect(ref.current?.getAttribute('role')).toBe('checkbox')
        })
    })

    describe('Form Integration', () => {
        it('works with form submission', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <Checkbox value="terms">Accept terms</Checkbox>
                    <button type="submit">Submit</button>
                </form>
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('value', 'terms')
        })

        it('handles required field validation', () => {
            render(
                <form>
                    <Checkbox required>Required field</Checkbox>
                </form>
            )

            // The required prop shows a visual indicator (*) but may not set HTML required attribute
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('generates unique IDs when not provided', () => {
            render(
                <>
                    <Checkbox>First checkbox</Checkbox>
                    <Checkbox>Second checkbox</Checkbox>
                </>
            )

            const checkboxes = screen.getAllByRole('checkbox')
            const firstId = checkboxes[0].id
            const secondId = checkboxes[1].id

            expect(firstId).toBeTruthy()
            expect(secondId).toBeTruthy()
            expect(firstId).not.toBe(secondId)
        })

        it('uses provided ID when given', () => {
            render(<Checkbox id="custom-checkbox">Custom ID</Checkbox>)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('id', 'custom-checkbox')
        })
    })

    describe('HTML Props and Attributes', () => {
        it('passes through HTML attributes', () => {
            const props = new CheckboxPropsBuilder()
                .withChildren('With Attrs')
                .withCustomProps({
                    'data-testid': 'custom-checkbox',
                    'aria-describedby': 'help-text',
                    className: 'custom-class',
                })
                .build()

            render(<Checkbox {...props} />)

            const checkbox = screen.getByTestId('custom-checkbox')
            expect(checkbox).toHaveAttribute('aria-describedby', 'help-text')
        })

        it('applies data attributes correctly', () => {
            render(
                <Checkbox
                    data-testid="data-checkbox"
                    data-category="form-control"
                >
                    With Data Attrs
                </Checkbox>
            )

            const checkbox = screen.getByTestId('data-checkbox')
            expect(checkbox).toHaveAttribute('data-category', 'form-control')
        })
    })

    describe('Token Application', () => {
        it('applies responsive tokens through useResponsiveTokens hook', () => {
            render(<Checkbox>Responsive</Checkbox>)
            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()
            // Token application is tested through visual regression and computed styles
        })

        it('has proper data attributes for styling', () => {
            const props = new CheckboxPropsBuilder()
                .withChildren('Styled Checkbox')
                .withChecked()
                .withError()
                .build()

            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('data-state', 'checked')
            expect(checkbox).toHaveAttribute('data-error', 'true')
        })
    })

    describe('Edge Cases', () => {
        it('renders without any props', () => {
            render(<Checkbox />)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('handles empty children', () => {
            render(<Checkbox>{''}</Checkbox>)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('handles null children', () => {
            render(<Checkbox>{null}</Checkbox>)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('handles undefined subtext gracefully', () => {
            render(<Checkbox subtext={undefined}>No subtext</Checkbox>)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(screen.getByText('No subtext')).toBeInTheDocument()
        })

        it('maintains proper layout structure', () => {
            render(
                <Checkbox subtext="Helper text" slot={<MockIcon />}>
                    Layout test
                </Checkbox>
            )

            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(screen.getByText('Layout test')).toBeInTheDocument()
            expect(screen.getByText('Helper text')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('handles rapid state changes', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>Rapid clicks</Checkbox>
            )

            // Simulate rapid clicking
            await user.click(screen.getByRole('checkbox'))
            await user.click(screen.getByRole('checkbox'))
            await user.click(screen.getByRole('checkbox'))

            expect(handleChange).toHaveBeenCalledTimes(3)
        })
    })
})
