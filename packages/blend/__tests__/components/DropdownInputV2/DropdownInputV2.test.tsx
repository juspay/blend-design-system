import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import DropdownInputV2 from '../../../lib/components/InputsV2/DropdownInputV2/DropdownInputV2'
import { DropdownPosition } from '../../../lib/components/InputsV2/DropdownInputV2/DropdownInputV2.types'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'
import type { SingleSelectV2GroupType } from '../../../lib/components/SingleSelectV2/singleSelectV2.types'

const sampleItems: SingleSelectV2GroupType[] = [
    {
        groupLabel: 'Options',
        items: [
            { label: 'United States', value: 'US' },
            { label: 'United Kingdom', value: 'UK', disabled: true },
            { label: 'Canada', value: 'CA' },
        ],
    },
]

const defaultProps = {
    label: 'Location',
    input: {
        value: '',
        onChange: () => {},
        placeholder: 'City',
    },
    dropDown: {
        items: sampleItems,
        value: 'US',
        onSelect: () => {},
        placeholder: 'Country',
        label: 'Region',
    },
}

describe('DropdownInputV2', () => {
    describe('Rendering', () => {
        it('renders label and text field', () => {
            render(<DropdownInputV2 {...defaultProps} />)
            expect(screen.getByText('Location')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders sublabel', () => {
            render(
                <DropdownInputV2 {...defaultProps} sublabel="As on your ID" />
            )
            expect(screen.getByText(/As on your ID/)).toBeInTheDocument()
        })

        it('renders hint text', () => {
            render(
                <DropdownInputV2
                    {...defaultProps}
                    hintText="Choose country and enter city"
                />
            )
            expect(
                screen.getByText('Choose country and enter city')
            ).toBeInTheDocument()
        })

        it('renders placeholder on the text input', () => {
            render(<DropdownInputV2 {...defaultProps} />)
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                'City'
            )
        })

        it('renders required indicator and aria-required', () => {
            render(<DropdownInputV2 {...defaultProps} required />)
            expect(screen.getByText('*')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-required',
                'true'
            )
        })
    })

    describe('Input states', () => {
        it('disables the text field when the root disabled prop is set', () => {
            render(<DropdownInputV2 {...defaultProps} disabled />)
            expect(screen.getByRole('textbox')).toBeDisabled()
        })

        it('disables the text field when the selected dropdown item is disabled', () => {
            render(
                <DropdownInputV2
                    {...defaultProps}
                    input={{ ...defaultProps.input, value: 'NYC' }}
                    dropDown={{ ...defaultProps.dropDown, value: 'UK' }}
                />
            )
            expect(screen.getByRole('textbox')).toBeDisabled()
        })

        it('shows error message and sets aria-invalid when error.show is true', () => {
            render(
                <DropdownInputV2
                    {...defaultProps}
                    error={{
                        show: true,
                        message: 'Please fix this field',
                    }}
                />
            )
            expect(
                screen.getByText('Please fix this field')
            ).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })

        it('does not mark invalid when error.show is false', () => {
            render(
                <DropdownInputV2
                    {...defaultProps}
                    error={{ show: false, message: '' }}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'false'
            )
        })
    })

    describe('Controlled input', () => {
        it('displays controlled input value', () => {
            render(
                <DropdownInputV2
                    {...defaultProps}
                    input={{
                        ...defaultProps.input,
                        value: 'Seattle',
                        onChange: () => {},
                    }}
                />
            )
            expect(screen.getByRole('textbox')).toHaveValue('Seattle')
        })

        it('calls input.onChange with the string value', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <DropdownInputV2
                    {...defaultProps}
                    input={{
                        ...defaultProps.input,
                        value: '',
                        onChange: handleChange,
                    }}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, 'a')
            expect(handleChange).toHaveBeenCalled()
            expect(handleChange.mock.calls.at(-1)?.[0]).toContain('a')
        })

        it('does not call onChange when the text field is disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <DropdownInputV2
                    {...defaultProps}
                    disabled
                    input={{
                        ...defaultProps.input,
                        value: '',
                        onChange: handleChange,
                    }}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, 'x')
            expect(handleChange).not.toHaveBeenCalled()
        })
    })

    describe('Dropdown selection', () => {
        it('calls dropDown.onSelect when a new value is chosen', async () => {
            const onSelect = vi.fn()
            const { user } = render(
                <DropdownInputV2
                    {...defaultProps}
                    dropDown={{ ...defaultProps.dropDown, onSelect }}
                />
            )
            const trigger = screen.getByRole('button', {
                name: /region|location/i,
            })
            await user.click(trigger)
            const canada = await screen.findByRole('menuitem', {
                name: /canada/i,
            })
            await user.click(canada)
            expect(onSelect).toHaveBeenCalledWith('CA')
        })
    })

    describe('Layout', () => {
        it('renders with dropdown on the left', () => {
            render(
                <DropdownInputV2
                    {...defaultProps}
                    dropdownPosition={DropdownPosition.LEFT}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders with dropdown on the right', () => {
            render(
                <DropdownInputV2
                    {...defaultProps}
                    dropdownPosition={DropdownPosition.RIGHT}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('updates inline-start padding when switching dropdownPosition via rerender', () => {
            const { rerender } = render(
                <DropdownInputV2
                    {...defaultProps}
                    dropdownPosition={DropdownPosition.LEFT}
                />
            )
            const startWhenLeft = parseFloat(
                getComputedStyle(screen.getByRole('textbox')).paddingInlineStart
            )

            rerender(
                <DropdownInputV2
                    {...defaultProps}
                    dropdownPosition={DropdownPosition.RIGHT}
                />
            )
            const startWhenRight = parseFloat(
                getComputedStyle(screen.getByRole('textbox')).paddingInlineStart
            )

            expect(startWhenLeft).toBeGreaterThan(startWhenRight)
        })
    })

    describe('Size variants', () => {
        it.each([InputSizeV2.SM, InputSizeV2.MD, InputSizeV2.LG])(
            'renders with size %s',
            (size) => {
                const { unmount } = render(
                    <DropdownInputV2 {...defaultProps} size={size} />
                )
                expect(screen.getByRole('textbox')).toBeInTheDocument()
                unmount()
            }
        )
    })

    describe('Events', () => {
        it('calls onFocus and onBlur on the text input', () => {
            const onFocus = vi.fn()
            const onBlur = vi.fn()
            render(
                <DropdownInputV2
                    {...defaultProps}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(onFocus).toHaveBeenCalledTimes(1)
            act(() => {
                input.blur()
            })
            expect(onBlur).toHaveBeenCalledTimes(1)
        })

        it('calls onDropdownOpen and onDropdownClose when the menu opens and closes', async () => {
            const onDropdownOpen = vi.fn()
            const onDropdownClose = vi.fn()
            const { user } = render(
                <DropdownInputV2
                    {...defaultProps}
                    onDropdownOpen={onDropdownOpen}
                    onDropdownClose={onDropdownClose}
                />
            )
            const trigger = screen.getByRole('button', {
                name: /region|location/i,
            })
            await user.click(trigger)
            expect(onDropdownOpen).toHaveBeenCalledTimes(1)
            await user.keyboard('{Escape}')
            expect(onDropdownClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('Ref forwarding', () => {
        it('forwards ref to the text input element', () => {
            const ref = React.createRef<HTMLInputElement>()
            render(<DropdownInputV2 {...defaultProps} ref={ref} />)
            expect(ref.current).toBeInstanceOf(HTMLInputElement)
            expect(ref.current?.tagName).toBe('INPUT')
        })
    })

    describe('Form attributes', () => {
        it('applies name to the text input', () => {
            render(<DropdownInputV2 {...defaultProps} name="location-field" />)
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'name',
                'location-field'
            )
        })

        it('applies custom id to the text input', () => {
            render(<DropdownInputV2 {...defaultProps} id="city-input" />)
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'id',
                'city-input'
            )
        })
    })

    describe('Data attributes', () => {
        it('sets data-dropdown-input-v2 from the label', () => {
            render(<DropdownInputV2 {...defaultProps} />)
            expect(
                document.querySelector('[data-dropdown-input-v2="Location"]')
            ).toBeInTheDocument()
        })

        it('sets data-status for enabled and disabled', () => {
            const { rerender } = render(<DropdownInputV2 {...defaultProps} />)
            expect(
                document.querySelector('[data-status="enabled"]')
            ).toBeInTheDocument()

            rerender(<DropdownInputV2 {...defaultProps} disabled />)
            expect(
                document.querySelector('[data-status="disabled"]')
            ).toBeInTheDocument()
        })
    })
})
