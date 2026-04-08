import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { axe } from 'jest-axe'
import { TextAreaV2 } from '../../../lib/components/InputsV2/TextAreaV2'

const noop = () => {}

describe('TextAreaV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA) — axe-core', () => {
        it('meets WCAG standards for default textarea (axe-core validation)', async () => {
            const { container } = render(
                <TextAreaV2
                    label="Description"
                    placeholder="Enter details"
                    value=""
                    onChange={noop}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards when disabled', async () => {
            const { container } = render(
                <TextAreaV2
                    label="Disabled"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1)', async () => {
            const { container } = render(
                <TextAreaV2
                    label="Notes"
                    placeholder="…"
                    value="bad"
                    onChange={noop}
                    error
                    errorMessage="Please fix this field"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('associates label with textarea for accessible name', () => {
            render(
                <TextAreaV2
                    label="Comments"
                    name="comments"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            expect(
                screen.getByRole('textbox', { name: /comments/i })
            ).toBeInTheDocument()
        })

        it('renders sublabel for additional context', () => {
            render(
                <TextAreaV2
                    label="Bio"
                    sublabel="Public on your profile"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            expect(
                screen.getByText(/Public on your profile/)
            ).toBeInTheDocument()
        })

        it('renders hint text', () => {
            render(
                <TextAreaV2
                    label="Feedback"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    hintText="Be specific and constructive"
                />
            )
            expect(
                screen.getByText('Be specific and constructive')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('shows error message when error is set', () => {
            render(
                <TextAreaV2
                    label="Field"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    error
                    errorMessage="This field has an error"
                />
            )
            expect(
                screen.getByText('This field has an error')
            ).toBeInTheDocument()
        })

        it('associates error message with textarea via aria-describedby', () => {
            render(
                <TextAreaV2
                    label="Field"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    error
                    errorMessage="Invalid"
                />
            )
            const ta = screen.getByRole('textbox')
            const err = screen.getByText('Invalid')
            expect(ta.getAttribute('aria-describedby')).toBe(err.id)
        })

        it('sets aria-invalid on textarea when error is true', () => {
            render(
                <TextAreaV2
                    label="Field"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    error
                    errorMessage="Err"
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })
    })

    describe('WCAG 1.3.5 / autocomplete', () => {
        it('supports autoComplete from native textarea attributes', () => {
            render(
                <TextAreaV2
                    label="Address"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    autoComplete="street-address"
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'autocomplete',
                'street-address'
            )
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard', () => {
            render(
                <TextAreaV2
                    label="Focusable"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            const ta = screen.getByRole('textbox')
            act(() => {
                ta.focus()
            })
            expect(document.activeElement).toBe(ta)
        })

        it('can receive keyboard input', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <TextAreaV2
                    label="Type"
                    placeholder="…"
                    value=""
                    onChange={handleChange}
                />
            )
            await user.type(screen.getByRole('textbox'), 'Hi')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled textarea is not editable', () => {
            render(
                <TextAreaV2
                    label="Off"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    disabled
                />
            )
            expect(screen.getByRole('textbox')).toBeDisabled()
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains tab order with multiple fields and submit', async () => {
            const { user } = render(
                <form>
                    <TextAreaV2
                        label="First"
                        placeholder="…"
                        value=""
                        onChange={noop}
                    />
                    <TextAreaV2
                        label="Second"
                        placeholder="…"
                        value=""
                        onChange={noop}
                    />
                    <button type="submit">Send</button>
                </form>
            )
            const boxes = screen.getAllByRole('textbox')
            await user.tab()
            expect(document.activeElement).toBe(boxes[0])
            await user.tab()
            expect(document.activeElement).toBe(boxes[1])
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Send' })
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('exposes textbox role', () => {
            render(
                <TextAreaV2
                    label="Role"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('exposes required state', () => {
            render(
                <TextAreaV2
                    label="Req"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    required
                />
            )
            const ta = screen.getByRole('textbox')
            expect(ta).toHaveAttribute('required')
            expect(ta).toHaveAttribute('aria-required', 'true')
        })

        it('exposes disabled state', () => {
            render(
                <TextAreaV2
                    label="Off"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    disabled
                />
            )
            expect(screen.getByRole('textbox')).toBeDisabled()
        })
    })

    describe('ARIA describedby and live regions', () => {
        it('associates hint with textarea when no error', () => {
            render(
                <TextAreaV2
                    label="L"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    hintText="Hint copy"
                />
            )
            const ta = screen.getByRole('textbox')
            const hint = screen.getByText('Hint copy')
            expect(ta.getAttribute('aria-describedby')).toBe(hint.id)
        })

        it('error message uses role alert for announcements', () => {
            render(
                <TextAreaV2
                    label="L"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    error
                    errorMessage="Problem"
                />
            )
            const msg = screen.getByText('Problem')
            expect(msg).toHaveAttribute('role', 'alert')
            expect(msg).toHaveAttribute('aria-live', 'polite')
        })
    })

    describe('Comprehensive axe', () => {
        it('passes axe with label, sublabel, hint, and required', async () => {
            const { container } = render(
                <TextAreaV2
                    label="Complete"
                    sublabel="Extra"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    hintText="Hint"
                    helpIconHintText="Help"
                    required
                    rows={4}
                    resize="vertical"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe with error and required', async () => {
            const { container } = render(
                <TextAreaV2
                    label="Err"
                    placeholder="…"
                    value="x"
                    onChange={noop}
                    required
                    error
                    errorMessage="Please correct"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
