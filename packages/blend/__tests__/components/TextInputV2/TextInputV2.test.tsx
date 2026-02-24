import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import TextInputV2 from '../../../lib/components/InputsV2/TextInputV2/TextInputV2'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'
import { MockIcon } from '../../test-utils'

describe('TextInputV2 Component', () => {
    describe('Rendering', () => {
        it('renders with label', () => {
            render(<TextInputV2 label="Email" value="" onChange={() => {}} />)
            expect(screen.getByText('Email')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders with label and subLabel', () => {
            render(
                <TextInputV2
                    label="Full Name"
                    subLabel="As it appears on your ID"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Full Name')).toBeInTheDocument()
            expect(
                screen.getByText(/As it appears on your ID/)
            ).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders without label', () => {
            render(<TextInputV2 value="" onChange={() => {}} />)
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders with placeholder', () => {
            render(
                <TextInputV2
                    label="Search"
                    value=""
                    onChange={() => {}}
                    placeholder="Type to search"
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('placeholder', 'Type to search')
        })

        it('renders required indicator', () => {
            render(
                <TextInputV2
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            expect(screen.getByText('*')).toBeInTheDocument()
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('renders with hint text', () => {
            render(
                <TextInputV2
                    label="Password"
                    value=""
                    onChange={() => {}}
                    hintText="Must be at least 8 characters"
                />
            )
            expect(
                screen.getByText('Must be at least 8 characters')
            ).toBeInTheDocument()
        })

        it('renders with left slot', () => {
            render(
                <TextInputV2
                    label="Email"
                    value=""
                    onChange={() => {}}
                    leftSlot={{ slot: <MockIcon />, maxHeight: 16 }}
                />
            )
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="left-slot"]')
            ).toBeInTheDocument()
        })

        it('renders with right slot', () => {
            render(
                <TextInputV2
                    label="Search"
                    value=""
                    onChange={() => {}}
                    rightSlot={{ slot: <MockIcon />, maxHeight: 16 }}
                />
            )
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).toBeInTheDocument()
        })
    })

    describe('Input States', () => {
        it('renders disabled state', () => {
            render(
                <TextInputV2
                    label="Disabled"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
        })

        it('renders error state with message', () => {
            render(
                <TextInputV2
                    label="Email"
                    value="invalid"
                    onChange={() => {}}
                    error={{
                        show: true,
                        message: 'Please enter a valid email',
                    }}
                />
            )
            expect(
                screen.getByText('Please enter a valid email')
            ).toBeInTheDocument()
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })

        it('renders error state without message', () => {
            render(
                <TextInputV2
                    label="Field"
                    value=""
                    onChange={() => {}}
                    error={{ show: true }}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })

        it('renders default error prop when not provided', () => {
            render(<TextInputV2 label="Field" value="" onChange={() => {}} />)
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-invalid', 'false')
        })
    })

    describe('Size Variants', () => {
        it.each([InputSizeV2.SM, InputSizeV2.MD, InputSizeV2.LG])(
            'renders %s size',
            (size) => {
                const { unmount } = render(
                    <TextInputV2
                        label={`${size} input`}
                        value=""
                        onChange={() => {}}
                        size={size}
                    />
                )
                expect(screen.getByRole('textbox')).toBeInTheDocument()
                unmount()
            }
        )
    })

    describe('Controlled behavior', () => {
        it('displays controlled value', () => {
            render(
                <TextInputV2
                    label="Controlled"
                    value="hello"
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveValue('hello')
        })

        it('calls onChange when value changes', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <TextInputV2
                    label="Type here"
                    value=""
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, 'a')
            expect(handleChange).toHaveBeenCalled()
        })

        it('updates when value prop changes', () => {
            const { rerender } = render(
                <TextInputV2 label="Rerender" value="" onChange={() => {}} />
            )
            let input = screen.getByRole('textbox')
            expect(input).toHaveValue('')

            rerender(
                <TextInputV2
                    label="Rerender"
                    value="updated"
                    onChange={() => {}}
                />
            )
            input = screen.getByRole('textbox')
            expect(input).toHaveValue('updated')
        })
    })

    describe('Event handling', () => {
        it('calls onFocus when input receives focus', () => {
            const handleFocus = vi.fn()
            render(
                <TextInputV2
                    label="Focus test"
                    value=""
                    onChange={() => {}}
                    onFocus={handleFocus}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(handleFocus).toHaveBeenCalledTimes(1)
        })

        it('calls onBlur when input loses focus', () => {
            const handleBlur = vi.fn()
            render(
                <TextInputV2
                    label="Blur test"
                    value=""
                    onChange={() => {}}
                    onBlur={handleBlur}
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

    describe('Ref forwarding', () => {
        it('forwards ref to the input element', () => {
            const ref = React.createRef<HTMLInputElement>()
            render(
                <TextInputV2
                    label="Ref test"
                    value=""
                    onChange={() => {}}
                    ref={ref}
                />
            )
            expect(ref.current).toBeInstanceOf(HTMLInputElement)
            expect(ref.current?.tagName).toBe('INPUT')
        })
    })

    describe('Form attributes', () => {
        it('applies name attribute', () => {
            render(
                <TextInputV2
                    label="Name"
                    name="username"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'name',
                'username'
            )
        })

        it('applies custom id when provided', () => {
            render(
                <TextInputV2
                    id="custom-input-id"
                    label="Label"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('id', 'custom-input-id')
        })

        it('supports type attribute', () => {
            render(
                <TextInputV2
                    label="Email"
                    type="email"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
        })

        it('supports autoComplete attribute', () => {
            render(
                <TextInputV2
                    label="Email"
                    value=""
                    onChange={() => {}}
                    autoComplete="email"
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'autocomplete',
                'email'
            )
        })
    })

    describe('Data attributes', () => {
        it('has data-textinput with label value', () => {
            render(
                <TextInputV2 label="Test Label" value="" onChange={() => {}} />
            )
            expect(
                document.querySelector('[data-textinput="Test Label"]')
            ).toBeInTheDocument()
        })

        it('has data-textinput empty when label is not provided', () => {
            render(<TextInputV2 value="" onChange={() => {}} />)
            expect(
                document.querySelector('[data-textinput=""]')
            ).toBeInTheDocument()
        })

        it('has data-status="enabled" when not disabled', () => {
            render(<TextInputV2 label="Enabled" value="" onChange={() => {}} />)
            expect(
                document.querySelector('[data-status="enabled"]')
            ).toBeInTheDocument()
        })

        it('has data-status="disabled" when disabled', () => {
            render(
                <TextInputV2
                    label="Disabled"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            expect(
                document.querySelector('[data-status="disabled"]')
            ).toBeInTheDocument()
        })
    })

    describe('Help icon', () => {
        it('renders with helpIconText', () => {
            render(
                <TextInputV2
                    label="API Key"
                    value=""
                    onChange={() => {}}
                    helpIconText={{
                        text: 'Find your key in settings',
                        onClick: () => {},
                    }}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(screen.getByLabelText('API Key')).toBeInTheDocument()
        })
    })

    describe('Edge cases', () => {
        it('handles empty string value', () => {
            render(<TextInputV2 label="Empty" value="" onChange={() => {}} />)
            expect(screen.getByRole('textbox')).toHaveValue('')
        })

        it('handles long value', () => {
            const longValue = 'a'.repeat(500)
            render(
                <TextInputV2
                    label="Long"
                    value={longValue}
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('textbox')).toHaveValue(longValue)
        })

        it('renders with all props combined', () => {
            render(
                <TextInputV2
                    label="Complete"
                    subLabel="Sub"
                    placeholder="Enter"
                    value=""
                    onChange={() => {}}
                    size={InputSizeV2.MD}
                    required
                    hintText="Hint"
                    helpIconText={{ text: 'Help', onClick: () => {} }}
                    error={{ show: false, message: '' }}
                    leftSlot={{ slot: <MockIcon />, maxHeight: 16 }}
                    name="complete"
                />
            )
            expect(screen.getByText('Complete')).toBeInTheDocument()
            expect(screen.getByText(/Sub/)).toBeInTheDocument()
            expect(screen.getByText('Hint')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })
})
