import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { axe } from 'jest-axe'
import { Mail } from 'lucide-react'
import MultiValueInputV2 from '../../../lib/components/InputsV2/MultiValueInputV2/MultiValueInputV2'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'
import { TagShape, TagSize, TagVariant } from '../../../lib/components/Tags'

function tagsConfig(
    value: string[] = [],
    handlers?: {
        onTagAdd?: (tag: string) => void
        onTagRemove?: (tag: string) => void
    }
) {
    return {
        value,
        size: TagSize.XS,
        shape: TagShape.ROUNDED,
        variant: TagVariant.SUBTLE,
        ...handlers,
    }
}

describe('MultiValueInputV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA)', () => {
        it('meets WCAG standards for default multi-value input (axe-core validation)', async () => {
            const { container } = render(
                <MultiValueInputV2
                    label="Tags"
                    value=""
                    onChange={() => {}}
                    placeholder="Add a tag and press Enter"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all input sizes (sm, md, lg)', async () => {
            const sizes = [InputSizeV2.SM, InputSizeV2.MD, InputSizeV2.LG]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <MultiValueInputV2
                        label={`${size} input`}
                        value=""
                        onChange={() => {}}
                        size={size}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <MultiValueInputV2
                    label="Disabled"
                    value=""
                    tags={tagsConfig(['a'])}
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <MultiValueInputV2
                    label="Emails"
                    value="bad"
                    onChange={() => {}}
                    error
                    errorMessage="Please enter valid values"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with committed tags and remove controls', async () => {
            const { container } = render(
                <MultiValueInputV2
                    label="Keywords"
                    value=""
                    tags={tagsConfig(['alpha', 'beta'], {
                        onTagRemove: () => {},
                    })}
                    onChange={() => {}}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has accessible label associated with input', () => {
            render(
                <MultiValueInputV2
                    label="Full Name"
                    name="fullName"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox', { name: /full name/i })
            expect(input).toBeInTheDocument()
        })

        it('renders sublabel for additional context', () => {
            render(
                <MultiValueInputV2
                    label="Skills"
                    sublabel="Press Enter after each"
                    name="skills"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByText(/Press Enter after each/)
            ).toBeInTheDocument()
        })

        it('renders hint text for additional guidance', () => {
            render(
                <MultiValueInputV2
                    label="Keywords"
                    hintText="Press Enter to add each tag"
                    name="keywords"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByText('Press Enter to add each tag')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state', () => {
            render(
                <MultiValueInputV2
                    label="Recipients"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="At least one valid entry is required"
                />
            )
            expect(
                screen.getByText('At least one valid entry is required')
            ).toBeInTheDocument()
        })

        it('error message is associated with input via aria-describedby', () => {
            render(
                <MultiValueInputV2
                    label="Field"
                    name="field"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="Invalid format"
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-describedby')
            expect(screen.getByText('Invalid format')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.7 Redundant Entry (Level A - WCAG 2.2)', () => {
        it('supports autocomplete attribute', () => {
            render(
                <MultiValueInputV2
                    label="Emails"
                    name="emails"
                    value=""
                    onChange={() => {}}
                    autoComplete="email"
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('autocomplete', 'email')
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose', () => {
            render(
                <MultiValueInputV2
                    label="Labels"
                    name="labels"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('name', 'labels')
        })

        it('supports type attribute for semantic input types', () => {
            render(
                <MultiValueInputV2
                    label="Search terms"
                    name="q"
                    type="search"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('type', 'search')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard', () => {
            render(
                <MultiValueInputV2
                    label="Focusable"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('can receive keyboard input', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <MultiValueInputV2
                    label="Type Here"
                    value=""
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, 'Hi')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled inputs are not focusable', () => {
            render(
                <MultiValueInputV2
                    label="Disabled"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
        })

        it('supports Tab key between fields when no tag chips (no extra tab stops)', async () => {
            const { user } = render(
                <>
                    <MultiValueInputV2
                        label="First"
                        value=""
                        onChange={() => {}}
                    />
                    <MultiValueInputV2
                        label="Second"
                        value=""
                        onChange={() => {}}
                    />
                </>
            )
            const inputs = screen.getAllByRole('textbox')
            await user.tab()
            expect(document.activeElement).toBe(inputs[0])
            await user.tab()
            expect(document.activeElement).toBe(inputs[1])
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused', () => {
            render(
                <MultiValueInputV2
                    label="Focus Me"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('removes focus on blur', () => {
            render(
                <MultiValueInputV2
                    label="Blur Test"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
            act(() => {
                input.blur()
            })
            expect(document.activeElement).not.toBe(input)
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order in form', async () => {
            const { user } = render(
                <form>
                    <MultiValueInputV2
                        label="Email"
                        value=""
                        onChange={() => {}}
                    />
                    <MultiValueInputV2
                        label="Aliases"
                        value=""
                        onChange={() => {}}
                    />
                    <button type="submit">Submit</button>
                </form>
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getAllByRole('textbox')[0]
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getAllByRole('textbox')[1]
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Submit' })
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has proper textbox role', () => {
            render(
                <MultiValueInputV2
                    label="Input Role"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('announces label to screen readers', () => {
            render(
                <MultiValueInputV2
                    label="Screen Reader Label"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Screen Reader Label')).toBeInTheDocument()
        })

        it('exposes required state', () => {
            render(
                <MultiValueInputV2
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('required')
            expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('announces disabled state', () => {
            render(
                <MultiValueInputV2
                    label="Disabled Input"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
        })

        it('exposes error state via aria-invalid', () => {
            render(
                <MultiValueInputV2
                    label="Error Field"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="Error"
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('Tag remove controls (WCAG 4.1.2)', () => {
        it('exposes an accessible name for each remove control', () => {
            render(
                <MultiValueInputV2
                    label="Tags"
                    value=""
                    tags={tagsConfig(['one', 'two'], { onTagRemove: () => {} })}
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByRole('button', { name: 'Remove one' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Remove two' })
            ).toBeInTheDocument()
        })
    })

    describe('With Slots (WCAG 1.1.1 Non-text Content)', () => {
        it('supports left slot with decorative icon', async () => {
            const { container } = render(
                <MultiValueInputV2
                    label="Search tags"
                    value=""
                    onChange={() => {}}
                    leftSlot={<Mail size={16} aria-hidden="true" />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Focus and Blur Events (WCAG 3.2.1 On Focus - Level A)', () => {
        it('calls onFocus when input receives focus', () => {
            const handleFocus = vi.fn()
            render(
                <MultiValueInputV2
                    label="Focus Event"
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
                <MultiValueInputV2
                    label="Blur Event"
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

    describe('Placeholder (WCAG 3.3.2 - Best Practice)', () => {
        it('provides placeholder as supplementary to label', () => {
            render(
                <MultiValueInputV2
                    label="Tags"
                    placeholder="type and press Enter"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('placeholder', 'type and press Enter')
        })

        it('label is present even with placeholder', () => {
            render(
                <MultiValueInputV2
                    label="Email addresses"
                    placeholder="Add email"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Email addresses')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                'Add email'
            )
        })
    })

    describe('Comprehensive WCAG compliance', () => {
        it('meets WCAG standards with all features combined', async () => {
            const { container } = render(
                <MultiValueInputV2
                    label="Complete Test"
                    sublabel="Additional context"
                    hintText="Helpful hint"
                    helpIconHintText="Tooltip information"
                    placeholder="Enter value"
                    value=""
                    onChange={() => {}}
                    required
                    leftSlot={<Mail size={16} aria-hidden="true" />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state', async () => {
            const { container } = render(
                <MultiValueInputV2
                    label="Error Test"
                    value=""
                    tags={tagsConfig(['x'])}
                    onChange={() => {}}
                    error
                    errorMessage="Please correct this field"
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards in disabled state', async () => {
            const { container } = render(
                <MultiValueInputV2
                    label="Disabled"
                    value=""
                    tags={tagsConfig(['Cannot', 'edit'])}
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
