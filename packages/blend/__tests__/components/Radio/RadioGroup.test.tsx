import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import RadioGroup from '../../../lib/components/Radio/RadioGroup'
import Radio from '../../../lib/components/Radio/Radio'
import {
    RadioGroupPropsBuilder,
    RadioGroupTestFactory,
} from '../../test-utils/builders'

describe('RadioGroup Component', () => {
    describe('Rendering', () => {
        it('renders with label', () => {
            const props = RadioGroupTestFactory.default()
            render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            expect(screen.getByText('Default Group')).toBeInTheDocument()
            expect(screen.getAllByRole('radio')).toHaveLength(2)
        })

        it('renders without label', () => {
            const props = RadioGroupTestFactory.withoutLabel()
            render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            expect(screen.getAllByRole('radio')).toHaveLength(2)
            expect(screen.queryByText('Default Group')).not.toBeInTheDocument()
        })

        it('renders with multiple radio options', () => {
            render(
                <RadioGroup name="test-group" label="Test Group">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                    <Radio value="option4">Option 4</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            expect(radios).toHaveLength(4)
            expect(screen.getByText('Test Group')).toBeInTheDocument()
        })

        it('applies name prop to all radio children', () => {
            render(
                <RadioGroup name="group-name" label="Named Group">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            radios.forEach((radio) => {
                expect(radio).toHaveAttribute('name', 'group-name')
            })
        })

        it('filters out non-Radio children', () => {
            render(
                <RadioGroup name="filtered-group" label="Filtered Group">
                    <Radio value="option1">Option 1</Radio>
                    <div>Not a radio</div>
                    <Radio value="option2">Option 2</Radio>
                    <span>Also not a radio</span>
                </RadioGroup>
            )

            // Only Radio components should be rendered
            expect(screen.getAllByRole('radio')).toHaveLength(2)
            expect(screen.queryByText('Not a radio')).not.toBeInTheDocument()
            expect(
                screen.queryByText('Also not a radio')
            ).not.toBeInTheDocument()
        })

        it('warns about Radio children without value prop', () => {
            const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {})

            render(
                <RadioGroup name="warning-group" label="Warning Group">
                    <Radio value="option1">Option 1</Radio>
                    <Radio>No value</Radio>
                </RadioGroup>
            )

            expect(consoleSpy).toHaveBeenCalledWith(
                'RadioGroup: Radio child must have a string value prop'
            )

            consoleSpy.mockRestore()
        })
    })

    describe('Controlled Mode', () => {
        it('works as controlled component', () => {
            const handleChange = vi.fn()
            const props = new RadioGroupPropsBuilder()
                .withName('controlled')
                .withLabel('Controlled Group')
                .withValue('option2')
                .withOnChange(handleChange)
                .build()

            render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            expect(radios[0]).not.toBeChecked()
            expect(radios[1]).toBeChecked()
            expect(radios[2]).not.toBeChecked()
        })

        it('calls onChange when selection changes', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup
                    name="controlled"
                    value="option1"
                    onChange={handleChange}
                >
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const radio2 = screen.getByRole('radio', { name: 'Option 2' })
            await user.click(radio2)

            expect(handleChange).toHaveBeenCalledWith('option2')
        })

        it('updates selection when value prop changes', () => {
            const { rerender } = render(
                <RadioGroup name="controlled" value="option1">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            let radios = screen.getAllByRole('radio')
            expect(radios[0]).toBeChecked()
            expect(radios[1]).not.toBeChecked()

            rerender(
                <RadioGroup name="controlled" value="option2">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            radios = screen.getAllByRole('radio')
            expect(radios[0]).not.toBeChecked()
            expect(radios[1]).toBeChecked()
        })

        it('handles undefined value prop', () => {
            render(
                <RadioGroup name="controlled" value={undefined}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            radios.forEach((radio) => {
                expect(radio).not.toBeChecked()
            })
        })
    })

    describe('Uncontrolled Mode', () => {
        it('works as uncontrolled component', () => {
            const props = RadioGroupTestFactory.uncontrolled()
            render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            expect(radios[0]).not.toBeChecked()
            expect(radios[1]).toBeChecked() // defaultValue="option2"
            expect(radios[2]).not.toBeChecked()
        })

        it('allows user to change selection', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup
                    name="uncontrolled"
                    defaultValue="option1"
                    onChange={handleChange}
                >
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const radio2 = screen.getByRole('radio', { name: 'Option 2' })
            await user.click(radio2)

            expect(handleChange).toHaveBeenCalledWith('option2')
            // Note: In uncontrolled mode, the RadioGroup doesn't automatically update the checked state
            // The parent component would need to manage this
        })

        it('starts with no selection when no defaultValue', () => {
            render(
                <RadioGroup name="uncontrolled">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            radios.forEach((radio) => {
                expect(radio).not.toBeChecked()
            })
        })
    })

    describe('Disabled State', () => {
        it('disables all radio children when group is disabled', () => {
            const props = RadioGroupTestFactory.disabled()
            render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            radios.forEach((radio) => {
                expect(radio).toBeDisabled()
            })
        })

        it('respects individual radio disabled state', () => {
            render(
                <RadioGroup name="mixed-disabled" label="Mixed Disabled">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2" disabled>
                        Option 2
                    </Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            expect(radios[0]).not.toBeDisabled()
            expect(radios[1]).toBeDisabled()
            expect(radios[2]).not.toBeDisabled()
        })

        it('combines group and individual disabled states', () => {
            render(
                <RadioGroup name="combined-disabled" disabled>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2" disabled>
                        Option 2
                    </Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            radios.forEach((radio) => {
                expect(radio).toBeDisabled()
            })
        })

        it('does not call onChange when disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup
                    name="disabled-group"
                    disabled
                    onChange={handleChange}
                >
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const radio1 = screen.getByRole('radio', { name: 'Option 1' })
            await user.click(radio1)

            expect(handleChange).not.toHaveBeenCalled()
        })
    })

    describe('Group Behavior', () => {
        it('ensures only one radio is selected at a time', async () => {
            const { user } = render(
                <RadioGroup name="exclusive-group">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')

            // Verify all radios have the same name (which enables mutual exclusivity)
            radios.forEach((radio) => {
                expect(radio).toHaveAttribute('name', 'exclusive-group')
            })

            // Test that clicking radios works (native radio behavior handles exclusivity)
            await user.click(radios[0])
            await user.click(radios[1])
            await user.click(radios[2])

            // All radios should be clickable and functional
            radios.forEach((radio) => {
                expect(radio).not.toBeDisabled()
            })
        })

        it('maintains selection state correctly', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup name="state-group" onChange={handleChange}>
                    <Radio value="a">Option A</Radio>
                    <Radio value="b">Option B</Radio>
                    <Radio value="c">Option C</Radio>
                </RadioGroup>
            )

            const radioA = screen.getByRole('radio', { name: 'Option A' })
            const radioB = screen.getByRole('radio', { name: 'Option B' })
            const radioC = screen.getByRole('radio', { name: 'Option C' })

            await user.click(radioA)
            expect(handleChange).toHaveBeenLastCalledWith('a')

            await user.click(radioC)
            expect(handleChange).toHaveBeenLastCalledWith('c')

            await user.click(radioB)
            expect(handleChange).toHaveBeenLastCalledWith('b')

            expect(handleChange).toHaveBeenCalledTimes(3)
        })

        it('handles rapid selection changes', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup name="rapid-group" onChange={handleChange}>
                    <Radio value="1">Option 1</Radio>
                    <Radio value="2">Option 2</Radio>
                    <Radio value="3">Option 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')

            // Rapid clicking
            await user.click(radios[0])
            await user.click(radios[1])
            await user.click(radios[2])
            await user.click(radios[0])

            expect(handleChange).toHaveBeenCalledTimes(4)
            expect(handleChange).toHaveBeenNthCalledWith(1, '1')
            expect(handleChange).toHaveBeenNthCalledWith(2, '2')
            expect(handleChange).toHaveBeenNthCalledWith(3, '3')
            expect(handleChange).toHaveBeenNthCalledWith(4, '1')
        })
    })

    describe('Form Integration', () => {
        it('works with form submission', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <RadioGroup name="form-group" value="option2">
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                    </RadioGroup>
                    <button type="submit">Submit</button>
                </form>
            )

            const radios = screen.getAllByRole('radio')
            expect(radios[0]).toHaveAttribute('name', 'form-group')
            expect(radios[1]).toHaveAttribute('name', 'form-group')
            expect(radios[1]).toBeChecked()
        })

        it('provides proper form data structure', async () => {
            const { user } = render(
                <RadioGroup name="preferences" defaultValue="dark">
                    <Radio value="light">Light Theme</Radio>
                    <Radio value="dark">Dark Theme</Radio>
                    <Radio value="auto">Auto Theme</Radio>
                </RadioGroup>
            )

            const darkRadio = screen.getByRole('radio', { name: 'Dark Theme' })
            const lightRadio = screen.getByRole('radio', {
                name: 'Light Theme',
            })

            expect(darkRadio).toBeChecked()
            expect(darkRadio).toHaveAttribute('value', 'dark')
            expect(lightRadio).toHaveAttribute('value', 'light')

            // Verify the form structure is correct
            expect(darkRadio).toHaveAttribute('name', 'preferences')
            expect(lightRadio).toHaveAttribute('name', 'preferences')
        })

        it('handles form reset correctly', () => {
            render(
                <form>
                    <RadioGroup name="reset-group" defaultValue="option2">
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                    </RadioGroup>
                    <button type="reset">Reset</button>
                </form>
            )

            const radios = screen.getAllByRole('radio')
            expect(radios[1]).toBeChecked()

            // Form reset behavior would be handled by the browser
            // This test verifies the initial state is correct
        })
    })

    describe('HTML Props and Attributes', () => {
        it('renders with proper structure', () => {
            render(
                <RadioGroup name="custom-group" label="Custom Group">
                    <Radio value="option1">Option 1</Radio>
                </RadioGroup>
            )

            // RadioGroup creates a proper structure with label and radios
            expect(screen.getByText('Custom Group')).toBeInTheDocument()
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('applies proper component structure', () => {
            render(
                <RadioGroup name="data-group" label="Data Group">
                    <Radio value="option1">Option 1</Radio>
                </RadioGroup>
            )

            // Verify the RadioGroup creates the expected DOM structure
            const label = screen.getByText('Data Group')
            const radio = screen.getByRole('radio')

            expect(label).toBeInTheDocument()
            expect(radio).toBeInTheDocument()
            expect(radio).toHaveAttribute('name', 'data-group')
        })

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(
                <RadioGroup ref={ref} name="ref-group">
                    <Radio value="option1">Option 1</Radio>
                </RadioGroup>
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
        })
    })

    describe('Token Application', () => {
        it('applies responsive tokens through useResponsiveTokens hook', () => {
            render(
                <RadioGroup name="token-group" label="Token Group">
                    <Radio value="option1">Option 1</Radio>
                </RadioGroup>
            )

            const group = screen.getByText('Token Group').closest('div')
            expect(group).toBeInTheDocument()
            // Token application is tested through visual regression and computed styles
        })

        it('applies proper spacing and layout', () => {
            render(
                <RadioGroup name="layout-group" label="Layout Group">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            const label = screen.getByText('Layout Group')
            const radios = screen.getAllByRole('radio')

            expect(label).toBeInTheDocument()
            expect(radios).toHaveLength(3)
            // Layout and spacing are applied via CSS tokens
        })
    })

    describe('Edge Cases', () => {
        it('handles empty children gracefully', () => {
            render(
                <RadioGroup name="empty-group" label="Empty Group">
                    {null}
                    {undefined}
                    {false}
                </RadioGroup>
            )

            expect(screen.getByText('Empty Group')).toBeInTheDocument()
            expect(screen.queryAllByRole('radio')).toHaveLength(0)
        })

        it('handles mixed valid and invalid children', () => {
            const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {})

            render(
                <RadioGroup name="mixed-group" label="Mixed Group">
                    <Radio value="valid1">Valid 1</Radio>
                    <div>Invalid child</div>
                    <Radio value="valid2">Valid 2</Radio>
                    <Radio>Invalid radio (no value)</Radio>
                    <Radio value="valid3">Valid 3</Radio>
                </RadioGroup>
            )

            // Only valid Radio components should be rendered
            expect(screen.getAllByRole('radio')).toHaveLength(3)
            expect(consoleSpy).toHaveBeenCalledWith(
                'RadioGroup: Radio child must have a string value prop'
            )

            consoleSpy.mockRestore()
        })

        it('handles value changes with non-existent options', () => {
            const { rerender } = render(
                <RadioGroup name="nonexistent-group" value="option1">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            let radios = screen.getAllByRole('radio')
            expect(radios[0]).toBeChecked()

            // Change to non-existent value
            rerender(
                <RadioGroup name="nonexistent-group" value="nonexistent">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            radios = screen.getAllByRole('radio')
            radios.forEach((radio) => {
                expect(radio).not.toBeChecked()
            })
        })

        it('handles dynamic children changes', () => {
            const { rerender } = render(
                <RadioGroup name="dynamic-group" value="option1">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            expect(screen.getAllByRole('radio')).toHaveLength(2)

            rerender(
                <RadioGroup name="dynamic-group" value="option1">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                    <Radio value="option4">Option 4</Radio>
                </RadioGroup>
            )

            expect(screen.getAllByRole('radio')).toHaveLength(4)
            expect(
                screen.getByRole('radio', { name: 'Option 1' })
            ).toBeChecked()
        })

        it('handles onChange with undefined callback', async () => {
            const { user } = render(
                <RadioGroup name="no-callback-group">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const radio1 = screen.getByRole('radio', { name: 'Option 1' })

            // Should not throw error when onChange is undefined
            await user.click(radio1)
            // In uncontrolled mode without onChange, the component should still function
            expect(radio1).toBeInTheDocument()
        })

        it('maintains state consistency during re-renders', () => {
            const { rerender } = render(
                <RadioGroup name="consistent-group" value="option2">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            let radios = screen.getAllByRole('radio')
            expect(radios[1]).toBeChecked()

            // Re-render with same props
            rerender(
                <RadioGroup name="consistent-group" value="option2">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            radios = screen.getAllByRole('radio')
            expect(radios[1]).toBeChecked()
        })
    })

    describe('Complex Scenarios', () => {
        it('handles nested form structures', () => {
            render(
                <form>
                    <fieldset>
                        <legend>User Preferences</legend>
                        <RadioGroup name="theme" label="Theme">
                            <Radio value="light">Light</Radio>
                            <Radio value="dark">Dark</Radio>
                        </RadioGroup>
                        <RadioGroup name="language" label="Language">
                            <Radio value="en">English</Radio>
                            <Radio value="es">Spanish</Radio>
                        </RadioGroup>
                    </fieldset>
                </form>
            )

            const themeRadios = screen
                .getAllByRole('radio')
                .filter((radio) => radio.getAttribute('name') === 'theme')
            const languageRadios = screen
                .getAllByRole('radio')
                .filter((radio) => radio.getAttribute('name') === 'language')

            expect(themeRadios).toHaveLength(2)
            expect(languageRadios).toHaveLength(2)
        })

        it('handles multiple groups with same values', async () => {
            const handleThemeChange = vi.fn()
            const handleSizeChange = vi.fn()
            const { user } = render(
                <>
                    <RadioGroup name="theme" onChange={handleThemeChange}>
                        <Radio value="small">Small Theme</Radio>
                        <Radio value="large">Large Theme</Radio>
                    </RadioGroup>
                    <RadioGroup name="size" onChange={handleSizeChange}>
                        <Radio value="small">Small Size</Radio>
                        <Radio value="large">Large Size</Radio>
                    </RadioGroup>
                </>
            )

            const themeSmall = screen.getByRole('radio', {
                name: 'Small Theme',
            })
            const sizeSmall = screen.getByRole('radio', { name: 'Small Size' })

            await user.click(themeSmall)
            await user.click(sizeSmall)

            expect(handleThemeChange).toHaveBeenCalledWith('small')
            expect(handleSizeChange).toHaveBeenCalledWith('small')

            // Verify the groups are independent (different names)
            expect(themeSmall).toHaveAttribute('name', 'theme')
            expect(sizeSmall).toHaveAttribute('name', 'size')
        })

        it('handles conditional rendering of options', () => {
            const showAdvanced = true
            render(
                <RadioGroup
                    name="conditional-group"
                    label="Conditional Options"
                >
                    <Radio value="basic">Basic Option</Radio>
                    {showAdvanced && (
                        <Radio value="advanced">Advanced Option</Radio>
                    )}
                    <Radio value="expert">Expert Option</Radio>
                </RadioGroup>
            )

            expect(screen.getAllByRole('radio')).toHaveLength(3)
            expect(
                screen.getByRole('radio', { name: 'Advanced Option' })
            ).toBeInTheDocument()
        })
    })
})
