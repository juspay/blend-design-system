import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { axe } from 'jest-axe'
import DropdownInputV2 from '../../../lib/components/InputsV2/DropdownInputV2/DropdownInputV2'
import { DropdownPosition } from '../../../lib/components/InputsV2/DropdownInputV2/DropdownInputV2.types'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'
import type { SingleSelectV2GroupType } from '../../../lib/components/SingleSelectV2/singleSelectV2.types'

const noop = (): void => {}

const countryItems: SingleSelectV2GroupType[] = [
    {
        groupLabel: 'Popular',
        items: [
            { label: 'United States', value: 'US' },
            { label: 'United Kingdom', value: 'UK' },
        ],
    },
]

const defaultDropDown = {
    items: countryItems,
    value: 'US',
    onSelect: noop,
    placeholder: 'Country',
    label: 'Region',
}

describe('DropdownInputV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA)', () => {
        it('meets WCAG standards for default composite field (axe-core validation)', async () => {
            const { container } = render(
                <DropdownInputV2
                    label="Country and City"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'Enter city',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const results = await axe(container, {
                rules: {
                    // Inline SingleSelectV2 trigger naming is covered in SingleSelectV2 a11y tests
                    'button-name': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all input sizes (sm, md, lg)', async () => {
            const sizes = [InputSizeV2.SM, InputSizeV2.MD, InputSizeV2.LG]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <DropdownInputV2
                        label={`${size} dropdown input`}
                        size={size}
                        input={{
                            value: '',
                            onChange: noop,
                            placeholder: 'City',
                        }}
                        dropDown={defaultDropDown}
                    />
                )
                const results = await axe(container, {
                    rules: {
                        'button-name': { enabled: false },
                    },
                })
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards with dropdown on the right (resize-aware layout)', async () => {
            const { container } = render(
                <DropdownInputV2
                    label="Country and City"
                    dropdownPosition={DropdownPosition.RIGHT}
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'Enter city',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const results = await axe(container, {
                rules: {
                    'button-name': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <DropdownInputV2
                    label="Disabled Country and City"
                    disabled
                    input={{
                        value: 'New York',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: 'US',
                    }}
                />
            )
            const results = await axe(container, {
                rules: {
                    'button-name': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <DropdownInputV2
                    label="Required Country and City"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: '',
                    }}
                    error={{
                        show: true,
                        message: 'Both country and city are required',
                    }}
                />
            )
            const results = await axe(container, {
                rules: {
                    'button-name': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has an accessible text field for the composite control', () => {
            render(
                <DropdownInputV2
                    label="Shipping Address"
                    name="shippingAddress"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const input = screen.getByRole('textbox', {
                name: /shipping address/i,
            })
            expect(input).toBeInTheDocument()
        })

        it('renders sublabel for additional context', () => {
            render(
                <DropdownInputV2
                    label="Shipping Address"
                    sublabel="Select country and enter city details"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            expect(
                screen.getByText(/Select country and enter city details/)
            ).toBeInTheDocument()
        })

        it('renders hint text for additional guidance', () => {
            render(
                <DropdownInputV2
                    label="Shipping Address"
                    hintText="We ship to major cities worldwide"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            expect(
                screen.getByText('We ship to major cities worldwide')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state', () => {
            render(
                <DropdownInputV2
                    label="Required Country and City"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: '',
                    }}
                    error={{
                        show: true,
                        message: 'Both country and city are required',
                    }}
                />
            )
            expect(
                screen.getByText('Both country and city are required')
            ).toBeInTheDocument()
        })

        it('associates error message with the text field via aria-describedby', () => {
            render(
                <DropdownInputV2
                    label="Required Country and City"
                    name="location"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: '',
                    }}
                    error={{
                        show: true,
                        message: 'Invalid combination',
                    }}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-describedby')
            expect(screen.getByText('Invalid combination')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.3 Error Suggestion (Level AA)', () => {
        it('surfaces a corrective error message in text', () => {
            render(
                <DropdownInputV2
                    label="Required Country and City"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: '',
                    }}
                    error={{
                        show: true,
                        message: 'Select a country and enter a valid city name',
                    }}
                />
            )
            expect(
                screen.getByText('Select a country and enter a valid city name')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.7 Redundant Entry (Level A - WCAG 2.2)', () => {
        it('supports autocomplete on the text input', () => {
            render(
                <DropdownInputV2
                    label="Street"
                    autoComplete="street-address"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'Address line 1',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('autocomplete', 'street-address')
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose', () => {
            render(
                <DropdownInputV2
                    label="Location"
                    name="userLocation"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'name',
                'userLocation'
            )
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable on the text field', () => {
            render(
                <DropdownInputV2
                    label="Focusable DropdownInputV2"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('accepts keyboard input in the text field', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <DropdownInputV2
                    label="Type Here"
                    input={{
                        value: '',
                        onChange: handleChange,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, 'New York')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disables the text field when the composite is disabled', () => {
            render(
                <DropdownInputV2
                    label="Disabled"
                    disabled
                    input={{
                        value: 'New York',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: 'US',
                    }}
                />
            )
            expect(screen.getByRole('textbox')).toBeDisabled()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('moves focus to the text field when focused programmatically', () => {
            render(
                <DropdownInputV2
                    label="Focus Me"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('tabs through dropdown trigger then text field for each composite (left position)', async () => {
            const { user } = render(
                <form>
                    <DropdownInputV2
                        label="First Field"
                        dropdownPosition={DropdownPosition.LEFT}
                        input={{
                            value: '',
                            onChange: noop,
                            placeholder: 'A',
                        }}
                        dropDown={defaultDropDown}
                    />
                    <DropdownInputV2
                        label="Second Field"
                        dropdownPosition={DropdownPosition.LEFT}
                        input={{
                            value: '',
                            onChange: noop,
                            placeholder: 'B',
                        }}
                        dropDown={defaultDropDown}
                    />
                    <button type="submit">Submit</button>
                </form>
            )
            const textboxes = screen.getAllByRole('textbox')
            const regionButtons = screen.getAllByRole('button', {
                name: /region/i,
            })
            expect(textboxes).toHaveLength(2)
            expect(regionButtons).toHaveLength(2)

            await user.tab()
            expect(document.activeElement).toBe(regionButtons[0])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[0])
            await user.tab()
            expect(document.activeElement).toBe(regionButtons[1])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[1])
        })

        it('tabs through text field then dropdown trigger for each composite (right position)', async () => {
            const { user } = render(
                <form>
                    <DropdownInputV2
                        label="First Field"
                        dropdownPosition={DropdownPosition.RIGHT}
                        input={{
                            value: '',
                            onChange: noop,
                            placeholder: 'A',
                        }}
                        dropDown={defaultDropDown}
                    />
                    <DropdownInputV2
                        label="Second Field"
                        dropdownPosition={DropdownPosition.RIGHT}
                        input={{
                            value: '',
                            onChange: noop,
                            placeholder: 'B',
                        }}
                        dropDown={defaultDropDown}
                    />
                    <button type="submit">Submit</button>
                </form>
            )
            const textboxes = screen.getAllByRole('textbox')
            const regionButtons = screen.getAllByRole('button', {
                name: /region/i,
            })
            expect(textboxes).toHaveLength(2)
            expect(regionButtons).toHaveLength(2)

            await user.tab()
            expect(document.activeElement).toBe(textboxes[0])
            await user.tab()
            expect(document.activeElement).toBe(regionButtons[0])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[1])
            await user.tab()
            expect(document.activeElement).toBe(regionButtons[1])
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('exposes a textbox for the free-text portion', () => {
            render(
                <DropdownInputV2
                    label="Input Role"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('exposes required state on the text field', () => {
            render(
                <DropdownInputV2
                    label="Required DropdownInputV2"
                    required
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('exposes disabled state on the text field', () => {
            render(
                <DropdownInputV2
                    label="Disabled DropdownInputV2"
                    disabled
                    input={{
                        value: 'NYC',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: 'US',
                    }}
                />
            )
            expect(screen.getByRole('textbox')).toBeDisabled()
        })

        it('sets aria-invalid when error.show is true', () => {
            render(
                <DropdownInputV2
                    label="Error Field"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                    error={{ show: true, message: 'Error' }}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) - Level AA (WCAG 2.2)', () => {
        it('renders the composite text field and dropdown trigger (left position)', () => {
            render(
                <DropdownInputV2
                    label="Accessible DropdownInputV2"
                    dropdownPosition={DropdownPosition.LEFT}
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: /region/i })
            ).toBeInTheDocument()
        })

        it('renders the composite text field and dropdown trigger (right position)', () => {
            render(
                <DropdownInputV2
                    label="Accessible DropdownInputV2"
                    dropdownPosition={DropdownPosition.RIGHT}
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: /region/i })
            ).toBeInTheDocument()
        })
    })

    describe('Focus and Blur Events (WCAG 3.2.1 On Focus - Level A)', () => {
        it('calls onFocus when the text field receives focus', () => {
            const handleFocus = vi.fn()
            render(
                <DropdownInputV2
                    label="Focus Event"
                    onFocus={handleFocus}
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(handleFocus).toHaveBeenCalledTimes(1)
        })

        it('calls onBlur when the text field loses focus', () => {
            const handleBlur = vi.fn()
            render(
                <DropdownInputV2
                    label="Blur Event"
                    onBlur={handleBlur}
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={defaultDropDown}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            act(() => {
                input.blur()
            })
            expect(handleBlur).toHaveBeenCalledTimes(1)
        })
    })

    describe('Comprehensive WCAG compliance', () => {
        it('meets WCAG standards with hint and sublabel', async () => {
            const { container } = render(
                <DropdownInputV2
                    label="Complete DropdownInputV2"
                    sublabel="Select country and enter city"
                    hintText="Used for shipping and localization"
                    helpIconHintText="Required for delivery estimates"
                    required
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: 'US',
                    }}
                    dropdownPosition={DropdownPosition.LEFT}
                />
            )
            const results = await axe(container, {
                rules: {
                    'button-name': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error and required', async () => {
            const { container } = render(
                <DropdownInputV2
                    label="Error Test"
                    required
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        ...defaultDropDown,
                        value: '',
                    }}
                    error={{
                        show: true,
                        message: 'Please correct this field',
                    }}
                />
            )
            const results = await axe(container, {
                rules: {
                    'button-name': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })
    })
})
